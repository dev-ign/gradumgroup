import { expect, test } from '@playwright/test';

test('Services landing navigates to each offering and its CTA opens contact', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/services');

  await expect(page.locator('.platform-hero h1')).toHaveText('The Expertise Behind Stronger Businesses.');
  await expect(page.locator('.landing-expertise h2')).toHaveText('Specialized Services. Built Around Your Business.');
  await expect(page.locator('.landing-card h3')).toHaveText(['Accounting & Finance', 'Creative & Media', 'Legal & Corporate']);
  await expect(page.locator('.landing-card .arrow-link')).toHaveText([
    'Explore Accounting & Finance →', 'Explore Creative & Media →', 'Explore Legal & Corporate →',
  ]);
  await expect(page.locator('.landing-expertise .eyebrow, .platform-statement--services .eyebrow, .landing-expertise .item-code')).toHaveCount(0);

  await page.getByRole('button', { name: 'Explore Our Services' }).click();
  await expect.poll(() => page.locator('#explore').evaluate((section) =>
    section.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom,
  )).toBeLessThan(40);
  expect(await page.locator('#explore').evaluate((section) =>
    section.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom,
  )).toBeGreaterThanOrEqual(0);

  for (const route of ['/services/accounting-finance', '/services/marketing-media', '/services/admin-legal']) {
    await page.locator(`.landing-card[href="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await page.goto('/services');
  }

  await page.getByRole('button', { name: 'Discuss Your Business Needs' }).last().click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('Services cards reflow evenly and the model chart never overlaps its copy', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/services');

  for (const width of [320, 375, 390, 430, 640, 768, 900, 1024, 1180, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const layout = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.landing-card')].map((element) => element.getBoundingClientRect());
      const copy = document.querySelector('.platform-statement__copy')!.getBoundingClientRect();
      const chart = document.querySelector('.platform-statement__growth')!.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        cards: cards.map(({ left, right, width }) => ({ left, right, width })),
        copy: { right: copy.right, bottom: copy.bottom },
        chart: { left: chart.left, top: chart.top },
      };
    });

    expect(layout.overflow).toBeLessThanOrEqual(1);
    expect(layout.cards).toHaveLength(3);
    expect(layout.cards.every((card) => Math.abs(card.width - layout.cards[0].width) < 2)).toBe(true);
    expect(layout.chart.top >= layout.copy.bottom || layout.chart.left >= layout.copy.right).toBe(true);
    if (width >= 768 && width <= 1180) {
      expect(Math.abs((layout.cards[2].left + layout.cards[2].right) / 2 - width / 2)).toBeLessThan(2);
    }
  }
});

test('Services reveals remain visible after scrolling back and reduced motion shows content immediately', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/services');

  const animated = page.locator('.landing-expertise__heading > div, .landing-card-reveal, .platform-statement__copy > div, .explore-band__content > div');
  await expect.poll(() => animated.first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBe(0);
  for (const selector of ['.landing-expertise__heading', '.landing-card-reveal', '.platform-statement__copy', '.explore-band__content']) {
    await page.locator(selector).first().evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 450, behavior: 'instant' }));
    await expect.poll(() => page.locator(selector).first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);
  }
  await expect.poll(async () => animated.evaluateAll((elements) => elements.every((element) => Number(getComputedStyle(element).opacity) > .99))).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(async () => animated.evaluateAll((elements) => elements.every((element) => Number(getComputedStyle(element).opacity) > .99))).toBe(true);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect.poll(async () => animated.evaluateAll((elements) => elements.every((element) => {
    const style = getComputedStyle(element);
    return Number(style.opacity) === 1 && style.transform === 'none';
  }))).toBe(true);
});

test('Services detail pages retain their routes, capabilities, and contact path', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  const pages = [
    { route: '/services/accounting-finance', title: 'Financial Clarity. Stronger Decisions.', count: 6, cta: 'Discuss Your Financial Needs' },
    { route: '/services/marketing-media', title: 'Design. Digital. Production.', count: 5, cta: 'Discuss Your Creative Project' },
    { route: '/services/admin-legal', title: 'Legal Clarity. Business Confidence.', count: 5, cta: 'Discuss Your Legal Needs' },
  ];

  for (const item of pages) {
    await page.goto(item.route);
    await expect(page.locator('main h1')).toHaveText(item.title);
    await expect(page.locator('.detail-features--services .detail-feature')).toHaveCount(item.count);
    await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/services');
    await expect(page.locator('.service-final-cta .pill-button')).toHaveText(item.cta);
    await page.locator('.detail-hero__copy .pill-button').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.locator('.detail-hero__breadcrumb a').click();
    await expect(page).toHaveURL(/\/services$/);
  }
});

test('five capability cards keep their width and center the incomplete row', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/services/marketing-media', '/services/admin-legal']) {
    await page.goto(route);
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const cards = await page.locator('.detail-features--services .detail-feature').evaluateAll((elements) => elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: rect.width, opacity: Number(getComputedStyle(element).opacity) };
      }));
      expect(cards).toHaveLength(5);
      expect(cards.every((card) => Math.abs(card.width - cards[0].width) < 2)).toBe(true);
      expect(cards.every((card) => card.opacity === 1)).toBe(true);
      if (width === 1440) expect(Math.abs((cards[3].left + cards[4].right) / 2 - width / 2)).toBeLessThan(2);
      if (width === 768) expect(Math.abs((cards[4].left + cards[4].right) / 2 - width / 2)).toBeLessThan(2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  }
});
