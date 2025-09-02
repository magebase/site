#!/bin/bash

# Deploy SES Infrastructure Script
# This script deploys SES infrastructure using the management account OIDC role
# Creates dedicated AWS IAM users for each environment in the management account

set -e

echo "🚀 Deploying SES Infrastructure to Management Account"
echo "===================================================="

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get current account ID
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
echo "✅ Using AWS Account: $CURRENT_ACCOUNT"

# Note: This script now uses the management account directly
# The management account ID should be set in the tfvars files
echo "ℹ️  Note: Ensure your tfvars files have the correct management_account_id set"
echo "ℹ️  The workflow will use OIDC to assume the management account role"

# Function to deploy for environment
deploy_environment() {
    local env=$1
    echo ""
    echo "🏗️ Deploying SES infrastructure for $env environment"
    echo "--------------------------------------------------"

    # Initialize Terraform
    echo "🔧 Initializing Terraform..."
    terraform init -reconfigure

    # Select workspace
    if terraform workspace list | grep -q "^[* ]*$env$"; then
        terraform workspace select $env
    else
        terraform workspace new $env
    fi

    # Plan
    echo "📋 Planning deployment for $env..."
    terraform plan \
        -var="management_account_id=$CURRENT_ACCOUNT" \
        -var-file="${env}.tfvars"

    # Ask for confirmation
    read -p "✅ Proceed with deployment for $env? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment for $env cancelled."
        return 1
    fi

    # Apply
    echo "🚀 Applying deployment for $env..."
    terraform apply \
        -var="management_account_id=$CURRENT_ACCOUNT" \
        -var-file="${env}.tfvars"

    echo "✅ $env deployment completed successfully!"

    # Display SES user information
    echo ""
    echo "🔑 SES User Information for $env:"
    echo "----------------------------------"

    SES_USER_NAME=$(terraform output -raw ses_user_name 2>/dev/null || echo "Not available")
    SES_ACCESS_KEY_ID=$(terraform output -raw ses_access_key_id 2>/dev/null || echo "Not available")

    echo "SES User Name: $SES_USER_NAME"
    echo "SES Access Key ID: $SES_ACCESS_KEY_ID"
    echo "SES Secret Access Key: ***masked*** (available in Terraform outputs)"
    echo ""
    echo "⚠️  IMPORTANT: Store these credentials securely!"
    echo "   The secret access key is only shown once in Terraform outputs."
    echo "   Save it in a secure location like GitHub Secrets or AWS Secrets Manager."
}

# Deploy environments
echo "Select environment to deploy:"
echo "1) dev"
echo "2) qa"
echo "3) uat"
echo "4) prod"
echo "5) all environments"
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        deploy_environment "dev"
        ;;
    2)
        deploy_environment "qa"
        ;;
    3)
        deploy_environment "uat"
        ;;
    4)
        deploy_environment "prod"
        ;;
    5)
        deploy_environment "dev"
        deploy_environment "qa"
        deploy_environment "uat"
        deploy_environment "prod"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "🎉 SES infrastructure deployment completed!"
echo "==========================================="
echo "Next steps:"
echo "1. Verify SES domain verification in AWS Console"
echo "2. Check DNS records are properly configured"
echo "3. Store SES credentials securely in your deployment environment"
echo "4. Test email sending functionality"
echo ""
echo "Note: This script now creates dedicated AWS IAM users for each environment"
echo "in the management account using OIDC role assumption."
