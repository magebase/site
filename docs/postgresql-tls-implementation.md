# PostgreSQL TLS Encryption Implementation

## Overview

This document outlines the implementation of TLS encryption for PostgreSQL in the k3s cluster, ensuring end-to-end encryption for database connections.

## Components Implemented

### 1. PostgreSQL TLS Certificates

- **File**: `infra/pipeline/base-infrastructure/extra-manifests/postgresql-certificate.yaml`
- **Purpose**: Creates TLS certificates for PostgreSQL server and CA using cert-manager
- **Certificates**:
  - `postgresql-tls`: Server certificate for PostgreSQL
  - `postgresql-ca`: Certificate Authority for client verification
- **DNS Names**: Covers all environments (dev, qa, uat, prod) and internal cluster DNS

### 2. PostgreSQL SSL Configuration

- **File**: `k8s/base/database.yaml`
- **SSL Parameters**:
  - `ssl: "on"`: Enables SSL/TLS encryption
  - `ssl_cert_file`: Path to server certificate
  - `ssl_key_file`: Path to private key
  - `ssl_ca_file`: Path to CA certificate
- **pg_hba Configuration**: Updated to require SSL for all connections (`hostssl`)
- **Certificate Integration**: References the TLS secrets created by cert-manager

### 3. Infrastructure Integration

- **File**: `infra/pipeline/base-infrastructure/extra-manifests/kustomization.yaml.tpl`
- **Purpose**: Includes PostgreSQL certificates in the infrastructure deployment
- **Integration**: Certificates are deployed alongside other encryption components

## Security Features

### End-to-End Encryption Layers

1. **Network Layer**: Cilium WireGuard encryption for pod-to-pod communication
2. **Storage Layer**: etcd encryption for Kubernetes secrets and data
3. **Application Layer**: PostgreSQL TLS for database connections
4. **Ingress Layer**: HTTPS/TLS termination for external access
5. **Secrets Layer**: Encrypted Kubernetes secrets

### Certificate Management

- **Issuer**: Let's Encrypt production issuer
- **Automation**: cert-manager handles certificate lifecycle
- **Validation**: HTTP-01 challenge via Traefik ingress
- **Renewal**: Automatic certificate renewal before expiration

## Verification

### Comprehensive Verification Script

- **File**: `verify-k3s-encryption.sh`
- **Checks**:
  - etcd encryption configuration
  - Network encryption (Cilium WireGuard)
  - Secrets encryption
  - PostgreSQL TLS certificates
  - ArgoCD HTTPS configuration
  - Network policies
  - Pod security standards
  - Audit logging
  - cert-manager status
  - Let's Encrypt issuer
  - TLS across all ingresses
  - Encrypted vs unencrypted secrets

### Manual Verification Commands

```bash
# Check PostgreSQL certificates
kubectl get certificate -n database
kubectl get secret -n database

# Check PostgreSQL SSL configuration
kubectl get cluster magebase-db -n magebase -o yaml

# Verify SSL connections
kubectl exec -it magebase-db-1 -n magebase -- psql -c "SHOW ssl;"

# Check certificate validity
kubectl describe certificate postgresql-tls -n database
```

## Deployment

### Prerequisites

1. cert-manager installed and configured
2. Let's Encrypt issuer configured
3. Traefik ingress controller running
4. PostgreSQL cluster deployed via CloudNativePG

### Deployment Steps

1. Apply infrastructure manifests:

   ```bash
   kubectl apply -k infra/pipeline/base-infrastructure/extra-manifests/
   ```

2. Wait for certificates to be issued:

   ```bash
   kubectl wait --for=condition=Ready certificate/postgresql-tls -n database --timeout=300s
   ```

3. Deploy PostgreSQL cluster:

   ```bash
   kubectl apply -f k8s/base/database.yaml
   ```

4. Run verification script:

   ```bash
   ./verify-k3s-encryption.sh
   ```

## Monitoring and Maintenance

### Certificate Monitoring
- Monitor certificate expiration via cert-manager
- Set up alerts for certificate renewal failures
- Regularly verify certificate validity

### Connection Security
- All database connections now require SSL
- Client applications must use SSL certificates
- Monitor for SSL connection failures

### Performance Impact
- Minimal performance impact from TLS encryption
- Hardware acceleration recommended for high-throughput scenarios
- Monitor CPU usage for encryption/decryption operations

## Troubleshooting

### Common Issues
1. **Certificate Not Issued**: Check cert-manager logs and DNS configuration
2. **SSL Connection Failures**: Verify client certificates and pg_hba configuration
3. **Performance Issues**: Monitor encryption overhead and consider hardware acceleration

### Logs and Debugging
```bash
# Check cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager

# Check PostgreSQL logs
kubectl logs -n magebase statefulset/magebase-db

# Debug SSL connections
kubectl exec -it magebase-db-1 -n magebase -- psql -c "SELECT * FROM pg_stat_ssl;"
```

## Compliance and Security Standards

### Security Standards Met
- **PCI DSS**: Encrypted database connections
- **GDPR**: Data protection in transit
- **ISO 27001**: Information security management
- **OWASP**: Secure database connections

### Audit and Compliance
- All database connections are encrypted
- Certificate lifecycle is automated and auditable
- Encryption status is verifiable via the verification script
- Comprehensive logging of security events

## Future Enhancements

### Planned Improvements
1. **Client Certificate Authentication**: Require client certificates for database access
2. **Certificate Rotation**: Implement automated certificate rotation policies
3. **Multi-Region Certificates**: Support for geo-distributed deployments
4. **Integration Testing**: Automated tests for SSL connectivity

### Monitoring Enhancements
1. **SSL Metrics**: Prometheus metrics for SSL connection status
2. **Certificate Expiry Alerts**: Proactive alerting for certificate expiration
3. **Connection Security Dashboard**: Real-time visibility into encrypted connections
