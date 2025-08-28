class CreatePages < ActiveRecord::Migration[8.0]
  def change
    create_table :pages do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :content, null: false
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.boolean :published, default: false
      t.datetime :published_at
      t.string :page_type
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :pages, :slug, unique: true
    add_index :pages, :published
    add_index :pages, :page_type
  end
end
