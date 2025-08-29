FactoryBot.define do
  factory :document do
    name { "MyString" }
    file_path { "MyString" }
    file_type { "MyString" }
    tenant { nil }
    user { nil }
  end
end
