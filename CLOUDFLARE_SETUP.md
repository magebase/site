# Cloudflare API Token Setup Instructions

## 🚨 Current Issues

You're experiencing two errors:

### 1. EMAIL_ALREADY_EXISTS (AWS)
The email `aws-prod@magebase.dev` is already used by an existing AWS account. You need to:
- Find your existing production account ID
- Update `terraform.tfvars` with the correct account ID

### 2. Authentication Error (10000) (Cloudflare)
Your Cloudflare API token lacks email routing permissions.

## Required Permissions for Email Routing

Your Cloudflare API token needs these permissions:

### Zone Permissions:
- Zone:Read (for your domain)
- Zone:Edit (for your domain)

### Email Routing Permissions:
- Email Routing:Edit
- Email Routing:Read

## How to Create the Token:

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click 'Create Token'
3. Choose 'Create Custom Token'
4. Set token name: 'Magebase Infrastructure'
5. Add permissions:
   - Zone - Zone Settings: Read
   - Zone - Zone: Edit
   - Email Routing - Email Routing: Edit
   - Email Routing - Email Routing: Read
6. Set zone resources to: 'Include - Specific zone - magebase.dev'
7. Create the token
8. Copy the token value (40 characters)

## Update GitHub Secret:

Set CLOUDFLARE_API_TOKEN in your GitHub repository secrets with the new token value.

## Zone ID:

You also need CLOUDFLARE_ZONE_ID - find this in Cloudflare dashboard under your domain settings.

## AWS Account ID Discovery

Run the included script to find your existing AWS account IDs:

```bash
./find-aws-accounts.sh
```

This will show you all accounts in your AWS Organization. Look for your production account and copy its ID.

Then update `infra/pipeline/org-sso/terraform.tfvars`:

```terraform
production_account_id = "YOUR_PRODUCTION_ACCOUNT_ID_HERE"
```

## Complete Fix Steps:

1. **Find your production account ID** using `./find-aws-accounts.sh`
2. **Update terraform.tfvars** with the correct production account ID
3. **Create new Cloudflare API token** with email routing permissions
4. **Update GitHub secrets:**
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ZONE_ID`
5. **Re-run the workflow**
