# Cloudflare API Token Setup Instructions

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
