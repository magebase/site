#!/bin/bash

# External Secrets Operator Installation Script
# This script helps install and configure ESO for Magebase

set -e

NAMESPACE="external-secrets-system"
SA_NAME="external-secrets-sa"
CLUSTER_NAME="magebase-cluster"
AWS_REGION="us-east-1"

echo "🔧 Installing External Secrets Operator..."

# Add Helm repo
echo "📦 Adding external-secrets Helm repository..."
helm repo add external-secrets https://charts.external-secrets.io
helm repo update

# Install ESO
echo "🚀 Installing ESO..."
helm upgrade --install external-secrets \
  external-secrets/external-secrets \
  -n $NAMESPACE \
  --create-namespace \
  --set installCRDs=true \
  --wait

echo "✅ ESO installed successfully!"

# Create service account
echo "👤 Creating service account..."
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: $SA_NAME
  namespace: $NAMESPACE
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/external-secrets-role
EOF

echo "🔗 Creating SecretStore..."
cat <<EOF | kubectl apply -f -
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-ssm-store
  namespace: magebase
spec:
  provider:
    aws:
      service: ParameterStore
      region: $AWS_REGION
      auth:
        jwt:
          serviceAccountRef:
            name: $SA_NAME
            namespace: $NAMESPACE
EOF

echo "🎉 ESO setup complete!"
echo ""
echo "Next steps:"
echo "1. Create IAM policy and role for ESO (see README-ESO.md)"
echo "2. Update GitHub Actions to populate SSM parameters"
echo "3. Deploy your application: kubectl apply -k k8s/overlays/dev"
echo ""
echo "To verify installation:"
echo "kubectl get pods -n $NAMESPACE"
echo "kubectl get crd | grep external-secrets"
