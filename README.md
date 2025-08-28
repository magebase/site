# Magebase - Development Agency Quote Management System

A modern Rails 8 application with React frontend for managing project quotes, featuring AI-powered pricing, timeline generation, and comprehensive project management tools.

## Features

### Core Functionality

- **Interactive Quote Forms**: Dynamic feature selection with real-time cost updates
- **AI-Powered Pricing**: Intelligent project estimation using RubyLLM
- **Timeline Generation**: Visual project timelines with day-by-day deliverables
- **PDF & CSV Export**: Professional document generation for project management
- **Contract Generation**: Automated contract creation with Wyoming jurisdiction
- **Discord Integration**: Team notifications for new projects
- **Payment Processing**: Stripe integration for secure deposits

### Technology Stack

#### Backend

- **Rails 8.0** with Ruby 3.4.5
- **PostgreSQL** database
- **SolidCache** for caching (replaced Sidekiq)
- **RubyLLM** for AI services
- **Pundit** for authorization
- **Devise** for authentication

#### Frontend

- **React 18+** with TypeScript
- **Inertia.js** for seamless SPA experience
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **React Hook Form** with Zod validation
- **React PDF** for client-side PDF generation
- **Vite** for build system

## Development Setup

### Prerequisites

- Ruby 3.4.5
- Node.js 18+
- PostgreSQL
- Redis (for SolidCache)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd magebase/site
   ```

2. **Install Ruby dependencies**

   ```bash
   bundle install
   ```

3. **Install Node.js dependencies**

   ```bash
   npm install
   ```

4. **Database setup**

   ```bash
   bin/rails db:create
   bin/rails db:migrate
   bin/rails db:seed
   ```

5. **Start development servers**
   ```bash
   bin/dev
   ```
   This will start Rails (port 3000) and Vite (port 5173) using Overmind.

### Alternative: Run processes separately

```bash
# Terminal 1 - Rails server
bin/rails s

# Terminal 2 - Vite dev server
bin/vite dev
```

## TDD Workflow

This project follows a strict Test-Driven Development approach with these phases:

### 🟥 RED Phase

1. **Write a failing test** for the next smallest unit of behavior
2. **Do not write any implementation code yet**
3. **Explain what the test is verifying and why**
4. **Label this step: # RED**

### 🟩 GREEN Phase

1. **Implement the simplest code** to make the test pass
2. **Avoid overengineering** or anticipating future needs
3. **Confirm that all tests pass** (existing + new)
4. **Label this step: # GREEN**

### ✅ Commit Message

Always commit with a descriptive message that includes the issue number and a short description of the changes:

```
feat: implement [feature/behavior] to pass test
```

**Requirements:**

- Always commit and push on GREEN
- Always raise a PR on first commit of a new branch
- Always merge the PR into main when done and create a release when the main deployment is successful
- Include detailed comments explaining the purpose of each function, class, type, and complex logic in the code
- Always do a full PR review of your own code before merging, leave comments, and request changes if needed
- Always resolve the review comments on the PR
- Always use the MCP to link the PR to the relevant issue in the github repo
- Always resolve the linked issue after merging the PR
- Always make sure the test suite is green before making a commit
- Always make sure all workflow runs are successful before merging the PR

### 🛠 REFACTOR Phase

During REFACTOR, do NOT change anything besides any necessary updates to the README. Instead, help me plan to refactor my existing code to improve readability, structure, or performance.

When I am ready, proceed again to RED.

### Important Rules

- **No skipping steps** - always follow RED → GREEN → REFACTOR
- **No test-first = no code**
- **Only commit on clean GREEN**
- **Each loop should be tight and focused** - no solving 3 things at once
- **Use `bin/rails test` for Ruby tests**
- **Use `npm test` for frontend tests**
- **Always run full test suite before committing**

### Recent TDD Implementation

**AASM State Machine for QuoteRequest Model:**

- ✅ Added `aasm` gem to Gemfile
- ✅ Implemented state machine with states: draft, quoted, contracted, deposit_paid, in_development, completed
- ✅ Added tests for initial state and state transitions
- ✅ All tests passing

### Testing Commands

```bash
# Run all Ruby tests
bin/rails test

# Run specific test file
bin/rails test test/models/quote_request_test.rb

# Run frontend tests
npm test

# Run with coverage
# Run with coverage
# Run with coverage
COVERAGE=true bin/rails test
```

## Project Structure

```bash
app/
├── controllers/           # Rails controllers
├── frontend/              # React/TypeScript frontend
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components (Inertia.js)
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── models/               # Rails models
├── services/             # Business logic services
└── views/                # Rails views (layouts)

config/                   # Rails configuration
db/                       # Database schema and migrations
test/                     # Test files
```

## Key Features Implementation

### Quote Requests Management

- **Index Page**: `/quote_requests` - List all quote requests with status badges
- **Show Page**: `/quote_requests/:id` - Detailed view with timeline teaser
- **Timeline PDF**: `/quote_requests/:id/timeline_pdf` - Full timeline PDF generation
- **Timeline CSV**: `/quote_requests/:id/timeline_csv` - CSV export for project management

### Timeline Features

- **Vertical Timeline**: Eye-catching day-by-day project visualization
- **Teaser View**: Show first 3 days with "See More" functionality
- **PDF Generation**: Client-side PDF creation using react-pdf
- **CSV Export**: Structured data export compatible with project management tools

### AI Integration

- **Pricing AI**: RubyLLM-powered cost estimation
- **Project Planning**: Automated timeline and milestone generation
- **Contract Generation**: AI-assisted contract creation

## API Endpoints

### Quote Requests

- `GET /quote_requests` - List all quote requests
- `GET /quote_requests/:id` - Show specific quote request
- `POST /quote_requests` - Create new quote request
- `PUT /quote_requests/:id` - Update quote request
- `POST /quote_requests/:id/generate_quote` - Generate quote
- `POST /quote_requests/:id/accept_quote` - Accept quote
- `GET /quote_requests/:id/timeline_pdf` - Timeline PDF page
- `GET /quote_requests/:id/timeline_csv` - Timeline CSV download

### Features API

- `GET /api/features` - List available features
- `POST /api/quotes/estimate` - AI-powered quote estimation

## Deployment

### Production Deployment

- Uses **Kamal** for deployment to Fly.io
- Environment variables configured in `config/deploy.yml`
- SSL certificates managed automatically
- Zero-downtime deployments

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# AI Service
RUBYLLM_API_KEY=your_api_key

# Payment Processing
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Discord Integration
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Email Service
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
```

## Testing

### Ruby Tests

```bash
bin/rails test
```

### System Tests

```bash
bin/rails test:system
```

### Frontend Testing

```bash
npm test
```

## Security & Compliance

- **OWASP Security Standards**: Web application security compliance
- **WCAG Accessibility**: Web content accessibility guidelines
- **PCI DSS**: Payment card industry data security standard
- **GDPR/CCPA**: Data protection compliance
- **Wyoming Jurisdiction**: All contracts use Wyoming law

## Contributing

1. Follow the TDD workflow for all changes
2. Write clear, descriptive commit messages
3. Update documentation for new features
4. Ensure all tests pass before committing
5. Use the established coding patterns and conventions

## License

This project is proprietary software for Magebase development agency.
