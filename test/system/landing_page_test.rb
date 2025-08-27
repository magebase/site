require "application_system_test_case"

class LandingPageTest < ApplicationSystemTestCase
  test "visiting the landing page shows product overview and features" do
    visit root_url

    assert_selector "h1", text: "Genfix — Commercial Generator Hire"
    assert_text "Book a generator in minutes"
    assert_text "Available equipment"
    assert_text "Get a quote"
  end
end
