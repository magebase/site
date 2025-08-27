class CreateClients < ActiveRecord::Migration[8.0]
  def change
    create_table :clients do |t|
      t.string :company_name
      t.string :contact_name
      t.string :email
      t.string :phone
      t.text :address

      t.timestamps
    end
  end
end
