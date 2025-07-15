#!/bin/bash

# Test Resume Analyzer API
API_URL="https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod"

echo "Testing Resume Analyzer API..."
echo "================================"

# Test 1: Upload resume
echo "1. Testing resume upload..."
curl -X POST "$API_URL/upload-resume" \
  -F "file=@test-files/sample-resume.txt" \
  -H "Content-Type: multipart/form-data" \
  -v

echo -e "\n\n"

# Test 2: Check if API key is required
echo "2. Testing without API key..."
curl -X POST "$API_URL/upload-resume" \
  -F "file=@test-files/sample-resume.txt" \
  -H "Content-Type: multipart/form-data" \
  -w "HTTP Status: %{http_code}\n"

echo -e "\n\n"

# Test 3: Check CORS headers
echo "3. Testing CORS headers..."
curl -X OPTIONS "$API_URL/upload-resume" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

echo -e "\n\n"

# Test 4: Test status endpoint (if resume ID is provided)
if [ ! -z "$1" ]; then
  echo "4. Testing status endpoint with ID: $1"
  curl -X GET "$API_URL/resume-status/$1" \
    -H "Content-Type: application/json" \
    -v
fi

echo "Test completed!"