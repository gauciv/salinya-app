#!/bin/bash

API_URL="https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod"

echo "Testing with CORRECT format..."
echo "=============================="

# Convert resume to base64
BASE64_CONTENT=$(base64 -w 0 test-files/sample-resume.txt)

# Create correct JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "file_content_base64": "$BASE64_CONTENT",
  "file_name": "sample-resume.txt",
  "content_type": "text/plain"
}
EOF
)

echo "Testing upload with base64 content..."
curl -X POST "$API_URL/upload-resume" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  -v