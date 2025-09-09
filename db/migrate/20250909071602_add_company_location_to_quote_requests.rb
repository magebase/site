class AddCompanyLocationToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :company_location, :string
  end
end
