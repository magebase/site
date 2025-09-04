#!/bin/bash

# K3s Cluster Access Setup Script
# This script helps set up kubectl access to your K3s cluster

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
        log_error "kubectl not found. Please install kubectl first."
        log_info "macOS: brew install kubectl"
        log_info "Linux: curl -LO \"https://dl.k8s.io/release/\$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl\" && chmod +x kubectl && sudo mv kubectl /usr/local/bin/"
        exit 1
    fi

    if ! command -v terraform &> /dev/null; then
        log_error "terraform not found. Please install terraform first."
        exit 1
    fi

    log_success "Prerequisites check passed"
}

# Get cluster information from terraform or use defaults
get_cluster_info() {
    log_info "Getting cluster information..."

    # Use the known cluster IP from previous testing
    LB_IP="91.98.13.200"
    SSH_KEY_PATH="$HOME/.ssh/id_ed25519"

    log_success "Using cluster IP: $LB_IP"
    log_success "Using SSH key: $SSH_KEY_PATH"

    if [ ! -f "$SSH_KEY_PATH" ]; then
        log_error "SSH key not found at $SSH_KEY_PATH"
        exit 1
    fi
}

# Get kubeconfig from cluster
get_kubeconfig_from_cluster() {
    log_info "Retrieving kubeconfig from cluster..."

    local temp_kubeconfig="/tmp/k3s-kubeconfig.yaml"

    log_info "SSH into cluster to get kubeconfig..."
    if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no root@"$LB_IP" "cat /etc/rancher/k3s/k3s.yaml" > "$temp_kubeconfig"; then
        log_success "Successfully retrieved kubeconfig from cluster"

        # Update the server URL in the kubeconfig
        sed -i.bak "s|https://127.0.0.1:6443|https://$LB_IP:6443|g" "$temp_kubeconfig"

        # Backup existing kubeconfig if it exists
        if [ -f ~/.kube/config ]; then
            cp ~/.kube/config ~/.kube/config.backup."$(date +%Y%m%d_%H%M%S)"
            log_info "Backed up existing kubeconfig"
        fi

        # Install the new kubeconfig
        mkdir -p ~/.kube
        cp "$temp_kubeconfig" ~/.kube/config
        chmod 600 ~/.kube/config

        log_success "Updated kubeconfig with cluster certificates"
        log_success "Server URL: https://$LB_IP:6443"

        # Clean up
        rm -f "$temp_kubeconfig"

    else
        log_error "Failed to retrieve kubeconfig from cluster"
        log_info "Make sure:"
        log_info "1. SSH key is correct: $SSH_KEY_PATH"
        log_info "2. Cluster IP is accessible: $LB_IP"
        log_info "3. SSH service is running on the cluster"
        return 1
    fi
}

# Test cluster connection
test_connection() {
    log_info "Testing cluster connection..."

    if kubectl cluster-info; then
        log_success "Successfully connected to cluster!"
        kubectl get nodes
        kubectl get pods --all-namespaces
    else
        log_error "Failed to connect to cluster."
        log_info "This is expected if the kubeconfig certificates are not updated yet."
        get_kubeconfig_from_cluster
    fi
}

# Main function
main() {
    log_info "Setting up K3s cluster access..."

    check_prerequisites
    get_cluster_info
    get_kubeconfig_from_cluster
    test_connection

    log_success "Cluster access setup complete!"
    log_info ""
    log_info "Next steps:"
    log_info "1. Test cluster connection: kubectl get nodes"
    log_info "2. Check ArgoCD status: kubectl get pods -n argocd"
    log_info "3. For local ArgoCD access, run:"
    log_info "   kubectl port-forward svc/argocd-server -n argocd 8080:80"
    log_info "   Then access ArgoCD at: http://localhost:8080"
    log_info ""
    log_info "For external ArgoCD access, use: https://dev-argocd.magebase.dev"
}

# Run main function
main "$@"
