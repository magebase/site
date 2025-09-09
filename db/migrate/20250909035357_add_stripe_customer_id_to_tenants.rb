class AddStripeCustomerIdToTenants < ActiveRecord::Migration[8.0]
  def change
    add_column :tenants, :stripe_customer_id, :string
  end
end
