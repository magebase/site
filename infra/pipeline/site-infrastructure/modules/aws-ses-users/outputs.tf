# Outputs for AWS SES Users Module

output "ses_user_name" {
  description = "Name of the SES IAM user"
  value       = aws_iam_user.ses_user.name
}

output "ses_access_key_id" {
  description = "Access Key ID for the SES user"
  value       = aws_iam_access_key.ses_user.id
  sensitive   = true
}

output "ses_secret_access_key" {
  description = "Secret Access Key for the SES user"
  value       = aws_iam_access_key.ses_user.secret
  sensitive   = true
}

output "ses_user_arn" {
  description = "ARN of the SES IAM user"
  value       = aws_iam_user.ses_user.arn
}
