# frozen_string_literal: true

class QuoteReadyEmailService
  def self.send_quote_ready_email(quote_request)
    return unless quote_request.client&.email.present?

    # Create SES client
    ses_client = Aws::SES::Client.new(
      region: ENV["AWS_REGION"] || "us-east-1",
      access_key_id: ENV["AWS_SES_ACCESS_KEY_ID"],
      secret_access_key: ENV["AWS_SES_SECRET_ACCESS_KEY"]
    )

    # Prepare email content
    subject = "Your Project Quote is Ready - #{quote_request.project_name}"
    html_body = generate_html_body(quote_request)
    text_body = generate_text_body(quote_request)

    # Send email
    ses_client.send_email(
      source: "Magebase <hello@magebase.site>",
      destination: {
        to_addresses: [ quote_request.client.email ]
      },
      message: {
        subject: {
          data: subject,
          charset: "UTF-8"
        },
        body: {
          html: {
            data: html_body,
            charset: "UTF-8"
          },
          text: {
            data: text_body,
            charset: "UTF-8"
          }
        }
      }
    )
  rescue Aws::SES::Errors::ServiceError => e
    Rails.logger.error "Failed to send quote ready email: #{e.message}"
    raise
  end

  private

  def self.generate_html_body(quote_request)
    tenant = quote_request.tenant
    login_url = tenant ? "https://#{tenant.subdomain}.magebase.site/signin" : "https://magebase.site/signin"

    <<~HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Project Quote is Ready</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .login-options { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .login-button { display: inline-block; background: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px; }
          .password-button { display: inline-block; background: #6b7280; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Project Quote is Ready!</h1>
            <p>Sign in to view your detailed quote and project timeline</p>
          </div>

          <div class="content">
            <p>Dear #{quote_request.client&.company_name || quote_request.client&.contact_name || 'Valued Client'},</p>

            <p>Thank you for your interest in Magebase! We've analyzed your project requirements and created a comprehensive quote with timeline and cost estimates.</p>

            <div class="highlight-box">
              <h3>Project Summary</h3>
              <p><strong>Project:</strong> #{quote_request.project_name}</p>
              <p><strong>Estimated Timeline:</strong> #{quote_request.ai_pricing_data&.dig('timeline_days') || 30} working days</p>
              <p><strong>Estimated Cost:</strong> $#{quote_request.estimated_cost&.to_i || 15000}</p>
            </div>

            <div class="login-options">
              <h3>Sign In to View Your Quote</h3>
              <p>To access your detailed quote, project timeline, and download options, please sign in to your client dashboard:</p>

              <div style="text-align: center; margin: 20px 0;">
                <a href="#{login_url}" class="login-button">Sign In with Google</a>
                <a href="#{login_url}" class="password-button">Sign In with Password</a>
              </div>

              <p><strong>What you'll find in your dashboard:</strong></p>
              <ul>
                <li>Detailed project quote with cost breakdown</li>
                <li>Project timeline with milestone deliveries</li>
                <li>Downloadable PDF documents</li>
                <li>Shareable links for your team</li>
                <li>Change request submission form</li>
                <li>Project document management</li>
              </ul>
            </div>

            <p>If you have any questions or need assistance signing in, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.</p>

            <p>We're excited about the possibility of working with you!</p>

            <p>Best regards,<br>The Magebase Team</p>
          </div>

          <div class="footer">
            <p>Magebase • Custom Software Development<br>
            www.magebase.site • hello@magebase.site • +61 412 345 678</p>
          </div>
        </div>
      </body>
      </html>
    HTML
  end

  def self.generate_text_body(quote_request)
    tenant = quote_request.tenant
    login_url = tenant ? "https://#{tenant.subdomain}.magebase.site/signin" : "https://magebase.site/signin"

    <<~TEXT
      Your Project Quote is Ready!

      Dear #{quote_request.client&.company_name || quote_request.client&.contact_name || 'Valued Client'},

      Thank you for your interest in Magebase! We've analyzed your project requirements and created a comprehensive quote with timeline and cost estimates.

      PROJECT SUMMARY
      ===============
      Project: #{quote_request.project_name}
      Estimated Timeline: #{quote_request.ai_pricing_data&.dig('timeline_days') || 30} working days
      Estimated Cost: $#{quote_request.estimated_cost&.to_i || 15000}

      Sign In to View Your Quote
      ==========================
      To access your detailed quote, project timeline, and download options, please sign in to your client dashboard:

      Sign In: #{login_url}

      What you'll find in your dashboard:
      - Detailed project quote with cost breakdown
      - Project timeline with milestone deliveries
      - Downloadable PDF documents
      - Shareable links for your team
      - Change request submission form
      - Project document management

      If you have any questions or need assistance signing in, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.

      We're excited about the possibility of working with you!

      Best regards,
      The Magebase Team

      ---
      Magebase • Custom Software Development
      www.magebase.site • hello@magebase.site • +61 412 345 678
    TEXT
  end
end
