#!/usr/bin/env ruby
# AWS SES & SSO Setup Verification Script

require 'aws-sdk-ses'
require 'yaml'

puts "🔧 AWS SES & SSO Setup Verification"
puts "=" * 50

# Check environment variables
puts "📋 Checking Environment Variables..."
puts

required_vars = [
  'AWS_REGION',
  'AWS_SES_ACCESS_KEY_ID',
  'AWS_SES_SECRET_ACCESS_KEY',
  'TEST_FROM_EMAIL',
  'TEST_TO_EMAIL'
]

missing_vars = []
required_vars.each do |var|
  if ENV[var].nil? || ENV[var].empty?
    missing_vars << var
    puts "❌ #{var}: Not set"
  else
    puts "✅ #{var}: #{var == 'AWS_SES_SECRET_ACCESS_KEY' ? '[HIDDEN]' : ENV[var]}"
  end
end

puts
if missing_vars.any?
  puts "⚠️  Missing environment variables. Please set them in your .env file:"
  missing_vars.each { |var| puts "   export #{var}=your_value" }
  puts
else
  puts "✅ All required environment variables are set!"
end

# Check AWS CLI and SSO
puts "🔐 Checking AWS CLI and SSO..."
puts

if system('which aws > /dev/null 2>&1')
  puts "✅ AWS CLI is installed"

  # Check SSO profiles
  sso_profiles = `aws configure sso list-profiles 2>/dev/null`.strip
  if $?.success? && !sso_profiles.empty?
    puts "✅ AWS SSO profiles found:"
    sso_profiles.each_line { |profile| puts "   - #{profile.strip}" }
  else
    puts "⚠️  No AWS SSO profiles configured"
    puts "   Run: aws configure sso"
  end

  # Check current identity
  identity_check = `aws sts get-caller-identity 2>/dev/null`
  if $?.success?
    identity = JSON.parse(identity_check) rescue {}
    puts "✅ AWS credentials are valid"
    puts "   Account: #{identity['Account']}"
    puts "   User: #{identity['UserId'] || identity['Arn']&.split('/')&.last}"
  else
    puts "⚠️  AWS credentials not configured or expired"
    puts "   Run: aws sso login --profile your-profile"
  end
else
  puts "❌ AWS CLI is not installed"
  puts "   Install from: https://aws.amazon.com/cli/"
end

puts

# Check SES configuration
puts "📧 Checking SES Configuration..."
puts

begin
  ses_client = Aws::SES::Client.new(
    region: ENV.fetch('AWS_REGION', 'us-east-1'),
    access_key_id: ENV['AWS_SES_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SES_SECRET_ACCESS_KEY']
  )

  # Check domain identity
  begin
    response = ses_client.get_identity_verification_attributes({
      identities: [ 'magebase.dev' ]
    })

    identity = response.verification_attributes['magebase.dev']
    if identity
      puts "✅ Domain Identity Status:"
      puts "   Domain: magebase.dev"
      puts "   Verification: #{identity.verification_status}"
      puts "   DKIM Enabled: #{identity.dkim_enabled}"
      puts "   DKIM Status: #{identity.dkim_verification_status}"
    else
      puts "❌ Domain identity not found in SES"
      puts "   Add magebase.dev to SES in AWS Console"
    end
  rescue => e
    puts "❌ Error checking domain identity: #{e.message}"
  end

  # Check sending quota
  begin
    quota = ses_client.get_send_quota
    puts "✅ SES Sending Quota:"
    puts "   Max 24h: #{quota.max_24_hour_send}"
    puts "   Max per second: #{quota.max_send_rate}"
    puts "   Sent in last 24h: #{quota.sent_last_24_hours}"
  rescue => e
    puts "❌ Error checking sending quota: #{e.message}"
  end

rescue => e
  puts "❌ SES Configuration Error: #{e.message}"
  puts "   Check your AWS credentials and region"
end

puts

# Check Rails environment
puts "🚀 Checking Rails Environment..."
puts

if File.exist?('config/application.rb')
  puts "✅ Rails application found"

  # Check if SES initializer exists
  if File.exist?('config/initializers/aws_ses.rb')
    puts "✅ AWS SES initializer configured"
  else
    puts "❌ AWS SES initializer not found"
  end

  # Check if test mailer exists
  if File.exist?('app/mailers/test_mailer.rb')
    puts "✅ Test mailer configured"
  else
    puts "❌ Test mailer not found"
  end

  # Check Procfile
  if File.exist?('Procfile.dev')
    procfile_content = File.read('Procfile.dev')
    if procfile_content.include?('aws-sso')
      puts "✅ AWS SSO manager added to Procfile.dev"
    else
      puts "⚠️  AWS SSO manager not in Procfile.dev"
    end
  else
    puts "❌ Procfile.dev not found"
  end
else
  puts "❌ Rails application not found"
end

puts
puts "🎯 Quick Start Commands:"
puts "=" * 30
puts
puts "# 1. Set up environment variables"
puts "cp .env.example .env  # Add your AWS credentials"
puts
puts "# 2. Configure AWS SSO"
puts "aws configure sso"
puts "aws sso login --profile your-profile"
puts
puts "# 3. Start development environment"
puts "bin/dev  # Includes AWS SSO manager"
puts
puts "# 4. Test email sending"
puts "rails c"
puts "TestMailer.with(to: 'your-email@example.com').test_email.deliver_now"
puts
puts "# 5. Test SES directly"
puts "ruby test_ses.rb"
puts
puts "📖 For detailed instructions, see: AWS_SETUP_README.md"
puts
puts "✅ Setup verification completed!"
