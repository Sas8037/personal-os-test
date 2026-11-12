import { defineConfig } from '@playwright/test';

// Run from the repository root: npm run test:e2e -w @personal-os/web
// Prerequisites: npm ci; npx playwright install --with-deps chromium
export default defineConfig({
  testDir: './tests',
  testMatch: '**/smoke.spec.ts',
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  reporter: 'list',
  outputDir: './test-results',
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4175',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { viewport: { width: 1280, height: 800 } } },
    {
      name: 'mobile-chromium',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: {
    command:
      'npm run build -w @personal-os/desktop-shell && npm run dev -- --host 127.0.0.1 --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: false,
    timeout: 60_000,
    // Test the local app without inheriting a forwarded Codespaces hostname.
    env: { CODESPACE_NAME: '', GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: '' },
  },
});
