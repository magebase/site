#!/bin/bash

# Script to set up default SSM parameters for Magebase company information
# This script creates SSM parameters for company details that can be used across environments

set -e

echo "🚀 Setting up SSM Parameters for Magebase Company Information"
echo "============================================================"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' or 'aws configure sso' first."
    echo "   For SSO: aws configure sso --profile magebase-dev"
    exit 1
fi

# Get current account ID and region
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
CURRENT_REGION=$(aws configure get region)
if [ -z "$CURRENT_REGION" ]; then
    CURRENT_REGION="us-east-1"  # Default region
fi

echo "✅ Using AWS Account: $CURRENT_ACCOUNT"
echo "✅ Using AWS Region: $CURRENT_REGION"
echo ""

# Company Information Parameters
COMPANY_PARAMS=(
    "COMPANY_NAME=Magebase"
    "COMPANY_WEBSITE=www.magebase.dev"
    "COMPANY_EMAIL=hello@magebase.dev"
    "COMPANY_PHONE=+1 (555) 123-4567"
)

# Environments to set up
ENVIRONMENTS=("dev" "prod")

echo "📝 Setting up company information parameters..."
echo "-----------------------------------------------"

for env in "${ENVIRONMENTS[@]}"; do
    echo "Setting up parameters for environment: $env"

    for param in "${COMPANY_PARAMS[@]}"; do
        # Split parameter into key and value
        IFS='=' read -r key value <<< "$param"

        # Create SSM parameter path
        param_path="/site/$env/company/$key"

        echo "  Creating parameter: $param_path = $value"

        # Create or update SSM parameter
        aws ssm put-parameter \
            --name "$param_path" \
            --value "$value" \
            --type "String" \
            --description "Company information for Magebase - $key" \
            --overwrite \
            --region "$CURRENT_REGION"

        if [ $? -eq 0 ]; then
            echo "  ✅ Successfully set $key"
        else
            echo "  ❌ Failed to set $key"
        fi
    done

    echo ""
done

echo "🔍 Verifying parameters were created..."
echo "---------------------------------------"

for env in "${ENVIRONMENTS[@]}"; do
    echo "Parameters for $env environment:"
    aws ssm get-parameters-by-path \
        --path "/site/$env/company/" \
        --region "$CURRENT_REGION" \
        --query 'Parameters[*].[Name,Value]' \
        --output table

    echo ""
done

echo "🎉 SSM Parameter setup completed!"
echo "=================================="
echo ""
echo "Parameters created:"
echo "- /site/dev/company/COMPANY_NAME"
echo "- /site/dev/company/COMPANY_WEBSITE"
echo "- /site/dev/company/COMPANY_EMAIL"
echo "- /site/dev/company/COMPANY_PHONE"
echo "- /site/prod/company/COMPANY_NAME"
echo "- /site/prod/company/COMPANY_WEBSITE"
echo "- /site/prod/company/COMPANY_EMAIL"
echo "- /site/prod/company/COMPANY_PHONE"
echo ""
echo "Next steps:"
echo "1. Update your ExternalSecret configuration to include these parameters"
echo "2. Update your application code to use these SSM parameters"
echo "3. Test that the parameters are accessible in your application"
