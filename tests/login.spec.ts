import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('SauceDemo Login Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Login fails with invalid username', async ({ page }) => {
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
  });

  test('Login fails with invalid password', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username and password do not match/);
  });

  test('Login fails with empty username', async ({ page }) => {
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Username is required/);
  });

  test('Login fails with empty password', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Password is required/);
  });
});
