# Copilot Instructions — Magebase

Purpose

### User Stories

#### US-001: Client Quote Request

**As a** potential client  
**I want to** fill out an interactive quote form  
**So that** I can get an accurate price estimate for my project

**Acceptance Criteria:**

- Form guides me through feature selection
- Real-time cost updates as I select features
- Template selection speeds up the process
- Clear project timeline provided
- Secure payment process for deposit

#### US-002: AI Pricing Analysis

**As a** business owner  
**I want to** receive AI-powered pricing  
**So that** I get fair and accurate project estimates

**Acceptance Criteria:**

- Pricing considers feature complexity
- Timeline requirements factored in
- Integration complexity assessed
- Customization level evaluated
- Pricing accuracy within acceptable range

#### US-003: Contract Generation

**As a** client  
**I want to** receive a professional contract  
**So that** I have legal protection for my project

**Acceptance Criteria:**

- Contract uses Wyoming jurisdiction
- Terms specific to selected features
- AI-generated clauses are legally sound
- Digital signature capability
- PDF download available

#### US-004: Developer Allocation

**As a** development agency  
**I want to** automatically allocate developers to projects  
**So that** I can efficiently manage resource allocation

**Acceptance Criteria:**

- Discord notifications sent to team
- Developer skills matched to project requirements
- Project details securely shared
- Allocation confirmation received
- Resource scheduling updated

### Integration Requirements

#### INT-001: Stripe Payment Gateway

- Secure payment processing
- Webhook handling for payment events
- Refund management
- Subscription support for retainers
- PCI DSS compliance

#### INT-002: Discord Webhooks

- Real-time notifications for new projects
- Developer mention system
- Channel organization by project type
- Message formatting for project details
- Error handling for failed notifications

#### INT-003: AI Service (RubyLLM)

- GPT-4 integration for pricing analysis
- Project planning AI service
- Contract generation service
- Error handling for API failures
- Fallback pricing for AI unavailability

#### INT-004: Email Service

- Transactional email sending
- Template-based email design
- Delivery status tracking
- Bounce and complaint handling
- SMTP configuration for production

### Compliance Requirements

#### Legal Compliance

- **Wyoming Jurisdiction**: All contracts use Wyoming law
- **Business Formation**: Proper legal entity registration
- **Insurance**: Professional liability insurance
- **Contract Templates**: Legal review of AI-generated contracts
- **Data Processing**: GDPR and CCPA compliance

#### Industry Standards

- **OWASP Security**: Web application security standards
- **WCAG Accessibility**: Web content accessibility guidelines
- **ISO 27001**: Information security management
- **PCI DSS**: Payment card industry data security standard

## Business Requirements

### Core Features

#### 1. Interactive Quote Form

- **React Hook Form** powered form with validation
- **Feature Selection**: Large checkbox list including:
  - Admin dashboard
  - Blog/CMS functionality
  - Autoblogger (AI-powered content generation)
  - Redesign count (number of UI iterations)
  - App store release (iOS/Android)
  - External security audit
  - Customer service chatbot
  - Sales chatbot
  - Internationalization (i18n)
  - Stripe payment integration
  - Analytics integration
  - Automated digital marketing options
  - GDPR Compliance
  - Domain name setup
  - Custom integrations
  - API development
  - Database design
  - Performance optimization
  - SEO optimization
  - Mobile responsiveness
  - Accessibility compliance

#### 2. Common Use Case Templates

Pre-configured templates for:

- E-commerce platforms
- Social networking apps
- Tenant management systems
- Fitness tracking apps
- Casino/gaming applications
- Sports betting platforms
- Neo-banks/FinTech apps
- Generator hire services
- Tradesperson service apps
- Doctor's offices
- Veterinary clinics
- Dispensaries
- Digital marketing agencies
- Educational platforms
- Real estate applications
- Logistics and delivery apps
- Event management systems
- Marketplace platforms
- SaaS applications

#### 3. Retainer Fee Display

- Monthly hosting costs
- Maintenance allocations
- Small edits budget
- Dynamic pricing based on selected features

#### 4. Quote Generation Process

1. Form submission triggers Rails business rules evaluation
2. **AI-powered pricing** using RubyLLM based on:
   - Feature complexity
   - Customization level
   - Timeline requirements
   - Integration complexity
3. **AI-generated project plan** with:
   - Detailed delivery schedule
   - Milestone breakdown
   - Resource allocation
   - Risk assessment

#### 5. Contract Generation

- Wyoming jurisdiction contracts
- AI-generated clauses based on selected features
- Automatic legal compliance checks
- Digital signature integration

#### 6. Payment Processing

- Deposit payment page
- Integration with Stripe/PayPal
- Escrow functionality for project security
- Milestone-based payment releases

#### 7. Developer Allocation

- Discord notification system
- Automated developer matching
- Project management integration
- Resource scheduling

## Technical Architecture

### Backend Stack

- **PostgreSQL** database

### Frontend Stack

- **React 18+** with TypeScript
- **Inertia.js** for seamless SPA experience
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **React Hook Form** for form management
- **Zod** for schema validation

### Key Libraries and Gems

#### Backend Gems

```ruby
# Core functionality
gem 'rails', '~> 8.1'
gem 'pg'
gem 'puma'
gem 'redis'

# Authentication & Authorization
gem 'devise'
gem 'pundit'

# Admin interface
gem 'rails_admin'

# State management
gem 'aasm'

# Auditing
gem 'papertrail'

# Analytics
gem 'ahoy_matey'

# AI Integration
gem 'ruby_llm'

# Payment processing
gem 'stripe'
gem 'paypal-sdk-merchant'

# Testing
gem 'rspec-rails'
gem 'capybara'
gem 'selenium-webdriver'
gem 'database_cleaner'

# Deployment
gem 'kamal' # For deployment to Fly.io
```

#### Frontend Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "inertia-react": "^1.0.0",
  "@inertiajs/react": "^1.0.0",
  "react-hook-form": "^7.45.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0",
  "tailwindcss": "^3.3.0",
  "@shadcn/ui": "^0.0.1",
  "lucide-react": "^0.294.0"
}
```

## Database Design

### Core Models

#### QuoteRequest

```ruby
class QuoteRequest < ApplicationRecord
  include AASM

  belongs_to :client
  has_many :selected_features
  has_many :project_milestones
  has_one :contract
  has_many :payments

  # Project details
  string :project_name
  text :project_description
  string :use_case
  jsonb :selected_features
  jsonb :ai_pricing_data
  jsonb :project_plan

  # Pricing
  decimal :estimated_cost
  decimal :monthly_retainer
  decimal :deposit_amount

  # Status tracking
  aasm do
    state :draft, initial: true
    state :quoted
    state :contracted
    state :deposit_paid
    state :in_development
    state :completed

    event :generate_quote do
      transitions from: :draft, to: :quoted
    end

    event :accept_quote do
      transitions from: :quoted, to: :contracted
    end

    event :pay_deposit do
      transitions from: :contracted, to: :deposit_paid
    end

    event :start_development do
      transitions from: :deposit_paid, to: :in_development
    end

    event :complete do
      transitions from: :in_development, to: :completed
    end
  end
end
```

#### Feature

```ruby
class Feature < ApplicationRecord
  has_many :quote_request_features
  has_many :quote_requests, through: :quote_request_features

  string :name
  text :description
  string :category
  decimal :base_cost
  integer :complexity_level # 1-5
  jsonb :dependencies
  boolean :requires_customization
end
```

#### Client

```ruby
class Client < ApplicationRecord
  has_many :quote_requests
  has_many :contracts

  string :company_name
  string :contact_name
  string :email
  string :phone
  text :address
end
```

#### Contract

```ruby
class Contract < ApplicationRecord
  belongs_to :quote_request
  belongs_to :client

  text :generated_clauses
  string :jurisdiction # Default: Wyoming
  datetime :signed_at
  string :signature_method
  jsonb :contract_data
end
```

## AI Integration

### RubyLLM Implementation

#### Pricing AI Service

```ruby
class PricingAIService
  def calculate_price(quote_request)
    features = quote_request.selected_features
    use_case = quote_request.use_case
    customization_level = analyze_customization(features)

    prompt = build_pricing_prompt(features, use_case, customization_level)

    response = RubyLLM.complete(
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    )

    parse_pricing_response(response)
  end

  private

  def build_pricing_prompt(features, use_case, customization_level)
    # Build detailed prompt for AI pricing
  end
end
```

#### Project Planning AI Service

```ruby
class ProjectPlanningAIService
  def generate_plan(quote_request)
    # Generate detailed project timeline
    # Identify milestones
    # Estimate resource requirements
    # Assess risks
  end
end
```

#### Contract Generation AI Service

```ruby
class ContractGenerationAIService
  def generate_contract(quote_request)
    # Generate Wyoming jurisdiction contract clauses
    # Include feature-specific terms
    # Add compliance requirements
  end
end
```

- This document tells an assistant how to work on this repo: code conventions, run/dev, deploy, and priorities.

Quick context

- Rails 8 app with Vite + Inertia (React) frontend.
- PostgreSQL for persistence. Kamal used for deployment (see `config/deploy.yml`).
- Frontend lives under `app/frontend` (Vite entrypoints). Rails views in `app/views` provide the layout.

When asked to work

- Prioritize small, testable changes. Follow TDD where feasible. Create a failing test, implement minimal fix, run tests, commit.
- Always run `bin/rails db:create` then `bin/rails db:migrate` in dev if the DB is missing.
- For frontend work: run Vite and Rails together (see `Procfile.dev`): `bin/dev` or run processes separately (`bin/rails s` and `bin/vite dev`).

Developer workflows & commands

- Install gems: `bundle install`
- Create DB: `bin/rails db:create db:migrate db:seed`
- Run dev (two terminals):
  - `bin/rails s`
  - `bin/vite dev`

Testing

- Use `bin/rails test` for Ruby tests. Add minimal system tests for critical flows.

Commit & PR guidance

- Use clear, descriptive commit messages. Keep changes small.
- Open PRs against `main` and include: summary, testing performed, and migration notes.
- Run CI (if present) before merging.

Security & secrets

- Keep secrets out of the repo. `config/deploy.yml` references secrets via environment variables.
- Use `.env` locally for non-production secrets; never commit `master.key` or real credentials.

Deployment notes

- Ensure SSH key for `deploy` is configured when running `kamal setup`.

If you need help

- Ask for missing environment details, test credentials, or an account for external services (Stripe, Xero, etc.).

---

File locations referenced frequently:

- `config/deploy.yml` — deploy targets and env
- `app/frontend` — Vite/React code
- `app/views/layouts/application.html.erb` — main HTML template

End of Copilot instructions
