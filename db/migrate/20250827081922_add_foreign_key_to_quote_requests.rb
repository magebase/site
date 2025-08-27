class AddForeignKeyToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :quote_requests, :clients, column: :client_id
  end
end
