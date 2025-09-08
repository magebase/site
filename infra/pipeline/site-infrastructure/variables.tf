# Variables for Terraform configuration
variable "environment" {
  description = "Environment name (dev, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be either 'dev' or 'prod'"
  }
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for the domain"
  type        = string
}

variable "management_account_id" {
  description = "AWS account ID for the management account"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "magebase.dev"
}

# cluster_ipv4 is now obtained from base-infrastructure remote state
# variable "cluster_ipv4" {
#   description = "IPv4 address of the cluster load balancer from base infrastructure"
#   type        = string
#   default     = "127.0.0.1"
# }

variable "google_studio_api_key" {
  description = "Google Studio API key for AI services"
  type        = string
  sensitive   = true
  default     = ""
}

variable "openai_api_key" {
  description = "OpenAI API key for AI services"
  type        = string
  sensitive   = true
  default     = ""
}

variable "anthropic_api_key" {
  description = "Anthropic API key for AI services"
  type        = string
  sensitive   = true
  default     = ""
}

variable "default_llm_provider" {
  description = "Default LLM provider to use (google, openai, anthropic)"
  type        = string
  default     = "google"
  validation {
    condition     = contains(["google", "openai", "anthropic"], var.default_llm_provider)
    error_message = "Default LLM provider must be one of: google, openai, anthropic"
  }
}

variable "image_registry" {
  description = "Docker image registry"
  type        = string
  default     = "ghcr.io"
}

variable "image_name" {
  description = "Docker image name"
  type        = string
  default     = "magebase/site"
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "domain" {
  description = "Application domain"
  type        = string
  default     = "dev.magebase.dev"
}

variable "rails_env" {
  description = "Rails environment"
  type        = string
  default     = "development"
}

variable "cloudflare_r2_access_key_id" {
  description = "Cloudflare R2 Access Key ID"
  type        = string
  sensitive   = true
}

variable "cloudflare_r2_secret_access_key" {
  description = "Cloudflare R2 Secret Access Key"
  type        = string
  sensitive   = true
}

variable "support_email" {
  description = "Support email address for customer communications"
  type        = string
  default     = "support@magebase.dev"
}

variable "cloudflare_region" {
  description = "Cloudflare region for operations"
  type        = string
  default     = "EU"
  validation {
    condition     = contains(["EU", "US"], var.cloudflare_region)
    error_message = "Cloudflare region must be either 'EU' or 'US'"
  }
}

variable "stripe_api_key" {
  description = "API key for Stripe integration"
  type        = string
  sensitive   = true
}
