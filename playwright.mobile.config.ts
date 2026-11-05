import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'intake-webkit.spec.ts', workers: 1,
  use: { baseURL: 'http://127.0.0.1:4173', ...devices['iPhone 13'] },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: true },
});
