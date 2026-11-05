import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: 'intake-failure.spec.ts', workers: 1,
  use: { baseURL: 'http://127.0.0.1:4174', ...devices['Desktop Chrome'], channel: 'chrome' },
  webServer: { command: 'VITE_INTAKE_MOCK_FAILURE=once npx vite build --outDir /tmp/gradum-intake-failure && npx vite preview --outDir /tmp/gradum-intake-failure --host 127.0.0.1 --port 4174 --strictPort', url: 'http://127.0.0.1:4174', timeout: 60000 },
});
