# Root Terragrunt configuration
remote_state {
  backend = "s3"
  config = {
    bucket         = "magebase-terraform-state-${get_env("ENVIRONMENT", "dev")}"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "magebase-terraform-locks"
  }
}

# Generate provider configuration
generate "provider" {
  path = "providers.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
terraform {
  required_version = ">= 1.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    fly = {
      source  = "fly-apps/fly"
      version = "~> 0.0.15"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Cloudflare provider configuration
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# AWS provider for SES
provider "aws" {
  region = var.aws_region
}

# Fly.io provider configuration
provider "fly" {
  useinternaltunnel    = true
  internaltunnelorg    = var.fly_org
  internaltunnelregion = var.fly_region
}
EOF
}
