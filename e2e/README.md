Playwright E2E tests

Run these tests locally after installing dependencies:

```bash
# install node deps
npm install
# install Playwright browsers
npx playwright install
# run the dev server in another terminal: bin/dev
# run tests
npm run e2e
```

The baseURL in `playwright.config.ts` points to http://localhost:3000 which is where `bin/rails s` serves the app in dev.
