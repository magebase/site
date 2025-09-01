#!/bin/bash

# Bootstrap Management Account for Terraform State
# This script creates the necessary S3 bucket and DynamoDB table for Terraform state management

set -e

echo "🚀 Bootstrapping Management Account for Terraform"
echo "================================================"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get current account ID
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
echo "✅ Using AWS Account: $CURRENT_ACCOUNT"

# Set variables
BUCKET_NAME="magebase-tf-state-management"
TABLE_NAME="magebase-terraform-locks-management"
REGION="ap-southeast-1"

echo "📦 Creating S3 bucket for Terraform state..."
echo "-------------------------------------------"

# Create S3 bucket
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb "s3://$BUCKET_NAME" --region $REGION
    echo "✅ Created S3 bucket: $BUCKET_NAME"
else
    echo "✅ S3 bucket already exists: $BUCKET_NAME"
fi

# Enable versioning on the bucket
aws s3api put-bucket-versioning \
    --bucket $BUCKET_NAME \
    --versioning-configuration Status=Enabled

echo "🔒 Creating DynamoDB table for Terraform locks..."
echo "-------------------------------------------------"

# Create DynamoDB table for state locking
if ! aws dynamodb describe-table --table-name $TABLE_NAME --region $REGION &>/dev/null; then
    aws dynamodb create-table \
        --table-name $TABLE_NAME \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region $REGION

    echo "✅ Created DynamoDB table: $TABLE_NAME"
else
    echo "✅ DynamoDB table already exists: $TABLE_NAME"
fi

echo ""
echo "🎉 Management account bootstrap completed!"
echo "=========================================="
echo "S3 Bucket: $BUCKET_NAME"
echo "DynamoDB Table: $TABLE_NAME"
echo "Region: $REGION"
echo ""
echo "You can now deploy SES infrastructure using the deployment script."
