import { test, expect } from '@playwright/test';

test.describe('Hives list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the Hives heading and table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hives' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('table has Name and Actions columns', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });

  test('has View all, View active, View archived filter buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'View all' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View active' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View archived' })).toBeVisible();
  });

  test('View all shows Archived column', async ({ page }) => {
    await page.getByRole('button', { name: 'View all' }).click();
    await expect(page.getByRole('columnheader', { name: 'Archived' })).toBeVisible();
  });

  test('View active hides Archived column', async ({ page }) => {
    await page.getByRole('button', { name: 'View all' }).click();
    await page.getByRole('button', { name: 'View active' }).click();
    await expect(page.getByRole('columnheader', { name: 'Archived' })).not.toBeVisible();
  });

  test('Add Hive button navigates to add form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Hive' }).click();
    await expect(page).toHaveURL('/hives/add');
  });
});

test.describe('Add hive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hives/add');
  });

  test('shows the add hive form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Add new hive' })).toBeVisible();
    await expect(page.getByLabel('Hive Name')).toBeVisible();
    await expect(page.getByLabel('Hive Origin')).toBeVisible();
    await expect(page.getByLabel('Year of Queen')).toBeVisible();
  });

  test('Submit button is disabled when form is empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  test('shows validation error when name field is touched and left empty', async ({ page }) => {
    await page.getByLabel('Hive Name').click();
    await page.getByLabel('Hive Origin').click(); // move focus away
    await expect(page.getByText('Hive Name is required.')).toBeVisible();
  });

  test('Submit button enables when form is filled', async ({ page }) => {
    await page.getByLabel('Hive Name').fill('Test Hive');
    await page.getByLabel('Hive Origin').fill('Swarm');
    await page.getByLabel('Year of Queen').fill('2024');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('creates a hive and redirects to home', async ({ page }) => {
    const hiveName = `E2E Hive ${Date.now()}`;
    await page.getByLabel('Hive Name').fill(hiveName);
    await page.getByLabel('Hive Origin').fill('Swarm');
    await page.getByLabel('Year of Queen').fill('2024');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(hiveName)).toBeVisible();
  });
});
