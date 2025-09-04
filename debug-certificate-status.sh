#!/bin/bash

echo "Getting kubeconfig from Terraform..."
cd infra/pipeline/base-infrastructure

# Ensure .kube directory exists
mkdir -p ~/.kube

# Get kubeconfig
terraform output --raw kubeconfig > ~/.kube/config-magebase
export KUBECONFIG=~/.kube/config-magebase

echo "Checking certificate status..."
echo "=============================="

echo "1. Certificate resource status:"
kubectl get certificate argocd-tls -n argocd -o wide

echo ""
echo "2. Certificate details:"
kubectl describe certificate argocd-tls -n argocd

echo ""
echo "3. Certificate requests:"
kubectl get certificaterequest -n argocd

echo ""
echo "4. Certificate request details:"
kubectl describe certificaterequest -n argocd

echo ""
echo "5. ClusterIssuer status:"
kubectl describe clusterissuer letsencrypt-prod

echo ""
echo "6. cert-manager logs (last 50 lines):"
kubectl logs -n cert-manager -l app=cert-manager --tail=50

echo ""
echo "7. ArgoCD server pods:"
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server

echo ""
echo "8. ArgoCD server logs (last 20 lines):"
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server --tail=20

echo ""
echo "9. ArgoCD ingress status:"
kubectl describe ingress argocd-server -n argocd

echo ""
echo "10. Current SSL certificate check:"
echo | timeout 10 openssl s_client -servername argocd.dev.magebase.dev -connect argocd.dev.magebase.dev:443 2>/dev/null | openssl x509 -noout -subject -issuer
