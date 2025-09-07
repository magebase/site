# AWS SES Users Module
terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# SES IAM Users for each environment
resource "aws_iam_user" "ses_user" {
  name = "ses-${var.environment}-user"

  tags = {
    Environment = var.environment
    Purpose     = "SES Email Service"
    ManagedBy   = "terraform"
  }

  lifecycle {
    ignore_changes = [
      name, # Allow existing users to be preserved
    ]
  }
}

# IAM Access Key for SES User
resource "aws_iam_access_key" "ses_user" {
  user = aws_iam_user.ses_user.name
}

# IAM Policy for SES User
resource "aws_iam_user_policy" "ses_policy" {
  name = "SESSendEmailPolicy-${var.environment}"
  user = aws_iam_user.ses_user.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail",
          "ses:SendTemplatedEmail",
          "ses:GetSendQuota",
          "ses:GetSendStatistics",
          "ses:ListIdentities",
          "ses:VerifyEmailIdentity",
          "ses:VerifyDomainIdentity",
          "ses:GetIdentityVerificationAttributes",
          "ses:SetIdentityNotificationTopic",
          "ses:GetIdentityNotificationAttributes"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "arn:aws:ses:*:${var.account_id}:identity/*"
        Condition = {
          StringEquals = {
            "ses:FromAddress" : "*@magebase.dev"
          }
        }
      }
    ]
  })
}

# SSM Parameters for SES Access Keys
resource "aws_ssm_parameter" "ses_access_key_id" {
  name  = "/site/${var.environment}/aws/ses-access-key-id"
  type  = "SecureString"
  value = aws_iam_access_key.ses_user.id
  tags = {
    Environment = var.environment
    Project     = "site"
    ManagedBy   = "terraform"
  }
}

resource "aws_ssm_parameter" "ses_secret_access_key" {
  name  = "/site/${var.environment}/aws/ses-secret-access-key"
  type  = "SecureString"
  value = aws_iam_access_key.ses_user.secret
  tags = {
    Environment = var.environment
    Project     = "site"
    ManagedBy   = "terraform"
  }
}
