variable "environment" {
  description = "Environment name (dev, prod)"
  type        = string
}


variable "ruby_llm_api_key" {
  description = "RubyLLM API key"
  type        = string
  sensitive   = true
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

variable "rails_master_key" {
  description = "Rails master key for encrypted credentials"
  type        = string
  sensitive   = true
  default     = ""
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
}
