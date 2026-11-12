import { test as base, expect, type Page } from '@playwright/test';

const test = base.extend<{ browserDiagnostics: void }>({
  browserDiagnostics: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(`console: ${message.text()}`);
      });
      page.on('pageerror', (error) => errors.push(`uncaught: ${error.message}`));
      page.on('requestfailed', (request) =>
        errors.push(`request failed: ${request.url()} ${request.failure()?.errorText}`),
      );
      page.on('response', (response) => {
        if (response.status() >= 400)
          errors.push(`HTTP ${response.status()}: ${response.url()}`);
      });
      await use();
      expect(errors, 'No browser errors or failed application resources').toEqual([]);
    },
    { auto: true },
  ],
});

async function expectDesktopPreview(page: Page) {
  await expect(page).toHaveTitle('Personal OS — Personal Computing Environment');
  await expect(page.getByRole('heading', { name: 'Personal OS', exact: true })).toBeVisible();
  await expect(page.getByRole('main', { name: 'Personal OS workspace' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Desktop preview', exact: true })).toBeVisible();
  await expect(page.locator('.pwos-desktop-shell')).toHaveAttribute('data-connection', 'offline');
  await expect(page.getByRole('status')).toHaveText('Preview only — no backend services connected.');
  await expect(page.getByText(
    'Private backend, file service, persistent storage, and local AI are not connected. This preview provides the desktop frame only.',
    { exact: true },
  )).toBeVisible();
  const fitsViewport = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(fitsViewport, 'Preview has no horizontal overflow').toBe(true);
}

test('initializes the real shell and reports unavailable services', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expectDesktopPreview(page);
});

test('survives a browser reload without losing the preview state', async ({ page }) => {
  await page.goto('/');
  await expectDesktopPreview(page);
  const response = await page.reload();
  expect(response?.status()).toBe(200);
  await expectDesktopPreview(page);
});
