#!/bin/bash

UPLOAD_URL="https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod/upload-resume"
STATUS_URL="https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod/resume-status"

echo "Testing Final Resume Analyzer API..."
echo "===================================="

# Test 1: Upload resume with JSON
RESUME_CONTENT=$(cat test-files/sample-resume.txt | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')
JSON_PAYLOAD="{\"resume_text\": \"$RESUME_CONTENT\", \"file_name\": \"sample-resume.txt\"}"

echo "1. Testing resume upload..."
RESPONSE=$(curl -s -X POST "$UPLOAD_URL" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

echo "Upload Response:"
echo "$RESPONSE"
echo ""

# Extract resume_id if present
RESUME_ID=$(echo "$RESPONSE" | grep -o '"resume_id":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$RESUME_ID" ]; then
  echo "2. Testing status check with ID: $RESUME_ID"
  curl -s -X GET "$STATUS_URL/$RESUME_ID" \
    -H "Content-Type: application/json"
  echo ""
else
  echo "2. No resume_id found in response, testing with sample ID..."
  curl -s -X GET "$STATUS_URL/sample-id-123" \
    -H "Content-Type: application/json"
  echo ""
fi

echo "Test completed!"