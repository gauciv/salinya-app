#!/bin/bash

API_URL="https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod"

echo "Testing Resume Analyzer API with JSON..."
echo "======================================="

# Convert resume to base64 and create JSON payload
RESUME_CONTENT=$(cat test-files/sample-resume.txt)
JSON_PAYLOAD=$(cat <<EOF
{
  "resume_text": "$RESUME_CONTENT",
  "file_name": "sample-resume.txt"
}
EOF
)

echo "1. Testing with JSON payload..."
curl -X POST "$API_URL/upload-resume" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  -v

echo -e "\n\n"

# Test with base64 encoded file
echo "2. Testing with base64 encoded file..."
BASE64_CONTENT=$(base64 -w 0 test-files/sample-resume.txt)
JSON_BASE64=$(cat <<EOF
{
  "file_content": "$BASE64_CONTENT",
  "file_name": "sample-resume.txt",
  "content_type": "text/plain"
}
EOF
)

curl -X POST "$API_URL/upload-resume" \
  -H "Content-Type: application/json" \
  -d "$JSON_BASE64" \
  -v