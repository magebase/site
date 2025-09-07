class DiscordNotificationService
  def self.notify_new_quote(quote_request)
    return unless ENV["DISCORD_WEBHOOK_URL"].present?

    message = {
      embeds: [ {
        title: "New Quote Request Received",
        description: "A new quote request has been submitted and is ready for review.",
        color: 0x00ff00,
        fields: [
          {
            name: "Project",
            value: quote_request.project_name,
            inline: true
          },
          {
            name: "Client",
            value: quote_request.client&.company_name || quote_request.client&.contact_name || "Unknown",
            inline: true
          },
          {
            name: "Estimated Cost",
            value: "$#{quote_request.estimated_cost&.round(2) || 'TBD'}",
            inline: true
          },
          {
            name: "Use Case",
            value: quote_request.use_case&.humanize || "Not specified",
            inline: false
          },
          {
            name: "Features",
            value: quote_request.selected_features.map(&:name).join(", "),
            inline: false
          }
        ],
        timestamp: Time.current.iso8601,
        footer: {
          text: "Magebase Quote System"
        }
      } ]
    }

    send_webhook(message)
  end

  def self.notify_quote_approved(quote_request)
    return unless ENV["DISCORD_WEBHOOK_URL"].present?

    message = {
      embeds: [ {
        title: "Quote Approved",
        description: "A quote has been approved and is ready for client acceptance.",
        color: 0x0099ff,
        fields: [
          {
            name: "Project",
            value: quote_request.project_name,
            inline: true
          },
          {
            name: "Client",
            value: quote_request.client&.company_name || quote_request.client&.contact_name || "Unknown",
            inline: true
          },
          {
            name: "Total Cost",
            value: "$#{quote_request.estimated_cost&.round(2) || 'TBD'}",
            inline: true
          },
          {
            name: "Proposal Link",
            value: quote_request.public_proposal_url || "Not available",
            inline: false
          }
        ],
        timestamp: Time.current.iso8601,
        footer: {
          text: "Magebase Quote System"
        }
      } ]
    }

    send_webhook(message)
  end

  def self.notify_quote_accepted(quote_request)
    return unless ENV["DISCORD_WEBHOOK_URL"].present?

    message = {
      embeds: [ {
        title: "Quote Accepted by Client",
        description: "A client has accepted their quote and the project is ready to begin.",
        color: 0xffa500,
        fields: [
          {
            name: "Project",
            value: quote_request.project_name,
            inline: true
          },
          {
            name: "Client",
            value: quote_request.client&.company_name || quote_request.client&.contact_name || "Unknown",
            inline: true
          },
          {
            name: "Deposit Amount",
            value: "$#{quote_request.deposit_amount&.round(2) || 'TBD'}",
            inline: true
          },
          {
            name: "Milestones",
            value: "#{quote_request.project_milestones.count} milestones created",
            inline: false
          }
        ],
        timestamp: Time.current.iso8601,
        footer: {
          text: "Magebase Quote System"
        }
      } ]
    }

    send_webhook(message)
  end

  private

  def self.send_webhook(message)
    return unless ENV["DISCORD_WEBHOOK_URL"].present?

    uri = URI(ENV["DISCORD_WEBHOOK_URL"])
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri)
    request["Content-Type"] = "application/json"
    request.body = message.to_json

    begin
      response = http.request(request)
      Rails.logger.info "Discord webhook sent: #{response.code}"
    rescue => e
      Rails.logger.error "Failed to send Discord webhook: #{e.message}"
    end
  end
end
