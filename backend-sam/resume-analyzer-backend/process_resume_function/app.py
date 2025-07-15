import json
import os
import time
import boto3
from botocore.exceptions import ClientError
from botocore.config import Config

# IMPORTANT: These imports rely on your Lambda Layer
# Make sure your layer includes PyMuPDF (fitz) and python-docx
import fitz # PyMuPDF
from docx import Document # python-docx
from io import BytesIO

# --- Helper functions for text extraction (from text_extractor.py) ---
def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extracts text from PDF bytes using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page in doc:
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        raise ValueError(f"Could not extract text from PDF: {e}")
    return text

def extract_text_from_docx(docx_bytes: bytes) -> str:
    """Extracts text from DOCX bytes using python-docx."""
    text = ""
    try:
        doc = Document(BytesIO(docx_bytes))
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error extracting text from DOCX: {e}")
        raise ValueError(f"Could not extract text from DOCX: {e}")
    return text

def extract_text_from_file_bytes(file_bytes: bytes, file_extension: str) -> str:
    """
    Extracts text based on file extension.
    Raises ValueError for unsupported types or extraction errors.
    """
    file_extension = file_extension.lower().strip('.')
    if file_extension == 'pdf':
        return extract_text_from_pdf(file_bytes)
    elif file_extension == 'docx':
        return extract_text_from_docx(file_bytes)
    else:
        raise ValueError(f"Unsupported file type for extraction: {file_extension}")
# --- End of helper functions ---


# Initialize AWS clients
# Optimized configuration for faster processing
boto3_config = Config(
    retries={
        'max_attempts': 3,  # Reduced retries
        'mode': 'adaptive'
    },
    connect_timeout=2,  # Faster connection
    read_timeout=30,    # Reduced read timeout
    max_pool_connections=10
)
s3_client = boto3.client('s3', config=boto3_config)
dynamodb_client = boto3.client('dynamodb', config=boto3_config)
bedrock_runtime_client = boto3.client('bedrock-runtime', config=boto3_config)


# Environment variables (set in Lambda Console)
DYNAMODB_TABLE_NAME = os.environ.get('DYNAMODB_TABLE_NAME')
BEDROCK_MODEL_ID = os.environ.get('BEDROCK_MODEL_ID', 'anthropic.claude-3-haiku-20240307-v1:0')

def lambda_handler(event, context):
    """
    Handles SQS messages to process resume analysis.
    """
    print(f"Received SQS event: {json.dumps(event)}")

    for record in event['Records']:
        message_body = json.loads(record['body'])
        resume_id = message_body['resume_id']
        s3_bucket = message_body['s3_bucket']
        s3_key = message_body['s3_key']
        file_extension = s3_key.split('.')[-1]

        try:
            # 1. Retrieve file from S3
            print(f"Downloading {s3_key} from {s3_bucket}")
            s3_object = s3_client.get_object(Bucket=s3_bucket, Key=s3_key)
            file_bytes = s3_object['Body'].read()
            print(f"Downloaded {len(file_bytes)} bytes.")

            # 2. Extract and optimize text from resume
            extracted_text = extract_text_from_file_bytes(file_bytes, file_extension)
            print(f"Extracted {len(extracted_text)} characters from {s3_key}.")
            
            # Smart truncation - prioritize key sections
            key_sections = []
            lines = extracted_text.split('\n')
            
            # Look for key sections first
            for i, line in enumerate(lines):
                line_lower = line.lower()
                if any(keyword in line_lower for keyword in ['skill', 'experience', 'work', 'project', 'education', 'technical']):
                    # Include this line and next 3 lines
                    key_sections.extend(lines[i:i+4])
            
            # Use key sections if found, otherwise use beginning
            if key_sections:
                extracted_text = '\n'.join(key_sections[:50])  # Further reduced
            else:
                extracted_text = extracted_text[:1500]  # Minimal text for speed

            # 3. Construct simplified prompt for faster processing
            prompt_template = """
            Analyze this resume for tech career compatibility. Return JSON only:
            {{
              "compatibility_score": number (0-100),
              "top_technical_skills_found": ["skill1", "skill2", "skill3"],
              "compatibility_explanation": "brief explanation",
              "suggested_keywords": ["keyword1", "keyword2"]
            }}

            Resume: {resume_text}
            """
            prompt_text = prompt_template.format(resume_text=extracted_text)
            print(f"Prompt length: {len(prompt_text)} characters.")

            # 4. Invoke Bedrock with Claude Sonnet 4 using the Messages API format
            # Claude 3/4 models use the Messages API.
            # The 'anthropic_version' field is important.
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31", # This is the API version, not model version
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt_text}
                        ]
                    }
                ],
                "max_tokens": 300, # Minimal for fastest processing
                "temperature": 0.7, # Higher for faster generation
                "top_p": 0.9,
            })

            response = bedrock_runtime_client.invoke_model(
                modelId=BEDROCK_MODEL_ID,
                contentType="application/json",
                accept="application/json",
                body=body
            )

            response_body = json.loads(response.get("body").read())
            
            # Claude's response for Messages API is structured.
            # Look for the 'content' key, which is a list of dicts.
            # The first item's 'text' should be the completion.
            claude_completion = ""
            if response_body and 'content' in response_body and isinstance(response_body['content'], list):
                for item in response_body['content']:
                    if item.get('type') == 'text':
                        claude_completion += item.get('text', '')
            
            print(f"Claude raw response: {claude_completion}")

            # 5. Parse Claude's JSON response
            analysis_results = {}
            try:
                # Attempt to parse as JSON. Claude should output pure JSON.
                analysis_results = json.loads(claude_completion)
                # Validate expected keys are present
                required_keys = ["compatibility_score", "top_technical_skills_found", "compatibility_explanation", "suggested_keywords"]
                if not all(key in analysis_results for key in required_keys):
                    raise ValueError("Claude response missing one or more required keys.")
            except json.JSONDecodeError as e:
                print(f"Error parsing Claude's JSON response: {e}. Raw: {claude_completion}")
                analysis_results = {"error": "Failed to parse Claude's JSON output", "raw_output": claude_completion}
            except ValueError as e:
                print(f"Validation error in Claude's response: {e}. Raw: {claude_completion}")
                analysis_results = {"error": f"Validation failed: {e}", "raw_output": claude_completion}


            # 6. Update DynamoDB record
            # Use separate variables for updates to make it cleaner
            update_expression_parts = [
                "SET #st = :s",
                "#ana = :a",
                "#ts = :ts"
            ]
            expression_attribute_names = {
                '#st': 'status',
                '#ana': 'analysis_results',
                '#ts': 'analysis_timestamp'
            }
            expression_attribute_values = {
                ':s': {'S': 'completed'},
                ':a': {'S': json.dumps(analysis_results)}, # Store analysis results as JSON string
                ':ts': {'N': str(int(time.time() * 1000))}
            }

            # Add individual fields for easier querying/display if they exist and are valid
            if isinstance(analysis_results.get("compatibility_score"), (int, float)):
                update_expression_parts.append("#cs = :cs")
                expression_attribute_names['#cs'] = 'compatibility_score'
                expression_attribute_values[':cs'] = {'N': str(analysis_results['compatibility_score'])}
            if isinstance(analysis_results.get("top_technical_skills_found"), list):
                update_expression_parts.append("#tts = :tts")
                expression_attribute_names['#tts'] = 'top_technical_skills_found'
                expression_attribute_values[':tts'] = {'L': [{'S': skill} for skill in analysis_results['top_technical_skills_found'] if isinstance(skill, str)]}
            if isinstance(analysis_results.get("compatibility_explanation"), str):
                update_expression_parts.append("#ce = :ce")
                expression_attribute_names['#ce'] = 'compatibility_explanation'
                expression_attribute_values[':ce'] = {'S': analysis_results['compatibility_explanation']}
            if isinstance(analysis_results.get("suggested_keywords"), list):
                update_expression_parts.append("#sk = :sk")
                expression_attribute_names['#sk'] = 'suggested_keywords'
                expression_attribute_values[':sk'] = {'L': [{'S': kw} for kw in analysis_results['suggested_keywords'] if isinstance(kw, str)]}


            dynamodb_client.update_item(
                TableName=DYNAMODB_TABLE_NAME,
                Key={'resume_id': {'S': resume_id}},
                UpdateExpression=",".join(update_expression_parts), # Join the parts
                ExpressionAttributeNames=expression_attribute_names,
                ExpressionAttributeValues=expression_attribute_values
            )
            print(f"DynamoDB record updated for resume_id: {resume_id} with status 'completed'")

        except ClientError as e:
            print(f"AWS Client Error for {resume_id}: {e}")
            # Update status to 'failed' in DynamoDB
            dynamodb_client.update_item(
                TableName=DYNAMODB_TABLE_NAME,
                Key={'resume_id': {'S': resume_id}},
                UpdateExpression="SET #st = :s, #err = :e, #ts = :ts",
                ExpressionAttributeNames={'#st': 'status', '#err': 'error_message', '#ts': 'analysis_timestamp'},
                ExpressionAttributeValues={
                    ':s': {'S': 'failed'},
                    ':e': {'S': str(e)},
                    ':ts': {'N': str(int(time.time() * 1000))}
                }
            )
        except Exception as e:
            print(f"Unexpected error for {resume_id}: {e}")
            # Update status to 'failed' in DynamoDB
            dynamodb_client.update_item(
                TableName=DYNAMODB_TABLE_NAME,
                Key={'resume_id': {'S': resume_id}},
                UpdateExpression="SET #st = :s, #err = :e, #ts = :ts",
                ExpressionAttributeNames={'#st': 'status', '#err': 'error_message', '#ts': 'analysis_timestamp'},
                ExpressionAttributeValues={
                    ':s': {'S': 'failed'},
                    ':e': {'S': str(e)},
                    ':ts': {'N': str(int(time.time() * 1000))}
                }
            )
    return {
        'statusCode': 200,
        'body': json.dumps({"message": "Processing complete for batch."})
    }