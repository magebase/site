class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def stripe
    payload = request.body.read
    sig_header = request.env["HTTP_STRIPE_SIGNATURE"]
    endpoint_secret = ENV["STRIPE_WEBHOOK_SECRET"]

    begin
      event = Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
    rescue JSON::ParserError => e
      Rails.logger.error "Stripe webhook signature verification failed: #{e.message}"
      head :bad_request
      return
    rescue Stripe::SignatureVerificationError => e
      Rails.logger.error "Stripe webhook signature verification failed: #{e.message}"
      head :bad_request
      return
    end

    # Handle the event
    case event["type"]
    when "payment_intent.succeeded"
      payment_intent = event["data"]["object"]
      handle_payment_success(payment_intent)
    when "invoice.payment_succeeded"
      invoice = event["data"]["object"]
      handle_invoice_payment_success(invoice)
    when "customer.created"
      customer = event["data"]["object"]
      handle_customer_created(customer)
    else
      Rails.logger.info "Unhandled event type: #{event['type']}"
    end

    head :ok
  end

  private

  def handle_payment_success(payment_intent)
    # Find the quote request associated with this payment
    invoice_id = payment_intent["metadata"]["invoice_id"]
    return unless invoice_id

    invoice = Stripe::Invoice.retrieve(invoice_id)
    quote_request = QuoteRequest.find_by(stripe_invoice_id: invoice_id)

    if quote_request && payment_intent["amount_received"] >= quote_request.deposit_amount.to_i * 100
      # Mark deposit as paid
      quote_request.pay_deposit!

      # Send Discord notification
      DiscordNotificationService.notify_quote_accepted(quote_request)

      Rails.logger.info "Payment successful for quote request #{quote_request.id}, invoice #{invoice.id}"
    end
  end

  def handle_invoice_payment_success(invoice)
    quote_request = QuoteRequest.find_by(stripe_invoice_id: invoice.id)

    if quote_request
      # Update payment status
      Payment.create!(
        quote_request: quote_request,
        amount: invoice.amount_paid / 100.0, # Convert from cents
        stripe_payment_id: invoice.payment_intent,
        status: "completed",
        payment_type: "invoice"
      )

      Rails.logger.info "Invoice payment successful for quote request #{quote_request.id}"
    end
  end

  def handle_customer_created(customer)
    # Find client by email and update stripe_customer_id
    client = Client.find_by(email: customer.email)
    if client
      client.update!(stripe_customer_id: customer.id)
      Rails.logger.info "Updated client #{client.id} with Stripe customer ID #{customer.id}"
    end
  end
end
