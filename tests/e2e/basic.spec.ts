import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  // Ensure the main site heading is visible
  await expect(page.locator('h1:has-text("Pollacle")')).toBeVisible();
});
