# AWS Organization & Infrastructure Setup Summary

## Overview

This setup creates a complete AWS organization structure with separate accounts for network, dev, qa, uat, and prod environments, along with SES setup for the magebase.dev domain.

## What Has Been Configured

### 1. AWS Organization Structure

- **Management Account**: Root account for organization management
- **Network Account**: Handles DNS, SES, and shared networking
- **Dev Account**: Development environment
- **QA Account**: Quality assurance environment
- **UAT Account**: User acceptance testing environment
- **Prod Account**: Production environment

### 2. Route 53 DNS Setup

- **Domain**: magebase.dev (managed in Route 53)
- **Subdomains**: dev.magebase.dev, qa.magebase.dev, uat.magebase.dev
- **DNS Records**: SES DKIM, MX, and SPF records configured
- **SSL**: Automatic HTTPS with ACM certificates

### 3. SES Email Configuration

- **Domain Identity**: magebase.dev verified with SES
- **DKIM**: Easy DKIM enabled for email authentication
- **MX Record**: Routes to AWS SES for email receiving
- **SPF**: Configured for email sender verification

### 4. Rails Application Updates

- **Routes**: Migrated from subdomain-based to path-based tenant routing
- **Controllers**: Updated to use `TenantPath` concern instead of `TenantSubdomain`
- **Helpers**: Created tenant path helpers for URL generation

## File Changes Made

### Terraform Configuration

```
terraform/
├── main.tf (AWS Organization, SES, Route 53 DNS)
├── variables.tf (Added management account ID)
├── environments/
│   ├── dev/terragrunt.hcl (Updated to dev.magebase.dev)
│   ├── qa/terragrunt.hcl (Updated to qa.magebase.dev)
│   ├── uat/terragrunt.hcl (Updated to uat.magebase.dev)
│   └── prod/terragrunt.hcl (Updated to magebase.dev)
├── setup.sh (Automated setup script)
└── README.md (Detailed setup guide)
```

### Rails Application

```
config/routes.rb (Updated for path-based routing)
app/controllers/concerns/tenant_subdomain.rb (Added TenantPath concern)
app/controllers/tenant/ (All controllers updated to use TenantPath)
migrate_to_path_routing.sh (Migration helper script)
```

## Setup Instructions

### Step 1: Purchase Domain

1. Register `magebase.dev` domain in Route 53
2. Ensure proper NS records are configured
3. Route 53 will automatically manage DNS for your domain

### Step 2: Configure Environment

```bash
cd terraform
cp .env.template .env
# Edit .env with your actual values
```

### Step 3: Run Setup Script

```bash
./setup.sh
```

### Step 4: Deploy Infrastructure

```bash
# Deploy network infrastructure first
cd environments/prod
terragrunt apply

# Then deploy other environments
cd ../dev
terragrunt apply
# ... repeat for qa and uat
```

### Step 5: Migrate Rails Application

```bash
./migrate_to_path_routing.sh
rails db:migrate
```

## URL Structure Changes

### Before (Subdomain-based)

- `tenant1.magebase.dev/dashboard`
- `tenant2.magebase.dev/billing`

### After (Path-based)

- `magebase.dev/tenant1/dashboard`
- `magebase.dev/tenant2/billing`
- `dev.magebase.dev/tenant1/dashboard` (dev environment)

## Environment URLs

- **Production**: `https://magebase.dev`
- **Development**: `https://dev.magebase.dev`
- **QA**: `https://qa.magebase.dev`
- **UAT**: `https://uat.magebase.dev`

## Tenant Access Examples

- **Tenant Dashboard**: `https://magebase.dev/your-tenant/dashboard`
- **Tenant Documents**: `https://magebase.dev/your-tenant/documents`
- **Tenant Billing**: `https://magebase.dev/your-tenant/billing`

## Key Benefits

1. **Simplified DNS**: No need for wildcard certificates or complex DNS setup
2. **Better SEO**: Search engines prefer path-based URLs
3. **Easier Caching**: CDN and browser caching work better with paths
4. **Environment Isolation**: Clear separation between dev/qa/uat/prod
5. **AWS Organization**: Better security and cost management

## Security Considerations

1. **Account Separation**: Each environment has its own AWS account
2. **IAM Roles**: Cross-account access through OrganizationAccountAccessRole
3. **DNS Security**: Route 53 provides DNS management and health checks
4. **Email Security**: SES provides SPF, DKIM, and DMARC support

## Monitoring & Maintenance

1. **AWS Organizations**: Monitor member accounts and costs
2. **Route 53 Health Checks**: Monitor DNS and application health
3. **SES Monitoring**: Track email sending and delivery metrics
4. **Rails Logs**: Monitor tenant access patterns

## Troubleshooting

### Common Issues

1. **DNS Propagation**: May take 24-48 hours after Route 53 configuration
2. **SES Verification**: Ensure all DNS records are correctly set
3. **Route53 Permissions**: Network account needs Route53 permissions
4. **Rails Routing**: Test path-based routes after migration

### Verification Commands

```bash
# Check AWS Organization
aws organizations list-accounts

# Check SES domain verification
aws ses get-identity-verification-attributes --identities magebase.dev

# Check Route 53 hosted zone
aws route53 list-hosted-zones --query 'HostedZones[?Name==`magebase.dev.`]'

# Test Rails routes
rails routes | grep tenant
```

## Next Steps

1. **Test Thoroughly**: Test all tenant functionality with path-based routing
2. **Update Documentation**: Update any external documentation or user guides
3. **Monitor Performance**: Monitor application performance with new routing
4. **Security Review**: Review security implications of path-based routing
5. **SEO Updates**: Update search engine submissions if necessary

## Support

If you encounter issues:

1. Check the Terraform README for detailed setup instructions
2. Review AWS documentation for service-specific guidance
3. Check Rails logs for routing errors
4. Verify DNS propagation with online tools

---

**Note**: This setup provides a solid foundation for multi-tenant SaaS applications with proper environment separation and modern routing patterns.
