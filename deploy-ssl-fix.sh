#!/bin/bash

# SSL Certificate Fix Deployment Script
# This script deploys the fixed SSL configuration for ArgoCD with end-to-end encryption

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."

    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl not found. Please install kubectl."
        exit 1
    fi

    if ! command -v terraform &> /dev/null; then
        log_error "terraform not found. Please install terraform."
        exit 1
    fi

    log_success "Prerequisites check passed"
}

# Deploy infrastructure changes
deploy_infrastructure() {
    log_info "Deploying infrastructure changes..."

    cd /Users/xyz.ekrata/Projects/magebase/site/infra/pipeline/base-infrastructure

    # Initialize terraform if needed
    if [ ! -d ".terraform" ]; then
        log_info "Initializing Terraform..."
        terraform init
    fi

    # Plan the changes
    log_info "Planning Terraform changes..."
    terraform plan -out=ssl-fix.tfplan

    # Apply the changes
    log_info "Applying Terraform changes..."
    terraform apply ssl-fix.tfplan

    log_success "Infrastructure changes deployed"
}

# Wait for resources to be ready
wait_for_resources() {
    log_info "Waiting for resources to be ready..."

    # Wait for cert-manager to be ready
    log_info "Waiting for cert-manager deployment..."
    kubectl wait --for=condition=available --timeout=300s deployment/cert-manager -n cert-manager || {
        log_warning "cert-manager deployment wait timed out, continuing..."
    }

    # Wait for ArgoCD server to be ready
    log_info "Waiting for ArgoCD server deployment..."
    kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd || {
        log_warning "ArgoCD server deployment wait timed out, continuing..."
    }

    log_success "Resources are ready"
}

# Check certificate status
check_certificate_status() {
    log_info "Checking certificate status..."

    # Check ClusterIssuer
    log_info "Checking ClusterIssuer status..."
    kubectl get clusterissuer letsencrypt-prod -o jsonpath='{.status.conditions[0].type}: {.status.conditions[0].status} - {.status.conditions[0].message}' || {
        log_error "Failed to get ClusterIssuer status"
    }
    echo

    # Check Certificate
    log_info "Checking Certificate status..."
    kubectl get certificate argocd-tls -n argocd -o jsonpath='{.status.conditions[0].type}: {.status.conditions[0].status} - {.status.conditions[0].message}' || {
        log_error "Failed to get Certificate status"
    }
    echo

    # Check if certificate secret exists and has data
    log_info "Checking certificate secret..."
    if kubectl get secret argocd-tls -n argocd &>/dev/null; then
        log_success "Certificate secret exists"

        # Check if it has certificate data
        if kubectl get secret argocd-tls -n argocd -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -noout -text | head -10; then
            log_success "Certificate data is valid"
        else
            log_warning "Certificate secret exists but data may be invalid"
        fi
    else
        log_warning "Certificate secret does not exist yet"
    fi
}

# Test SSL connection
test_ssl_connection() {
    log_info "Testing SSL connection..."

    local domain="${1:-argocd.dev.magebase.dev}"

    # Test with openssl
    log_info "Testing SSL certificate with openssl..."
    echo | openssl s_client -connect "$domain:443" -servername "$domain" 2>/dev/null | openssl x509 -noout -issuer -subject -dates || {
        log_warning "SSL test failed, certificate may not be ready yet"
        return 1
    }

    # Test with curl
    log_info "Testing HTTPS connection with curl..."
    if curl -I "https://$domain" --connect-timeout 10 2>/dev/null | head -1; then
        log_success "HTTPS connection successful"
        return 0
    else
        log_warning "HTTPS connection failed"
        return 1
    fi
}

# Run certificate debug
run_certificate_debug() {
    log_info "Running certificate debug information..."

    # Create and run debug job
    local job_name="cert-debug-$(date +%s)"

    log_info "Creating debug job: $job_name"

    # Create a temporary debug job
    cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: Job
metadata:
  name: $job_name
  namespace: cert-manager
  labels:
    app.kubernetes.io/name: cert-manager-debug
spec:
  template:
    metadata:
      labels:
        app.kubernetes.io/name: cert-manager-debug
    spec:
      serviceAccountName: cert-manager-debug
      containers:
      - name: debug
        image: bitnami/kubectl:latest
        command: ["/bin/bash", "-c"]
        args:
        - |
          echo "=== Certificate Debug Information ==="
          echo "1. ClusterIssuers:"
          kubectl get clusterissuer -o wide
          echo
          echo "2. Certificates:"
          kubectl get certificates -A -o wide
          echo
          echo "3. Certificate Requests:"
          kubectl get certificaterequests -A -o wide
          echo
          echo "4. ACME Orders:"
          kubectl get orders -A -o wide
          echo
          echo "5. ACME Challenges:"
          kubectl get challenges -A -o wide
          echo
          echo "6. ArgoCD Certificate Details:"
          kubectl describe certificate argocd-tls -n argocd
          echo
          echo "7. ArgoCD Certificate Secret:"
          kubectl describe secret argocd-tls -n argocd
          echo
          echo "8. cert-manager controller logs (last 20 lines):"
          kubectl logs -n cert-manager deployment/cert-manager --tail=20
          echo
          echo "=== End Debug Information ==="
      restartPolicy: Never
  backoffLimit: 1
EOF

    # Wait for job to complete and get logs
    log_info "Waiting for debug job to complete..."
    kubectl wait --for=condition=complete --timeout=120s job/$job_name -n cert-manager || {
        log_warning "Debug job did not complete in time"
    }

    # Get job logs
    log_info "Debug job output:"
    kubectl logs job/$job_name -n cert-manager || {
        log_warning "Could not get debug job logs"
    }

    # Clean up debug job
    kubectl delete job $job_name -n cert-manager || {
        log_warning "Could not delete debug job"
    }
}

# Provide troubleshooting guidance
provide_troubleshooting_guidance() {
    log_info "SSL Certificate Troubleshooting Guidance:"
    echo
    echo "If the certificate is not working, here are some steps to troubleshoot:"
    echo
    echo "1. Check cert-manager logs:"
    echo "   kubectl logs -n cert-manager deployment/cert-manager"
    echo
    echo "2. Check certificate status:"
    echo "   kubectl describe certificate argocd-tls -n argocd"
    echo
    echo "3. Check certificate requests:"
    echo "   kubectl get certificaterequests -n argocd"
    echo
    echo "4. Check ACME challenges:"
    echo "   kubectl get challenges -n argocd"
    echo
    echo "5. Verify Cloudflare API token:"
    echo "   kubectl get secret cloudflare-api-token-secret -n cert-manager"
    echo
    echo "6. Check DNS propagation:"
    echo "   dig TXT _acme-challenge.argocd.dev.magebase.dev"
    echo
    echo "7. Force certificate renewal:"
    echo "   kubectl delete certificate argocd-tls -n argocd"
    echo "   # Certificate will be recreated automatically"
    echo
    echo "8. Check ArgoCD ingress:"
    echo "   kubectl describe ingress argocd-server -n argocd"
    echo
}

# Main execution
main() {
    log_info "Starting SSL Certificate Fix Deployment (End-to-End Encryption)"
    echo

    check_prerequisites

    # Deploy infrastructure changes
    deploy_infrastructure

    # Wait for resources
    wait_for_resources

    # Give some time for certificates to be issued
    log_info "Waiting 60 seconds for certificate issuance..."
    sleep 60

    # Check certificate status
    check_certificate_status

    # Run debug information
    run_certificate_debug

    # Test SSL connection
    if test_ssl_connection; then
        log_success "SSL certificate is working correctly!"
    else
        log_warning "SSL certificate may not be ready yet or there are issues"
        echo
        provide_troubleshooting_guidance
    fi

    log_success "SSL Certificate Fix Deployment completed"
    echo
    log_info "You can now access ArgoCD at: https://argocd.dev.magebase.dev"
}

# Run main function
main "$@"
