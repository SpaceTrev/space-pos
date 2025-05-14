import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  snapshotDir: './tests/__screenshots__',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ]
});