import { expect, test } from '@playwright/test';

const routes = [
  '/', '/about', '/consulting', '/consulting/capabilities', '/consulting/industries',
  '/consulting/how-we-work', '/construction', '/construction/architecture',
  '/construction/engineering', '/construction/build', '/services',
  '/services/accounting-finance', '/services/marketing-media', '/services/admin-legal',
  '/ventures', '/insights',
];
const widths = [1280, 1024, 900, 768, 640, 320];

test.describe('responsive geometry', () => {
  for (const route of routes) {
    test(`${route} stays within the viewport between breakpoints`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);

      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        const geometry = await page.evaluate(() => ({
          viewport: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          wideHeadings: [...document.querySelectorAll<HTMLElement>('main h1, main h2, main h3')]
            .filter((heading) => heading.scrollWidth > heading.clientWidth + 3)
            .map((heading) => heading.textContent?.trim().slice(0, 45)),
        }));
        expect(geometry.viewport, `${route} at ${width}px`).toBe(width);
        expect(geometry.scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(width + 1);
        expect(geometry.wideHeadings, `${route} at ${width}px`).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }

  test('Home headline clears the mosaic across the desktop transition in both languages', async ({ page }) => {
    await page.goto('/');
    for (const lang of ['en', 'es']) {
      await page.evaluate((language) => localStorage.setItem('lang', language), lang);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      for (const width of [1440, 1350, 1280, 1181, 1101]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        const gap = await page.evaluate(() => document.querySelector('.home-hero__image--portrait')!.getBoundingClientRect().left
          - document.querySelector('.home-hero h1')!.getBoundingClientRect().right);
        expect(gap, `${lang} Home at ${width}px`).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('Spanish mobile navigation remains usable at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));
    await page.goto('/');
    await page.locator('.mobile-toggle').click();
    await page.locator('.mobile-nav__parent').click();
    await page.locator('.mobile-platform button').nth(2).click();
    const targets = await page.locator('.mobile-nav a, .mobile-nav button').evaluateAll((elements) => elements
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => ({ height: element.getBoundingClientRect().height, right: element.getBoundingClientRect().right })));
    expect(targets.every((target) => target.height >= 43 && target.right <= 321)).toBe(true);
    await page.locator('.mobile-platform__children a[href="/services/accounting-finance"]').click();
    await expect(page).toHaveURL(/\/services\/accounting-finance$/);
  });
});
