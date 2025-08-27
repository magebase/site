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

ActiveRecord::Schema[8.0].define(version: 2025_08_27_132608) do
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
    t.index ["aasm_state"], name: "index_quote_requests_on_aasm_state"
    t.index ["client_id"], name: "index_quote_requests_on_client_id"
    t.index ["selected_features_json"], name: "index_quote_requests_on_selected_features_json", using: :gin
    t.index ["use_case"], name: "index_quote_requests_on_use_case"
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "contracts", "clients"
  add_foreign_key "contracts", "quote_requests"
  add_foreign_key "messages", "chats"
  add_foreign_key "payments", "quote_requests"
  add_foreign_key "project_milestones", "quote_requests"
  add_foreign_key "quote_request_features", "features"
  add_foreign_key "quote_request_features", "quote_requests"
  add_foreign_key "quote_requests", "clients"
  add_foreign_key "tool_calls", "messages"
end
