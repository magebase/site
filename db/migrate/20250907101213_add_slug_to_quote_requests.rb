class AddSlugToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :slug, :string
    add_index :quote_requests, :slug
  end
end
