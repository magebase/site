class AddAuthorFieldsToBlogPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :blog_posts, :author_name, :string
    add_column :blog_posts, :author_title, :string
    add_column :blog_posts, :author_profile_picture, :string
  end
end
