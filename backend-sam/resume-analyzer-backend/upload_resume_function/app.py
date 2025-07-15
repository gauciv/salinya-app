import json
import base64
import uuid
import os
import time
import boto3
from botocore.exceptions import ClientError

# Initialize AWS clients
s3_client = boto3.client('s3')
dynamodb_client = boto3.client('dynamodb')
sqs_client = boto3.client('sqs')

# Environment variables (set in Lambda Console)
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
DYNAMODB_TABLE_NAME = os.environ.get('DYNAMODB_TABLE_NAME')
SQS_QUEUE_URL = os.environ.get('SQS_QUEUE_URL')

def lambda_handler(event, context):
    """
    Handles resume upload via API Gateway.
    Saves the file to S3, creates a DynamoDB record, and queues for processing.
    """
    print(f"Received event: {json.dumps(event)}")

    # CORS Headers for API Gateway. Crucial for Next.js frontend.
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type': 'application/json'
    }

    # Handle CORS preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }

    try:
        # The Next.js frontend (or its API route) typically sends file as base64 in a JSON body.
        # Or, API Gateway can be configured for binary handling which passes raw bytes.
        # This code assumes JSON with a base64 encoded file.
        body_data = json.loads(event['body'])
        file_content_base64 = body_data.get('file_content_base64')
        file_name = body_data.get('file_name', 'resume_upload') # Default filename
        content_type = body_data.get('content_type', 'application/octet-stream')

        if not file_content_base64:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({"message": "No file content provided."})
            }

        file_content_bytes = base64.b64decode(file_content_base64)
        
        # Determine file extension
        file_extension = 'txt' # Default
        if 'application/pdf' in content_type:
            file_extension = 'pdf'
        elif 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' in content_type or file_name.lower().endswith('.docx'):
            file_extension = 'docx'
        elif file_name.lower().endswith('.pdf'):
             file_extension = 'pdf' # Fallback for names if content-type is generic
        
        resume_id = str(uuid.uuid4())
        s3_key = f"{resume_id}.{file_extension}"

        # 1. Save file to S3
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=s3_key,
            Body=file_content_bytes,
            ContentType=content_type
        )
        print(f"Resume {s3_key} saved to S3 bucket {S3_BUCKET_NAME}")

        # 2. Create initial DynamoDB record
        timestamp = str(int(time.time() * 1000)) # Store as string for DynamoDB 'N' type
        dynamodb_client.put_item(
            TableName=DYNAMODB_TABLE_NAME,
            Item={
                'resume_id': {'S': resume_id},
                's3_key': {'S': s3_key},
                'status': {'S': 'processing'},
                'upload_timestamp': {'N': timestamp},
                'file_name': {'S': file_name} # Store original filename
            }
        )
        print(f"DynamoDB record created for resume_id: {resume_id}")

        # 3. Queue message to SQS for asynchronous processing
        message_body = {
            'resume_id': resume_id,
            's3_bucket': S3_BUCKET_NAME,
            's3_key': s3_key
        }
        sqs_client.send_message(
            QueueUrl=SQS_QUEUE_URL,
            MessageBody=json.dumps(message_body)
        )
        print(f"Message sent to SQS for resume_id: {resume_id}")

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                "message": "Resume uploaded and queued for processing.",
                "resume_id": resume_id,
                "status": "processing"
            })
        }

    except ClientError as e:
        print(f"AWS Client Error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"message": f"AWS Service Error: {str(e)}"})
        }
    except json.JSONDecodeError:
        print("Invalid JSON in request body.")
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({"message": "Invalid JSON format in request body."})
        }
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"message": f"Internal Server Error: {str(e)}"})
        }