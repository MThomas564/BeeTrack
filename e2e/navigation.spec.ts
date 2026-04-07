import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('menu contains all main sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('menuitem', { name: /hives/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /inspections/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /harvests/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /sales/i })).toBeVisible();
  });

  test('navigates to Inspections via menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('menuitem', { name: /inspections/i }).click();
    await expect(page).toHaveURL('/inspections');
    await expect(page.getByRole('heading', { name: 'Inspections' })).toBeVisible();
  });

  test('navigates to Harvests via menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('menuitem', { name: /harvests/i }).click();
    await expect(page).toHaveURL('/harvests');
    await expect(page.getByRole('heading', { name: 'Harvests' })).toBeVisible();
  });

  test('navigates to Sales via menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('menuitem', { name: /sales/i }).click();
    await expect(page).toHaveURL('/sales');
    await expect(page.getByRole('heading', { name: 'Sales' })).toBeVisible();
  });
});
