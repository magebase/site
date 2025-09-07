terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# SSM Parameters for Application Secrets
resource "aws_ssm_parameter" "rails_secret_key_base" {
  name  = "/site/${var.environment}/rails/secret-key-base"
  type  = "SecureString"
  value = var.secret_key_base
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "ruby_llm_api_key" {
  name  = "/site/${var.environment}/api/ruby-llm-api-key"
  type  = "SecureString"
  value = var.ruby_llm_api_key
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "aws_ses_access_key_id" {
  name  = "/site/${var.environment}/aws/ses-access-key-id"
  type  = "SecureString"
  value = var.aws_ses_access_key_id
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "aws_ses_secret_access_key" {
  name  = "/site/${var.environment}/aws/ses-secret-access-key"
  type  = "SecureString"
  value = var.aws_ses_secret_access_key
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "aws_s3_access_key_id" {
  name  = "/site/${var.environment}/aws/s3-access-key-id"
  type  = "SecureString"
  value = var.aws_s3_access_key_id
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "aws_s3_secret_access_key" {
  name  = "/site/${var.environment}/aws/s3-secret-access-key"
  type  = "SecureString"
  value = var.aws_s3_secret_access_key
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Docker Configuration Parameters
resource "aws_ssm_parameter" "image_registry" {
  name  = "/site/${var.environment}/docker/image-registry"
  type  = "String"
  value = var.image_registry
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "image_name" {
  name  = "/site/${var.environment}/docker/image-name"
  type  = "String"
  value = var.image_name
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "image_tag" {
  name  = "/site/${var.environment}/docker/image-tag"
  type  = "String"
  value = var.image_tag
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Domain Configuration
resource "aws_ssm_parameter" "domain" {
  name  = "/site/${var.environment}/domain"
  type  = "String"
  value = var.domain
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Rails Environment Variables
resource "aws_ssm_parameter" "rails_env" {
  name  = "/site/${var.environment}/rails/env"
  type  = "String"
  value = var.rails_env
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "rails_log_to_stdout" {
  name  = "/site/${var.environment}/rails/log-to-stdout"
  type  = "String"
  value = var.rails_log_to_stdout
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "rails_serve_static_files" {
  name  = "/site/${var.environment}/rails/serve-static-files"
  type  = "String"
  value = var.rails_serve_static_files
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "rails_master_key" {
  name  = "/site/${var.environment}/rails/master-key"
  type  = "SecureString"
  value = var.rails_master_key
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Cloudflare R2 Configuration
resource "aws_ssm_parameter" "cloudflare_r2_access_key_id" {
  name  = "/site/${var.environment}/cloudflare/r2-access-key-id"
  type  = "SecureString"
  value = var.cloudflare_r2_access_key_id
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "cloudflare_r2_secret_access_key" {
  name  = "/site/${var.environment}/cloudflare/r2-secret-access-key"
  type  = "SecureString"
  value = var.cloudflare_r2_secret_access_key
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

# Support Configuration
resource "aws_ssm_parameter" "support_email" {
  name  = "/site/${var.environment}/support/email"
  type  = "String"
  value = var.support_email
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "cloudflare_region" {
  name  = "/site/${var.environment}/cloudflare/region"
  type  = "String"
  value = var.cloudflare_region
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}
