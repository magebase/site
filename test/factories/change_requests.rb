FactoryBot.define do
  factory :change_request do
    title { "MyString" }
    description { "MyText" }
    status { "MyString" }
    priority { "MyString" }
    tenant { nil }
    user { nil }
  end
end
