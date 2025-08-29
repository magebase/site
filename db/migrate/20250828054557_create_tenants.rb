class CreateTenants < ActiveRecord::Migration[8.0]
  def change
    create_table :tenants do |t|
      t.string :name
      t.string :subdomain
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
