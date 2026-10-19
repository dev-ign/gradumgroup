import { expect, test } from '@playwright/test';

const route = '/construction/architecture';

test('Architecture uses the approved four-section story and text-only expertise grid', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  await expect(page.locator('main section')).toHaveCount(4);
  await expect(page.locator('main section')).toHaveClass([
    /detail-hero/, /detail-features/, /approach-band/, /explore-band--cta/,
  ]);
  await expect(page.locator('main .eyebrow')).toHaveCount(1);
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Construction');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/construction');
  await expect(page.locator('.detail-hero__category')).toHaveText('Architecture');
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('Architectural Design. From Concept to Detail.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Architectural design, visualization, and technical documentation for residential, commercial, and development projects.');
  await expect(page.locator('.detail-hero__image')).toHaveAttribute('alt', 'Architect reviewing floor plans and pointing to a drawing at a desk');
  await expect(page.locator('.detail-hero__image')).toHaveAttribute('src', /\/assets\/optimized\//);

  const expertise = page.getByRole('region', { name: 'Architecture expertise' });
  await expect(expertise.locator('article')).toHaveCount(6);
  await expect(expertise.locator('h2')).toHaveText([
    'Concept Design & Space Planning',
    'Architectural Design & Development',
    '3D Modeling & Visualization',
    'Construction Drawings & Documentation',
    'Renovation & Remodeling Design',
    'Architectural Coordination & Technical Support',
  ]);
  await expect(expertise.locator('p')).toHaveText([
    'Architectural concepts, preliminary layouts, and spatial planning aligned with project requirements.',
    'Residential and commercial architectural design, floor plans, elevations, sections, and design development.',
    'Architectural 3D models, renderings, and visual presentations to communicate design intent.',
    'Architectural construction drawings, technical details, and documentation supporting project execution.',
    'Architectural redesign, space adaptation, and renovation planning for existing properties.',
    'Design revisions, technical reviews, and coordination with engineering and construction teams.',
  ]);
  await expect(expertise.locator('img, .item-code, a, button')).toHaveCount(0);
  await expect(page.locator('.approach-band h2')).toHaveText('Architectural Expertise. At Every Stage.');
  await expect(page.locator('.approach-band p')).toHaveText('From individual drawings and visualizations to complete architectural design scopes, we support developers, contractors, design firms, and property owners.');
  await expect(page.locator('.approach-band .eyebrow, .approach-band button')).toHaveCount(0);
  await expect(page.locator('.explore-band--cta h2')).toHaveText("Let's Discuss Your Architectural Project.");
  await expect(page.locator('.explore-band--cta p')).toHaveText("Share your requirements. We'll identify the design services and deliverables your project needs.");
  await expect(page.getByText('Architecture shaped by purpose.')).toHaveCount(0);
  await expect(page.getByText('Concept & Feasibility')).toHaveCount(0);

  await page.locator('.detail-hero__breadcrumb a').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('.detail-hero .pill-button')).toBeFocused();
  expect(await page.locator('.detail-hero .pill-button').evaluate((button) => getComputedStyle(button).outlineStyle)).not.toBe('none');

  for (const button of [page.locator('.detail-hero .pill-button'), page.locator('.explore-band--cta .pill-button')]) {
    await expect(button).toHaveText('Discuss Your Project');
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('input#name')).toBeFocused();
    await page.keyboard.press('Escape');
  }
  await page.locator('.detail-hero__breadcrumb a').click();
  await expect(page).toHaveURL(/\/construction$/);
});

test('Architecture reflows cleanly in English and Spanish', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const lang of ['en', 'es']) {
    await page.evaluate((value) => localStorage.setItem('lang', value), lang);
    await page.reload();
    for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const layout = await page.evaluate(() => {
        const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
        const features = [...document.querySelectorAll('.detail-features .detail-feature')].map((element) => element.getBoundingClientRect());
        const heading = document.querySelector('.detail-hero h1')!;
        const textNode = heading.firstChild!;
        const separator = textNode.textContent!.indexOf('\n');
        const phraseLines = (start: number, end: number) => {
          const range = document.createRange();
          range.setStart(textNode, start);
          range.setEnd(textNode, end);
          return range.getClientRects().length;
        };
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          clippedHeadings: [...document.querySelectorAll('main h1, main h2')].some((element) => element.scrollWidth > element.clientWidth + 2),
          heroCopy: rect('.detail-hero__copy'),
          heroImage: rect('.detail-hero__image-frame'),
          heroButtonHeight: rect('.detail-hero .pill-button').height,
          finalButtonHeight: rect('.explore-band--cta .pill-button').height,
          phraseLines: [phraseLines(0, separator), phraseLines(separator + 1, textNode.textContent!.length)],
          features: features.map(({ top, left, right }) => ({ top, left, right })),
          supportHeading: rect('.approach-band h2'),
          supportBody: rect('.approach-band p'),
        };
      });

      expect(layout.overflow, `${lang} overflow at ${width}px`).toBeLessThanOrEqual(1);
      expect(layout.clippedHeadings, `${lang} heading at ${width}px`).toBe(false);
      expect(layout.heroButtonHeight).toBeGreaterThanOrEqual(44);
      expect(layout.finalButtonHeight).toBeGreaterThanOrEqual(44);
      expect(layout.features.every((feature) => feature.left >= 0 && feature.right <= width + 1)).toBe(true);
      expect(layout.phraseLines).toEqual([1, 1]);
      if (width > 1024) expect(layout.heroImage.left).toBeGreaterThan(layout.heroCopy.right);
      else expect(layout.heroImage.top).toBeGreaterThanOrEqual(layout.heroCopy.bottom);
      if (width > 760) {
        for (let index = 0; index < 6; index += 2) {
          expect(Math.abs(layout.features[index].top - layout.features[index + 1].top)).toBeLessThan(2);
          expect(layout.features[index].right).toBeLessThan(layout.features[index + 1].left);
        }
      } else {
        for (let index = 1; index < 6; index++) expect(layout.features[index].top).toBeGreaterThan(layout.features[index - 1].top);
      }
      if (width > 900) expect(layout.supportBody.left).toBeGreaterThan(layout.supportHeading.right);
      else expect(layout.supportBody.top).toBeGreaterThanOrEqual(layout.supportHeading.bottom);
    }
  }
});

test('Architecture reveals once and respects reduced motion', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const lastFeature = page.locator('.detail-feature').last();
  const supportHeading = page.locator('.approach-band h2');
  const finalHeading = page.locator('.explore-band--cta h2');
  const opacity = (selector: typeof lastFeature) => selector.evaluate((element) => Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));
  for (const target of [lastFeature, supportHeading, finalHeading]) expect(await opacity(target)).toBe(0);
  for (const target of [lastFeature, supportHeading, finalHeading]) {
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => opacity(target)).toBeGreaterThan(.99);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const target of [lastFeature, supportHeading, finalHeading]) expect(await opacity(target)).toBeGreaterThan(.99);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const target of [page.locator('.detail-hero__image-frame'), lastFeature, supportHeading, finalHeading]) {
    expect(await target.evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
  expect(errors).toEqual([]);
});
