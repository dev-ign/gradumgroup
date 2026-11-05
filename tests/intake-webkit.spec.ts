import { expect, test } from '@playwright/test';

test('mobile WebKit keeps inputs, sticky actions, validation and resume usable', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/start?source=footer');
  await expect(page.locator('.intake-header')).toHaveCSS('height', '64px');
  await page.getByRole('radio', { name: /^Client/ }).check();
  await page.getByRole('radio', { name: 'Construction', exact: true }).check();
  await page.getByRole('button', { name: 'Review answers' }).click();
  await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
  await page.getByLabel('Full name', { exact: true }).fill('Mobile Test');
  await page.getByLabel('Email', { exact: true }).fill('mobile@example.com');
  await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('inputmode', 'email');
  await page.getByLabel('Phone / WhatsApp', { exact: true }).fill('+1 809 555 0142');
  await page.getByRole('button', { name: 'Review answers' }).click();
  await expect(page.locator('h1')).toHaveText('Everything look right?');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Save & exit', exact: true }).click();
  await page.getByRole('button', { name: 'Keep going', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Everything look right?');
  await page.reload();
  await page.getByRole('button', { name: 'Resume conversation', exact: true }).click();
  await expect(page.getByLabel('Email', { exact: true })).toHaveValue('');
});
