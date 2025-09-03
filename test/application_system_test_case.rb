require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  begin
    require "playwright"
    require "capybara-playwright-driver"

    # Try to find playwright CLI in common locations
    playwright_path = nil
    [
      "./node_modules/.bin/playwright",
      "node_modules/.bin/playwright",
      "../node_modules/.bin/playwright"
    ].each do |path|
      if File.exist?(path)
        playwright_path = path
        break
      end
    end

    # Fallback to just "playwright" if not found in node_modules
    playwright_path ||= "playwright"

    Capybara.register_driver :playwright do |app|
      Capybara::Playwright::Driver.new(
        app,
        playwright_cli_executable_path: playwright_path,
        headless: true,
        screen_size: [ 1400, 1400 ]
      )
    end

    driven_by :playwright
  rescue LoadError
    driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ]
  end
end
