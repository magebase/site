class CreateChangeRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :change_requests do |t|
      t.string :title
      t.text :description
      t.string :status
      t.string :priority
      t.references :tenant, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
