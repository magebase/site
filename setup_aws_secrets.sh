#!/bin/bash

# Setup AWS SES secrets for Rails application
# Run this from the project root directory

echo "Setting up AWS SES secrets..."

# Navigate to site-infrastructure directory
cd infra/pipeline/site-infrastructure || exit 1

# Get the access keys from Terraform
ACCESS_KEY_ID=$(terraform output -raw ses_access_key_id)
SECRET_ACCESS_KEY=$(terraform output -raw ses_secret_access_key)

# Go back to project root
cd ../../.. || exit 1

# Create .env file if it doesn't exist
touch .env

# Add AWS credentials to .env file
{
  echo "AWS_SES_ACCESS_KEY_ID=$ACCESS_KEY_ID"
  echo "AWS_SES_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY"
  echo "AWS_REGION=us-east-1"
} >> .env

echo "✅ AWS SES secrets added to .env file"
echo "⚠️  Make sure .env is in .gitignore and never committed to version control"
