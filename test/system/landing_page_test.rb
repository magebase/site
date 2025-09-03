require "application_system_test_case"

class LandingPageTest < ApplicationSystemTestCase
  test "visiting the landing page shows product overview and features" do
    visit root_url

    assert_text "Custom software development"
    assert_text "Digital solutions for"
    assert_text "Get Your Free Quote"
  end
end
