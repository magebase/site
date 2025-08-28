class CreateServices < ActiveRecord::Migration[8.0]
  def change
    create_table :services do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :description, null: false
      t.text :content, null: false
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.string :icon
      t.string :category
      t.boolean :published, default: false
      t.datetime :published_at
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :services, :slug, unique: true
    add_index :services, :published
    add_index :services, :category
  end
end
