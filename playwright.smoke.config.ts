import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: 'smoke.spec.ts',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'https://sicaho-collab.github.io/m3-design-docs',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
