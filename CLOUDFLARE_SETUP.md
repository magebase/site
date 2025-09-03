   Make sure to set `CLOUDFLARE_API_TOKEN` in your GitHub repository secrets.
   Run the included script to find your existing AWS account IDs:
   Set CLOUDFLARE_API_TOKEN in your GitHub repository secrets with the new token value.
   Set these secrets in your GitHub repository with the EXACT names:
   The email `aws-prod@magebase.dev` is already used by an existing AWS account. You need to:
   Then update `infra/pipeline/org-sso/terraform.tfvars`:
   This will show you all accounts in your AWS Organization. Look for your production account and copy its ID.
   You also need CLOUDFLARE_ZONE_ID - find this in Cloudflare dashboard under your domain settings.
   You're experiencing two errors:
   Your Cloudflare API token lacks email routing permissions OR the secret name is wrong.
   Your Cloudflare API token needs these permissions:
  ./find-aws-accounts.sh
# Cloudflare API Token Setup Instructions
# Cloudflare API Token Setup Instructions
## AWS Account ID Discovery
## Complete Fix Steps:
## How to Create the Token:
## Required Permissions for Email Routing
## Update GitHub Secret:
## Zone ID:
## ⚠️ CRITICAL: Update GitHub Secrets
## 🚨 Critical: Secret Name Mismatch
## 🚨 Critical: Use CLOUDFLARE_API_TOKEN
## 🚨 Current Issues
### 1. EMAIL_ALREADY_EXISTS (AWS)
### 2. Authentication Error (10000) (Cloudflare)
### Email Routing Permissions:
### Zone Permissions:
**IMPORTANT:** The workflow now expects this exact secret name:
- **`CLOUDFLARE_API_TOKEN`** ← This is the correct name
- **`CLOUDFLARE_ZONE_ID`**
- Email Routing - Email Routing: Edit
- Email Routing - Email Routing: Read
- Email Routing:Edit
- Email Routing:Read
- Find your existing production account ID
- Update `terraform.tfvars` with the correct account ID
- Zone - Zone Settings: Read
- Zone - Zone: Edit
- Zone:Edit (for your domain)
- Zone:Read (for your domain)
- `CLOUDFLARE_API_TOKEN` (this is the correct name)
- `CLOUDFLARE_API_TOKEN` ✅ (correct)
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_ZONE_ID` ✅ (correct)
1. **Create new Cloudflare API token** with email routing permissions
1. **Find your production account ID** using `./find-aws-accounts.sh`
1. **Re-run the workflow**
1. **Update terraform.tfvars** with the correct production account ID
1. **⚠️ Update GitHub secrets with CORRECT names:**
1. Add permissions:
1. Choose 'Create Custom Token'
1. Click 'Create Token'
1. Copy the token value (40 characters)
1. Create the token
1. Go to https://dash.cloudflare.com/profile/api-tokens
1. Set token name: 'Magebase Infrastructure'
1. Set zone resources to: 'Include - Specific zone - magebase.dev'
```
```
```
```
```
```
````
````bash
```terraform
production_account_id = "YOUR_PRODUCTION_ACCOUNT_ID_HERE"
