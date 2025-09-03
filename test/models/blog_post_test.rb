# == Schema Information
#
# Table name: blog_posts
#
#  id                     :bigint           not null, primary key
#  author_name            :string
#  author_profile_picture :string
#  author_title           :string
#  content                :text
#  excerpt                :string
#  featured               :boolean
#  published              :boolean
#  published_at           :datetime
#  slug                   :string
#  title                  :string
#  use_case_slug          :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require "test_helper"

class BlogPostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
