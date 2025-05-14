import { test, expect } from '@playwright/test';

test('homepage should render and match snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});