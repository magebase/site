class CreateBlogs < ActiveRecord::Migration[8.0]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :slug
      t.text :content
      t.text :excerpt
      t.string :meta_title
      t.string :meta_description
      t.boolean :published
      t.datetime :published_at
      t.string :author
      t.string :category
      t.jsonb :tags
      t.string :featured_image
      t.string :use_case_slug

      t.timestamps
    end
  end
end
