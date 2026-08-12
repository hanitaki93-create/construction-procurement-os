import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env['CI']),
  retries: process.env['CI'] ? 1 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: process.env['CI']
    ? [
        ['line'],
        ['json', { outputFile: 'artifacts/playwright/results.json' }],
        ['html', { open: 'never' }],
      ]
    : 'list',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm --filter @cpos/api build && pnpm --filter @cpos/api start',
      url: 'http://127.0.0.1:3001/health/live',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
      env: {
        APP_ENV: 'e2e',
        HOST: '127.0.0.1',
        PORT: '3001',
        BUILD_ID: 'b01-e2e',
        RELEASE_ID: 'b01-e2e',
        SOURCE_COMMIT: 'playwright',
      },
    },
    {
      command: 'pnpm --filter @cpos/web-internal exec vite --host 127.0.0.1 --port 3000',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
    {
      command: 'pnpm --filter @cpos/web-external exec vite --host 127.0.0.1 --port 3003',
      url: 'http://127.0.0.1:3003',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
