import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Home page title contains Playwright', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('2. Get started navigates to docs intro', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/\/docs\/intro/);
  });

  test('3. Installation heading is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });

  test('4. Search for locators', async ({ page }) => {

  await page.getByRole('button', { name: /search/i }).click();

  await page.getByPlaceholder(/search/i).fill('locators');

  await expect(
    page.getByText(/locators/i).first()
  ).toBeVisible();

});

});