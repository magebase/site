class CreateQuoteRequestFeatures < ActiveRecord::Migration[8.0]
  def change
    create_table :quote_request_features do |t|
      t.references :quote_request, null: false, foreign_key: true
      t.references :feature, null: false, foreign_key: true

      t.timestamps
    end
  end
end
