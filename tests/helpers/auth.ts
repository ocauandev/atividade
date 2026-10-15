import { expect, Page } from '@playwright/test';

export const loginUrl = 'https://www.saucedemo.com/';
export const email = 'standard_user';
export const senha = 'secret_sauce';

export async function login(page: Page): Promise<void> {
  await page.goto(loginUrl);
  await page.locator('#user-name').fill(email);
  await page.locator('#password').fill(senha);
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);
}