# AWS SES Mailer Configuration
require "aws-sdk-ses"

# Configure AWS SDK
Aws.config.update(
  region: Rails.application.credentials.dig(:aws, :region) || ENV.fetch("AWS_REGION", "us-east-1"),
  credentials: Aws::Credentials.new(
    Rails.application.credentials.dig(:aws, :ses_access_key_id) || ENV["AWS_SES_ACCESS_KEY_ID"],
    Rails.application.credentials.dig(:aws, :ses_secret_access_key) || ENV["AWS_SES_SECRET_ACCESS_KEY"]
  )
)

# Custom SES Mailer Delivery Method
class SesMailer
  def deliver!(mail)
    ses_client = Aws::SES::Client.new

    # Convert Rails mail object to SES format
    ses_mail = {
      source: mail.from.first,
      destination: {
        to_addresses: mail.to
      },
      message: {
        subject: {
          data: mail.subject,
          charset: "UTF-8"
        },
        body: {
          html: {
            data: mail.html_part&.body&.raw_source || mail.body.raw_source,
            charset: "UTF-8"
          }
        }
      }
    }

    # Add CC and BCC if present
    ses_mail[:destination][:cc_addresses] = mail.cc if mail.cc.present?
    ses_mail[:destination][:bcc_addresses] = mail.bcc if mail.bcc.present?

    # Add text part if present
    if mail.text_part.present?
      ses_mail[:message][:body][:text] = {
        data: mail.text_part.body.raw_source,
        charset: "UTF-8"
      }
    end

    # Send the email
    response = ses_client.send_email(ses_mail)

    Rails.logger.info "Email sent via SES: #{response.message_id}"
    response.message_id
  rescue Aws::SES::Errors::ServiceError => e
    Rails.logger.error "SES Error: #{e.message}"
    raise e
  end
end

# Register the custom delivery method
ActionMailer::Base.add_delivery_method :ses, SesMailer
