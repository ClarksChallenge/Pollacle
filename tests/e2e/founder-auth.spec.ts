import { test, expect, request } from '@playwright/test';

test('founder dashboard accessible after impersonation', async ({ page }) => {
  // Call dev impersonation endpoint to get session token
  const base = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
  const r = await request.newContext();
  const res = await r.post(`${base}/api/dev/impersonate`, { data: { email: process.env.FOUNDER_EMAIL } });
  const json = await res.json();
  if (!json.sessionToken) {
    test.skip();
    return;
  }
  // Set next-auth session cookie
  await page.context().addCookies([{ name: 'next-auth.session-token', value: json.sessionToken, domain: 'localhost', path: '/' }]);
  await page.goto('/founder/dashboard');
  await expect(page.locator('text=Founder Dashboard')).toBeVisible();
});
