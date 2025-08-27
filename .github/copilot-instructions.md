# Copilot Instructions — Genfix

Purpose

- Short: Genfix is a small generator hire company (Brisbane, AU) renting commercial generators (AUD $5k–$20k capex).
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

- Kamal handles builds and deploys. The `deploy.yml` lists `deploy@91.99.119.221` and a Postgres accessory for production DB.
- Ensure SSH key for `deploy` is configured when running `kamal setup`.

If you need help

- Ask for missing environment details, test credentials, or an account for external services (Stripe, Xero, etc.).

---

File locations referenced frequently:

- `config/deploy.yml` — deploy targets and env
- `app/frontend` — Vite/React code
- `app/views/layouts/application.html.erb` — main HTML template

End of Copilot instructions
