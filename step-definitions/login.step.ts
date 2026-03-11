import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const BASE_URL = 'https://www.saucedemo.com';

Given('I am on the SauceDemo login page', async function (this: CustomWorld) {
  await this.page.goto(BASE_URL);
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }
);

Then('I should be redirected to the inventory page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/.*inventory\.html/);
});

Then(
  'I should see an error message {string}',
  async function (this: CustomWorld, errorMessage: string) {
    const errorLocator = this.page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(errorMessage);
  }
);
