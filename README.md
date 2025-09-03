# AI Service
# Database
# Discord Integration
# Email Service
# Magebase - Development Agency Quote Management System
# NOTE: With CloudNativePG, DATABASE_URL is automatically generated
# Payment Processing
# Run all Ruby tests
# Run frontend tests
# Run specific test file
# Run with coverage
# Run with coverage
# Run with coverage
# Terminal 1 - Rails server
# Terminal 2 - Vite dev server
# by the operator and stored in the 'magebase-db-creds' Kubernetes Secret
## API Endpoints
## Contributing
## Deployment
## Development Setup
## Features
## Key Features Implementation
## License
## Project Structure
## Security & Compliance
## TDD Workflow
## Testing
### AI Integration
### Alternative: Run processes separately
### Core Functionality
### Environment Variables
### Features API
### Frontend Testing
### Important Rules
### Installation
### Prerequisites
### Production Deployment
### Quote Requests
### Quote Requests Management
### Recent TDD Implementation
### Ruby Tests
### System Tests
### Technology Stack
### Testing Commands
### Timeline Features
### ✅ Commit Message
### 🛠 REFACTOR Phase
### 🟥 RED Phase
### 🟩 GREEN Phase
#### Backend
#### Frontend
**AASM State Machine for QuoteRequest Model:**
**Requirements:**
- **AI-Powered Pricing**: Intelligent project estimation using RubyLLM
- **Always run full test suite before committing**
- **CSV Export**: Structured data export compatible with project management tools
- **Contract Generation**: AI-assisted contract creation
- **Contract Generation**: Automated contract creation with Wyoming jurisdiction
- **Devise** for authentication
- **Discord Integration**: Team notifications for new projects
- **Each loop should be tight and focused** - no solving 3 things at once
- **GDPR/CCPA**: Data protection compliance
- **Index Page**: `/quote_requests` - List all quote requests with status badges
- **Inertia.js** for seamless SPA experience
- **Interactive Quote Forms**: Dynamic feature selection with real-time cost updates
- **No skipping steps** - always follow RED → GREEN → REFACTOR
- **No test-first = no code**
- **OWASP Security Standards**: Web application security compliance
- **Only commit on clean GREEN**
- **PCI DSS**: Payment card industry data security standard
- **PDF & CSV Export**: Professional document generation for project management
- **PDF Generation**: Client-side PDF creation using react-pdf
- **Payment Processing**: Stripe integration for secure deposits
- **PostgreSQL** database
- **Pricing AI**: RubyLLM-powered cost estimation
- **Project Planning**: Automated timeline and milestone generation
- **Pundit** for authorization
- **Rails 8.0** with Ruby 3.4.5
- **React 18+** with TypeScript
- **React Hook Form** with Zod validation
- **React PDF** for client-side PDF generation
- **RubyLLM** for AI services
- **Shadcn/ui** component library
- **Show Page**: `/quote_requests/:id` - Detailed view with timeline teaser
- **SolidCache** for caching (replaced Sidekiq)
- **Tailwind CSS** for styling
- **Teaser View**: Show first 3 days with "See More" functionality
- **Timeline CSV**: `/quote_requests/:id/timeline_csv` - CSV export for project management
- **Timeline Generation**: Visual project timelines with day-by-day deliverables
- **Timeline PDF**: `/quote_requests/:id/timeline_pdf` - Full timeline PDF generation
- **Use `bin/rails test` for Ruby tests**
- **Use `npm test` for frontend tests**
- **Vertical Timeline**: Eye-catching day-by-day project visualization
- **Vite** for build system
- **WCAG Accessibility**: Web content accessibility guidelines
- **Wyoming Jurisdiction**: All contracts use Wyoming law
- Always commit and push on GREEN
- Always do a full PR review of your own code before merging, leave comments,
- Always make sure all workflow runs are successful before merging the
- Always make sure the test suite is green before making a commit
- Always merge the PR into main when done and create a release when the main
- Always raise a PR on first commit of a new branch
- Always resolve the linked issue after merging the PR
- Always resolve the review comments on the PR
- Always use the MCP to link the PR to the relevant issue in the github repo
- Environment variables configured in `config/deploy.yml`
- Include detailed comments explaining the purpose of each function, class,
- Node.js 18+
- PostgreSQL
- Redis (for SolidCache)
- Ruby 3.4.5
- SSL certificates managed automatically
- Uses **Kamal** for deployment to Fly.io
- Zero-downtime deployments
- `GET /api/features` - List available features
- `GET /quote_requests/:id/timeline_csv` - Timeline CSV download
- `GET /quote_requests/:id/timeline_pdf` - Timeline PDF page
- `GET /quote_requests/:id` - Show specific quote request
- `GET /quote_requests` - List all quote requests
- `POST /api/quotes/estimate` - AI-powered quote estimation
- `POST /quote_requests/:id/accept_quote` - Accept quote
- `POST /quote_requests/:id/generate_quote` - Generate quote
- `POST /quote_requests` - Create new quote request
- `PUT /quote_requests/:id` - Update quote request
- ✅ Added `aasm` gem to Gemfile
- ✅ Added tests for initial state and state transitions
- ✅ All tests passing
- ✅ Implemented state machine with states: draft, quoted, contracted,
1. **Avoid overengineering** or anticipating future needs
1. **Clone the repository**
1. **Confirm that all tests pass** (existing + new)
1. **Database setup**
1. **Do not write any implementation code yet**
1. **Explain what the test is verifying and why**
1. **Implement the simplest code** to make the test pass
1. **Install Node.js dependencies**
1. **Install Ruby dependencies**
1. **Label this step: # GREEN**
1. **Label this step: # RED**
1. **Start development servers**
1. **Write a failing test** for the next smallest unit of behavior
1. Ensure all tests pass before committing
1. Follow the TDD workflow for all changes
1. Update documentation for new features
1. Use the established coding patterns and conventions
1. Write clear, descriptive commit messages
A modern Rails 8 application with React frontend for managing project quotes,
Always commit with a descriptive message that includes the issue number and a short description of the changes:
COVERAGE=true bin/rails test
DISCORD*WEBHOOK_URL=https://discord.com/api/webhooks/...
During REFACTOR, do NOT change anything besides any necessary updates to the
PR
README. Instead, help me plan to refactor my existing code to improve
RUBYLLM_API_KEY=your_api_key
SMTP_PASSWORD=your_smtp_password
SMTP_USERNAME=your_smtp_username
STRIPE*SECRET_KEY=sk*...
STRIPE_PUBLISHABLE_KEY=pk*...
This project follows a strict Test-Driven Development approach with these phases:
This project is proprietary software for Magebase development agency.
This will start Rails (port 3000) and Vite (port 5173) using Overmind.
When I am ready, proceed again to RED.
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
```
```
```
```
`````
`````
````bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
```bash
and request changes if needed
app/
bin/dev
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
bin/rails s
bin/rails test
bin/rails test
bin/rails test test/models/quote_request_test.rb
bin/rails test:system
bin/vite dev
bundle install
cd magebase/site
config/                   # Rails configuration
db/                       # Database schema and migrations
deployment is successful
deposit_paid, in_development, completed
feat: implement [feature/behavior] to pass test
featuring AI-powered pricing, timeline generation, and comprehensive project
git clone <repository-url>
management tools.
npm install
npm test
npm test
readability, structure, or performance.
test/                     # Test files
type, and complex logic in the code
│   └── types/            # TypeScript type definitions
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components (Inertia.js)
└── views/                # Rails views (layouts)
├── controllers/           # Rails controllers
├── frontend/              # React/TypeScript frontend
├── models/               # Rails models
├── services/             # Business logic services
# Test
