# Terraform configuration for Magebase infrastructure using Hetzner + k3s
terraform {
  required_version = ">= 1.8.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    minio = {
      source  = "aminueza/minio"
      version = "~> 3.3.0"
    }
  }
}




# Cloudflare Provider
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Default AWS Provider (uses management account OIDC role)
provider "aws" {
  region = "ap-southeast-1"
}

# AWS Provider (for Route53 operations) - uses management account OIDC role
provider "aws" {
  alias  = "route53"
  region = "us-east-1" # Route53 is a global service, but provider needs a region
}

# Data source to get load balancer IP from base-infrastructure
data "terraform_remote_state" "base_infrastructure" {
  backend = "s3"
  config = {
    bucket  = "magebase-tf-state-management-ap-southeast-1"
    key     = "magebase/base-infrastructure/${var.environment}/terraform.tfstate"
    region  = "ap-southeast-1"
    encrypt = true
  }
}

# Local values
locals {
  # Get the load balancer IP from base infrastructure
  cluster_ipv4 = data.terraform_remote_state.base_infrastructure.outputs.lb_ipv4
}

# Cloudflare DNS Configuration
module "cloudflare_dns" {
  source = "./modules/cloudflare"

  domain_name  = var.environment == "dev" ? "dev.${var.domain_name}" : var.domain_name
  zone_id      = var.cloudflare_zone_id
  cluster_ipv4 = local.cluster_ipv4
  cluster_ipv6 = null # IPv6 not currently available from base infrastructure

  # SES configuration
  aws_ses_account_id = var.management_account_id

  # SES DNS Records - SES is always enabled
  ses_verification_record = module.aws_ses.ses_verification_record
  ses_dkim_records        = module.aws_ses.ses_dkim_records
  ses_dkim_tokens         = module.aws_ses.dkim_tokens
  ses_spf_record          = module.aws_ses.ses_spf_record
  ses_mx_record           = module.aws_ses.ses_mx_record
}

# Cloudflare CDN Configuration for Active Storage (REMOVED - now using R2 custom domain)
# module "cloudflare_cdn" {
#   source = "./modules/cloudflare/cdn"

#   domain_name              = var.domain_name
#   active_storage_bucket    = module.cloudflare_r2.r2_bucket
#   object_storage_endpoint  = module.cloudflare_r2.r2_endpoint
#   zone_id                  = module.cloudflare_dns.zone_id
#   enable_advanced_features = false # Disable advanced features due to API token limitations
# }

# AWS SES Configuration (always enabled)
module "aws_ses" {
  source = "./modules/aws-ses"

  domain_name = var.domain_name
  environment = var.environment
  account_id  = var.management_account_id
}

# AWS SES Users (creates IAM users for each environment)
module "aws_ses_users" {
  source = "./modules/aws-ses-users"

  environment = var.environment
  account_id  = var.management_account_id
}

# Stripe Configuration
module "stripe" {
  source = "./modules/stripe"
}
