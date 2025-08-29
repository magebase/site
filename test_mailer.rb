#!/usr/bin/env ruby
# Rails Console Script to Test SES Email Sending

# Load Rails environment
require_relative '../config/environment'

puts "🚀 Testing SES Email from Rails Console"
puts "=" * 50

# Test 1: Send a simple test email
puts "📧 Test 1: Sending test email..."
begin
  result = TestMailer.with(
    user: 'Rails Developer',
    to: ENV['TEST_TO_EMAIL'] || 'your-email@example.com'
  ).test_email.deliver_now

  puts "✅ Test email sent successfully!"
  puts "   Message ID: #{result}" if result
rescue StandardError => e
  puts "❌ Error sending test email: #{e.message}"
end

puts

# Test 2: Send a quote notification email
puts "📧 Test 2: Sending quote notification..."
begin
  result = TestMailer.with(
    client_name: 'John Doe',
    project_name: 'E-commerce Platform',
    timeline: '4-6 weeks',
    cost: '$15,000',
    to: ENV['TEST_TO_EMAIL'] || 'your-email@example.com'
  ).quote_notification.deliver_now

  puts "✅ Quote notification sent successfully!"
  puts "   Message ID: #{result}" if result
rescue StandardError => e
  puts "❌ Error sending quote notification: #{e.message}"
end

puts
puts "🎉 Email testing completed!"
puts "Check your inbox at: #{ENV['TEST_TO_EMAIL'] || 'your-email@example.com'}"
puts
puts "💡 Tips:"
puts "   - Make sure your domain is verified in SES"
puts "   - Check AWS credentials are correct"
puts "   - Verify the recipient email is allowed in SES"
puts "   - Check Rails logs for detailed error messages"
