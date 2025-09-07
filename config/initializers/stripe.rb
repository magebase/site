# Stripe Configuration
require "stripe"

Stripe.api_key = ENV["STRIPE_API_KEY"]
Stripe.api_version = "2024-06-20"

# Configure webhook endpoint secret
STRIPE_WEBHOOK_SECRET = ENV["STRIPE_WEBHOOK_SECRET"]

# Configure publishable key for frontend
STRIPE_PUBLISHABLE_KEY = ENV["STRIPE_PUBLISHABLE_KEY"]
