# Variables for AWS SES Users Module

variable "environment" {
  description = "Environment name (dev, qa, uat, prod)"
  type        = string
}

variable "account_id" {
  description = "AWS Account ID where the SES users will be created"
  type        = string
}
