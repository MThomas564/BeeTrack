import { test, expect } from '@playwright/test';

test.describe('Inspections list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inspections');
  });

  test('shows Inspections heading and table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Inspections' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('table has Date and Hives Inspected columns', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Hives Inspected' })).toBeVisible();
  });

  test('Add Inspection button navigates to add form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Inspection' }).click();
    await expect(page).toHaveURL('/inspections/add');
  });
});

test.describe('Add inspection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inspections/add');
  });

  test('shows the add inspection form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Inspection' })).toBeVisible();
    await expect(page.getByText('Inspection Date')).toBeVisible();
    await expect(page.getByText('General Notes')).toBeVisible();
  });

  test('starts with one hive note section', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove Hive Note' })).toHaveCount(1);
  });

  test('Add Hive Note button adds another hive section', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Hive Note' }).click();
    await expect(page.getByRole('button', { name: 'Remove Hive Note' })).toHaveCount(2);
  });

  test('Remove Hive Note removes the section', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Hive Note' }).click();
    await page.getByRole('button', { name: 'Remove Hive Note' }).first().click();
    await expect(page.getByRole('button', { name: 'Remove Hive Note' })).toHaveCount(1);
  });

  test('shows checkboxes for queen, eggs, bias, swarm cells', async ({ page }) => {
    await expect(page.getByLabel('Queen seen')).toBeVisible();
    await expect(page.getByLabel('Eggs seen')).toBeVisible();
    await expect(page.getByLabel('Bias?')).toBeVisible();
    await expect(page.getByLabel('Swarm Cells')).toBeVisible();
    await expect(page.getByLabel('Supercedure Cells')).toBeVisible();
    await expect(page.getByLabel('No Eggs or Brood')).toBeVisible();
  });

  test('Submit button is enabled when date is set', async ({ page }) => {
    // Date is pre-filled with today's date by default
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });
});
