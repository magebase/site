# Variables for Stripe module

variable "stripe_api_key" {
  description = "API key for Stripe integration"
  type        = string
  sensitive   = true
}

variable "company_name" {
  description = "Company name for portal configuration"
  type        = string
  default     = "Magebase"
}

variable "domain" {
  description = "Domain for portal URLs"
  type        = string
  default     = "magebase.com"
}
