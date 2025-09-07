# External Secrets Operator Setup Guide

This guide covers the installation and configuration of External Secrets Operator (ESO) for managing secrets in the Magebase Kubernetes deployment.

## Prerequisites

- Kubernetes cluster with ArgoCD installed
- AWS account with Systems Manager (SSM) Parameter Store access
- kubectl configured with cluster access
- Helm 3.x installed

## 1. Install External Secrets Operator

Add the external-secrets Helm repository:

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm repo update
```

Install ESO in the `external-secrets-system` namespace:

```bash
helm install external-secrets \
  external-secrets/external-secrets \
  -n external-secrets-system \
  --create-namespace \
  --set installCRDs=true
```

Verify installation:

```bash
kubectl get pods -n external-secrets-system
kubectl get crd | grep external-secrets
```

## 2. Create AWS IAM Policy

Create an IAM policy that allows ESO to read SSM parameters:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath"
      ],
      "Resource": [
        "arn:aws:ssm:*:*:parameter/site/*"
      ]
    }
  ]
}
```

## 3. Create Service Account and IAM Role

Create a Kubernetes service account for ESO:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: external-secrets-sa
  namespace: external-secrets-system
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT-ID:role/external-secrets-role
```

Apply the service account:

```bash
kubectl apply -f service-account.yaml
```

## 4. Create SecretStore

Create a SecretStore resource that connects to AWS SSM:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-ssm-store
  namespace: magebase
spec:
  provider:
    aws:
      service: ParameterStore
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
            namespace: external-secrets-system
```

Apply the SecretStore:

```bash
kubectl apply -f secret-store.yaml
```

## 5. Deploy Application

Deploy using ArgoCD with the appropriate overlay:

For development:

```bash
kubectl apply -k k8s/overlays/dev
```

For production:

```bash
kubectl apply -k k8s/overlays/prod
```

## 6. Verify Secret Retrieval

Check that ExternalSecret resources are created and secrets are populated:

```bash
kubectl get externalsecret -n magebase
kubectl get secrets -n magebase
kubectl describe externalsecret magebase-secrets -n magebase
```

## 7. Troubleshooting

### Common Issues

1. **Secret not found**: Check SSM parameter paths and permissions
2. **Authentication failed**: Verify IAM role and service account configuration
3. **Base64 decode error**: Ensure SSM parameters contain valid values

### Debug Commands

```bash
# Check ESO logs
kubectl logs -n external-secrets-system deployment/external-secrets-webhook
kubectl logs -n external-secrets-system deployment/external-secrets-cert-controller
kubectl logs -n external-secrets-system deployment/external-secrets

# Check secret status
kubectl describe externalsecret magebase-secrets -n magebase

# Check SSM parameters (if you have AWS CLI access)
aws ssm get-parameters-by-path --path /site/dev/
aws ssm get-parameters-by-path --path /site/prod/
```

## Environment Variables

The following environment variables are managed through ESO:

- `SECRET_KEY_BASE`: Rails secret key base
- `RUBY_LLM_API_KEY`: RubyLLM API key
- `AWS_SES_ACCESS_KEY_ID`: AWS SES access key
- `AWS_SES_SECRET_ACCESS_KEY`: AWS SES secret key
- `AWS_S3_ACCESS_KEY_ID`: AWS S3 access key
- `AWS_S3_SECRET_ACCESS_KEY`: AWS S3 secret key
- `DATABASE_URL`: Database connection string
- `REDIS_URL`: Redis connection string
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `DISCORD_WEBHOOK_URL`: Discord webhook URL
- `SMTP_USERNAME`: SMTP username
- `SMTP_PASSWORD`: SMTP password

## GitHub Actions Integration

Update your GitHub Actions workflow to populate SSM parameters:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Store secrets in SSM
  run: |
    aws ssm put-parameter --name "/site/dev/SECRET_KEY_BASE" --value "${{ secrets.SECRET_KEY_BASE }}" --type "SecureString" --overwrite
    aws ssm put-parameter --name "/site/dev/RUBY_LLM_API_KEY" --value "${{ secrets.RUBY_LLM_API_KEY }}" --type "SecureString" --overwrite
    # ... add other parameters
```

## Security Notes

- Never commit actual secret values to the repository
- Use GitHub repository secrets for CI/CD pipelines
- Rotate secrets regularly
- Monitor SSM parameter access logs
- Use least-privilege IAM policies
