# frozen_string_literal: true

class DiscordNotificationJob < ApplicationJob
  queue_as :default

  def perform(notification_type, quote_request_id, options = {})
    quote_request = QuoteRequest.find(quote_request_id)

    case notification_type
    when "new_quote"
      DiscordNotificationService.notify_new_quote(quote_request)
    when "quote_approved"
      DiscordNotificationService.notify_quote_approved(quote_request)
    when "quote_accepted"
      DiscordNotificationService.notify_quote_accepted(quote_request)
    end
  rescue StandardError => e
    Rails.logger.error "Failed to send Discord notification #{notification_type} for quote #{quote_request_id}: #{e.message}"
  end
end
