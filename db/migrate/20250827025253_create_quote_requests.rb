class CreateQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :quote_requests do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :equipment_type
      t.string :rental_duration
      t.string :delivery_address
      t.text :special_requirements
      t.string :status

      t.timestamps
    end
  end
end
