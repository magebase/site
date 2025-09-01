# Simplified AWS SES Deployment to Management Account

This guide explains how to deploy SES configuration directly to your AWS management account, skipping the separate development/production account creation and SSO setup.

## Overview

Instead of creating separate AWS accounts for dev/prod environments, this setup deploys SES directly to your management account for both environments. This simplifies the infrastructure while still providing environment-specific SES configurations.

## Prerequisites

- AWS CLI configured with access to your management account
- AWS_PIPELINE_ROLE exists in your management account with necessary permissions
- Your AWS credentials can assume the AWS_PIPELINE_ROLE
- Domain (magebase.dev) registered and accessible
- Terraform installed (v1.8.0+)

## Step 1: Create AWS_PIPELINE_ROLE

First, create the AWS_PIPELINE_ROLE in your management account:

```bash
./create-aws-pipeline-role.sh
```

This will create:
- AWS_PIPELINE_ROLE with necessary permissions
- IAM policy with SES, S3, DynamoDB, and Route53 permissions
- Trust relationship allowing your credentials to assume the role

## Step 2: Bootstrap Management Account

Create the necessary S3 bucket and DynamoDB table for Terraform state:

```bash
./bootstrap-management-account.sh
```

This will create:
- S3 bucket: `magebase-tf-state-management`
- DynamoDB table: `magebase-terraform-locks-management`

## Step 3: Configure Environment Variables

Update the `.tfvars` files with your actual values:

### dev.tfvars

```hcl
# Replace YOUR_MANAGEMENT_ACCOUNT_ID with your actual account ID
aws_ses_account_id = "123456789012"  # Your management account ID
```

### prod.tfvars

```hcl
# Replace YOUR_MANAGEMENT_ACCOUNT_ID with your actual account ID
aws_ses_account_id = "123456789012"  # Your management account ID
```

## Step 3: Set Environment Variables

Export the required environment variables. Note that AWS credentials are not needed directly - Terraform will assume the AWS_PIPELINE_ROLE:

```bash
export TF_VAR_hcloud_token="your-hetzner-token"
export TF_VAR_cloudflare_api_token="your-cloudflare-token"
export TF_VAR_hetzner_object_storage_access_key="your-hetzner-access-key"
export TF_VAR_hetzner_object_storage_secret_key="your-hetzner-secret-key"
```

## Step 4: Configure AWS Credentials

Ensure your AWS credentials can assume the AWS_PIPELINE_ROLE:

1. **Create AWS_PIPELINE_ROLE** in your management account (if it doesn't exist):

   ```bash
   # This role should have permissions to:
   # - Manage SES resources
   # - Manage Route53 records
   # - Access S3 buckets for Terraform state
   ```

2. **Configure AWS CLI** with credentials that can assume the role:

   ```bash
   aws configure
   # Enter your access key and secret key
   ```

3. **Test role assumption**:

   ```bash
   aws sts assume-role --role-arn arn:aws:iam::YOUR_ACCOUNT_ID:role/AWS_PIPELINE_ROLE --role-session-name test
   ```

## Step 5: Deploy SES

Run the deployment script:

```bash
./deploy-ses-to-management.sh
```

This will:

1. Deploy SES configuration for dev environment
2. Deploy SES configuration for prod environment
3. Create separate Terraform workspaces for each environment

## What Gets Deployed

### SES Configuration

- Domain identity verification for `magebase.dev`
- DKIM signing enabled
- Mail-from domain configuration
- DNS records for verification, DKIM, SPF, and MX

### IAM Resources

- SES Manager IAM role for each environment (assumed by AWS_PIPELINE_ROLE)
- IAM policy with SES permissions
- Trust relationship allowing AWS_PIPELINE_ROLE to assume the SES manager role

### DNS Records (via Cloudflare)

- SES verification TXT record
- DKIM CNAME records
- SPF TXT record
- MX record

## Environment Separation

Although both environments use the same AWS account, they are separated by:

1. **Terraform Workspaces**: Separate state for dev and prod
2. **Environment-specific IAM Roles**: `SESManagerRole-dev` and `SESManagerRole-prod`
3. **DNS Records**: Environment-specific subdomains if needed

## Verification

After deployment:

1. **Check AWS SES Console**:
   - Verify domain identity is verified
   - Check DKIM configuration
   - Review mail-from settings

2. **Check DNS Records**:
   - Verify TXT records are published
   - Confirm CNAME records for DKIM
   - Check MX record configuration

3. **Test Email Sending**:
   - Use the Rails test mailer: `ruby test_mailer.rb`
   - Or use the SES test script: `ruby test_ses.rb`

## Differences from Multi-Account Setup

| Aspect | Multi-Account Setup | Management Account Setup |
|--------|-------------------|-------------------------|
| Accounts | Separate dev/prod accounts | Single management account |
| SSO | Required for cross-account access | AWS_PIPELINE_ROLE for access |
| Cost | Higher (multiple accounts) | Lower (single account) |
| Complexity | Higher | Lower |
| Security | Better isolation | Role-based access control |
| Management | More complex | Simpler |

## Troubleshooting

### Common Issues

1. **Role Assumption Errors**:
   - Ensure AWS_PIPELINE_ROLE exists in the management account
   - Verify your credentials can assume the role
   - Check trust relationship on the AWS_PIPELINE_ROLE

2. **Domain Verification Pending**:
   - Check DNS propagation (can take up to 72 hours)
   - Verify TXT record is correctly published

3. **Terraform State Issues**:
   - Ensure S3 bucket and DynamoDB table exist
   - Check AWS credentials have necessary permissions

4. **IAM Permission Errors**:
   - Verify AWS_PIPELINE_ROLE has SES permissions
   - Check IAM role trust relationships

### Getting Account ID

If you need to find your AWS account ID:

```bash
aws sts get-caller-identity --query 'Account' --output text
```

## Next Steps

After SES is deployed:

1. Configure your Rails application with the SES settings
2. Set up email templates and mailers
3. Test email sending functionality
4. Monitor SES usage and limits in AWS Console
