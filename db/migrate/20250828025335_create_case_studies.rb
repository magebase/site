class CreateCaseStudies < ActiveRecord::Migration[8.0]
  def change
    create_table :case_studies do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.string :client_name, null: false
      t.string :industry, null: false
      t.text :challenge, null: false
      t.text :solution, null: false
      t.text :results, null: false
      t.text :excerpt
      t.string :meta_title
      t.text :meta_description
      t.string :client_logo_url
      t.string :featured_image_url
      t.boolean :published, default: false
      t.datetime :published_at
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :case_studies, :slug, unique: true
    add_index :case_studies, :published
    add_index :case_studies, :industry
  end
end
