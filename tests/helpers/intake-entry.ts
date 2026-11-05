import { expect, type Page } from '@playwright/test';

/** Updated general-inquiry contract: same-tab /start, preserving Back to site. */
export async function expectIntakeEntry(page: Page) {
  await expect(page).toHaveURL(/\/start\?source=(homepage|consulting|construction|services|about|navigation|direct)$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How would you like to work with Gradum?');
  await page.goBack();
  await expect(page.locator('main h1')).toBeVisible();
}
