class CreateCareers < ActiveRecord::Migration[8.0]
  def change
    create_table :careers do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :description, null: false
      t.text :requirements, null: false
      t.string :location, null: false
      t.string :employment_type
      t.string :salary_range
      t.string :status, default: 'open'
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.boolean :published, default: false
      t.datetime :published_at
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :careers, :slug, unique: true
    add_index :careers, :published
    add_index :careers, :status
    add_index :careers, :location
  end
end
