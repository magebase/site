class CreateContracts < ActiveRecord::Migration[8.0]
  def change
    create_table :contracts do |t|
      t.references :quote_request, null: false, foreign_key: true
      t.references :client, null: false, foreign_key: true
      t.text :generated_clauses
      t.string :jurisdiction
      t.datetime :signed_at
      t.string :signature_method
      t.jsonb :contract_data

      t.timestamps
    end
  end
end
