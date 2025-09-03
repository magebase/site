      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      temperature: 0.3
      transitions from: :contracted, to: :deposit_paid
      transitions from: :deposit_paid, to: :in_development
      transitions from: :draft, to: :quoted
      transitions from: :in_development, to: :completed
      transitions from: :quoted, to: :contracted
    # Add compliance requirements
    # Assess risks
    # Build detailed prompt for AI pricing
    # Estimate resource requirements
    # Generate Wyoming jurisdiction contract clauses
    # Generate detailed project timeline
    # Identify milestones
    # Include feature-specific terms
    )
    customization_level = analyze_customization(features)
    end
    end
    end
    end
    end
    event :accept_quote do
    event :complete do
    event :generate_quote do
    event :pay_deposit do
    event :start_development do
    features = quote_request.selected_features
    parse_pricing_response(response)
    prompt = build_pricing_prompt(features, use_case, customization_level)
    response = RubyLLM.complete(
    state :completed
    state :contracted
    state :deposit_paid
    state :draft, initial: true
    state :in_development
    state :quoted
    use_case = quote_request.use_case
   Commit & PR guidance
   Deployment notes
   Developer workflows & commands
   End of Copilot instructions
   File locations referenced frequently:
   If you need help
   Pre-configured templates for:
   Purpose
   Quick context
   Security & secrets
   Testing
   When asked to work
"@hookform/resolvers": "^3.3.0",
"@inertiajs/react": "^1.0.0",
"@shadcn/ui": "^0.0.1",
"inertia-react": "^1.0.0",
"lucide-react": "^0.294.0"
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.45.0",
"tailwindcss": "^3.3.0",
"zod": "^3.22.0",
# AI Integration
# Admin interface
# Analytics
# Auditing
# Authentication & Authorization
# Copilot Instructions — Magebase
# Core functionality
# Deployment
# Payment processing
# Pricing
# Project details
# State management
# Status tracking
# Testing
## AI Integration
## Business Requirements
## Database Design
## Technical Architecture
### Backend Stack
### Compliance Requirements
### Core Features
### Core Models
### Frontend Stack
### Integration Requirements
### Key Libraries and Gems
### RubyLLM Implementation
### User Stories
#### 1. Interactive Quote Form
#### 2. Common Use Case Templates
#### 3. Retainer Fee Display
#### 4. Quote Generation Process
#### 5. Contract Generation
#### 6. Payment Processing
#### 7. Developer Allocation
#### Backend Gems
#### Client
#### Contract
#### Contract Generation AI Service
#### Feature
#### Frontend Dependencies
#### INT-001: Stripe Payment Gateway
#### INT-002: Discord Webhooks
#### INT-003: AI Service (RubyLLM)
#### INT-004: Email Service
#### Industry Standards
#### Legal Compliance
#### Pricing AI Service
#### Project Planning AI Service
#### QuoteRequest
#### US-001: Client Quote Request
#### US-002: AI Pricing Analysis
#### US-003: Contract Generation
#### US-004: Developer Allocation
**Acceptance Criteria:**
**Acceptance Criteria:**
**Acceptance Criteria:**
**Acceptance Criteria:**
**As a** business owner
**As a** client
**As a** development agency
**As a** potential client
**I want to** automatically allocate developers to projects
**I want to** fill out an interactive quote form
**I want to** receive AI-powered pricing
**I want to** receive a professional contract
**So that** I can efficiently manage resource allocation
**So that** I can get an accurate price estimate for my project
**So that** I get fair and accurate project estimates
**So that** I have legal protection for my project
- **Business Formation**: Proper legal entity registration
- **Contract Templates**: Legal review of AI-generated contracts
- **Data Processing**: GDPR and CCPA compliance
- **Feature Selection**: Large checkbox list including:
- **ISO 27001**: Information security management
- **Inertia.js** for seamless SPA experience
- **Insurance**: Professional liability insurance
- **OWASP Security**: Web application security standards
- **PCI DSS**: Payment card industry data security standard
- **PostgreSQL** database
- **React 18+** with TypeScript
- **React Hook Form** for form management
- **React Hook Form** powered form with validation
- **Shadcn/ui** component library
- **Tailwind CSS** for styling
- **WCAG Accessibility**: Web content accessibility guidelines
- **Wyoming Jurisdiction**: All contracts use Wyoming law
- **Zod** for schema validation
- AI-generated clauses are legally sound
- AI-generated clauses based on selected features
- API development
- Accessibility compliance
- Admin dashboard
- Allocation confirmation received
- Always run `bin/rails db:create` then `bin/rails db:migrate` in dev if the DB is missing.
- Analytics integration
- App store release (iOS/Android)
- Ask for missing environment details, test credentials, or an account for external services (Stripe, Xero, etc.).
- Autoblogger (AI-powered content generation)
- Automated developer matching
- Automated digital marketing options
- Automatic legal compliance checks
- Blog/CMS functionality
- Bounce and complaint handling
- Casino/gaming applications
- Channel organization by project type
- Clear project timeline provided
- Contract generation service
- Contract uses Wyoming jurisdiction
- Create DB: `bin/rails db:create db:migrate db:seed`
- Custom integrations
- Customer service chatbot
- Customization level
- Customization level evaluated
- Database design
- Delivery status tracking
- Deposit payment page
- Detailed delivery schedule
- Developer mention system
- Developer skills matched to project requirements
- Digital marketing agencies
- Digital signature capability
- Digital signature integration
- Discord notification system
- Discord notifications sent to team
- Dispensaries
- Doctor's offices
- Domain name setup
- Dynamic pricing based on selected features
- E-commerce platforms
- Educational platforms
- Ensure SSH key for `deploy` is configured when running `kamal setup`.
- Error handling for API failures
- Error handling for failed notifications
- Escrow functionality for project security
- Event management systems
- External security audit
- Fallback pricing for AI unavailability
- Feature complexity
- Fitness tracking apps
- For frontend work: run Vite and Rails together (see `Procfile.dev`): `bin/dev` or run processes separately (`bin/rails s` and `bin/vite dev`).
- Form guides me through feature selection
- Frontend lives under `app/frontend` (Vite entrypoints). Rails views in `app/views` provide the layout.
- GDPR Compliance
- GPT-4 integration for pricing analysis
- Generator hire services
- Install gems: `bundle install`
- Integration complexity
- Integration complexity assessed
- Integration with Stripe/PayPal
- Internationalization (i18n)
- Keep secrets out of the repo. `config/deploy.yml` references secrets via environment variables.
- Logistics and delivery apps
- Maintenance allocations
- Marketplace platforms
- Message formatting for project details
- Milestone breakdown
- Milestone-based payment releases
- Mobile responsiveness
- Monthly hosting costs
- Neo-banks/FinTech apps
- Open PRs against `main` and include: summary, testing performed, and migration notes.
- PCI DSS compliance
- PDF download available
- Performance optimization
- PostgreSQL for persistence. Kamal used for deployment (see `config/deploy.yml`).
- Pricing accuracy within acceptable range
- Pricing considers feature complexity
- Prioritize small, testable changes. Follow TDD where feasible. Create a failing test, implement minimal fix, run tests, commit.
- Project details securely shared
- Project management integration
- Project planning AI service
- Rails 8 app with Vite + Inertia (React) frontend.
- Real estate applications
- Real-time cost updates as I select features
- Real-time notifications for new projects
- Redesign count (number of UI iterations)
- Refund management
- Resource allocation
- Resource scheduling
- Resource scheduling updated
- Risk assessment
- Run CI (if present) before merging.
- Run dev (two terminals):
- SEO optimization
- SMTP configuration for production
- SaaS applications
- Sales chatbot
- Secure payment process for deposit
- Secure payment processing
- Small edits budget
- Social networking apps
- Sports betting platforms
- Stripe payment integration
- Subscription support for retainers
- Template selection speeds up the process
- Template-based email design
- Tenant management systems
- Terms specific to selected features
- This document tells an assistant how to work on this repo: code conventions, run/dev, deploy, and priorities.
- Timeline requirements
- Timeline requirements factored in
- Tradesperson service apps
- Transactional email sending
- Use `.env` locally for non-production secrets; never commit `master.key` or real credentials.
- Use `bin/rails test` for Ruby tests. Add minimal system tests for critical flows.
- Use clear, descriptive commit messages. Keep changes small.
- Veterinary clinics
- Webhook handling for payment events
- Wyoming jurisdiction contracts
- `app/frontend` — Vite/React code
- `app/views/layouts/application.html.erb` — main HTML template
- `bin/rails s`
- `bin/vite dev`
- `config/deploy.yml` — deploy targets and env
---
1. Form submission triggers Rails business rules evaluation
2. **AI-powered pricing** using RubyLLM based on:
3. **AI-generated project plan** with:
```
```
```
```
```
```
```
```
```
```
```
```
`````
`````
````json
```ruby
```ruby
```ruby
```ruby
```ruby
```ruby
```ruby
```ruby
aasm do
belongs_to :client
belongs_to :client
belongs_to :quote_request
boolean :requires_customization
class Client < ApplicationRecord
class Contract < ApplicationRecord
class ContractGenerationAIService
class Feature < ApplicationRecord
class PricingAIService
class ProjectPlanningAIService
class QuoteRequest < ApplicationRecord
datetime :signed_at
decimal :base_cost
decimal :deposit_amount
decimal :estimated_cost
decimal :monthly_retainer
def build_pricing_prompt(features, use_case, customization_level)
def calculate_price(quote_request)
def generate_contract(quote_request)
def generate_plan(quote_request)
end
end
end
end
end
end
end
end
end
end
end
end
gem 'aasm'
gem 'ahoy_matey'
gem 'capybara'
gem 'database_cleaner'
gem 'devise'
gem 'kamal' # For deployment to Fly.io
gem 'papertrail'
gem 'paypal-sdk-merchant'
gem 'pg'
gem 'puma'
gem 'pundit'
gem 'rails', '~> 8.1'
gem 'rails_admin'
gem 'redis'
gem 'rspec-rails'
gem 'ruby_llm'
gem 'selenium-webdriver'
gem 'stripe'
has_many :contracts
has_many :payments
has_many :project_milestones
has_many :quote_request_features
has_many :quote_requests
has_many :quote_requests, through: :quote_request_features
has_many :selected_features
has_one :contract
include AASM
integer :complexity_level # 1-5
jsonb :ai_pricing_data
jsonb :contract_data
jsonb :dependencies
jsonb :project_plan
jsonb :selected_features
private
string :category
string :company_name
string :contact_name
string :email
string :jurisdiction # Default: Wyoming
string :name
string :phone
string :project_name
string :signature_method
string :use_case
text :address
text :description
text :generated_clauses
text :project_description
{
}
