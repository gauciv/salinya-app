# AWS Lambda Environment Variables Setup

## Required Resources

### 1. S3 Bucket
**Create:**
1. AWS Console → S3 → Create bucket
2. Name: `sumakses-resume-uploads` (must be globally unique)
3. Region: `ap-southeast-2` (same as your Lambda)
4. Keep defaults, click Create

**Get Value:**
- Bucket name: `sumakses-resume-uploads`

### 2. DynamoDB Table
**Create:**
1. AWS Console → DynamoDB → Create table
2. Table name: `sumakses-resume-status`
3. Partition key: `resume_id` (String)
4. Keep defaults, click Create

**Get Value:**
- Table name: `sumakses-resume-status`

### 3. SQS Queue
**Create:**
1. AWS Console → SQS → Create queue
2. Name: `sumakses-resume-processing`
3. Type: Standard
4. Keep defaults, click Create

**Get Value:**
- Copy the Queue URL (looks like: `https://sqs.ap-southeast-2.amazonaws.com/123456789/sumakses-resume-processing`)

## Lambda Environment Variables

**Go to:** AWS Console → Lambda → Your function → Configuration → Environment variables

**Add these variables:**

| Key | Value |
|-----|-------|
| `S3_BUCKET_NAME` | `sumakses-resume-uploads` |
| `DYNAMODB_TABLE_NAME` | `sumakses-resume-status` |
| `SQS_QUEUE_URL` | `https://sqs.ap-southeast-2.amazonaws.com/YOUR-ACCOUNT-ID/sumakses-resume-processing` |

## Lambda IAM Permissions

**Your Lambda needs these permissions:**

1. AWS Console → Lambda → Your function → Configuration → Permissions
2. Click the Role name (opens IAM)
3. Add these policies:

**S3 Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::sumakses-resume-uploads/*"
        }
    ]
}
```

**DynamoDB Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:ap-southeast-2:*:table/sumakses-resume-status"
        }
    ]
}
```

**SQS Policy:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sqs:SendMessage"
            ],
            "Resource": "arn:aws:sqs:ap-southeast-2:*:sumakses-resume-processing"
        }
    ]
}
```

## Quick Setup Commands

**If you have AWS CLI configured:**

```bash
# Create S3 bucket
aws s3 mb s3://sumakses-resume-uploads --region ap-southeast-2

# Create DynamoDB table
aws dynamodb create-table \
    --table-name sumakses-resume-status \
    --attribute-definitions AttributeName=resume_id,AttributeType=S \
    --key-schema AttributeName=resume_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ap-southeast-2

# Create SQS queue
aws sqs create-queue \
    --queue-name sumakses-resume-processing \
    --region ap-southeast-2
```

After setup, test again with:
```bash
./test-files/test-correct.sh
```