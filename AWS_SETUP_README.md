   AWS_REGION=us-east-1
   AWS_REGION=us-east-1
   AWS_SES_ACCESS_KEY_ID=your-access-key
   AWS_SES_ACCESS_KEY_ID=your-access-key-id
   AWS_SES_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_SES_SECRET_ACCESS_KEY=your-secret-key
   AWS_SSO_PROFILE=magebase-dev
   AWS_SSO_REFRESH_INTERVAL=1800
   Add these variables to your `.env` file:
   All existing email services will now use SES in development mode.
   Enable detailed logging in `config/environments/development.rb`:
   MAIL_DEFAULT_HOST=localhost
   MAIL_DEFAULT_PORT=3000
   TEST_FROM_EMAIL=noreply@magebase.dev
   TEST_FROM_EMAIL=noreply@magebase.dev
   TEST_TO_EMAIL=your-email@example.com
   TEST_TO_EMAIL=your-email@example.com
   TestMailer.with(
   TestMailer.with(user: 'Your Name', to: 'your-email@example.com').test_email.deliver_now
   The AWS SSO manager is integrated into your development environment:
   The SES configuration integrates with your existing email services:
   The following files have been configured:
   The test mailer includes both HTML and text versions:
   This guide explains how to configure AWS SES for sending emails and AWS SSO for authentication in your local development environment.
   Your `Procfile.dev` now includes:
  --subject "SES Test" \
  --to your-email@example.com \
 --text "This is a test email from AWS SES"
# AWS SES
# AWS SES & SSO Setup for Local Development
# AWS SES Configuration
# AWS SSO
# Check AWS credentials
# Check SES domain status
# Check SES sending limits
# Check domain verification status
# Configure SSO profile
# Email Configuration
# Email Testing
# Follow the prompts to set up your SSO profile
# In Rails console
# Option 1: Load from .env file
# Option 2: Load AWS-specific config
# Or start individual services
# Profile name: magebase-dev
# Run the test mailer script
# SSO region: us-east-1
# SSO start URL: https://your-sso-portal.awsapps.com/start
# Send a test email
# Send a test email via AWS CLI
# Start Rails console
# Start all services including AWS SSO manager
# Test SES directly
# View AWS SSO profiles
## AWS SES Email Configuration
## AWS SSO Session Management
## Environment Variables
## Integration with Existing Services
## Next Steps
## Security Best Practices
## Table of Contents
## Testing Email Sending
## Troubleshooting
### 1. AWS SSO Setup
### 1. Prerequisites
### 1. Verify SES Configuration
### 2. Development Environment Integration
### 2. Environment Setup
### 2. Test from Rails
### 3. Check Email Templates
### 3. Procfile Configuration
### 3. Rails Configuration
### 4. AWS SSO Manager Features
### 4. Testing Email Sending
### Common SES Issues
### Common SSO Issues
### Debug Commands
### Loading Environment Variables
### Rails Logging
### Required Variables
#### Option A: Rails Console
#### Option B: Command Line Script
#### Option C: Direct SES Test
).test_email.deliver_now
- **Automatic Session Refresh**: Refreshes SSO sessions before expiration
- **Environment Variables**: Exports AWS credentials to other processes
- **Error Handling**: Graceful handling of authentication failures
- **Logging**: Detailed logging of session status
- AWS Account with SES access
- AWS CLI configured with appropriate permissions
- Domain verified in SES (magebase.dev)
- `ProposalReadyEmailService` - Uses SES for proposal notifications
- `QuoteEmailService` - Uses SES for quote notifications
- `QuoteReadyEmailService` - Uses SES for quote ready notifications
- `app/mailers/test_mailer.rb` - Test mailer for development
- `app/views/test_mailer/` - Email templates
- `app/views/test_mailer/test_email.html.erb`
- `app/views/test_mailer/test_email.text.erb`
- `config/environments/development.rb` - SES mailer configuration
- `config/initializers/aws_ses.rb` - AWS SDK setup and custom mailer
--from noreply@magebase.dev \
1. **Configure production SES** settings
1. **Consider using AWS SES templates** for better deliverability
1. **Domain Not Verified**
1. **Implement email templates** for your specific use cases
1. **Invalid Credentials**
1. **Limit SES permissions** to only necessary actions
1. **Monitor email usage** to avoid unexpected charges
1. **Never commit credentials** to version control
1. **Permission Denied**
1. **Profile Not Found**
1. **Rotate credentials** regularly
1. **SSO Session Expired**
1. **Sandbox Mode**
1. **Set up monitoring** for email delivery
1. **Test email sending** with your verified domain
1. **Use IAM roles** instead of access keys when possible
1. Configure AWS SSO in your AWS account
1. Login to SSO:
1. Set up AWS CLI with SSO:
1. [AWS SES Email Configuration](#aws-ses-email-configuration)
1. [AWS SSO Session Management](#aws-sso-session-management)
1. [Environment Variables](#environment-variables)
1. [Testing Email Sending](#testing-email-sending)
1. [Troubleshooting](#troubleshooting)
Error: Domain is not verified
Error: Email address not verified
Error: Unable to locate credentials
Solution: Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
Solution: Check IAM permissions for your SSO user
Solution: Run 'aws configure sso' to set up the profile
Solution: Run 'aws sso login --profile magebase-dev'
Solution: Verify magebase.dev in AWS SES console
Solution: Verify recipient email or request production access
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
````
````bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```plaintext
```ruby
```ruby
aws configure sso
aws configure sso list-profiles
aws ses get-identity-verification-attributes --identities magebase.dev
aws ses get-identity-verification-attributes --identities magebase.dev
aws ses get-send-quota
aws ses send-email \
aws sso login --profile magebase-dev
aws sts get-caller-identity
aws-sso: ./bin/aws-sso-manager
bin/dev
config.action_mailer.log_level = :debug
config.action_mailer.logger = Logger.new(STDOUT)
overmind start aws-sso  # Just the SSO manager
rails c
ruby test_mailer.rb
ruby test_ses.rb
source .env
source .env.aws
ssr: bin/vite ssr
to: 'your-email@example.com'
user: 'Developer',
vite: bin/vite dev
web: bin/rails s
