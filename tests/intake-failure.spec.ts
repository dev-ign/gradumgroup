import { expect, test } from '@playwright/test';

test('failed mock submission retains all answers and retry completes once', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/start');
  await page.getByRole('radio', { name: /^Client/ }).check();
  await page.getByRole('radio', { name: 'Services', exact: true }).check();
  await page.getByLabel('Full name', { exact: true }).fill('Retry Test');
  await page.getByLabel('Email', { exact: true }).fill('retry@example.com');
  await page.getByLabel('Phone / WhatsApp', { exact: true }).fill('+1 809 555 0142');
  await page.getByRole('button', { name: 'Review answers' }).click();
  await page.getByRole('checkbox', { name: 'Gradum may store' }).check();
  await page.getByRole('button', { name: 'Send to Gradum' }).click();
  await expect(page.getByRole('button', { name: 'Submitting' })).toBeDisabled();
  await expect(page.getByRole('alert')).toContainText('Your answers are safe in this tab');
  await expect(page.locator('.intake-review')).toContainText('retry@example.com');
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(page.locator('h1')).toHaveText("You're all set, Retry.");
  await expect(page.locator('.intake-notice')).toContainText('not sent to Gradum');
});
