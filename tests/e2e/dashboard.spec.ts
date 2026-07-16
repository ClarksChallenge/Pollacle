import { test, expect } from '@playwright/test';

test('founder dashboard redirects to login when unauthenticated', async ({ page }) => {
  await page.goto('/founder/dashboard');
  await expect(page).toHaveURL(/login/);
});
