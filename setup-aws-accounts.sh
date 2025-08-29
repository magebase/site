#!/bin/bash

# AWS Account Creation and SSO Setup Script
# This script helps automate the process of creating AWS accounts and configuring SSO

set -e

echo "🚀 AWS Account Creation and SSO Setup"
echo "====================================="

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if we're in an organization
ORG_STATUS=$(aws organizations describe-organization --query 'Organization.Id' 2>/dev/null || echo "none")

if [ "$ORG_STATUS" = "none" ]; then
    echo "❌ No AWS Organization found. Please create an organization first."
    echo "   Go to https://console.aws.amazon.com/organizations/"
    exit 1
fi

echo "✅ AWS Organization found: $ORG_STATUS"

# Function to create accounts
create_accounts() {
    echo ""
    echo "📝 Step 1: Creating AWS Accounts"
    echo "--------------------------------"

    cd infra/organizations

    # Check if terraform.tfvars exists
    if [ ! -f "terraform.tfvars" ]; then
        echo "❌ terraform.tfvars not found. Please create it with your email addresses."
        exit 1
    fi

    # Initialize Terraform
    echo "🔧 Initializing Terraform..."
    terraform init

    # Plan
    echo "📋 Planning account creation..."
    terraform plan -var-file=terraform.tfvars

    # Ask for confirmation
    read -p "✅ Proceed with account creation? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Account creation cancelled."
        exit 1
    fi

    # Apply
    echo "🏗️ Creating AWS accounts..."
    terraform apply -var-file=terraform.tfvars

    # Get account IDs
    echo ""
    echo "📋 Getting Account IDs"
    echo "----------------------"
    DEV_ACCOUNT=$(terraform output -raw development_account_id)
    PROD_ACCOUNT=$(terraform output -raw production_account_id)

    echo "✅ Development Account ID: $DEV_ACCOUNT"
    echo "✅ Production Account ID: $PROD_ACCOUNT"

    cd ..
}

# Function to configure SSO
configure_sso() {
    echo ""
    echo "🔐 Step 2: Configuring AWS SSO"
    echo "------------------------------"

    cd infra/sso

    # Update terraform.tfvars with account IDs
    echo "📝 Updating SSO configuration with account IDs..."

    # Backup original file
    cp terraform.tfvars terraform.tfvars.backup

    # Update account IDs
    sed -i.bak "s/development_account_id = \"[^\"]*\"/development_account_id = \"$DEV_ACCOUNT\"/" terraform.tfvars
    sed -i.bak "s/production_account_id = \"[^\"]*\"/production_account_id = \"$PROD_ACCOUNT\"/" terraform.tfvars

    # Initialize Terraform
    echo "🔧 Initializing SSO Terraform..."
    terraform init

    # Plan
    echo "📋 Planning SSO configuration..."
    terraform plan -var-file=terraform.tfvars

    # Ask for confirmation
    read -p "✅ Proceed with SSO configuration? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ SSO configuration cancelled."
        # Restore backup
        mv terraform.tfvars.backup terraform.tfvars
        exit 1
    fi

    # Apply
    echo "🔐 Applying SSO configuration..."
    terraform apply -var-file=terraform.tfvars

    cd ..
}

# Main execution
echo ""
echo "Choose an option:"
echo "1. Create AWS accounts only"
echo "2. Configure SSO only (requires account IDs)"
echo "3. Create accounts AND configure SSO (full setup)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        create_accounts
        echo ""
        echo "✅ Account creation complete!"
        echo "📋 Note the account IDs above for SSO configuration."
        ;;
    2)
        echo "Please enter your development account ID:"
        read DEV_ACCOUNT
        echo "Please enter your production account ID:"
        read PROD_ACCOUNT
        configure_sso
        ;;
    3)
        create_accounts
        configure_sso
        echo ""
        echo "🎉 Full AWS account and SSO setup complete!"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "📚 Next Steps:"
echo "1. Create users in AWS SSO Console (https://console.aws.amazon.com/singlesignon/)"
echo "2. Add users to appropriate groups (InfrastructureTeam, DevelopmentTeam, etc.)"
echo "3. Test SSO access to development and production accounts"
echo ""
echo "🔗 Useful Links:"
echo "- AWS SSO Console: https://console.aws.amazon.com/singlesignon/"
echo "- AWS Organizations: https://console.aws.amazon.com/organizations/"
