# Outputs for the site infrastructure

# SES User Outputs
output "ses_user_name" {
  description = "Name of the SES IAM user for this environment"
  value       = module.aws_ses_users.ses_user_name
}

output "ses_access_key_id" {
  description = "Access Key ID for the SES user"
  value       = module.aws_ses_users.ses_access_key_id
  sensitive   = true
}

output "ses_secret_access_key" {
  description = "Secret Access Key for the SES user"
  value       = module.aws_ses_users.ses_secret_access_key
  sensitive   = true
}

output "ses_user_arn" {
  description = "ARN of the SES IAM user"
  value       = module.aws_ses_users.ses_user_arn
}
