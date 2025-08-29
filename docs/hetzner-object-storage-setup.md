# Hetzner Object Storage Setup for CloudNativePG Backups

This document explains how to configure Hetzner Object Storage for PostgreSQL backups using CloudNativePG operator.

## Overview

Hetzner Object Storage provides S3-compatible storage that can be used for CloudNativePG backups. This setup replaces AWS S3 with Hetzner Object Storage for cost-effective, regional backup storage.

## Prerequisites

- Hetzner Cloud account with Object Storage enabled
- k3s cluster with CloudNativePG operator installed
- kubectl configured to access your cluster

## Step 1: Create Hetzner Object Storage Bucket

1. Log in to [Hetzner Cloud Console](https://console.hetzner.cloud)
2. Navigate to **Object Storage** in the left sidebar
3. Click **Create bucket**
4. Configure the bucket:
   - **Name**: `magebase-postgres-backups` (or your preferred name)
   - **Region**: Singapore (sin)
   - **Access**: Private
5. Click **Create bucket**

## Step 2: Create S3 Credentials

1. In the Object Storage section, go to **Credentials/S3 Credentials**
2. Click **Create S3 credential**
3. Configure the credential:
   - **Description**: PostgreSQL Backups
   - **Permissions**: Read and Write
4. Click **Create**
5. **Important**: Save the Access Key ID and Secret Access Key securely

## Step 3: Configure Terraform Variables

Create or update your `infra/terraform.tfvars` file with the Hetzner Object Storage credentials:

```hcl
# Hetzner Object Storage Credentials
hetzner_object_storage_access_key = "your-access-key-id"
hetzner_object_storage_secret_key = "your-secret-access-key"
```

## Step 4: Configure Environment Variables

Create or update your `k8s/.env` file with the base64-encoded credentials:

```bash
# Encode your credentials
ACCESS_KEY_B64=$(echo -n "your-access-key-id" | base64)
SECRET_KEY_B64=$(echo -n "your-secret-access-key" | base64)

# Add to your .env file
HETZNER_OBJECT_STORAGE_ACCESS_KEY_B64=$ACCESS_KEY_B64
HETZNER_OBJECT_STORAGE_SECRET_KEY_B64=$SECRET_KEY_B64
```

## Terraform Configuration

The infrastructure uses the MinIO Terraform provider (recommended) with AWS provider as fallback:

### Primary Configuration (MinIO Provider)

```hcl
terraform {
  required_providers {
    minio = {
      source  = "aminueza/minio"
      version = "~> 3.3.0"
    }
  }
}

provider "minio" {
  alias         = "hetzner"
  minio_server = "sin.magebase.dev"
  minio_user    = var.hetzner_object_storage_access_key
  minio_password = var.hetzner_object_storage_secret_key
  minio_region  = "sin"
  minio_ssl     = true
}

resource "random_uuid" "postgres_backup_bucket_id" {}

resource "minio_s3_bucket" "postgres_backups" {
  provider       = minio.hetzner
  bucket         = "${local.cluster_name}-postgres-backups-${substr(random_uuid.postgres_backup_bucket_id.result, 0, 8)}"
  acl            = "private"
  object_locking = false

  lifecycle {
    prevent_destroy = true
  }
}
```

### Fallback Configuration (AWS Provider)

```hcl
provider "aws" {
  alias  = "hetzner-object-storage"
  region = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  endpoints {
    s3 = "https://sin.magebase.dev"
  }
}

resource "aws_s3_bucket" "postgres_backups" {
  provider = aws.hetzner-object-storage
  bucket   = "${local.cluster_name}-postgres-backups-fallback"

  lifecycle {
    prevent_destroy = true
  }
}
```

## Step 4: Deploy Infrastructure

Run the setup script to configure the infrastructure:

```bash
cd infra/
./setup-hetzner-object-storage.sh
```

This script will:

- Initialize Terraform
- Create the Object Storage bucket (if not already created)
- Provide configuration guidance

## Step 5: Deploy Database Configuration

Apply the updated Kubernetes manifests:

```bash
cd k8s/
kubectl apply -k base/
```

## Step 6: Verify Backup Configuration

Check that the backup configuration is working:

```bash
# Check CloudNativePG cluster
kubectl get clusters -n magebase

# Check scheduled backups
kubectl get scheduledbackup -n magebase

# Check backup status
kubectl describe scheduledbackup magebase-db-backup -n magebase

# Check backup jobs
kubectl get jobs -n magebase
```

## Configuration Details

### CloudNativePG Backup Configuration

The backup configuration in `k8s/base/database.yaml` includes:

- **Destination**: `s3://magebase-postgres-backups/`
- **Endpoint**: `https://sin.magebase.dev`
- **WAL Compression**: gzip
- **Retention Policy**: 30 days
- **Target**: prefer-standby (backup from standby for reduced load)

### Environment Variables Required

```bash
# Hetzner Object Storage Credentials (base64 encoded)
HETZNER_OBJECT_STORAGE_ACCESS_KEY_B64=your-base64-encoded-access-key
HETZNER_OBJECT_STORAGE_SECRET_KEY_B64=your-base64-encoded-secret-key
```

## Troubleshooting

### Common Issues

1. **Credentials not working**: Ensure the S3 credentials have Read/Write permissions
2. **Endpoint connection failed**: Verify the endpoint URL is correct for your region
3. **Backup jobs failing**: Check the CloudNativePG operator logs

### Checking Logs

```bash
# Check CloudNativePG operator logs
kubectl logs -n cnpg-system deployment/cnpg-controller-manager

# Check PostgreSQL cluster logs
kubectl logs -n magebase magebase-db-1

# Check backup job logs
kubectl logs -n magebase job/magebase-db-backup-YYYYMMDD-HHMMSS
```

## Cost Optimization

- **Storage Costs**: Hetzner Object Storage is significantly cheaper than AWS S3
- **Data Transfer**: No charges for data transfer within Hetzner network
- **Retention**: Configure appropriate retention policies to manage costs

## Security Best Practices

1. **Private Buckets**: Always use private buckets for database backups
2. **Minimal Permissions**: Create dedicated credentials with minimal required permissions
3. **Regular Rotation**: Rotate access keys regularly
4. **Encryption**: Data is encrypted at rest by default
5. **Network Security**: Restrict access to specific IP ranges if possible

## Backup Strategy

- **Scheduled Backups**: Daily backups at 2:00 AM
- **WAL Archiving**: Continuous WAL archiving for point-in-time recovery
- **Retention**: 30-day retention with automatic cleanup
- **Compression**: WAL files compressed with gzip
- **Parallel Processing**: Up to 8 parallel WAL uploads

## Monitoring

Monitor your backups using:

```bash
# Check backup status
kubectl get backups -n magebase

# Monitor backup metrics (if Prometheus is configured)
kubectl get servicemonitor -n magebase
```

## Migration from AWS S3

If migrating from AWS S3:

1. Create Hetzner Object Storage bucket and credentials
2. Update the `k8s/base/database.yaml` with new endpoint and credentials
3. Update environment variables
4. Apply the changes: `kubectl apply -k base/`
5. Verify new backups are working
6. Clean up old AWS S3 resources (optional)

The migration is seamless as Hetzner Object Storage is S3-compatible.
