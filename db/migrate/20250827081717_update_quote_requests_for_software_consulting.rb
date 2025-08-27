class UpdateQuoteRequestsForSoftwareConsulting < ActiveRecord::Migration[8.0]
  def change
    # Remove old equipment rental fields
    remove_column :quote_requests, :equipment_type, :string
    remove_column :quote_requests, :rental_duration, :string
    remove_column :quote_requests, :delivery_address, :string
    remove_column :quote_requests, :special_requirements, :text
    remove_column :quote_requests, :status, :string

    # Add new software consulting fields
    add_column :quote_requests, :project_name, :string
    add_column :quote_requests, :project_description, :text
    add_column :quote_requests, :use_case, :string
    add_column :quote_requests, :selected_features_json, :jsonb
    add_column :quote_requests, :ai_pricing_json, :jsonb
    add_column :quote_requests, :project_plan_json, :jsonb
    add_column :quote_requests, :estimated_cost, :decimal, precision: 10, scale: 2
    add_column :quote_requests, :monthly_retainer, :decimal, precision: 10, scale: 2
    add_column :quote_requests, :deposit_amount, :decimal, precision: 10, scale: 2
    add_column :quote_requests, :aasm_state, :string, default: 'draft'
    add_column :quote_requests, :client_id, :bigint

    # Add indexes for performance
    add_index :quote_requests, :aasm_state
    add_index :quote_requests, :client_id
    add_index :quote_requests, :use_case
    add_index :quote_requests, :selected_features_json, using: :gin

    # Note: Foreign key constraint will be added after clients table is created
  end
end
