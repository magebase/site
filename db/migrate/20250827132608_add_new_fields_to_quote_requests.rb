class AddNewFieldsToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :inspiration, :text
    add_column :quote_requests, :selected_languages, :jsonb
    add_column :quote_requests, :selected_social_providers, :jsonb
  end
end
