require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  begin
    require "playwright"
    require "capybara/playwright"

    Capybara.register_driver :playwright do |app|
      Capybara::Playwright::Driver.new(app, headless: true, screen_size: [1400, 1400])
    end

    driven_by :playwright
  rescue LoadError
    driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ]
  end
end
