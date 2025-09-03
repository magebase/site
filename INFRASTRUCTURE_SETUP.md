   If you encounter issues:
   This setup creates a complete AWS organization structure with separate accounts for network, dev, qa, uat, and prod environments, along with SES setup for the magebase.dev domain.
# ... repeat for qa and uat
# AWS Organization & Infrastructure Setup Summary
# Check AWS Organization
# Check Route 53 hosted zone
# Check SES domain verification
# Deploy network infrastructure first
# Edit .env with your actual values
# Test Rails routes
# Then deploy other environments
## Environment URLs
## File Changes Made
## Key Benefits
## Monitoring & Maintenance
## Next Steps
## Overview
## Security Considerations
## Setup Instructions
## Support
## Tenant Access Examples
## Troubleshooting
## URL Structure Changes
## What Has Been Configured
### 1. AWS Organization Structure
### 2. Route 53 DNS Setup
### 3. SES Email Configuration
### 4. Rails Application Updates
### After (Path-based)
### Before (Subdomain-based)
### Common Issues
### Rails Application
### Step 1: Purchase Domain
### Step 2: Configure Environment
### Step 3: Run Setup Script
### Step 4: Deploy Infrastructure
### Step 5: Migrate Rails Application
### Terraform Configuration
### Verification Commands
**Note**: This setup provides a solid foundation for multi-tenant SaaS applications with proper environment separation and modern routing patterns.
- **Controllers**: Updated to use `TenantPath` concern instead of `TenantSubdomain`
- **DKIM**: Easy DKIM enabled for email authentication
- **DNS Records**: SES DKIM, MX, and SPF records configured
- **Dev Account**: Development environment
- **Development**: `https://dev.magebase.dev`
- **Domain Identity**: magebase.dev verified with SES
- **Domain**: magebase.dev (managed in Route 53)
- **Helpers**: Created tenant path helpers for URL generation
- **MX Record**: Routes to AWS SES for email receiving
- **Management Account**: Root account for organization management
- **Network Account**: Handles DNS, SES, and shared networking
- **Prod Account**: Production environment
- **Production**: `https://magebase.dev`
- **QA Account**: Quality assurance environment
- **QA**: `https://qa.magebase.dev`
- **Routes**: Migrated from subdomain-based to path-based tenant routing
- **SPF**: Configured for email sender verification
- **SSL**: Automatic HTTPS with ACM certificates
- **Subdomains**: dev.magebase.dev, qa.magebase.dev, uat.magebase.dev
- **Tenant Billing**: `https://magebase.dev/your-tenant/billing`
- **Tenant Dashboard**: `https://magebase.dev/your-tenant/dashboard`
- **Tenant Documents**: `https://magebase.dev/your-tenant/documents`
- **UAT Account**: User acceptance testing environment
- **UAT**: `https://uat.magebase.dev`
- `dev.magebase.dev/tenant1/dashboard` (dev environment)
- `magebase.dev/tenant1/dashboard`
- `magebase.dev/tenant2/billing`
- `tenant1.magebase.dev/dashboard`
- `tenant2.magebase.dev/billing`
---
./migrate_to_path_routing.sh
./setup.sh
1. **AWS Organization**: Better security and cost management
1. **AWS Organizations**: Monitor member accounts and costs
1. **Account Separation**: Each environment has its own AWS account
1. **Better SEO**: Search engines prefer path-based URLs
1. **DNS Propagation**: May take 24-48 hours after Route 53 configuration
1. **DNS Security**: Route 53 provides DNS management and health checks
1. **Easier Caching**: CDN and browser caching work better with paths
1. **Email Security**: SES provides SPF, DKIM, and DMARC support
1. **Environment Isolation**: Clear separation between dev/qa/uat/prod
1. **IAM Roles**: Cross-account access through OrganizationAccountAccessRole
1. **Monitor Performance**: Monitor application performance with new routing
1. **Rails Logs**: Monitor tenant access patterns
1. **Rails Routing**: Test path-based routes after migration
1. **Route 53 Health Checks**: Monitor DNS and application health
1. **Route53 Permissions**: Network account needs Route53 permissions
1. **SEO Updates**: Update search engine submissions if necessary
1. **SES Monitoring**: Track email sending and delivery metrics
1. **SES Verification**: Ensure all DNS records are correctly set
1. **Security Review**: Review security implications of path-based routing
1. **Simplified DNS**: No need for wildcard certificates or complex DNS setup
1. **Test Thoroughly**: Test all tenant functionality with path-based routing
1. **Update Documentation**: Update any external documentation or user guides
1. Check Rails logs for routing errors
1. Check the Terraform README for detailed setup instructions
1. Ensure proper NS records are configured
1. Register `magebase.dev` domain in Route 53
1. Review AWS documentation for service-specific guidance
1. Route 53 will automatically manage DNS for your domain
1. Verify DNS propagation with online tools
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
app/controllers/concerns/tenant_subdomain.rb (Added TenantPath concern)
app/controllers/tenant/ (All controllers updated to use TenantPath)
aws organizations list-accounts
aws route53 list-hosted-zones --query 'HostedZones[?Name==`magebase.dev.`]'
aws ses get-identity-verification-attributes --identities magebase.dev
cd ../dev
cd environments/prod
cd terraform
config/routes.rb (Updated for path-based routing)
cp .env.template .env
migrate_to_path_routing.sh (Migration helper script)
rails db:migrate
rails routes | grep tenant
terraform/
terragrunt apply
terragrunt apply
│   └── prod/terragrunt.hcl (Updated to magebase.dev)
│   ├── dev/terragrunt.hcl (Updated to dev.magebase.dev)
│   ├── qa/terragrunt.hcl (Updated to qa.magebase.dev)
│   ├── uat/terragrunt.hcl (Updated to uat.magebase.dev)
└── README.md (Detailed setup guide)
├── environments/
├── main.tf (AWS Organization, SES, Route 53 DNS)
├── setup.sh (Automated setup script)
├── variables.tf (Added management account ID)
