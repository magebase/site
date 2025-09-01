#!/bin/bash

# Create AWS_PIPELINE_ROLE in Management Account
# This script creates the AWS_PIPELINE_ROLE with necessary permissions for Terraform deployments

set -e

echo "🚀 Creating AWS_PIPELINE_ROLE in Management Account"
echo "=================================================="

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get current account ID
CURRENT_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
echo "✅ Using AWS Account: $CURRENT_ACCOUNT"

ROLE_NAME="AWS_PIPELINE_ROLE"
POLICY_NAME="AWSPipelineRolePolicy"

echo "🔍 Checking if AWS_PIPELINE_ROLE exists..."

# Check if role already exists
if aws iam get-role --role-name $ROLE_NAME &>/dev/null; then
    echo "✅ AWS_PIPELINE_ROLE already exists."
    echo "ℹ️  You can update its permissions if needed."
    exit 0
fi

echo "📝 Creating AWS_PIPELINE_ROLE..."

# Create the trust policy
TRUST_POLICY=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${CURRENT_ACCOUNT}:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
)

# Create the role
aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document "$TRUST_POLICY" \
    --description "Role for CI/CD pipelines to deploy infrastructure"

echo "✅ Created role: $ROLE_NAME"

# Create the policy document
POLICY_DOCUMENT=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::magebase-tf-state-*",
        "arn:aws:s3:::magebase-tf-state-*/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:*"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/magebase-terraform-locks-*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ses:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:PassRole"
      ],
      "Resource": "arn:aws:iam::${CURRENT_ACCOUNT}:role/SESManagerRole-*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
EOF
)

# Create the policy
aws iam create-policy \
    --policy-name $POLICY_NAME \
    --policy-document "$POLICY_DOCUMENT" \
    --description "Policy for AWS Pipeline Role with SES and infrastructure permissions"

echo "✅ Created policy: $POLICY_NAME"

# Attach the policy to the role
POLICY_ARN="arn:aws:iam::${CURRENT_ACCOUNT}:policy/${POLICY_NAME}"
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn $POLICY_ARN

echo "✅ Attached policy to role"

echo ""
echo "🎉 AWS_PIPELINE_ROLE setup completed!"
echo "====================================="
echo "Role ARN: arn:aws:iam::${CURRENT_ACCOUNT}:role/${ROLE_NAME}"
echo ""
echo "Next steps:"
echo "1. Ensure your AWS credentials can assume this role"
echo "2. Test role assumption: aws sts assume-role --role-arn arn:aws:iam::${CURRENT_ACCOUNT}:role/${ROLE_NAME} --role-session-name test"
echo "3. Run the bootstrap script: ./bootstrap-management-account.sh"
echo "4. Deploy SES: ./deploy-ses-to-management.sh"
