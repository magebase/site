variable "environment" {
  description = "Environment name (dev, prod)"
  type        = string
}

variable "secret_key_base" {
  description = "Rails secret key base"
  type        = string
  sensitive   = true
  default     = ""
}

variable "ruby_llm_api_key" {
  description = "RubyLLM API key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "aws_s3_access_key_id" {
  description = "AWS S3 access key ID for database backups"
  type        = string
  sensitive   = true
  default     = ""
}

variable "aws_s3_secret_access_key" {
  description = "AWS S3 secret access key for database backups"
  type        = string
  sensitive   = true
  default     = ""
}

variable "aws_ses_access_key_id" {
  description = "AWS SES access key ID"
  type        = string
  sensitive   = true
  default     = ""
}

variable "aws_ses_secret_access_key" {
  description = "AWS SES secret access key"
  type        = string
  sensitive   = true
  default     = ""
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

variable "rails_log_to_stdout" {
  description = "Whether to log to stdout"
  type        = string
  default     = "true"
}

variable "rails_serve_static_files" {
  description = "Whether to serve static files"
  type        = string
  default     = "true"
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
