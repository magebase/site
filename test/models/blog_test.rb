# == Schema Information
#
# Table name: blogs
#
#  id               :bigint           not null, primary key
#  author           :string
#  category         :string
#  content          :text
#  excerpt          :text
#  featured_image   :string
#  meta_description :string
#  meta_title       :string
#  published        :boolean
#  published_at     :datetime
#  slug             :string
#  tags             :jsonb
#  title            :string
#  use_case_slug    :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
require "test_helper"

class BlogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
