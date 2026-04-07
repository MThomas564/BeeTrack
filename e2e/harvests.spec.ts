import { test, expect } from '@playwright/test';

test.describe('Harvests list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/harvests');
  });

  test('shows Harvests heading and table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Harvests' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('table has Collected Date column', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Collected Date' })).toBeVisible();
  });

  test('Add Harvest button navigates to add form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Harvest' }).click();
    await expect(page).toHaveURL('/harvests/add');
  });
});

test.describe('Add harvest', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/harvests/add');
  });

  test('shows the add harvest form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Add Harvest' })).toBeVisible();
    await expect(page.getByLabel('Collected Date')).toBeVisible();
    await expect(page.getByLabel('Number of Frames')).toBeVisible();
    await expect(page.getByLabel('Pounds Collected')).toBeVisible();
    await expect(page.getByLabel('Jars')).toBeVisible();
  });

  test('has a Hives multiselect', async ({ page }) => {
    await expect(page.getByLabel('Hives')).toBeVisible();
  });

  test('submit button exists', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'submit' })).toBeVisible();
  });
});
