source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.2", ">= 8.0.2.1"
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Use the database-backed adapters for Rails.cache, Active Job, and Action Cable
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Analytics
gem "ahoy_matey", "~> 5.0"

# Authorization
gem "pundit", "~> 2.3"

# Security headers
gem "secure_headers", "~> 7.1"

# State machine
gem "aasm", "~> 5.5"

# Authentication
gem "devise", "~> 4.9"
gem "omniauth", "~> 2.1"
gem "omniauth-google-oauth2", "~> 1.1"

# AI Integration
gem "ruby_llm", "~> 1.6"

# Multi-tenancy
gem "activerecord-multi-tenant", github: "citusdata/activerecord-multi-tenant", branch: "master"

# N+1 query optimization
gem "goldiloader", "~> 5.2"

# Testing gems
gem "database_cleaner", "~> 2.0"
gem "factory_bot_rails", "~> 6.4"
gem "vcr", "~> 6.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  # Bundle audit for checking gem vulnerabilities [https://github.com/rubysec/bundler-audit]
  gem "bundler-audit", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false

  # Generate fake data
  gem "faker", "~> 3.2"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add schema annotations to Rails models [https://github.com/drwl/annotaterb]
  gem "annotaterb", "~> 4.19"

  # Preview emails in browser during development [https://github.com/ryanb/letter_opener]
  gem "letter_opener", "~> 1.10"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "playwright-ruby-client"
  gem "capybara-playwright-driver"
end

gem "inertia_rails", "~> 3.10"

gem "vite_rails", "~> 3.0"

# Admin interface
gem "rails_admin", "~> 3.1"

# Pagination
gem "will_paginate", "~> 4.0"


# Friendly ID for permalinks
gem "friendly_id", "~> 5.5"


# Stripe for payment processing
gem "stripe", "~> 15.5"

# Discord notifications
gem "discordrb", "~> 3.5"

# Email sending
gem "aws-actionmailer-ses", "~> 1.0"
