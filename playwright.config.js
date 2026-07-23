// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 90000,

  expect: {
    timeout: 15000,
  },

  fullyParallel: false,

  workers: 1,

  retries: process.env.CI ? 2 : 1,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {

    baseURL: 'https://opensource-demo.orangehrmlive.com',

    headless: true,

    trace: 'retain-on-failure',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 30000,

    navigationTimeout: 60000,

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1366,
          height: 768,
        },
      },
    },
  ],
});