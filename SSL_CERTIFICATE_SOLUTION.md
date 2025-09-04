# SSL Certificate Solution for ArgoCD - Final Status

## ✅ FIXES COMPLETED

### Critical Issues Resolved

1. **Terraform Template Syntax** ✅ - Fixed shell escaping in cert-debug.yaml.tpl
2. **Kubernetes Resource Mapping** ✅ - Removed problematic traefik-middleware.yaml
3. **cert-manager ClusterIssuer** ✅ - Fixed DNS01 selector from dnsNames to dnsZones
4. **Ingress Configuration** ✅ - Added proper SSL termination annotations

### Infrastructure Status ✅ OPERATIONAL

- GitHub Actions deployments: All succeeding
- Kubernetes cluster: All pods running
- ArgoCD service: Responding to requests
- DNS resolution: Working (91.98.13.200)

## ⚠️ REMAINING ISSUE

**Certificate Issuance Blocked** - DNS challenges not being created

- Current cert: Still Traefik default
- DNS TXT records: None appearing
- Most likely cause: Cloudflare API token permissions

## 🚀 NEXT STEPS

1. **Verify Cloudflare API token** has DNS Edit permissions for magebase.dev
2. **Check cert-manager logs** (if cluster access available)
3. **Consider manual certificate reset** by deleting certificate resource

## Problem

Cloudflare's free plan only covers SSL certificates for root domains and first-level subdomains (e.g., `magebase.dev`, `www.magebase.dev`). Second-level subdomains like `argocd.dev.magebase.dev` are not covered, resulting in SSL/TLS errors.

## Solution

This implementation uses cert-manager with Let's Encrypt DNS01 challenge to obtain SSL certificates directly in Kubernetes, bypassing Cloudflare's SSL limitations.

## Changes Made

### 1. Updated Let's Encrypt ClusterIssuer

Modified `letsencrypt-issuer.yaml.tpl` to support both HTTP01 and DNS01 challenge types:

- HTTP01 for basic domains covered by Cloudflare
- DNS01 for subdomains not covered by Cloudflare free SSL

### 2. Created Cloudflare API Token Secret

Added `cloudflare-secret.yaml.tpl` to securely store the Cloudflare API token needed for DNS01 challenges.

### 3. Updated Kustomization

Modified `kustomization.yaml.tpl` to include the new secret and proper namespace handling.

### 4. Added Terraform Variables

Updated infrastructure configuration to include the Cloudflare API token variable.

## Setup Instructions

### Step 1: Create Cloudflare API Token

1. Log into your Cloudflare dashboard
2. Go to **User Profile** > **API Tokens** > **API Tokens**
3. Click **Create Token**
4. Set the following permissions:
   - **Zone - DNS - Edit** (allows cert-manager to create DNS records)
   - **Zone - Zone - Read** (allows cert-manager to list zones)
5. Set Zone Resources to **Include - All Zones** (or specify your specific zone)
6. Copy the generated API token

### Step 2: Set Environment Variables

Add the following environment variable to your deployment environment:

```bash
export CLOUDFLARE_API_TOKEN="your_cloudflare_api_token_here"
```

### Step 3: Configure DNS Record in Cloudflare

1. In your Cloudflare DNS settings, ensure the record for `argocd.dev.magebase.dev` exists
2. **IMPORTANT**: Set the record to **DNS only** (grey cloud icon), not **Proxied** (orange cloud)
3. This allows Kubernetes to handle SSL termination instead of Cloudflare

### Step 4: Deploy Infrastructure

Run your Terraform deployment as usual. The infrastructure will now:

1. Install cert-manager (already configured)
2. Create the Cloudflare API token secret
3. Configure DNS01 challenge for the subdomain
4. Automatically obtain and renew SSL certificates

## How It Works

1. **DNS01 Challenge**: When a certificate is requested, cert-manager creates a TXT record in Cloudflare DNS
2. **Let's Encrypt Validation**: Let's Encrypt verifies domain ownership by checking the TXT record
3. **Certificate Issuance**: Once validated, Let's Encrypt issues the certificate
4. **Automatic Renewal**: cert-manager automatically renews certificates before expiration

## Benefits

- ✅ No Cloudflare subscription required
- ✅ Supports unlimited subdomains at any level
- ✅ Automatic certificate renewal
- ✅ Free SSL certificates from Let's Encrypt
- ✅ No manual certificate management

## Verification

After deployment, you can verify the certificate:

```bash
# Check certificate status
kubectl get certificate argocd-tls -n argocd

# Check certificate details
kubectl describe certificate argocd-tls -n argocd

# Test SSL connection
curl -I https://argocd.dev.magebase.dev
```

## Troubleshooting

### Certificate Not Issued

1. Check if the Cloudflare API token has correct permissions
2. Verify the DNS record is set to "DNS only" (not proxied)
3. Check cert-manager logs: `kubectl logs -n cert-manager deployment/cert-manager`

### DNS01 Challenge Failures

1. Ensure the API token can access the correct zone
2. Check if the domain name in the certificate matches the DNS record
3. Verify cert-manager can reach Cloudflare API

### Common Errors

- `Actor requires permission to list zones`: API token needs Zone:Zone:Read permission
- `Cloudflare API error for POST "/zones/<id>/dns_records"`: Check API token permissions and zone access

## Security Notes

- The Cloudflare API token is stored as a Kubernetes secret
- Token has minimal required permissions (DNS edit only)
- Token can be revoked at any time from Cloudflare dashboard
- Consider using API tokens instead of global API keys for better security
