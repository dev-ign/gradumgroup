import { expect, test, type Locator } from '@playwright/test';

const route = '/services/admin-legal';

test('Legal page keeps approved copy, page identity, imagery, and contact path', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto(route);

  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Services');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/services');
  await expect(page.locator('.detail-hero__category')).toHaveText('Legal & Corporate');
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('Legal Clarity. Business Confidence.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Business legal advisory, commercial contracts, and corporate counsel to help companies navigate legal obligations and make informed decisions.');
  await expect(page.locator('.service-expertise h2')).toHaveText('Legal Support for Business Decisions.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
  await expect(page.locator('.detail-feature h3')).toHaveText([
    'Corporate Formation & Structuring', 'Commercial Contracts & Agreements',
    'Corporate Governance & Compliance', 'Business Transactions & Due Diligence',
    'Ongoing Corporate Legal Counsel',
  ]);
  await expect(page.locator('.detail-feature p')).toHaveText([
    'Company incorporation, corporate structuring, and legal documentation for business entities.',
    'Drafting, review, and negotiation of commercial contracts and business agreements.',
    'Corporate records, governance requirements, and guidance on applicable legal obligations.',
    'Legal review and advisory support for commercial transactions and business opportunities.',
    'Continuing legal advice for business operations, commercial decisions, and corporate matters.',
  ]);
  await expect(page.locator('.detail-feature img')).toHaveCount(0);
  await expect(page.locator('.approach-band h2')).toHaveText('Legal Expertise. When Your Business Needs It.');
  await expect(page.locator('.approach-band p')).toHaveText([
    "From individual agreements and corporate matters to ongoing legal counsel, we provide business-focused legal support tailored to your company's requirements.",
    'Our approach emphasizes practical advice, clear communication, and informed commercial decisions.',
  ]);
  await expect(page.locator('.service-final-cta h2')).toHaveText("Let's Discuss Your Business's Legal Needs.");
  await expect(page.locator('.service-final-cta p')).toHaveText("Whether you need help with a commercial agreement, corporate requirements, or ongoing legal counsel, let's define the appropriate next steps.");
  await expect(page.locator('.detail-hero__image')).toHaveAttribute('alt', 'Business professional holding a folder in a shared office');
  await expect(page.locator('.detail-hero__image, .approach-band__visual img')).toHaveCount(2);
  for (const image of await page.locator('.detail-hero__image, .approach-band__visual img').all()) {
    await expect(image).toHaveAttribute('src', /\/assets\/optimized\//);
  }

  for (const button of [page.locator('.detail-hero__copy .pill-button'), page.locator('.service-final-cta .pill-button')]) {
    await expect(button).toHaveText('Discuss Your Legal Needs');
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('input#name')).toBeFocused();
    await page.keyboard.press('Escape');
  }
});

test('Legal Spanish copy reflows without clipped content', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Servicios');
  await expect(page.locator('.detail-hero__category')).toHaveText('Legal y Corporativo');
  await expect(page.locator('main h1')).toHaveText('Claridad legal. Confianza empresarial.');
  await expect(page.locator('.detail-feature h3')).toHaveText([
    'Constitución y estructuración corporativa', 'Contratos y acuerdos comerciales',
    'Gobierno corporativo y cumplimiento', 'Transacciones empresariales y debida diligencia',
    'Asesoría legal corporativa continua',
  ]);
  await expect(page.locator('.approach-band h2')).toHaveText('Experiencia legal. Cuando su empresa la necesita.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      clipped: [...document.querySelectorAll('.detail-feature, .approach-band__inner > div:last-child, .service-final-cta__content')].some((element) => element.scrollHeight > element.clientHeight + 1),
    }));
    expect(layout.overflow, `Spanish overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.clipped, `Spanish content clipped at ${width}px`).toBe(false);
  }
});

test('Legal layout keeps five balanced cards, white approach, and colored CTA', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const width of [320, 360, 375, 390, 430, 640, 720, 760, 761, 768, 900, 901, 1023, 1024, 1025, 1099, 1100, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const layout = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const cards = [...document.querySelectorAll('.detail-feature')].map((element) => element.getBoundingClientRect());
      const image = rect('.approach-band__visual');
      const copy = rect('.approach-band__inner > div:last-child');
      const heroButton = rect('.detail-hero .pill-button');
      const heroImage = rect('.detail-hero__image-frame');
      const heroCopy = rect('.detail-hero__copy');
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        heroDisplay: getComputedStyle(document.querySelector('.detail-hero')!).display,
        cards: cards.map(({ left, right, top, width, height }) => ({ left, right, top, width, height })),
        approachColor: getComputedStyle(document.querySelector('.approach-band')!).backgroundColor,
        overlayDisplay: getComputedStyle(document.querySelector('.approach-band')!, '::after').display,
        approachTopPadding: parseFloat(getComputedStyle(document.querySelector('.approach-band')!).paddingTop),
        ctaColor: getComputedStyle(document.querySelector('.service-final-cta')!).backgroundColor,
        image: { right: image.right, bottom: image.bottom },
        copy: { left: copy.left, top: copy.top },
        heroGap: heroImage.top - heroButton.bottom,
        heroImage: { left: heroImage.left, width: heroImage.width, height: heroImage.height },
        heroCopyRight: heroCopy.right,
        heroButtonHeight: heroButton.height,
        finalButtonHeight: rect('.service-final-cta .pill-button').height,
      };
    });

    expect(layout.overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.cards).toHaveLength(5);
    expect(layout.cards.every((card) => Math.abs(card.width - layout.cards[0].width) < 2)).toBe(true);
    expect(layout.cards.every((card) => Math.abs(card.height - layout.cards[0].height) < 2)).toBe(true);
    expect(new Set(layout.cards.map((card) => Math.round(card.top))).size).toBe(width <= 760 ? 5 : width <= 1024 ? 3 : 2);
    if (width > 760 && width <= 1024) expect(Math.abs((layout.cards[4].left + layout.cards[4].right) / 2 - width / 2)).toBeLessThan(2);
    if (width > 1024) expect(Math.abs((layout.cards[3].left + layout.cards[4].right) / 2 - width / 2)).toBeLessThan(2);
    if (width <= 900) expect(layout.copy.top).toBeGreaterThanOrEqual(layout.image.bottom);
    else expect(layout.copy.left).toBeGreaterThanOrEqual(layout.image.right);
    expect(layout.approachColor).toBe('rgb(255, 255, 255)');
    expect(layout.overlayDisplay).toBe('none');
    expect(layout.approachTopPadding).toBe(width <= 760 ? 32 : 60);
    expect(layout.ctaColor).toBe('rgb(230, 251, 255)');
    if (width >= 1100) {
      expect(layout.heroDisplay).toBe('grid');
      expect(layout.heroImage.left - layout.heroCopyRight).toBeGreaterThanOrEqual(32);
      expect(layout.heroImage.width / layout.heroImage.height).toBeCloseTo(1.25, 1);
    } else {
      expect(layout.heroDisplay).toBe('flex');
      expect(layout.heroGap).toBeGreaterThanOrEqual(20);
      expect(layout.heroImage.width / layout.heroImage.height).toBeCloseTo(width <= 760 ? 4 / 3 : 3 / 2, 1);
    }
    expect(layout.heroButtonHeight).toBeGreaterThanOrEqual(44);
    expect(layout.finalButtonHeight).toBeGreaterThanOrEqual(44);
  }

  await page.locator('.approach-band__visual').scrollIntoViewIfNeeded();
  expect(await page.locator('.approach-band__visual img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test('Legal reveals enter once, wait for view, and respect reduced motion', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await expect.poll(() => page.locator('.detail-hero h1').evaluate((element) => Number(getComputedStyle(element.parentElement!).opacity))).toBeGreaterThan(.99);
  await expect.poll(() => page.locator('.detail-hero__image-frame').evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);

  const lastCard = page.locator('.detail-feature').last();
  const image = page.locator('.approach-band__visual');
  const heading = page.locator('.approach-band h2');
  const cta = page.locator('.service-final-cta h2');
  const opacity = (target: Locator) => target.evaluate((element) => Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));
  for (const target of [lastCard, image, heading, cta]) expect(await opacity(target)).toBe(0);

  for (const target of [lastCard, image, heading, cta]) {
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => opacity(target)).toBeGreaterThan(.99);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const target of [lastCard, image, heading, cta]) expect(await opacity(target)).toBeGreaterThan(.99);

  await page.reload();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await cta.scrollIntoViewIfNeeded();
  await expect.poll(() => opacity(cta)).toBeGreaterThan(.99);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const target of [page.locator('.detail-hero__image-frame'), lastCard, image, heading, cta]) {
    expect(await target.evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
});
