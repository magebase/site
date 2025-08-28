# frozen_string_literal: true

class QuoteEmailService
  def self.send_quote_email(quote_request, pdf_data)
    return unless quote_request.client&.email.present?

    # Create SES client
    ses_client = Aws::SES::Client.new(
      region: ENV['AWS_REGION'] || 'us-east-1',
      access_key_id: ENV['AWS_SES_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SES_SECRET_ACCESS_KEY']
    )

    # Prepare email content
    subject = "Your Project Quote - #{quote_request.project_name}"
    html_body = generate_html_body(quote_request)
    text_body = generate_text_body(quote_request)

    # Send email with attachment
    ses_client.send_email(
      source: 'Magebase <hello@magebase.site>',
      destination: {
        to_addresses: [quote_request.client.email]
      },
      message: {
        subject: {
          data: subject,
          charset: 'UTF-8'
        },
        body: {
          html: {
            data: html_body,
            charset: 'UTF-8'
          },
          text: {
            data: text_body,
            charset: 'UTF-8'
          }
        }
      },
      attachments: [
        {
          name: "scope-document-#{quote_request.id}.pdf",
          data: pdf_data,
          content_type: 'application/pdf'
        }
      ]
    )
  rescue Aws::SES::Errors::ServiceError => e
    Rails.logger.error "Failed to send quote email: #{e.message}"
    raise
  end

  private

  def self.generate_html_body(quote_request)
    <<~HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Project Quote</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Project Quote is Ready!</h1>
            <p>We've created a detailed scope document for your project</p>
          </div>

          <div class="content">
            <p>Dear #{quote_request.client&.company_name || quote_request.client&.contact_name || 'Valued Client'},</p>

            <p>Thank you for your interest in Magebase. We've analyzed your project requirements and created a comprehensive scope document with timeline and cost estimates.</p>

            <div class="highlight-box">
              <h3>Project Summary</h3>
              <p><strong>Project:</strong> #{quote_request.project_name}</p>
              <p><strong>Estimated Timeline:</strong> #{quote_request.ai_pricing_data&.dig('timeline_days') || 30} working days</p>
              <p><strong>Estimated Cost:</strong> $#{quote_request.estimated_cost&.to_i || 15000}</p>
              <p><strong>Deposit Required:</strong> $#{(quote_request.estimated_cost&.to_f * 0.3)&.to_i || 4500}</p>
            </div>

            <p><strong>What's included in your scope document:</strong></p>
            <ul>
              <li>Detailed project breakdown and features</li>
              <li>Timeline with milestone deliveries</li>
              <li>Cost breakdown and payment terms</li>
              <li>Technical specifications</li>
              <li>Terms and conditions</li>
            </ul>

            <div style="text-align: center;">
              <a href="#{Rails.application.routes.url_helpers.quote_request_url(quote_request, host: ENV['APP_URL'] || 'localhost:3000')}" class="cta-button">View Full Quote Online</a>
            </div>

            <p>If you have any questions or would like to discuss your project further, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.</p>

            <p>We're excited about the possibility of working with you!</p>

            <p>Best regards,<br>The Magebase Team</p>
          </div>

          <div class="footer">
            <p>Magebase LLC • Wyoming-based Software Development<br>
            www.magebase.site • hello@magebase.site • +61 412 345 678</p>
          </div>
        </div>
      </body>
      </html>
    HTML
  end

  def self.generate_text_body(quote_request)
    <<~TEXT
      Your Project Quote is Ready!

      Dear #{quote_request.client&.company_name || quote_request.client&.contact_name || 'Valued Client'},

      Thank you for your interest in Magebase. We've analyzed your project requirements and created a comprehensive scope document with timeline and cost estimates.

      PROJECT SUMMARY
      ===============
      Project: #{quote_request.project_name}
      Estimated Timeline: #{quote_request.ai_pricing_data&.dig('timeline_days') || 30} working days
      Estimated Cost: $#{quote_request.estimated_cost&.to_i || 15000}
      Deposit Required: $#{(quote_request.estimated_cost&.to_f * 0.3)&.to_i || 4500}

      What's included in your scope document:
      - Detailed project breakdown and features
      - Timeline with milestone deliveries
      - Cost breakdown and payment terms
      - Technical specifications
      - Terms and conditions

      View your full quote online: #{Rails.application.routes.url_helpers.quote_request_url(quote_request, host: ENV['APP_URL'] || 'localhost:3000')}

      If you have any questions or would like to discuss your project further, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.

      We're excited about the possibility of working with you!

      Best regards,
      The Magebase Team

      ---
      Magebase LLC • Wyoming-based Software Development
      www.magebase.site • hello@magebase.site • +61 412 345 678
    TEXT
  end
end
