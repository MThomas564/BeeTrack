import { test, expect } from '@playwright/test';

test.describe('Hives', () => {
  test('home page shows hives table', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /hives/i })).toBeVisible();
  });

  test('navigate to add hive page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /add hive/i }).click();
    await expect(page).toHaveURL(/hives\/add/);
  });
});
