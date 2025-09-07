#!/bin/bash

# Script to generate base64 encoded secrets for Magebase Kubernetes deployment
# This script helps you create properly encoded secrets for the secrets.yaml file

set -e

echo "Magebase Secret Generator"
echo "========================"
echo ""
echo "This script will help you generate base64 encoded secrets for your Magebase deployment."
echo "You'll need to provide your actual secret values, and the script will output the"
echo "properly formatted base64 encoded values for the secrets.yaml file."
echo ""

# Function to generate base64 encoded secret
generate_secret() {
    local secret_name="$1"
    local prompt_text="$2"

    echo "Enter your $secret_name:"
    read -s secret_value
    echo ""

    if [ -z "$secret_value" ]; then
        echo "Warning: $secret_name is empty. This will cause the same base64 error."
        echo "Please provide a valid value."
        return 1
    fi

    local encoded_value=$(echo -n "$secret_value" | base64)
    echo "$secret_name (base64): $encoded_value"
    echo ""

    return 0
}

echo "Please provide the following secret values:"
echo ""

# Generate secrets
echo "# Copy these values to your k8s/base/secrets.yaml file"
echo "# Replace the data values in the Secret resources"
echo ""

generate_secret "SECRET_KEY_BASE" "Rails secret key base (used for session encryption)"
generate_secret "RUBY_LLM_API_KEY" "RubyLLM API key"
generate_secret "AWS_SES_ACCESS_KEY_ID" "AWS SES Access Key ID"
generate_secret "AWS_SES_SECRET_ACCESS_KEY" "AWS SES Secret Access Key"
generate_secret "AWS_S3_ACCESS_KEY_ID" "AWS S3 Access Key ID (for database backups)"
generate_secret "AWS_S3_SECRET_ACCESS_KEY" "AWS S3 Secret Access Key (for database backups)"

echo ""
echo "Next steps:"
echo "1. Copy the generated base64 values above"
echo "2. Edit k8s/base/secrets.yaml"
echo "3. Replace the placeholder values with your actual base64 encoded values"
echo "4. Commit and push the changes"
echo "5. ArgoCD should automatically sync the updated secrets"
echo ""
echo "Example secrets.yaml update:"
echo "data:"
echo "  secret-key-base: YOUR_BASE64_ENCODED_SECRET_KEY_BASE"
echo "  ruby-llm-api-key: YOUR_BASE64_ENCODED_RUBY_LLM_API_KEY"
echo "  ..."
