# Variables for Stripe module
# No variables are currently used in this module

variable "stripe_api_key" {
  description = "API key for Stripe integration"
  type        = string
  sensitive   = true
}
