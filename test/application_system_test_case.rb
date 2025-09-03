require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  begin
    require "playwright"
    require "capybara-playwright-driver"

    Capybara.register_driver :playwright do |app|
      Capybara::Playwright::Driver.new(
        app,
        playwright_cli_executable_path: "./node_modules/.bin/playwright",
        headless: true,
        screen_size: [ 1400, 1400 ]
      )
    end

    driven_by :playwright
  rescue LoadError
    driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ]
  end
end
