# AI/LLM Configuration Parameters
resource "aws_ssm_parameter" "google_studio_api_key" {
  name      = "/site/${var.environment}/ai/google-studio-api-key"
  type      = "SecureString"
  value     = var.google_studio_api_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
    Service     = "ai"
    Provider    = "google"
  }
}

resource "aws_ssm_parameter" "openai_api_key" {
  name      = "/site/${var.environment}/ai/openai-api-key"
  type      = "SecureString"
  value     = var.openai_api_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
    Service     = "ai"
    Provider    = "openai"
  }
}

resource "aws_ssm_parameter" "anthropic_api_key" {
  name      = "/site/${var.environment}/ai/anthropic-api-key"
  type      = "SecureString"
  value     = var.anthropic_api_key
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
    Service     = "ai"
    Provider    = "anthropic"
  }
}

resource "aws_ssm_parameter" "default_llm_provider" {
  name      = "/site/${var.environment}/ai/default-llm-provider"
  type      = "String"
  value     = var.default_llm_provider
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
    Service     = "ai"
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

# Cloudflare R2 Configuration

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

# Company Information Parameters
resource "aws_ssm_parameter" "company_name" {
  name      = "/site/${var.environment}/company/name"
  type      = "String"
  value     = "Magebase"
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "company_website" {
  name      = "/site/${var.environment}/company/website"
  type      = "String"
  value     = "www.magebase.dev"
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "company_email" {
  name      = "/site/${var.environment}/company/email"
  type      = "String"
  value     = "hello@magebase.dev"
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}

resource "aws_ssm_parameter" "company_phone" {
  name      = "/site/${var.environment}/company/phone"
  type      = "String"
  value     = "+1 (555) 123-4567"
  overwrite = true
  tags = {
    Environment = var.environment
    Project     = "site"
  }
}
