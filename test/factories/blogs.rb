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
FactoryBot.define do
  factory :blog do
    title { "MyString" }
    slug { "MyString" }
    content { "MyText" }
    excerpt { "MyText" }
    meta_title { "MyString" }
    meta_description { "MyString" }
    published { false }
    published_at { "2025-08-28 17:17:38" }
    author { "MyString" }
    category { "MyString" }
    tags { "" }
    featured_image { "MyString" }
    use_case_slug { "MyString" }
  end
end
