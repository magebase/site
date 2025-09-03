      source  = "aminueza/minio"
      version = "~> 3.3.0"
    minio = {
    prevent_destroy = true
    prevent_destroy = true
    s3 = "https://sin.magebase.dev"
    }
   ACCESS_KEY_B64=$(echo -n "your-access-key-id" | base64)
   HETZNER_OBJECT_STORAGE_ACCESS_KEY_B64=your-base64-encoded-access-key
   HETZNER_OBJECT_STORAGE_SECRET_KEY_B64=$SECRET_KEY_B64
   The backup configuration in `k8s/base/database.yaml` includes:
   The infrastructure uses the MinIO Terraform provider (recommended) with AWS provider as fallback:
   The migration is seamless as Hetzner Object Storage is S3-compatible.
   This document explains how to configure Hetzner Object Storage for PostgreSQL backups using CloudNativePG operator.
   This script will:
  ./setup-hetzner-object-storage.sh
# Add to your .env file
# Check CloudNativePG cluster
# Check CloudNativePG operator logs
# Check PostgreSQL cluster logs
# Check backup job logs
# Check backup jobs
# Check backup status
# Check backup status
# Check scheduled backups
# Encode your credentials
# Hetzner Object Storage Credentials
# Hetzner Object Storage Credentials (base64 encoded)
# Hetzner Object Storage Setup for CloudNativePG Backups
# Monitor backup metrics (if Prometheus is configured)
## Backup Strategy
## Configuration Details
## Cost Optimization
## Migration from AWS S3
## Monitoring
## Overview
## Prerequisites
## Security Best Practices
## Step 1: Create Hetzner Object Storage Bucket
## Step 2: Create S3 Credentials
## Step 3: Configure Terraform Variables
## Step 4: Configure Environment Variables
## Step 4: Deploy Infrastructure
## Step 5: Deploy Database Configuration
## Step 6: Verify Backup Configuration
## Terraform Configuration
## Troubleshooting
### Checking Logs
### CloudNativePG Backup Configuration
### Common Issues
### Environment Variables Required
### Fallback Configuration (AWS Provider)
### Primary Configuration (MinIO Provider)
- **Access**: Private
- **Compression**: WAL files compressed with gzip
- **Data Transfer**: No charges for data transfer within Hetzner network
- **Description**: PostgreSQL Backups
- **Destination**: `s3://magebase-postgres-backups/`
- **Endpoint**: `https://sin.magebase.dev`
- **Name**: `magebase-postgres-backups` (or your preferred name)
- **Parallel Processing**: Up to 8 parallel WAL uploads
- **Permissions**: Read and Write
- **Region**: Singapore (sin)
- **Retention Policy**: 30 days
- **Retention**: 30-day retention with automatic cleanup
- **Retention**: Configure appropriate retention policies to manage costs
- **Scheduled Backups**: Daily backups at 2:00 AM
- **Storage Costs**: Hetzner Object Storage is significantly cheaper than AWS S3
- **Target**: prefer-standby (backup from standby for reduced load)
- **WAL Archiving**: Continuous WAL archiving for point-in-time recovery
- **WAL Compression**: gzip
- Create the Object Storage bucket (if not already created)
- Hetzner Cloud account with Object Storage enabled
- Initialize Terraform
- Provide configuration guidance
- k3s cluster with CloudNativePG operator installed
- kubectl configured to access your cluster
1. **Backup jobs failing**: Check the CloudNativePG operator logs
1. **Credentials not working**: Ensure the S3 credentials have Read/Write permissions
1. **Encryption**: Data is encrypted at rest by default
1. **Endpoint connection failed**: Verify the endpoint URL is correct for your region
1. **Important**: Save the Access Key ID and Secret Access Key securely
1. **Minimal Permissions**: Create dedicated credentials with minimal required permissions
1. **Network Security**: Restrict access to specific IP ranges if possible
1. **Private Buckets**: Always use private buckets for database backups
1. **Regular Rotation**: Rotate access keys regularly
1. Apply the changes: `kubectl apply -k base/`
1. Clean up old AWS S3 resources (optional)
1. Click **Create S3 credential**
1. Click **Create bucket**
1. Click **Create bucket**
1. Click **Create**
1. Configure the bucket:
1. Configure the credential:
1. Create Hetzner Object Storage bucket and credentials
1. In the Object Storage section, go to **Credentials/S3 Credentials**
1. Log in to [Hetzner Cloud Console](https://console.hetzner.cloud)
1. Navigate to **Object Storage** in the left sidebar
1. Update environment variables
1. Update the `k8s/base/database.yaml` with new endpoint and credentials
1. Verify new backups are working
Apply the updated Kubernetes manifests:
Check that the backup configuration is working:
Create or update your `infra/terraform.tfvars` file with the Hetzner Object Storage credentials:
Create or update your `k8s/.env` file with the base64-encoded credentials:
HETZNER_OBJECT_STORAGE_ACCESS_KEY_B64=$ACCESS_KEY_B64
HETZNER_OBJECT_STORAGE_SECRET_KEY_B64=your-base64-encoded-secret-key
Hetzner Object Storage provides S3-compatible storage that can be used for CloudNativePG backups. This setup replaces AWS S3 with Hetzner Object Storage for cost-effective, regional backup storage.
If migrating from AWS S3:
Monitor your backups using:
Run the setup script to configure the infrastructure:
SECRET_KEY_B64=$(echo -n "your-secret-access-key" | base64)
```
```
```
```
```
```
```
```
```
```
```
```
```
```
````
````bash
```bash
```bash
```bash
```bash
```bash
```bash
```hcl
```hcl
```hcl
acl = "private"
alias = "hetzner"
alias = "hetzner-object-storage"
bucket = "${local.cluster_name}-postgres-backups-${substr(random_uuid.postgres_backup_bucket_id.result, 0, 8)}"
bucket = "${local.cluster_name}-postgres-backups-fallback"
cd infra/
cd k8s/
endpoints {
hetzner_object_storage_access_key = "your-access-key-id"
hetzner_object_storage_secret_key = "your-secret-access-key"
kubectl apply -k base/
kubectl describe scheduledbackup magebase-db-backup -n magebase
kubectl get backups -n magebase
kubectl get clusters -n magebase
kubectl get jobs -n magebase
kubectl get scheduledbackup -n magebase
kubectl get servicemonitor -n magebase
kubectl logs -n cnpg-system deployment/cnpg-controller-manager
kubectl logs -n magebase job/magebase-db-backup-YYYYMMDD-HHMMSS
kubectl logs -n magebase magebase-db-1
lifecycle {
lifecycle {
minio_password = var.hetzner_object_storage_secret_key
minio_region = "sin"
minio_server = "sin.magebase.dev"
minio_ssl = true
minio_user = var.hetzner_object_storage_access_key
object_locking = false
provider "aws" {
provider "minio" {
provider = aws.hetzner-object-storage
provider = minio.hetzner
region = "us-east-1"
required_providers {
resource "aws_s3_bucket" "postgres_backups" {
resource "minio_s3_bucket" "postgres_backups" {
resource "random_uuid" "postgres_backup_bucket_id" {}
skip_credentials_validation = true
skip_metadata_api_check = true
skip_region_validation = true
skip_requesting_account_id = true
terraform {
}
}
}
}
}
}
}
}
}
