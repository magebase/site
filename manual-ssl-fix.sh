#!/bin/bash

# Manual SSL Fix for ArgoCD End-to-End Encryption
# This script can be run when kubectl is already configured and cluster is accessible

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DOMAIN="${1:-dev.magebase.dev}"

echo -e "${BLUE}🚀 Applying SSL fix for ArgoCD (End-to-End Encryption)${NC}"
echo -e "${BLUE}Domain: ${DOMAIN}${NC}"

# Check kubectl connection
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Cannot connect to Kubernetes cluster${NC}"
    echo -e "${YELLOW}Please ensure kubectl is configured to connect to your cluster${NC}"
    echo -e "${YELLOW}You can get the kubeconfig by running:${NC}"
    echo -e "${YELLOW}cd infra/pipeline/base-infrastructure && terraform output --raw kubeconfig > ~/.kube/config${NC}"
    exit 1
fi

# Apply the updated ArgoCD configuration
echo -e "${YELLOW}📋 Applying ArgoCD SSL fix configuration...${NC}"

# Create temporary kustomization directory with domain substitution
TEMP_DIR=$(mktemp -d)
cp -r k8s/argocd-ssl-fix/* "$TEMP_DIR/"

# Update the domain in the copied files
find "$TEMP_DIR" -name "*.yaml" -exec sed -i.bak "s/dev\.magebase\.dev/$DOMAIN/g" {} \;

# Remove backup files
find "$TEMP_DIR" -name "*.bak" -delete

# Apply the SSL fix configuration
echo -e "${YELLOW}🔧 Applying ArgoCD end-to-end encryption configuration...${NC}"
kubectl apply -k "$TEMP_DIR"

# Clean up
rm -rf "$TEMP_DIR"

echo -e "${GREEN}✅ ArgoCD configuration applied${NC}"

# Restart ArgoCD server to pick up new configuration
echo -e "${YELLOW}🔄 Restarting ArgoCD server...${NC}"
kubectl rollout restart deployment/argocd-server -n argocd
kubectl rollout status deployment/argocd-server -n argocd --timeout=300s

echo -e "${GREEN}✅ ArgoCD server restarted${NC}"

# Check certificate status
echo -e "${YELLOW}🔍 Checking certificate status...${NC}"
sleep 30  # Wait for restart to complete

if kubectl get certificate argocd-tls -n argocd &> /dev/null; then
    kubectl describe certificate argocd-tls -n argocd

    # Check if certificate is ready
    CERT_READY=$(kubectl get certificate argocd-tls -n argocd -o jsonpath='{.status.conditions[?(@.type=="Ready")].status}' 2>/dev/null || echo "False")

    if [[ "$CERT_READY" == "True" ]]; then
        echo -e "${GREEN}✅ Certificate is ready${NC}"
    else
        echo -e "${YELLOW}⏳ Certificate is still being issued, this may take a few minutes${NC}"
        echo -e "${YELLOW}You can monitor progress with: kubectl describe certificate argocd-tls -n argocd${NC}"
    fi
else
    echo -e "${RED}❌ Certificate not found${NC}"
fi

# Test connection
echo -e "${YELLOW}🔍 Testing SSL connection...${NC}"
ARGOCD_URL="https://argocd.$DOMAIN"

if timeout 10 curl -k -I "$ARGOCD_URL" &> /dev/null; then
    echo -e "${GREEN}✅ ArgoCD is accessible at $ARGOCD_URL${NC}"

    # Show certificate info
    echo -e "${YELLOW}🔍 Certificate information:${NC}"
    echo | timeout 10 openssl s_client -servername "argocd.$DOMAIN" -connect "argocd.$DOMAIN:443" 2>/dev/null | openssl x509 -noout -text | grep -E "(Subject:|Issuer:|Not Before|Not After)" || echo "Certificate details not available yet"
else
    echo -e "${YELLOW}⏳ ArgoCD not yet accessible (this is normal, certificates may still be propagating)${NC}"
fi

# Show next steps
echo -e "${GREEN}🎉 SSL fix deployment completed!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "${BLUE}1. Wait 2-5 minutes for certificate issuance${NC}"
echo -e "${BLUE}2. Check certificate status: kubectl describe certificate argocd-tls -n argocd${NC}"
echo -e "${BLUE}3. Access ArgoCD at: https://argocd.$DOMAIN${NC}"
echo -e "${BLUE}4. If still seeing certificate errors, check cert-manager logs: kubectl logs -n cert-manager -l app=cert-manager${NC}"

# Show relevant kubectl commands for debugging
echo -e "${YELLOW}🔧 Debugging commands:${NC}"
echo -e "${YELLOW}- Check ArgoCD pods: kubectl get pods -n argocd${NC}"
echo -e "${YELLOW}- Check ArgoCD logs: kubectl logs -l app.kubernetes.io/name=argocd-server -n argocd${NC}"
echo -e "${YELLOW}- Check ingress: kubectl get ingress argocd-server -n argocd -o yaml${NC}"
echo -e "${YELLOW}- Check service: kubectl get svc argocd-server -n argocd -o yaml${NC}"
echo -e "${YELLOW}- Check cert-manager: kubectl get pods -n cert-manager${NC}"
