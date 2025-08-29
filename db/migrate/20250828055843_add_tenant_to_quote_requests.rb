class AddTenantToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_reference :quote_requests, :tenant, null: true, foreign_key: true
  end
end
