# AWS SES & SSO Setup for Local Development

This guide explains how to configure AWS SES for sending emails and AWS SSO for authentication in your local development environment.

## Table of Contents

1. [AWS SES Email Configuration](#aws-ses-email-configuration)
2. [AWS SSO Session Management](#aws-sso-session-management)
3. [Testing Email Sending](#testing-email-sending)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)

## AWS SES Email Configuration

### 1. Prerequisites

- AWS Account with SES access
- Domain verified in SES (magebase.dev)
- AWS CLI configured with appropriate permissions

### 2. Environment Setup

Add these variables to your `.env` file:

```bash
# AWS SES Configuration
AWS_REGION=us-east-1
AWS_SES_ACCESS_KEY_ID=your-access-key-id
AWS_SES_SECRET_ACCESS_KEY=your-secret-access-key

# Email Testing
TEST_FROM_EMAIL=noreply@magebase.dev
TEST_TO_EMAIL=your-email@example.com
```

### 3. Rails Configuration

The following files have been configured:

- `config/environments/development.rb` - SES mailer configuration
- `config/initializers/aws_ses.rb` - AWS SDK setup and custom mailer
- `app/mailers/test_mailer.rb` - Test mailer for development
- `app/views/test_mailer/` - Email templates

### 4. Testing Email Sending

#### Option A: Rails Console

```bash
# Start Rails console
rails c

# Send a test email
TestMailer.with(user: 'Your Name', to: 'your-email@example.com').test_email.deliver_now
```

#### Option B: Command Line Script

```bash
# Run the test mailer script
ruby test_mailer.rb
```

#### Option C: Direct SES Test

```bash
# Test SES directly
ruby test_ses.rb
```

## AWS SSO Session Management

### 1. AWS SSO Setup

1. Configure AWS SSO in your AWS account
2. Set up AWS CLI with SSO:

```bash
# Configure SSO profile
aws configure sso

# Follow the prompts to set up your SSO profile
# Profile name: magebase-dev
# SSO start URL: https://your-sso-portal.awsapps.com/start
# SSO region: us-east-1
```

2. Login to SSO:

```bash
aws sso login --profile magebase-dev
```

### 2. Development Environment Integration

The AWS SSO manager is integrated into your development environment:

```bash
# Start all services including AWS SSO manager
bin/dev

# Or start individual services
overmind start aws-sso  # Just the SSO manager
```

### 3. Procfile Configuration

Your `Procfile.dev` now includes:

```plaintext
web: bin/rails s
ssr: bin/vite ssr
vite: bin/vite dev
aws-sso: ./bin/aws-sso-manager
```

### 4. AWS SSO Manager Features

- **Automatic Session Refresh**: Refreshes SSO sessions before expiration
- **Environment Variables**: Exports AWS credentials to other processes
- **Error Handling**: Graceful handling of authentication failures
- **Logging**: Detailed logging of session status

## Environment Variables

### Required Variables

```bash
# AWS SSO
AWS_SSO_PROFILE=magebase-dev
AWS_REGION=us-east-1
AWS_SSO_REFRESH_INTERVAL=1800

# AWS SES
AWS_SES_ACCESS_KEY_ID=your-access-key
AWS_SES_SECRET_ACCESS_KEY=your-secret-key

# Email Configuration
TEST_FROM_EMAIL=noreply@magebase.dev
TEST_TO_EMAIL=your-email@example.com
MAIL_DEFAULT_HOST=localhost
MAIL_DEFAULT_PORT=3000
```

### Loading Environment Variables

```bash
# Option 1: Load from .env file
source .env

# Option 2: Load AWS-specific config
source .env.aws
```

## Testing Email Sending

### 1. Verify SES Configuration

```bash
# Check domain verification status
aws ses get-identity-verification-attributes --identities magebase.dev

# Send a test email via AWS CLI
aws ses send-email \
  --from noreply@magebase.dev \
  --to your-email@example.com \
  --subject "SES Test" \
  --text "This is a test email from AWS SES"
```

### 2. Test from Rails

```ruby
# In Rails console
TestMailer.with(
  user: 'Developer',
  to: 'your-email@example.com'
).test_email.deliver_now
```

### 3. Check Email Templates

The test mailer includes both HTML and text versions:

- `app/views/test_mailer/test_email.html.erb`
- `app/views/test_mailer/test_email.text.erb`

## Troubleshooting

### Common SES Issues

1. **Domain Not Verified**

   ```
   Error: Domain is not verified
   Solution: Verify magebase.dev in AWS SES console
   ```

2. **Sandbox Mode**

   ```
   Error: Email address not verified
   Solution: Verify recipient email or request production access
   ```

3. **Invalid Credentials**
   ```
   Error: Unable to locate credentials
   Solution: Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
   ```

### Common SSO Issues

1. **SSO Session Expired**

   ```
   Solution: Run 'aws sso login --profile magebase-dev'
   ```

2. **Profile Not Found**

   ```
   Solution: Run 'aws configure sso' to set up the profile
   ```

3. **Permission Denied**
   ```
   Solution: Check IAM permissions for your SSO user
   ```

### Debug Commands

```bash
# Check AWS credentials
aws sts get-caller-identity

# Check SES sending limits
aws ses get-send-quota

# Check SES domain status
aws ses get-identity-verification-attributes --identities magebase.dev

# View AWS SSO profiles
aws configure sso list-profiles
```

### Rails Logging

Enable detailed logging in `config/environments/development.rb`:

```ruby
config.action_mailer.logger = Logger.new(STDOUT)
config.action_mailer.log_level = :debug
```

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use IAM roles** instead of access keys when possible
3. **Rotate credentials** regularly
4. **Limit SES permissions** to only necessary actions
5. **Monitor email usage** to avoid unexpected charges

## Integration with Existing Services

The SES configuration integrates with your existing email services:

- `QuoteEmailService` - Uses SES for quote notifications
- `QuoteReadyEmailService` - Uses SES for quote ready notifications
- `ProposalReadyEmailService` - Uses SES for proposal notifications

All existing email services will now use SES in development mode.

## Next Steps

1. **Test email sending** with your verified domain
2. **Configure production SES** settings
3. **Set up monitoring** for email delivery
4. **Implement email templates** for your specific use cases
5. **Consider using AWS SES templates** for better deliverability
