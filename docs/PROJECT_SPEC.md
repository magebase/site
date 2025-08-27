# Project Spec — Genfix (Generator Hire, Brisbane AU)

Overview

- Product: A simple SaaS-style web app for Genfix to manage generator inventory and rentals.
- Business: Rent mobile generators (AUD $5k–$20k capex). Customers are contractors, events, and small businesses.
- Goals: enable bookings, availability, quotes/invoicing, and basic operations/maintenance tracking.

MVP Scope (4–6 weeks)

- Inventory management: add/edit equipment (make/model, capacity, location, purchase date, status).
- Booking flow: create reservations with start/end date, delivery/pickup addresses, customer info.
- Availability calendar: show equipment availability and blockouts.
- Quotes & invoices: generate PDF quotes and invoices; basic line items, taxes.
- Customer management: record contacts, billing details, payment status.
- Admin dashboard: upcoming pickups/deliveries, active hires, upcoming maintenance.

User stories

- As an admin, I can add equipment with serial and maintenance schedule.
- As sales staff, I can create a booking and lock selected equipment for dates.
- As admin, I can mark equipment as in-maintenance so it’s unavailable for booking.
- As accountant, I can generate an invoice from a booking and mark payments.

Key data models

- Equipment: id, name, capacity_kw, serial, purchase_price, status (available/hired/maintenance), location
- Customer: id, name, email, phone, billing_address, notes
- Booking: id, customer_id, equipment_id (or many via BookingItems), start_at, end_at, status, delivery_address
- BookingItem: booking_id, equipment_id, daily_rate
- Invoice: id, booking_id, amount, tax, status, pdf_path
- MaintenanceRecord: equipment_id, date, notes, performed_by

Integrations

- Payments: Stripe (card payments, receipts). Fallback to manual (bank transfer).
- Accounting: optional Xero/QuickBooks integration (export invoices).
- Optional: GPS/asset tracking integration for large fleets.

APIs & Frontend

- Rails API + server-rendered views; Inertia+React for interactive UI.
- Frontend: React pages under `app/frontend/pages` (Inertia). Use standard HTML href attributes for navigation.

Non-functional requirements

- Security: SSL-only, protect admin endpoints, sanitize inputs.
- Scalability: single-server sufficient initially; design DB indexes for bookings and equipment lookups.
- Reliability: automated backups for Postgres; simple retry for failed payment webhooks.

Milestones (3 sprints)

- Sprint 1: Inventory & Customer CRUD, basic bookings (calendar UI stub) — internal beta.
- Sprint 2: Booking confirming, invoice generation, email notifications, Stripe integration.
- Sprint 3: Admin dashboard, maintenance scheduler, reporting (utilization, revenue).

Acceptance criteria

- Important flows have automated tests (unit + 1–2 system tests): booking creation, invoice generation, payment webhook handling.
- Admin can view calendar and create bookings without manual DB edits.

Deliverables

- Deployed app (staging) reachable by Genfix team.
- README: run/deploy instructions, env variables, and maintenance notes.
- Post-deploy checklist for backups, monitoring, and SSH key rotation.

Success metrics (first 3 months)

- 95% of bookings processed without manual adjustments.
- Time to create a booking under 3 minutes for staff.
- Monthly revenue tracking accurate to accounting reports.

Risks & mitigations

- Payment disputes: keep clear invoice and payment records, allow manual adjustments.
- Fleet mismatch: add asset QA and check-in/out process.

Next steps

- Confirm required payment/accounting providers.
- Prioritize the exact invoice/tax rules for Australia (GST).
- Start Sprint 1: scaffold models, migrations, and a minimal booking UI.

Contact

- Product owner: Genfix (Brisbane)
- Dev lead: TBD

End of spec
