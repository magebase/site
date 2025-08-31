#!/bin/bash

# Test Clo# Test basic API call
echo "Testing Cloudflare API connectivity..."
RESPONSE=$(curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.cloudflare.com/client/v4/user/tokens/verify")re API Token
echo "Testing Cloudflare API token..."

# Check if token is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN environment variable is not set"
    echo "Make sure to set it in your GitHub repository secrets"
    exit 1
fi

echo "✅ CLOUDFLARE_API_TOKEN is set"

# Test token format (should be 40 characters)
TOKEN_LENGTH=${#CLOUDFLARE_API_TOKEN}
if [ "$TOKEN_LENGTH" -ne 40 ]; then
    echo "❌ CLOUDFLARE_API_TOKEN should be 40 characters, got $TOKEN_LENGTH"
    exit 1
fi

echo "✅ CLOUDFLARE_API_TOKEN is correct length"

# Test basic API call
echo "Testing Cloudflare API connectivity..."
RESPONSE=$(curl -s -H "Authorization: Bearer $CLOUDFLARE_API_KEY" \
    -H "Content-Type: application/json" \
    "https://api.cloudflare.com/client/v4/user/tokens/verify"\)

if echo "$RESPONSE" | grep -q "success.*true"; then
    echo "✅ Cloudflare API token is valid"
else
    echo "❌ Cloudflare API token is invalid"
    echo "Response: $RESPONSE"
    exit 1
fi

echo "🎉 Cloudflare API token test passed!"
