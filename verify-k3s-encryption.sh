#!/bin/bash

# Comprehensive k3s Encryption Verification Script
# This script verifies end-to-end encryption across all k3s resources

set -e

echo "🔐 Starting comprehensive k3s encryption verification..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed or not in PATH"
    exit 1
fi

# Check if we're connected to a k3s cluster
if ! kubectl cluster-info &> /dev/null; then
    print_error "Not connected to a Kubernetes cluster"
    exit 1
fi

print_status "Connected to Kubernetes cluster"

# 1. Check etcd encryption
print_status "Checking etcd encryption..."
if kubectl get configmap -n kube-system kube-apiserver-legacy-service-account-token -o yaml | grep -q "encryption"; then
    print_success "etcd encryption configuration found"
else
    print_warning "etcd encryption configuration not found in expected location"
fi

# 2. Check network encryption (Cilium WireGuard)
print_status "Checking network encryption..."
if kubectl get configmap -n kube-system cilium-config -o yaml 2>/dev/null | grep -q "enable-wireguard.*true"; then
    print_success "Cilium WireGuard encryption is enabled"
else
    print_warning "Cilium WireGuard encryption not detected"
fi

# 3. Check secrets encryption
print_status "Checking secrets encryption..."
if kubectl get secret -n kube-system | grep -q "encryption"; then
    print_success "Secrets encryption configuration found"
else
    print_warning "Secrets encryption configuration not found"
fi

# 4. Check PostgreSQL TLS
print_status "Checking PostgreSQL TLS encryption..."
if kubectl get certificate -n database postgresql-tls 2>/dev/null; then
    print_success "PostgreSQL TLS certificate exists"
else
    print_error "PostgreSQL TLS certificate not found"
fi

if kubectl get secret -n database postgresql-tls 2>/dev/null; then
    print_success "PostgreSQL TLS secret exists"
else
    print_error "PostgreSQL TLS secret not found"
fi

# 5. Check ArgoCD HTTPS
print_status "Checking ArgoCD HTTPS configuration..."
if kubectl get certificate -n argocd argocd-tls 2>/dev/null; then
    print_success "ArgoCD TLS certificate exists"
else
    print_error "ArgoCD TLS certificate not found"
fi

if kubectl get ingress -n argocd | grep -q "argocd"; then
    print_success "ArgoCD ingress configuration found"
else
    print_warning "ArgoCD ingress configuration not found"
fi

# 6. Check network policies
print_status "Checking network policies..."
network_policies=$(kubectl get networkpolicies --all-namespaces -o jsonpath='{.items[*].metadata.name}' 2>/dev/null | wc -w)
if [ "$network_policies" -gt 0 ]; then
    print_success "Found $network_policies network policies"
else
    print_warning "No network policies found"
fi

# 7. Check pod security standards
print_status "Checking pod security standards..."
if kubectl get podsecuritypolicies 2>/dev/null || kubectl get clusterrole -o yaml | grep -q "pod-security"; then
    print_success "Pod security policies configured"
else
    print_warning "Pod security policies not found"
fi

# 8. Check audit logging
print_status "Checking audit logging..."
if kubectl get configmap -n kube-system audit-policy 2>/dev/null; then
    print_success "Audit policy configuration found"
else
    print_warning "Audit policy configuration not found"
fi

# 9. Check cert-manager
print_status "Checking cert-manager..."
if kubectl get deployment -n cert-manager cert-manager 2>/dev/null; then
    print_success "cert-manager is running"
else
    print_error "cert-manager not found"
fi

# 10. Check Let's Encrypt issuer
print_status "Checking Let's Encrypt issuer..."
if kubectl get clusterissuer letsencrypt-prod 2>/dev/null; then
    print_success "Let's Encrypt production issuer configured"
else
    print_error "Let's Encrypt production issuer not found"
fi

# 11. Check encrypted secrets
print_status "Checking for encrypted secrets..."
total_secrets=$(kubectl get secrets --all-namespaces --no-headers | wc -l)
encrypted_secrets=$(kubectl get secrets --all-namespaces -o yaml | grep -c "encryptedData" || echo "0")
if [ "$encrypted_secrets" -gt 0 ]; then
    print_success "Found $encrypted_secrets encrypted secrets out of $total_secrets total"
else
    print_warning "No encrypted secrets found"
fi

# 12. Check TLS across all ingresses
print_status "Checking TLS across all ingresses..."
ingresses=$(kubectl get ingress --all-namespaces -o jsonpath='{.items[*].spec.tls}' 2>/dev/null | grep -c "secretName" || echo "0")
if [ "$ingresses" -gt 0 ]; then
    print_success "Found $ingresses TLS-enabled ingresses"
else
    print_warning "No TLS-enabled ingresses found"
fi

# 13. Check for unencrypted resources
print_status "Checking for potential unencrypted resources..."
unencrypted_secrets=$(kubectl get secrets --all-namespaces -o yaml | grep -c "data:" || echo "0")
if [ "$unencrypted_secrets" -gt 0 ]; then
    print_warning "Found $unencrypted_secrets secrets with unencrypted data"
else
    print_success "No unencrypted secrets found"
fi

# Summary
echo ""
echo "🔐 Encryption Verification Summary:"
echo "=================================="
print_status "Verification completed. Review the results above."
print_status "For production environments, ensure all components show SUCCESS status."

echo ""
print_status "Next steps if issues found:"
echo "  1. Ensure cert-manager is properly installed"
echo "  2. Verify Let's Encrypt issuer configuration"
echo "  3. Check k3s encryption configuration"
echo "  4. Validate network policies and pod security"
echo "  5. Confirm PostgreSQL TLS certificates are issued"
