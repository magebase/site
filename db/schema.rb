# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_09_07_101717) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "ahoy_events", force: :cascade do |t|
    t.bigint "visit_id"
    t.bigint "user_id"
    t.string "name"
    t.jsonb "properties"
    t.datetime "time"
    t.index ["name", "time"], name: "index_ahoy_events_on_name_and_time"
    t.index ["properties"], name: "index_ahoy_events_on_properties", opclass: :jsonb_path_ops, using: :gin
    t.index ["user_id"], name: "index_ahoy_events_on_user_id"
    t.index ["visit_id"], name: "index_ahoy_events_on_visit_id"
  end

  create_table "ahoy_visits", force: :cascade do |t|
    t.string "visit_token"
    t.string "visitor_token"
    t.bigint "user_id"
    t.string "ip"
    t.text "user_agent"
    t.text "referrer"
    t.string "referring_domain"
    t.text "landing_page"
    t.string "browser"
    t.string "os"
    t.string "device_type"
    t.string "country"
    t.string "region"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.string "utm_source"
    t.string "utm_medium"
    t.string "utm_term"
    t.string "utm_content"
    t.string "utm_campaign"
    t.string "app_version"
    t.string "os_version"
    t.string "platform"
    t.datetime "started_at"
    t.index ["user_id"], name: "index_ahoy_visits_on_user_id"
    t.index ["visit_token"], name: "index_ahoy_visits_on_visit_token", unique: true
    t.index ["visitor_token", "started_at"], name: "index_ahoy_visits_on_visitor_token_and_started_at"
  end

  create_table "blog_posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "excerpt"
    t.string "slug"
    t.boolean "published"
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author_name"
    t.string "author_title"
    t.string "author_profile_picture"
    t.string "use_case_slug"
    t.boolean "featured"
  end

  create_table "blogs", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "content"
    t.text "excerpt"
    t.string "meta_title"
    t.string "meta_description"
    t.boolean "published"
    t.datetime "published_at"
    t.string "author"
    t.string "category"
    t.jsonb "tags"
    t.string "featured_image"
    t.string "use_case_slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "careers", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.text "description", null: false
    t.text "requirements", null: false
    t.string "location", null: false
    t.string "employment_type"
    t.string "salary_range"
    t.string "status", default: "open"
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location"], name: "index_careers_on_location"
    t.index ["published"], name: "index_careers_on_published"
    t.index ["slug"], name: "index_careers_on_slug", unique: true
    t.index ["status"], name: "index_careers_on_status"
  end

  create_table "case_studies", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.string "client_name", null: false
    t.string "industry", null: false
    t.text "challenge", null: false
    t.text "solution", null: false
    t.text "results", null: false
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.string "client_logo_url"
    t.string "featured_image_url"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["industry"], name: "index_case_studies_on_industry"
    t.index ["published"], name: "index_case_studies_on_published"
    t.index ["slug"], name: "index_case_studies_on_slug", unique: true
  end

  create_table "change_requests", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "status"
    t.string "priority"
    t.bigint "tenant_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_change_requests_on_tenant_id"
    t.index ["user_id"], name: "index_change_requests_on_user_id"
  end

  create_table "chats", force: :cascade do |t|
    t.string "model_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clients", force: :cascade do |t|
    t.string "company_name"
    t.string "contact_name"
    t.string "email"
    t.string "phone"
    t.text "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_customer_id"
  end

  create_table "contracts", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.bigint "client_id", null: false
    t.text "generated_clauses"
    t.string "jurisdiction"
    t.datetime "signed_at"
    t.string "signature_method"
    t.jsonb "contract_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_contracts_on_client_id"
    t.index ["quote_request_id"], name: "index_contracts_on_quote_request_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "name"
    t.string "file_path"
    t.string "file_type"
    t.bigint "tenant_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_documents_on_tenant_id"
    t.index ["user_id"], name: "index_documents_on_user_id"
  end

  create_table "equipment", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "kva_rating"
    t.string "category"
    t.decimal "price_per_day"
    t.jsonb "features"
    t.string "image_url"
    t.boolean "is_available"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "faqs", force: :cascade do |t|
    t.text "question"
    t.text "answer"
    t.integer "position"
    t.boolean "published"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "features", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "category"
    t.decimal "base_cost"
    t.integer "complexity_level"
    t.jsonb "dependencies"
    t.boolean "requires_customization"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "chat_id", null: false
    t.string "role"
    t.text "content"
    t.string "model_id"
    t.integer "input_tokens"
    t.integer "output_tokens"
    t.bigint "tool_call_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_id"], name: "index_messages_on_chat_id"
    t.index ["tool_call_id"], name: "index_messages_on_tool_call_id"
  end

  create_table "pages", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.text "content", null: false
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.string "page_type"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["page_type"], name: "index_pages_on_page_type"
    t.index ["published"], name: "index_pages_on_published"
    t.index ["slug"], name: "index_pages_on_slug", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.decimal "amount"
    t.string "status"
    t.string "payment_method"
    t.string "transaction_id"
    t.jsonb "payment_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quote_request_id"], name: "index_payments_on_quote_request_id"
  end

  create_table "project_milestones", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.string "name"
    t.text "description"
    t.date "due_date"
    t.string "status"
    t.jsonb "milestone_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quote_request_id"], name: "index_project_milestones_on_quote_request_id"
  end

  create_table "quote_request_features", force: :cascade do |t|
    t.bigint "quote_request_id", null: false
    t.bigint "feature_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_id"], name: "index_quote_request_features_on_feature_id"
    t.index ["quote_request_id"], name: "index_quote_request_features_on_quote_request_id"
  end

  create_table "quote_requests", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "quote_price"
    t.text "admin_notes"
    t.datetime "quoted_at"
    t.datetime "approved_at"
    t.string "stripe_invoice_id"
    t.string "project_name"
    t.text "project_description"
    t.string "use_case"
    t.jsonb "selected_features_json"
    t.jsonb "ai_pricing_json"
    t.jsonb "project_plan_json"
    t.decimal "estimated_cost", precision: 10, scale: 2
    t.decimal "monthly_retainer", precision: 10, scale: 2
    t.decimal "deposit_amount", precision: 10, scale: 2
    t.string "aasm_state", default: "draft"
    t.bigint "client_id"
    t.string "equipment_type"
    t.string "rental_duration"
    t.text "delivery_address"
    t.text "special_requirements"
    t.datetime "start_hire_date"
    t.datetime "end_hire_date"
    t.text "inspiration"
    t.jsonb "selected_languages"
    t.jsonb "selected_social_providers"
    t.bigint "tenant_id"
    t.string "proposal_token"
    t.string "slug"
    t.index ["aasm_state"], name: "index_quote_requests_on_aasm_state"
    t.index ["client_id"], name: "index_quote_requests_on_client_id"
    t.index ["proposal_token"], name: "index_quote_requests_on_proposal_token", unique: true
    t.index ["selected_features_json"], name: "index_quote_requests_on_selected_features_json", using: :gin
    t.index ["slug"], name: "index_quote_requests_on_slug"
    t.index ["tenant_id"], name: "index_quote_requests_on_tenant_id"
    t.index ["use_case"], name: "index_quote_requests_on_use_case"
  end

  create_table "services", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.text "description", null: false
    t.text "content", null: false
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.string "icon"
    t.string "category"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_services_on_category"
    t.index ["published"], name: "index_services_on_published"
    t.index ["slug"], name: "index_services_on_slug", unique: true
  end

  create_table "team_capacities", force: :cascade do |t|
    t.integer "total_developers", null: false
    t.integer "available_developers", default: 0, null: false
    t.integer "current_projects", default: 0, null: false
    t.decimal "capacity_percentage", precision: 5, scale: 2, null: false
    t.datetime "last_updated", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_members", force: :cascade do |t|
    t.string "name", null: false
    t.string "position", null: false
    t.text "bio", null: false
    t.string "email"
    t.string "phone"
    t.string "linkedin_url"
    t.string "twitter_url"
    t.string "github_url"
    t.string "profile_image_url"
    t.boolean "active", default: true
    t.integer "sort_order", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_team_members_on_active"
    t.index ["sort_order"], name: "index_team_members_on_sort_order"
  end

  create_table "templates", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.text "description", null: false
    t.string "category", null: false
    t.text "features"
    t.string "preview_image_url", null: false
    t.string "download_url"
    t.string "demo_url"
    t.decimal "price", precision: 10, scale: 2
    t.boolean "is_free", default: false
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_templates_on_category"
    t.index ["is_free"], name: "index_templates_on_is_free"
    t.index ["published"], name: "index_templates_on_published"
    t.index ["slug"], name: "index_templates_on_slug", unique: true
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.string "subdomain"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tenants_on_user_id"
  end

  create_table "tool_calls", force: :cascade do |t|
    t.bigint "message_id", null: false
    t.string "tool_call_id", null: false
    t.string "name", null: false
    t.jsonb "arguments", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["message_id"], name: "index_tool_calls_on_message_id"
    t.index ["tool_call_id"], name: "index_tool_calls_on_tool_call_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.string "avatar_url"
    t.string "magic_link_token"
    t.datetime "magic_link_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "webinars", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.text "description", null: false
    t.string "speaker_name", null: false
    t.text "speaker_bio", null: false
    t.datetime "scheduled_at", null: false
    t.integer "duration_minutes"
    t.string "registration_url"
    t.string "video_url"
    t.text "excerpt"
    t.string "meta_title"
    t.text "meta_description"
    t.string "speaker_image_url"
    t.string "thumbnail_url"
    t.boolean "published", default: false
    t.datetime "published_at"
    t.integer "position", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["published"], name: "index_webinars_on_published"
    t.index ["scheduled_at"], name: "index_webinars_on_scheduled_at"
    t.index ["slug"], name: "index_webinars_on_slug", unique: true
  end

  add_foreign_key "change_requests", "tenants"
  add_foreign_key "change_requests", "users"
  add_foreign_key "contracts", "clients"
  add_foreign_key "contracts", "quote_requests"
  add_foreign_key "documents", "tenants"
  add_foreign_key "documents", "users"
  add_foreign_key "messages", "chats"
  add_foreign_key "payments", "quote_requests"
  add_foreign_key "project_milestones", "quote_requests"
  add_foreign_key "quote_request_features", "features"
  add_foreign_key "quote_request_features", "quote_requests"
  add_foreign_key "quote_requests", "clients"
  add_foreign_key "quote_requests", "tenants"
  add_foreign_key "tenants", "users"
  add_foreign_key "tool_calls", "messages"
end
