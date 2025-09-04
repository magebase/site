#!/bin/bash

# SSL Fix Deployment Script for End-to-End Encryption
# This script deploys the updated ArgoCD configuration with proper end-to-end encryption

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT="${1:-dev}"
DOMAIN="${2:-dev.magebase.dev}"
KUBECONFIG_PATH="${3:-~/.kube/config}"

echo -e "${BLUE}🚀 Starting SSL Fix Deployment for End-to-End Encryption${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Domain: ${DOMAIN}${NC}"

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

    if ! command -v kubectl &> /dev/null; then
        echo -e "${RED}❌ kubectl is not installed${NC}"
        exit 1
    fi

    if ! command -v terraform &> /dev/null; then
        echo -e "${RED}❌ terraform is not installed${NC}"
        exit 1
    fi

    # Test kubectl connection
    if ! kubectl cluster-info &> /dev/null; then
        echo -e "${RED}❌ Cannot connect to Kubernetes cluster${NC}"
        echo -e "${YELLOW}Please ensure your kubeconfig is properly configured${NC}"
        exit 1
    fi

    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Deploy infrastructure updates
deploy_infrastructure() {
    echo -e "${YELLOW}🏗️ Deploying infrastructure updates...${NC}"

    cd infra/pipeline/base-infrastructure

    # Initialize and apply Terraform
    terraform init -upgrade \
        -backend-config="bucket=magebase-tf-state-management-ap-southeast-1" \
        -backend-config="key=magebase/base-infrastructure/${ENVIRONMENT}/terraform.tfstate"

    terraform apply -auto-approve \
        -var="environment=${ENVIRONMENT}"

    echo -e "${GREEN}✅ Infrastructure deployment completed${NC}"
}

# Wait for ArgoCD pods to be ready
wait_for_argocd() {
    echo -e "${YELLOW}⏳ Waiting for ArgoCD pods to be ready...${NC}"

    kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s
    kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-repo-server -n argocd --timeout=300s
    kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-application-controller -n argocd --timeout=300s

    echo -e "${GREEN}✅ ArgoCD pods are ready${NC}"
}

# Check certificate status
check_certificates() {
    echo -e "${YELLOW}🔒 Checking certificate status...${NC}"

    # Check if certificate exists and is ready
    if kubectl get certificate argocd-tls -n argocd &> /dev/null; then
        CERT_STATUS=$(kubectl get certificate argocd-tls -n argocd -o jsonpath='{.status.conditions[?(@.type=="Ready")].status}')
        if [[ "$CERT_STATUS" == "True" ]]; then
            echo -e "${GREEN}✅ ArgoCD certificate is ready${NC}"
        else
            echo -e "${YELLOW}⏳ ArgoCD certificate is not ready yet${NC}"
            kubectl describe certificate argocd-tls -n argocd
        fi
    else
        echo -e "${RED}❌ ArgoCD certificate not found${NC}"
    fi

    # Check cert-manager pods
    echo -e "${YELLOW}🔍 Checking cert-manager status...${NC}"
    kubectl get pods -n cert-manager

    # Check certificate requests
    echo -e "${YELLOW}🔍 Checking certificate requests...${NC}"
    kubectl get certificaterequests -n argocd
}

# Validate SSL connection
validate_ssl() {
    echo -e "${YELLOW}🔍 Validating SSL connection...${NC}"

    ARGOCD_URL="https://argocd.${DOMAIN}"

    # Wait a bit for DNS propagation
    sleep 30

    # Test SSL connection
    if curl -k -I "${ARGOCD_URL}" &> /dev/null; then
        echo -e "${GREEN}✅ ArgoCD is accessible at ${ARGOCD_URL}${NC}"

        # Check certificate details
        echo -e "${YELLOW}🔍 Certificate details:${NC}"
        echo | openssl s_client -servername "argocd.${DOMAIN}" -connect "argocd.${DOMAIN}:443" 2>/dev/null | openssl x509 -noout -text | grep -E "(Subject:|Issuer:|Not Before|Not After)"
    else
        echo -e "${RED}❌ ArgoCD is not accessible at ${ARGOCD_URL}${NC}"
        echo -e "${YELLOW}This might be normal if DNS hasn't propagated yet${NC}"
    fi
}

# Display debugging information
display_debug_info() {
    echo -e "${YELLOW}🔍 Debug Information:${NC}"

    echo -e "${BLUE}ArgoCD Server Logs (last 20 lines):${NC}"
    kubectl logs -l app.kubernetes.io/name=argocd-server -n argocd --tail=20 || true

    echo -e "${BLUE}ArgoCD Server Service:${NC}"
    kubectl get svc argocd-server -n argocd -o yaml || true

    echo -e "${BLUE}ArgoCD Ingress:${NC}"
    kubectl get ingress argocd-server -n argocd -o yaml || true

    echo -e "${BLUE}Certificate Status:${NC}"
    kubectl describe certificate argocd-tls -n argocd || true

    echo -e "${BLUE}ClusterIssuer Status:${NC}"
    kubectl describe clusterissuer letsencrypt-prod || true
}

# Main execution
main() {
    check_prerequisites
    deploy_infrastructure
    wait_for_argocd
    check_certificates
    validate_ssl

    echo -e "${GREEN}🎉 SSL Fix Deployment completed!${NC}"
    echo -e "${BLUE}ArgoCD should now be accessible at: https://argocd.${DOMAIN}${NC}"
    echo -e "${BLUE}If you still see certificate issues, please wait a few minutes for certificate propagation${NC}"

    # Offer to show debug info
    read -p "Do you want to see debug information? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        display_debug_info
    fi
}

# Run with error handling
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
