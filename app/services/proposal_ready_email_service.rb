# frozen_string_literal: true

class ProposalReadyEmailService
  def self.send_proposal_ready_email(quote_request)
    return unless quote_request.client&.email.present? && quote_request.proposal_token.present?

    # Create SES client
    ses_client = Aws::SES::Client.new(
      region: ENV['AWS_REGION'] || 'us-east-1',
      access_key_id: ENV['AWS_SES_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SES_SECRET_ACCESS_KEY']
    )

    # Prepare email content
    subject = "Your Project Proposal - #{quote_request.project_name}"
    html_body = generate_html_body(quote_request)
    text_body = generate_text_body(quote_request)

    # Send email
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
      }
    )
  rescue Aws::SES::Errors::ServiceError => e
    Rails.logger.error "Failed to send proposal ready email: #{e.message}"
    raise
  end

  private

  def self.generate_html_body(quote_request)
    proposal_url = quote_request.public_proposal_url

    <<~HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Project Proposal is Ready</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Project Proposal is Ready!</h1>
            <p>View your detailed proposal with timeline and pricing</p>
          </div>

          <div class="content">
            <p>Hi #{quote_request.client&.contact_name || quote_request.client&.company_name || 'Valued Client'},</p>

            <p>Thank you for your interest in Magebase! We've created a comprehensive proposal for your project.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="#{proposal_url}" class="cta-button">View Your Proposal</a>
            </div>

            <p><strong>What you'll find in your proposal:</strong></p>
            <ul>
              <li>Detailed project breakdown by phases</li>
              <li>Complete timeline with milestones</li>
              <li>Transparent pricing structure</li>
              <li>What's included and what's not</li>
              <li>Easy acceptance and payment options</li>
            </ul>

            <p>The proposal link is secure and can be accessed without creating an account. You can share it with your team for review.</p>

            <p>If you have any questions, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.</p>

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
    proposal_url = quote_request.public_proposal_url

    <<~TEXT
      Your Project Proposal is Ready!

      Hi #{quote_request.client&.contact_name || quote_request.client&.company_name || 'Valued Client'},

      Thank you for your interest in Magebase! We've created a comprehensive proposal for your project.

      View your proposal here: #{proposal_url}

      What you'll find in your proposal:
      - Detailed project breakdown by phases
      - Complete timeline with milestones
      - Transparent pricing structure
      - What's included and what's not
      - Easy acceptance and payment options

      The proposal link is secure and can be accessed without creating an account. You can share it with your team for review.

      If you have any questions, please don't hesitate to contact us at hello@magebase.site or call +61 412 345 678.

      We're excited about the possibility of working with you!

      Best regards,
      The Magebase Team

      ---
      Magebase • Custom Software Development
      www.magebase.site • hello@magebase.site • +61 412 345 678
    TEXT
  end
end
