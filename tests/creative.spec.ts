import { expect, test, type Locator } from '@playwright/test';

const route = '/services/marketing-media';

test('Creative copy, imagery, contact path, and section labels match the approved page', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto(route);

  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Services');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/services');
  await expect(page.locator('.detail-hero__category')).toHaveText('Creative & Media');
  await expect(page.locator('main h1')).toHaveText('Design. Digital. Production.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Graphic design, website development, audiovisual production, and creative direction for businesses that value thoughtful design and technical execution.');
  await expect(page.locator('.service-expertise h2')).toHaveText('Creative Capabilities. Practical Results.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
  await expect(page.locator('.detail-feature h3')).toHaveText([
    'Brand Identity & Graphic Design', 'Web Design & Development', 'Audiovisual Production',
    'Digital Experiences & Interactive Design', 'Creative Direction & Brand Management',
  ]);
  await expect(page.locator('.detail-feature p')).toHaveText([
    'Visual identities, brand guidelines, corporate materials, presentations, and graphic design assets.',
    'Corporate websites, landing pages, responsive interfaces, and website implementation.',
    'Video production, editing, motion graphics, and audio production for corporate and commercial applications.',
    'User interface design, interactive content, and digital presentations tailored to specific business needs.',
    'Ongoing creative leadership, brand consistency, visual direction, and coordination of creative projects.',
  ]);
  await expect(page.locator('.detail-feature > img')).toHaveCount(5);
  const imageSources = await page.locator('.detail-feature > img').evaluateAll((images) => images.map((image) => (image as HTMLImageElement).getAttribute('src')));
  expect(new Set(imageSources).size).toBe(5);
  expect(imageSources.every((source) => source?.startsWith('/assets/optimized/'))).toBe(true);
  await expect(page.locator('.approach-band h2')).toHaveText('Creative Expertise. On Your Terms.');
  await expect(page.locator('.approach-band p')).toHaveText([
    'From a website or brand identity to ongoing creative leadership, we provide the design and production capabilities your business needs.',
    'Engage Gradum for a defined project or as your ongoing creative partner.',
  ]);
  await expect(page.locator('.service-final-cta h2')).toHaveText("Let's Create Something Meaningful.");
  await expect(page.locator('.service-final-cta p')).toHaveText('Tell us about your next design, digital, or production project.');
  await expect(page.locator('.approach-band__visual img')).toHaveAttribute('src', /optimized/);

  for (const button of [page.locator('.detail-hero__copy .pill-button'), page.locator('.service-final-cta .pill-button')]) {
    await expect(button).toHaveText('Discuss Your Creative Project');
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
});

test('Creative Spanish localization retains the page identity and capability content', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.goto(route);
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Servicios');
  await expect(page.locator('.detail-hero__category')).toHaveText('Creatividad y Medios');
  await expect(page.locator('main h1')).toHaveText('Diseño. Digital. Producción.');
  await expect(page.locator('.detail-feature h3')).toHaveText([
    'Identidad de marca y diseño gráfico', 'Diseño y desarrollo web', 'Producción audiovisual',
    'Experiencias digitales y diseño interactivo', 'Dirección creativa y gestión de marca',
  ]);
  await expect(page.locator('.approach-band h2')).toHaveText('Experiencia creativa. En sus términos.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      clippedPanels: [...document.querySelectorAll('.detail-feature__copy')].some((panel) => panel.scrollHeight > panel.clientHeight + 1),
    }));
    expect(layout.overflow, `Spanish overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.clippedPanels, `Spanish panel clipping at ${width}px`).toBe(false);
  }
});

test('Creative cards and approach reflow without overflow and keep the colored CTA', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const width of [320, 375, 390, 430, 760, 761, 768, 900, 901, 1024, 1025, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const layout = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const cards = [...document.querySelectorAll('.detail-feature')].map((element) => element.getBoundingClientRect());
      const cardDetails = [...document.querySelectorAll('.detail-feature')].map((element) => {
        const image = element.querySelector('img')!;
        const panel = element.querySelector('.detail-feature__copy')!;
        const card = element.getBoundingClientRect();
        return {
          height: card.height,
          imageHeight: image.getBoundingClientRect().height,
          panelHeight: panel.getBoundingClientRect().height,
          panelColor: getComputedStyle(panel).backgroundColor,
          headingColor: getComputedStyle(panel.querySelector('h3')!).color,
          bodyColor: getComputedStyle(panel.querySelector('p')!).color,
        };
      });
      const image = rect('.approach-band__visual');
      const copy = rect('.approach-band__inner > div:last-child');
      const approach = document.querySelector('.approach-band')!;
      const cta = document.querySelector('.service-final-cta')!;
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        cards: cards.map(({ left, right, top, width }) => ({ left, right, top, width })),
        cardDetails,
        image: { right: image.right, bottom: image.bottom },
        copy: { left: copy.left, top: copy.top },
        approachColor: getComputedStyle(approach).backgroundColor,
        ctaColor: getComputedStyle(cta).backgroundColor,
        heroButtonHeight: rect('.detail-hero .pill-button').height,
        finalButtonHeight: rect('.service-final-cta .pill-button').height,
      };
    });

    expect(layout.overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.cards).toHaveLength(5);
    expect(layout.cards.every((card) => Math.abs(card.width - layout.cards[0].width) < 2)).toBe(true);
    expect(layout.cardDetails.every((card) => Math.abs(card.height - layout.cardDetails[0].height) < 2)).toBe(true);
    expect(layout.cardDetails.every((card) => Math.abs(card.imageHeight - layout.cardDetails[0].imageHeight) < 2)).toBe(true);
    expect(layout.cardDetails.every((card) => Math.abs(card.panelHeight - layout.cardDetails[0].panelHeight) < 2)).toBe(true);
    expect(layout.cardDetails.every((card) => card.panelColor === 'rgb(230, 251, 255)')).toBe(true);
    expect(layout.cardDetails.every((card) => card.headingColor === 'rgb(1, 51, 58)' && card.bodyColor === 'rgb(51, 51, 51)')).toBe(true);
    expect(new Set(layout.cards.map((card) => Math.round(card.top))).size).toBe(width <= 760 ? 5 : width <= 1024 ? 3 : 2);
    if (width > 760 && width <= 1024) expect(Math.abs((layout.cards.at(-1)!.left + layout.cards.at(-1)!.right) / 2 - width / 2)).toBeLessThan(2);
    if (width > 1024) expect(Math.abs((layout.cards[3].left + layout.cards[4].right) / 2 - width / 2)).toBeLessThan(2);
    if (width <= 900) expect(layout.copy.top).toBeGreaterThanOrEqual(layout.image.bottom);
    else expect(layout.copy.left).toBeGreaterThanOrEqual(layout.image.right);
    expect(layout.approachColor).toBe('rgb(255, 255, 255)');
    expect(layout.ctaColor).toBe('rgb(230, 251, 255)');
    expect(layout.heroButtonHeight).toBeGreaterThanOrEqual(44);
    expect(layout.finalButtonHeight).toBeGreaterThanOrEqual(44);
  }

  await page.locator('.approach-band__visual').scrollIntoViewIfNeeded();
  expect(await page.locator('.approach-band__visual img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  for (const selector of ['.detail-feature', '.approach-band__visual', '.approach-band h2', '.service-final-cta h2']) {
    expect(await page.locator(selector).first().evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
});

test('Creative card, approach, and final CTA reveals wait for view and remain visible', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await expect.poll(() => page.locator('.detail-hero h1').evaluate((element) => Number(getComputedStyle(element.parentElement!).opacity))).toBeGreaterThan(.99);

  const lastCard = page.locator('.detail-feature').last();
  const image = page.locator('.approach-band__visual');
  const heading = page.locator('.approach-band h2');
  const cta = page.locator('.service-final-cta h2');
  const opacity = (target: Locator) => target.evaluate((element) => Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));
  for (const target of [lastCard, image, heading, cta]) expect(await opacity(target)).toBe(0);

  await image.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight + 100, behavior: 'instant' }));
  await expect.poll(() => opacity(image)).toBeGreaterThan(.99);
  expect(await opacity(heading)).toBe(0);
  for (const target of [heading, cta]) {
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => opacity(target)).toBeGreaterThan(.99);
  }
  await lastCard.scrollIntoViewIfNeeded();
  await expect.poll(() => opacity(lastCard)).toBeGreaterThan(.99);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const target of [lastCard, image, heading, cta]) expect(await opacity(target)).toBeGreaterThan(.99);
});
