import json
import os
import boto3
from botocore.exceptions import ClientError

dynamodb_client = boto3.client('dynamodb')

DYNAMODB_TABLE_NAME = os.environ.get('DYNAMODB_TABLE_NAME')

def lambda_handler(event, context):
    """
    Retrieves resume analysis status and results from DynamoDB.
    """
    print(f"Received event for status: {json.dumps(event)}")

    headers = {
        'Access-Control-Allow-Origin': '*', # For hackathon, allows any origin. Harden in production.
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Content-Type': 'application/json'
    }

    # Handle CORS preflight request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }

    # Extract resume_id from path parameters
    # Assumes API Gateway path /{resume_id}
    resume_id = None
    if 'pathParameters' in event and event['pathParameters']:
        resume_id = event['pathParameters'].get('resume_id')
    
    if not resume_id:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({"message": "Missing resume_id in path."})
        }

    try:
        response = dynamodb_client.get_item(
            TableName=DYNAMODB_TABLE_NAME,
            Key={'resume_id': {'S': resume_id}}
        )
        item = response.get('Item')

        if not item:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({"message": "Resume ID not found."})
            }

        # Convert DynamoDB JSON format to a more readable Python dict
        # This is a common pattern for DynamoDB item deserialization
        parsed_item = {}
        for k, v in item.items():
            for key_type, value in v.items():
                if key_type == 'S':
                    parsed_item[k] = value
                elif key_type == 'N':
                    parsed_item[k] = int(value) if value.isdigit() else float(value)
                elif key_type == 'BOOL':
                    parsed_item[k] = bool(value)
                elif key_type == 'L':
                    # Assuming list of strings for simplicity
                    parsed_item[k] = [x['S'] for x in value if 'S' in x]
                # Add other types (M for Map, SS for String Set, etc.) if your data schema uses them

        # Parse analysis_results JSON string if it exists
        if 'analysis_results' in parsed_item and isinstance(parsed_item['analysis_results'], str):
            try:
                parsed_item['analysis_results'] = json.loads(parsed_item['analysis_results'])
            except json.JSONDecodeError:
                print(f"Warning: analysis_results for {resume_id} is not valid JSON.")
                # Keep as string or set to None/error representation
                pass

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(parsed_item)
        }

    except ClientError as e:
        print(f"AWS Client Error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"message": f"AWS Service Error: {str(e)}"})
        }
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({"message": f"Internal Server Error: {str(e)}"})
        }