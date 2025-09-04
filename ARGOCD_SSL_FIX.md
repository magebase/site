# ArgoCD SSL Certificate Fix for End-to-End Encryption

This document explains the SSL certificate issue with ArgoCD and provides the solution for implementing proper end-to-end encryption.

## Status

**LATEST UPDATE:** Fixed ClusterIssuer DNS01 configuration issues. Multiple fixes applied:

1. ✅ **Fixed Terraform template syntax** errors in cert-debug.yaml.tpl
2. ✅ **Removed non-existent middleware** reference causing deployment failures
3. ✅ **Fixed ClusterIssuer DNS01 selector** - changed from `dnsNames` to `dnsZones` (correct syntax)
4. ✅ **Simplified ClusterIssuer** - removed HTTP01 solver, focused on Cloudflare DNS zones
5. 🔄 **Monitoring certificate issuance** - DNS challenges should now work properly

**Current Status:** Waiting for Let's Encrypt certificate issuance (DNS01 challenge processing)

## Problem

ArgoCD was showing "Your connection is not private" error with `net::ERR_CERT_AUTHORITY_INVALID` because:

1. Traefik was using its default self-signed certificate (`CN=TRAEFIK DEFAULT CERT`)
2. The configuration was set up for SSL termination instead of end-to-end encryption
3. ArgoCD wasn't properly configured to handle its own SSL certificate

## Solution: End-to-End Encryption

The fix implements true end-to-end encryption where:

1. **ArgoCD** handles its own SSL certificate (Let's Encrypt via cert-manager)
2. **Traefik** passes through the encrypted traffic (TLS passthrough)
3. **No SSL termination** at the ingress level

## Architecture

```
Internet → Cloudflare → Traefik (TLS Passthrough) → ArgoCD (HTTPS with Let's Encrypt cert)
```

## Files Changed

### 1. Kustomization Template (`infra/pipeline/base-infrastructure/extra-manifests/kustomization.yaml.tpl`)

Updated patches for:
- **ArgoCD Deployment**: Added certificate volume mounts and environment variables
- **ArgoCD Service**: Changed to expose port 443 for HTTPS
- **ArgoCD Ingress**: Configured for TLS passthrough instead of termination

### 2. Kubernetes Manifests (`k8s/argocd-ssl-fix/`)

Created specific manifests for the SSL fix:
- `argocd-server-configmap.yaml`: Server configuration for end-to-end TLS
- `argocd-server-deployment-patch.yaml`: Certificate volume mounts and environment
- `argocd-server-service-patch.yaml`: HTTPS port configuration
- `argocd-ingress-patch.yaml`: TLS passthrough configuration

### 3. Deployment Scripts

- `deploy-ssl-fix-e2e.sh`: Full infrastructure deployment with SSL fix
- `manual-ssl-fix.sh`: Manual application of SSL fix when cluster is accessible

## Key Configuration Changes

### ArgoCD Server Environment Variables
```yaml
- name: ARGOCD_SERVER_INSECURE
  value: "false"                    # Enable TLS in ArgoCD
- name: ARGOCD_SERVER_CERT_FILE
  value: "/etc/tls/tls.crt"        # Certificate file path
- name: ARGOCD_SERVER_KEY_FILE
  value: "/etc/tls/tls.key"        # Private key file path
```

### Traefik Ingress Annotations
```yaml
annotations:
  # Enable TLS passthrough (no termination)
  traefik.ingress.kubernetes.io/router.tls.passthrough: "true"
  traefik.ingress.kubernetes.io/router.tls: "true"
  # Redirect HTTP to HTTPS
  traefik.ingress.kubernetes.io/redirect-scheme: https
```

### Service Configuration
```yaml
ports:
- name: server
  port: 443              # HTTPS port
  targetPort: 8080       # ArgoCD internal port
```

## Deployment Instructions

### Option 1: Full Infrastructure Deployment

If you have access to Terraform and AWS credentials:

```bash
./deploy-ssl-fix-e2e.sh dev dev.magebase.dev
```

### Option 2: Manual Application (Recommended)

If the Kubernetes cluster is already running and kubectl is configured:

```bash
# Get kubeconfig from Terraform (if needed)
cd infra/pipeline/base-infrastructure
terraform output --raw kubeconfig > ~/.kube/config

# Apply the SSL fix
./manual-ssl-fix.sh dev.magebase.dev
```

### Option 3: Direct kubectl Application

```bash
# Apply the SSL fix manifests directly
kubectl apply -k k8s/argocd-ssl-fix/
```

## Verification

### 1. Check Certificate Status
```bash
kubectl describe certificate argocd-tls -n argocd
```

### 2. Check ArgoCD Server
```bash
kubectl get pods -n argocd
kubectl logs -l app.kubernetes.io/name=argocd-server -n argocd
```

### 3. Test SSL Connection
```bash
curl -I https://argocd.dev.magebase.dev
openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443
```

### 4. Check Ingress Configuration
```bash
kubectl get ingress argocd-server -n argocd -o yaml
```

## Expected Results

After applying the fix:

1. ✅ ArgoCD accessible at `https://argocd.dev.magebase.dev`
2. ✅ Valid Let's Encrypt certificate (not Traefik default)
3. ✅ No certificate warnings in browser
4. ✅ End-to-end encryption from client to ArgoCD

## Troubleshooting

### Certificate Not Ready
If the certificate shows as "Not Ready":

```bash
# Check cert-manager logs
kubectl logs -n cert-manager -l app=cert-manager

# Check certificate request
kubectl get certificaterequests -n argocd

# Check ClusterIssuer
kubectl describe clusterissuer letsencrypt-prod
```

### ArgoCD Not Accessible
If ArgoCD is not accessible:

```bash
# Check ArgoCD server status
kubectl get deployment argocd-server -n argocd
kubectl describe deployment argocd-server -n argocd

# Check service
kubectl get svc argocd-server -n argocd

# Check ingress
kubectl describe ingress argocd-server -n argocd
```

### Traefik Issues
If Traefik is not routing correctly:

```bash
# Check Traefik logs
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik

# Check Traefik configuration
kubectl get ingressroute -A
```

## Technical Details

### End-to-End vs SSL Termination

**SSL Termination (Previous Setup):**
- Traefik terminates SSL and forwards HTTP to backend
- Certificate managed at ingress level
- Less secure, traffic unencrypted between ingress and service

**End-to-End Encryption (Current Setup):**
- ArgoCD handles its own SSL certificate
- Traefik passes through encrypted traffic
- More secure, traffic encrypted from client to service

### Certificate Management

- **cert-manager** issues Let's Encrypt certificates via DNS01 challenge
- **Cloudflare DNS** is used for domain validation
- **Certificate Secret** (`argocd-tls`) contains the certificate and private key
- **Volume Mount** makes the certificate available to ArgoCD server pod

## Next Steps

1. Monitor certificate renewal (Let's Encrypt certificates expire every 90 days)
2. Consider implementing similar end-to-end encryption for other services
3. Set up monitoring for certificate expiration alerts
4. Document the same pattern for other applications requiring end-to-end TLS
