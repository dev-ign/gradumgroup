import { expect, test } from '@playwright/test';

const disabledLinks = 'a[href="/ventures"], a[href="/insights"], a[href="#client-portal"]';

test('launch navigation stays clear across languages and viewport sizes', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  for (const lang of ['en', 'es']) {
    await page.goto('/');
    await page.evaluate((language) => localStorage.setItem('lang', language), lang);

    for (const width of [1920, 1440, 1181, 1180, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator(disabledLinks)).toHaveCount(0);
      await expect(page.locator('.home-paths')).toHaveCount(0);
      await expect(page.locator('.site-footer__columns a[href="/about"]')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

      if (width > 1180) {
        await page.locator('.platform-trigger > button').click();
        await expect(page.locator('.platform-menu')).toBeVisible();
        await expect(page.locator('.platform-menu__families button')).toHaveCount(3);
      } else {
        await page.locator('.mobile-toggle').click();
        await expect(page.locator('.mobile-nav')).toBeVisible();
        await page.locator('.mobile-nav__parent').click();
        await expect(page.locator('.mobile-platform > div')).toHaveCount(3);
        await expect(page.locator(disabledLinks)).toHaveCount(0);
      }
    }
  }

  expect(errors).toEqual([]);
});

test('other launch pages have no disabled entry points and protected routes render the not-found page', async ({ page }) => {
  for (const route of ['/about', '/consulting', '/construction', '/services', '/consulting/capabilities']) {
    await page.goto(route);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator(disabledLinks)).toHaveCount(0);
  }

  for (const route of ['/ventures', '/insights']) {
    await page.goto(route);
    await expect(page.locator('main h1')).toHaveText('Page Not Found');
    await expect(page.locator(disabledLinks)).toHaveCount(0);
    await expect(page).toHaveURL(new RegExp(`${route}$`));
  }
});

test('protected routes use the existing Spanish not-found copy', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.goto('/ventures');
  await expect(page.locator('main h1')).toHaveText('Página no encontrada');
  await expect(page.locator('main a[href="/"]')).toBeVisible();
});
