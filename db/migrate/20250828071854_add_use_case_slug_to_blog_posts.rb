class AddUseCaseSlugToBlogPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :blog_posts, :use_case_slug, :string
  end
end
