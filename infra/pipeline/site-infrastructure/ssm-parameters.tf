# SSM Parameters Configuration
# This file contains all SSM parameters for the application

resource "aws_ssm_parameter" "ruby_llm_api_key" {
  name      = "/site/${var.environment}/api/ruby-llm-api-key"
  type      = "SecureString"
  value     = var.ruby_llm_api_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Docker Configuration Parameters
resource "aws_ssm_parameter" "image_registry" {
  name      = "/site/${var.environment}/docker/image-registry"
  type      = "String"
  value     = var.image_registry
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "image_name" {
  name      = "/site/${var.environment}/docker/image-name"
  type      = "String"
  value     = var.image_name
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "image_tag" {
  name      = "/site/${var.environment}/docker/image-tag"
  type      = "String"
  value     = var.image_tag
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Domain Configuration
resource "aws_ssm_parameter" "domain" {
  name      = "/site/${var.environment}/domain"
  type      = "String"
  value     = var.domain
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Rails Environment Variables
resource "aws_ssm_parameter" "rails_env" {
  name      = "/site/${var.environment}/rails/env"
  type      = "String"
  value     = var.rails_env
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "rails_master_key" {
  name      = "/site/${var.environment}/rails/master-key"
  type      = "SecureString"
  value     = var.rails_master_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Cloudflare R2 Configuration
resource "aws_ssm_parameter" "cloudflare_r2_access_key_id" {
  name      = "/site/${var.environment}/cloudflare/r2-access-key-id"
  type      = "SecureString"
  value     = var.cloudflare_r2_access_key_id
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "cloudflare_r2_secret_access_key" {
  name      = "/site/${var.environment}/cloudflare/r2-secret-access-key"
  type      = "SecureString"
  value     = var.cloudflare_r2_secret_access_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Support Configuration
resource "aws_ssm_parameter" "support_email" {
  name      = "/site/${var.environment}/support/email"
  type      = "String"
  value     = var.support_email
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "cloudflare_region" {
  name      = "/site/${var.environment}/cloudflare/region"
  type      = "String"
  value     = var.cloudflare_region
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}
