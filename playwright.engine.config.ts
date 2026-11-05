import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', testMatch: 'intake-engine.spec.ts', workers: 1 });
