#!/bin/bash

# Deploy SES to Management Account Script
# This script deploys SES configuration directly to the management account
# Skips development/production account creation and org-sso setup

set -e

echo "🚀 Deploying SES to Management Account"
echo "======================================"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get current account ID
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
echo "✅ Using AWS Account: $CURRENT_ACCOUNT"

# Update tfvars files with the current account ID
echo "📝 Updating tfvars files with account ID..."
sed -i.bak "s/YOUR_MANAGEMENT_ACCOUNT_ID/$CURRENT_ACCOUNT/" dev.tfvars
sed -i.bak "s/YOUR_MANAGEMENT_ACCOUNT_ID/$CURRENT_ACCOUNT/" prod.tfvars
echo "✅ Updated tfvars files with account ID: $CURRENT_ACCOUNT"

# Note: AWS credentials should be configured to allow assuming the AWS_PIPELINE_ROLE
echo "ℹ️  Note: Ensure your AWS credentials can assume the AWS_PIPELINE_ROLE in account $CURRENT_ACCOUNT"

# Navigate to site-infrastructure directory
cd infra/pipeline/site-infrastructure

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "❌ terraform.tfvars not found. Please create it with your configuration."
    echo "   You can copy from terraform.tfvars.example"
    exit 1
fi

# Function to deploy for environment
deploy_environment() {
    local env=$1
    echo ""
    echo "🏗️ Deploying SES for $env environment"
    echo "-----------------------------------"

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
    terraform plan -var-file="${env}.tfvars"

    # Ask for confirmation
    read -p "✅ Proceed with deployment for $env? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment for $env cancelled."
        return 1
    fi

    # Apply
    echo "🚀 Applying deployment for $env..."
    terraform apply -var-file="${env}.tfvars"

    echo "✅ $env deployment completed successfully!"
}

# Deploy dev environment
deploy_environment "dev"

# Deploy prod environment
deploy_environment "prod"

echo ""
echo "🎉 SES deployment to management account completed!"
echo "=================================================="
echo "Both dev and prod SES configurations have been deployed to the management account."
echo ""
echo "Next steps:"
echo "1. Verify SES domain verification in AWS Console"
echo "2. Check DNS records are properly configured"
echo "3. Test email sending functionality"
