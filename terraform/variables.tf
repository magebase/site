# Variables for Terraform configuration
variable "environment" {
  description = "Environment name (dev, qa, uat, prod)"
  type        = string
  default     = "dev"
}

variable "database_url" {
  description = "Database URL"
  type        = string
  sensitive   = true
}

variable "redis_url" {
  description = "Redis URL"
  type        = string
  sensitive   = true
}

variable "secret_key_base" {
  description = "Rails secret key base"
  type        = string
  sensitive   = true
}

variable "ruby_llm_api_key" {
  description = "RubyLLM API key"
  type        = string
  sensitive   = true
}

variable "aws_ses_access_key_id" {
  description = "AWS SES access key ID"
  type        = string
  sensitive   = true
}

variable "aws_ses_secret_access_key" {
  description = "AWS SES secret access key"
  type        = string
  sensitive   = true
}

variable "docker_image" {
  description = "Docker image for deployment"
  type        = string
  default     = "magebase/site:latest"
}
