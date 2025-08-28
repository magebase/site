class CreateTemplates < ActiveRecord::Migration[8.0]
  def change
    create_table :templates do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :description, null: false
      t.string :category, null: false
      t.text :features
      t.string :preview_image_url, null: false
      t.string :download_url
      t.string :demo_url
      t.decimal :price, precision: 10, scale: 2
      t.boolean :is_free, default: false
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.boolean :published, default: false
      t.datetime :published_at
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :templates, :slug, unique: true
    add_index :templates, :published
    add_index :templates, :category
    add_index :templates, :is_free
  end
end
