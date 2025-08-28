# Terraform configuration for Magebase infrastructure
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

# Variables
variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID"
  type        = string
}

variable "domain_name" {
  description = "Domain name"
  type        = string
}

variable "aws_region" {
  description = "AWS region for SES"
  type        = string
  default     = "us-east-1"
}

variable "fly_org" {
  description = "Fly.io organization"
  type        = string
}

variable "fly_region" {
  description = "Fly.io region"
  type        = string
  default     = "syd"
}

# Cloudflare Zone
data "cloudflare_zone" "main" {
  zone_id = var.cloudflare_zone_id
}

# Cloudflare WAF Rules for Rate Limiting
resource "cloudflare_ruleset" "rate_limiting" {
  zone_id     = var.cloudflare_zone_id
  name        = "Rate Limiting Rules"
  description = "Rate limiting rules for quote generation endpoints"
  kind        = "zone"
  phase       = "http_ratelimit"

  rules {
    ref         = "rate_limit_quote_generation"
    description = "Rate limit quote generation to prevent abuse"
    enabled     = true

    expression  = "(http.request.uri.path matches \"/quote_requests/generate_pdf\")"
    action      = "block"

    ratelimit {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = 60
      requests_per_period = 5
      mitigation_timeout  = 600
    }
  }
}

# Cloudflare Page Rules for security headers
resource "cloudflare_page_rule" "security_headers" {
  zone_id = var.cloudflare_zone_id
  target  = "${var.domain_name}/*"

  actions {
    security_level      = "medium"
    ssl                 = "strict"
    always_use_https    = true

    # Security headers
    header {
      name  = "X-Frame-Options"
      value = "DENY"
    }

    header {
      name  = "X-Content-Type-Options"
      value = "nosniff"
    }

    header {
      name  = "Referrer-Policy"
      value = "strict-origin-when-cross-origin"
    }

    header {
      name  = "Permissions-Policy"
      value = "geolocation=(), microphone=(), camera=()"
    }
  }

  priority = 1
}

# SES Configuration
resource "aws_ses_domain_identity" "main" {
  domain = var.domain_name
}

resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

resource "aws_ses_domain_mail_from" "main" {
  domain           = aws_ses_domain_identity.main.domain
  mail_from_domain = "mail.${aws_ses_domain_identity.main.domain}"
}

# SES Configuration Set
resource "aws_ses_configuration_set" "main" {
  name = "magebase-${var.environment}"

  delivery_options {
    tls_policy = "Require"
  }

  reputation_metrics_enabled = true
  sending_enabled           = true
}

# SES Email Template
resource "aws_ses_template" "quote_notification" {
  name    = "QuoteGenerated-${var.environment}"
  subject = "Your Project Quote from Magebase"

  html = <<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Project Quote</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2563eb;">Your Project Quote is Ready!</h1>
    <p>Dear {{client_name}},</p>
    <p>Thank you for your interest in Magebase. We've generated a detailed scope document for your project based on your requirements.</p>

    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Project Summary:</h3>
      <p><strong>Project:</strong> {{project_name}}</p>
      <p><strong>Estimated Timeline:</strong> {{timeline}} days</p>
      <p><strong>Estimated Cost:</strong> $${cost}</p>
    </div>

    <p>Please find your detailed scope document attached to this email.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{quote_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Full Quote Online</a>
    </div>

    <p>If you have any questions or would like to discuss your project further, please don't hesitate to contact us.</p>

    <p>Best regards,<br>The Magebase Team</p>
  </div>
</body>
</html>
HTML

  text = <<TEXT
Your Project Quote is Ready!

Dear {{client_name}},

Thank you for your interest in Magebase. We've generated a detailed scope document for your project based on your requirements.

Project Summary:
- Project: {{project_name}}
- Estimated Timeline: {{timeline}} days
- Estimated Cost: $${cost}

Please find your detailed scope document attached to this email.

View your full quote online: {{quote_url}}

If you have any questions or would like to discuss your project further, please don't hesitate to contact us.

Best regards,
The Magebase Team
TEXT
}

# Fly.io App Configuration
resource "fly_app" "magebase" {
  name = "magebase-${var.environment}"
  org  = var.fly_org
}

resource "fly_ip" "main" {
  app  = fly_app.magebase.name
  type = "v4"
}

resource "fly_ip" "ipv6" {
  app  = fly_app.magebase.name
  type = "v6"
}

# Fly.io Secrets
resource "fly_secret" "database_url" {
  app   = fly_app.magebase.name
  name  = "DATABASE_URL"
  value = var.database_url
}

resource "fly_secret" "redis_url" {
  app   = fly_app.magebase.name
  name  = "REDIS_URL"
  value = var.redis_url
}

resource "fly_secret" "secret_key_base" {
  app   = fly_app.magebase.name
  name  = "SECRET_KEY_BASE"
  value = var.secret_key_base
}

resource "fly_secret" "cloudflare_api_token" {
  app   = fly_app.magebase.name
  name  = "CLOUDFLARE_API_TOKEN"
  value = var.cloudflare_api_token
}

resource "fly_secret" "aws_ses_access_key" {
  app   = fly_app.magebase.name
  name  = "AWS_SES_ACCESS_KEY_ID"
  value = var.aws_ses_access_key_id
}

resource "fly_secret" "aws_ses_secret_key" {
  app   = fly_app.magebase.name
  name  = "AWS_SES_SECRET_ACCESS_KEY"
  value = var.aws_ses_secret_access_key
}

resource "fly_secret" "ruby_llm_api_key" {
  app   = fly_app.magebase.name
  name  = "RUBY_LLM_API_KEY"
  value = var.ruby_llm_api_key
}

# Fly.io Volumes for persistent storage
resource "fly_volume" "storage" {
  app    = fly_app.magebase.name
  name   = "storage-${var.environment}"
  size   = 10
  region = var.fly_region
}

# Fly.io Deployment
resource "fly_deployment" "main" {
  app    = fly_app.magebase.name
  image  = var.docker_image
  strategy = "rolling"

  env = {
    RAILS_ENV = var.environment
    NODE_ENV  = var.environment
  }

  depends_on = [fly_secret.database_url, fly_secret.redis_url, fly_secret.secret_key_base]
}

# Outputs
output "cloudflare_zone_id" {
  value = var.cloudflare_zone_id
}

output "fly_app_url" {
  value = fly_app.magebase.url
}

output "fly_app_id" {
  value = fly_app.magebase.id
}

output "ses_domain_identity_arn" {
  value = aws_ses_domain_identity.main.arn
}

output "ses_dkim_tokens" {
  value = aws_ses_domain_dkim.main.dkim_tokens
}
