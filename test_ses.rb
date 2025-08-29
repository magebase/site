#!/usr/bin/env ruby
# Test SES Email Sending
require 'aws-sdk-ses'

# Configure AWS
Aws.config.update(
  region: ENV.fetch('AWS_REGION', 'us-east-1'),
  credentials: Aws::Credentials.new(
    ENV['AWS_SES_ACCESS_KEY_ID'],
    ENV['AWS_SES_SECRET_ACCESS_KEY']
  )
)

def test_ses_email
  ses_client = Aws::SES::Client.new

  # Test email parameters
  test_email = {
    source: ENV['TEST_FROM_EMAIL'] || 'test@magebase.dev',
    destination: {
      to_addresses: [ENV['TEST_TO_EMAIL'] || 'your-email@example.com']
    },
    message: {
      subject: {
        data: 'SES Test Email from Rails Development',
        charset: 'UTF-8'
      },
      body: {
        html: {
          data: '<h1>SES Test Email</h1><p>This is a test email sent from your Rails development environment using AWS SES.</p><p>Sent at: ' + Time.now.to_s + '</p>',
          charset: 'UTF-8'
        },
        text: {
          data: 'SES Test Email - This is a test email sent from your Rails development environment using AWS SES. Sent at: ' + Time.now.to_s,
          charset: 'UTF-8'
        }
      }
    }
  }

  begin
    response = ses_client.send_email(test_email)
    puts "✅ Email sent successfully!"
    puts "Message ID: #{response.message_id}"
    puts "Request ID: #{response.response_metadata.request_id}"
  rescue Aws::SES::Errors::ServiceError => e
    puts "❌ SES Error: #{e.message}"
    puts "Error code: #{e.code}"
    exit 1
  rescue StandardError => e
    puts "❌ General error: #{e.message}"
    exit 1
  end
end

def check_ses_identity
  ses_client = Aws::SES::Client.new

  begin
    response = ses_client.get_identity_verification_attributes({
      identities: ['magebase.dev']
    })

    identity = response.verification_attributes['magebase.dev']
    if identity
      puts "📧 Domain Identity Status:"
      puts "  Domain: magebase.dev"
      puts "  Verification Status: #{identity.verification_status}"
      puts "  DKIM Enabled: #{identity.dkim_enabled}"
      puts "  DKIM Verification Status: #{identity.dkim_verification_status}"
    else
      puts "❌ Domain identity not found"
    end
  rescue Aws::SES::Errors::ServiceError => e
    puts "❌ Error checking identity: #{e.message}"
  end
end

# Main execution
puts "🔧 Testing AWS SES Configuration..."
puts "Region: #{ENV.fetch('AWS_REGION', 'us-east-1')}"
puts "From Email: #{ENV['TEST_FROM_EMAIL'] || 'test@magebase.dev'}"
puts "To Email: #{ENV['TEST_TO_EMAIL'] || 'your-email@example.com'}"
puts

check_ses_identity
puts
test_ses_email
