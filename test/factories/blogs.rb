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
