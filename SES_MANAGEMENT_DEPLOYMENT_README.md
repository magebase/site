   After SES is deployed:
   After deployment:
   Although both environments use the same AWS account, they are separated by:
   Create the necessary S3 bucket and DynamoDB table for Terraform state:
   Ensure your AWS credentials can assume the AWS_PIPELINE_ROLE:
   Export the required environment variables. Note that AWS credentials are not needed directly - Terraform will assume the AWS_PIPELINE_ROLE:
   First, create the AWS_PIPELINE_ROLE in your management account:
   If you need to find your AWS account ID:
   Instead of creating separate AWS accounts for dev/prod environments, this setup deploys SES directly to your management account for both environments. This simplifies the infrastructure while still providing environment-specific SES configurations.
   Run the deployment script:
   This guide explains how to deploy SES configuration directly to your AWS management account, skipping the separate development/production account creation and SSO setup.
   This will create:
   This will create:
   This will:
   Update the `.tfvars` files with your actual values:
  ./bootstrap-management-account.sh
  ./create-aws-pipeline-role.sh
  ./deploy-ses-to-management.sh
# - Access S3 buckets for Terraform state
# - Manage Route53 records
# - Manage SES resources
# Enter your access key and secret key
# Replace YOUR_MANAGEMENT_ACCOUNT_ID with your actual account ID
# Replace YOUR_MANAGEMENT_ACCOUNT_ID with your actual account ID
# Simplified AWS SES Deployment to Management Account
# This role should have permissions to:
## Differences from Multi-Account Setup
## Environment Separation
## Next Steps
## Overview
## Prerequisites
## Step 1: Create AWS_PIPELINE_ROLE
## Step 2: Bootstrap Management Account
## Step 3: Configure Environment Variables
## Step 3: Set Environment Variables
## Step 4: Configure AWS Credentials
## Step 5: Deploy SES
## Troubleshooting
## Verification
## What Gets Deployed
### Common Issues
### DNS Records (via Cloudflare)
### Getting Account ID
### IAM Resources
### SES Configuration
### dev.tfvars
### prod.tfvars
- AWS CLI configured with access to your management account
- AWS_PIPELINE_ROLE exists in your management account with necessary permissions
- AWS_PIPELINE_ROLE with necessary permissions
- Check AWS credentials have necessary permissions
- Check DKIM configuration
- Check DNS propagation (can take up to 72 hours)
- Check IAM role trust relationships
- Check MX record configuration
- Check trust relationship on the AWS_PIPELINE_ROLE
- Confirm CNAME records for DKIM
- DKIM CNAME records
- DKIM signing enabled
- DNS records for verification, DKIM, SPF, and MX
- Domain (magebase.dev) registered and accessible
- Domain identity verification for `magebase.dev`
- DynamoDB table: `magebase-terraform-locks-management`
- Ensure AWS_PIPELINE_ROLE exists in the management account
- Ensure S3 bucket and DynamoDB table exist
- IAM policy with SES permissions
- IAM policy with SES, S3, DynamoDB, and Route53 permissions
- MX record
- Mail-from domain configuration
- Or use the SES test script: `ruby test_ses.rb`
- Review mail-from settings
- S3 bucket: `magebase-tf-state-management-ap-southeast-1`
- SES Manager IAM role for each environment (assumed by AWS_PIPELINE_ROLE)
- SES verification TXT record
- SPF TXT record
- Terraform installed (v1.8.0+)
- Trust relationship allowing AWS_PIPELINE_ROLE to assume the SES manager role
- Trust relationship allowing your credentials to assume the role
- Use the Rails test mailer: `ruby test_mailer.rb`
- Verify AWS_PIPELINE_ROLE has SES permissions
- Verify TXT record is correctly published
- Verify TXT records are published
- Verify domain identity is verified
- Verify your credentials can assume the role
- Your AWS credentials can assume the AWS_PIPELINE_ROLE
1. **Check AWS SES Console**:
1. **Check DNS Records**:
1. **Configure AWS CLI** with credentials that can assume the role:
1. **Create AWS_PIPELINE_ROLE** in your management account (if it doesn't exist):
1. **DNS Records**: Environment-specific subdomains if needed
1. **Domain Verification Pending**:
1. **Environment-specific IAM Roles**: `SESManagerRole-dev` and `SESManagerRole-prod`
1. **IAM Permission Errors**:
1. **Role Assumption Errors**:
1. **Terraform State Issues**:
1. **Terraform Workspaces**: Separate state for dev and prod
1. **Test Email Sending**:
1. **Test role assumption**:
1. Configure your Rails application with the SES settings
1. Create separate Terraform workspaces for each environment
1. Deploy SES configuration for dev environment
1. Deploy SES configuration for prod environment
1. Monitor SES usage and limits in AWS Console
1. Set up email templates and mailers
1. Test email sending functionality
```
```
```
```
```
```
```
```
```
```
```
```
```
```
`````
`````
````bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```hcl
```hcl
aws configure
aws sts assume-role --role-arn arn:aws:iam::YOUR_ACCOUNT_ID:role/AWS_PIPELINE_ROLE --role-session-name test
aws sts get-caller-identity --query 'Account' --output text
aws_ses_account_id = "123456789012"  # Your management account ID
aws_ses_account_id = "123456789012"  # Your management account ID
export TF_VAR_cloudflare_api_token="your-cloudflare-token"
export TF_VAR_hcloud_token="your-hetzner-token"
export TF_VAR_hetzner_object_storage_access_key="your-hetzner-access-key"
export TF_VAR_hetzner_object_storage_secret_key="your-hetzner-secret-key"
| ---------- | --------------------------------- | ---------------------------- |
| Accounts   | Separate dev/prod accounts        | Single management account    |
| Aspect     | Multi-Account Setup               | Management Account Setup     |
| Complexity | Higher                            | Lower                        |
| Cost       | Higher (multiple accounts)        | Lower (single account)       |
| Management | More complex                      | Simpler                      |
| SSO        | Required for cross-account access | AWS_PIPELINE_ROLE for access |
| Security   | Better isolation                  | Role-based access control    |
