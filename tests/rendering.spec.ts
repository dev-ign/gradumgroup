import { expect, test, type Page } from '@playwright/test';

const routes = [
  '/', '/about', '/consulting', '/consulting/capabilities', '/consulting/industries',
  '/consulting/how-we-work', '/construction', '/construction/architecture',
  '/construction/engineering', '/construction/build', '/services',
  '/services/accounting-finance', '/services/marketing-media', '/services/admin-legal',
];

async function hiddenContent(page: Page) {
  return page.locator('main').evaluate((main) => [...main.querySelectorAll('h1,h2,h3,p,button,a')]
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= innerHeight || rect.right <= 0 || rect.left >= innerWidth) return false;
      let current: Element | null = element;
      while (current && current !== main) {
        const style = getComputedStyle(current);
        if (Number(style.opacity) < 0.99 || style.visibility === 'hidden' || style.display === 'none') return true;
        current = current.parentElement;
      }
      return false;
    })
    .map((element) => element.textContent?.trim().slice(0, 50))
    .filter(Boolean));
}

test.describe('site content reliability', () => {
  for (const route of routes) {
    test(`${route} direct load, fast scroll, and image delivery`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(route);
      await expect(page.locator('main h1')).toBeVisible();
      await expect.poll(() => hiddenContent(page)).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect.poll(() => hiddenContent(page)).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => hiddenContent(page)).toEqual([]);

      const imageSources = await page.locator('main img').evaluateAll((images) => images.map((image) => image.getAttribute('src') ?? ''));
      expect(imageSources.filter((src) => /\/assets\/figma\/(?:Personas|Tech|Finanzas|Creatividad|Construccio)/.test(src))).toEqual([]);
      expect(imageSources.some((src) => src.includes('/assets/optimized/')) || route === '/about').toBe(true);
      expect(errors).toEqual([]);
    });
  }

  for (const route of routes) {
    test(`${route} mobile visibility and geometry`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      await expect(page.locator('main h1')).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect.poll(() => hiddenContent(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    });
  }

  test('desktop navigation, related detail navigation, history, and refresh', async ({ page }) => {
    await page.goto('/');
    await page.locator('.platform-trigger > button').click();
    await page.locator('.platform-menu__children a[href="/consulting"]').click();
    await expect(page).toHaveURL(/\/consulting$/);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    const capabilityCard = page.locator('.landing-card[href="/consulting/capabilities"]');
    await capabilityCard.scrollIntoViewIfNeeded();
    const consultingScroll = await page.evaluate(() => scrollY);
    await capabilityCard.click();
    await expect(page).toHaveURL(/\/consulting\/capabilities$/);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await page.goBack();
    await expect(page).toHaveURL(/\/consulting$/);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await expect.poll(async () => Math.abs((await page.evaluate(() => scrollY)) - consultingScroll)).toBeLessThan(40);
    await page.goForward();
    await expect(page).toHaveURL(/\/consulting\/capabilities$/);
    await page.reload();
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await page.locator('.platform-trigger > button').click();
    await page.locator('.platform-menu__children a[href="/consulting/industries"]').click();
    await expect(page).toHaveURL(/\/consulting\/industries$/);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
  });

  test('mobile menu works after resize and reduced motion keeps content visible', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('.mobile-toggle').click();
    await page.locator('.mobile-nav__parent').click();
    await page.locator('.mobile-platform button').filter({ hasText: 'Services' }).click();
    await page.locator('.mobile-platform__children a[href="/services/accounting-finance"]').click();
    await expect(page).toHaveURL(/\/services\/accounting-finance$/);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await page.setViewportSize({ width: 820, height: 1024 });
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect.poll(() => hiddenContent(page)).toEqual([]);
  });

  test('slow or failed image requests do not hide text or collapse the hero', async ({ page }) => {
    await page.route('**/assets/optimized/**', (route) => route.abort());
    await page.goto('/services/accounting-finance');
    await expect(page.locator('main h1')).toBeVisible();
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    const height = await page.locator('.detail-hero__image-frame').evaluate((element) => element.getBoundingClientRect().height);
    expect(height).toBeGreaterThan(200);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => hiddenContent(page)).toEqual([]);
  });

  test('slow image delivery leaves hero text and geometry available', async ({ page }) => {
    await page.route('**/assets/optimized/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route.continue();
    });
    await page.goto('/services/accounting-finance', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main h1')).toBeVisible();
    const hero = page.locator('.detail-hero__image');
    expect(await hero.evaluate((image: HTMLImageElement) => image.complete)).toBe(false);
    expect(await page.locator('.detail-hero__image-frame').evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(200);
    await expect.poll(() => hiddenContent(page)).toEqual([]);
    await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  });
});
