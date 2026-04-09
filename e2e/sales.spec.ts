import { test, expect } from '@playwright/test';

test.describe('Sales list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sales');
  });

  test('shows Sales heading and table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sales' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('shows total jars sold', async ({ page }) => {
    await expect(page.getByText(/total number of jars sold/i)).toBeVisible();
  });

  test('table has Date, Number of Jars, and Notes columns', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Number of Jars' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Notes' })).toBeVisible();
  });

  test('Add Sale button navigates to add form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Sale' }).click();
    await expect(page).toHaveURL('/sales/add');
  });
});

test.describe('Add sale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sales/add');
  });

  test('shows the add sale form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Add new sale' })).toBeVisible();
    await expect(page.getByLabel('Sale Date')).toBeVisible();
    await expect(page.getByLabel('Number of Jars')).toBeVisible();
    await expect(page.getByLabel('Notes')).toBeVisible();
  });

  test('Submit button is disabled when required fields are empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  test('shows validation error when date is touched and left empty', async ({ page }) => {
    await page.getByLabel('Sale Date').click();
    await page.getByLabel('Number of Jars').click();
    await expect(page.getByText('Date of Sale is required.')).toBeVisible();
  });

  test('Submit button enables when required fields are filled', async ({ page }) => {
    // Open datepicker and select today
    await page.getByLabel('Sale Date').click();
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByLabel('Number of Jars').fill('5');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('creates a sale and redirects to sales list', async ({ page }) => {
    await page.getByLabel('Sale Date').click();
    await page.getByRole('button', { name: 'Today' }).click();
    await page.getByLabel('Number of Jars').fill('3');
    await page.getByLabel('Notes').fill('E2E test sale');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL('/sales');
    await expect(page.getByText('E2E test sale')).toBeVisible();
  });
});
