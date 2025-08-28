# frozen_string_literal: true

class QuoteEmailJob < ApplicationJob
  queue_as :default

  def perform(quote_request_id, pdf_data)
    quote_request = QuoteRequest.find(quote_request_id)
    QuoteEmailService.send_quote_email(quote_request, pdf_data)
  rescue StandardError => e
    Rails.logger.error "Failed to send quote email for request #{quote_request_id}: #{e.message}"
    # Could implement retry logic or notification to admin here
  end
end
