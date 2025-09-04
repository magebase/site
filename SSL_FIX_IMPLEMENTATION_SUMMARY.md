# ArgoCD SSL Certificate Fix - Implementation Summary

## Problem

ArgoCD was showing "Your connection is not private" error with `net::ERR_CERT_AUTHORITY_INVALID` because it was using Traefik's default self-signed certificate instead of a proper Let's Encrypt certificate.

## Root Cause Analysis

```bash
# Current certificate status (before fix):
echo | openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer
# Output: subject=CN=TRAEFIK DEFAULT CERT, issuer=CN=TRAEFIK DEFAULT CERT
```

The issue was caused by:

1. **Incorrect cert-manager ClusterIssuer configuration** - DNS01 challenge selector was wrong
2. **Missing end-to-end encryption configuration** - ArgoCD ingress was connecting to HTTP port 80 instead of HTTPS port 443
3. **Missing Traefik backend protocol annotation** - Traefik didn't know to use HTTPS for backend communication

## Solution Implemented

### ✅ Fixed Files

#### 1. `infra/pipeline/base-infrastructure/extra-manifests/letsencrypt-issuer.yaml.tpl`

```yaml
# FIXED: Corrected Cloudflare DNS01 challenge configuration
spec:
  acme:
    solvers:
      - dns01:
          cloudflare:
            apiTokenSecretRef:
              name: cloudflare-api-token-secret
              key: api-token
        # FIXED: Removed incorrect selector - DNS01 challenges don't use selectors
```

#### 2. `infra/pipeline/base-infrastructure/extra-manifests/kustomization.yaml.tpl`

```yaml
# FIXED: End-to-end encryption configuration
patches:
  - patch: |-
      # Keep ArgoCD TLS enabled (not insecure mode)
      - op: replace
        path: /spec/template/spec/containers/0/env
        value:
          - name: ARGOCD_SERVER_INSECURE
            value: "false"  # Keep TLS enabled for end-to-end encryption

  - patch: |-
      # Configure ingress for HTTPS backend
      annotations:
        # FIXED: Tell Traefik to use HTTPS for backend communication
        traefik.ingress.kubernetes.io/service.serversscheme: https
      spec:
        rules:
          - host: argocd.${DOMAIN}
            http:
              paths:
                - path: /
                  pathType: Prefix
                  backend:
                    service:
                      name: argocd-server
                      port:
                        number: 443  # FIXED: Connect to HTTPS port instead of 80
```

#### 3. Added New Resources

- **cert-debug.yaml.tpl** - Certificate debugging and monitoring
- **traefik-middleware.yaml.tpl** - Proper SSL middleware configuration

### ✅ Deployment Status

**Committed and pushed at:** `commit 4af3110`
**GitHub Actions trigger:** Automatically triggered by push to `infra/**` paths
**Expected deployment time:** 10-15 minutes total

## Verification Commands

### Current Status Check

```bash
# Check certificate (should show Let's Encrypt after deployment)
echo | openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer

# Check HTTP response
curl -I https://argocd.dev.magebase.dev
```

### With Cluster Access (if available)

```bash
# Check certificate status
kubectl get certificates -n argocd
kubectl describe certificate argocd-tls -n argocd

# Check cert-manager logs
kubectl logs -n cert-manager -l app=cert-manager

# Check ACME challenges
kubectl get challenges -n argocd
```

## Expected Timeline

1. **GitHub Actions Deployment** (5-10 min)

   - Terraform apply with new configuration
   - Kubernetes manifests updated
   - cert-manager configuration applied

2. **Certificate Issuance** (2-5 min)

   - cert-manager creates CertificateRequest
   - ACME challenge via Cloudflare DNS01
   - Let's Encrypt issues certificate

3. **DNS/Service Propagation** (1-2 min)
   - Certificate mounted to ArgoCD pods
   - Traefik routes updated
   - Service ready

## Success Criteria

### ✅ When Fixed, You Should See:

```bash
# Certificate check should show:
subject=CN=argocd.dev.magebase.dev
issuer=CN=Let's Encrypt Authority X3

# HTTP response should be:
HTTP/2 200 OK
# or HTTP/2 302 Found (redirect to login)
```

### ✅ Browser Should Show:

- 🔒 Secure connection indicator
- Valid Let's Encrypt certificate
- No security warnings
- ArgoCD login page loads properly

## Monitoring

Use the provided monitoring script:

```bash
./monitor-ssl-status.sh
```

This will check every 30 seconds for up to 15 minutes and report when the certificate is successfully updated.

## Architecture Changes

### Before (Problematic)

```
Internet → Cloudflare → Traefik (with default cert) → ArgoCD HTTP:80
```

### After (Fixed)

```
Internet → Cloudflare → Traefik (Let's Encrypt cert) → ArgoCD HTTPS:443
```

**Key improvements:**

1. **End-to-end encryption** - TLS from client to ArgoCD server
2. **Proper certificate management** - Let's Encrypt via cert-manager
3. **Correct backend protocol** - Traefik knows to use HTTPS for backend

## Technical Details

### DNS01 Challenge Flow

1. cert-manager requests certificate from Let's Encrypt
2. Let's Encrypt provides DNS01 challenge
3. cert-manager creates DNS TXT record via Cloudflare API
4. Let's Encrypt verifies DNS record
5. Certificate issued and stored in Kubernetes Secret
6. ArgoCD pods mount the certificate
7. Traefik routes traffic to HTTPS backend

### End-to-End Encryption

- **Client ↔ Traefik:** Let's Encrypt certificate (public CA)
- **Traefik ↔ ArgoCD:** Same certificate (end-to-end)
- **Result:** Full chain validation, no security warnings

---

## Troubleshooting

If certificate is not updated after 15 minutes:

1. **Check GitHub Actions:** https://github.com/magebase/site/actions
2. **Verify Cloudflare API token** has DNS edit permissions
3. **Check cert-manager is running** in the cluster
4. **Verify DNS propagation** for TXT records

The implementation is comprehensive and addresses all the root causes identified. The deployment should resolve the SSL certificate issue completely.
