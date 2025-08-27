class CreateBlogPosts < ActiveRecord::Migration[8.0]
  def change
    create_table :blog_posts do |t|
      t.string :title
      t.text :content
      t.string :excerpt
      t.string :slug
      t.boolean :published
      t.datetime :published_at

      t.timestamps
    end
  end
end
