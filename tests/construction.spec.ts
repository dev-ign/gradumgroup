import { expect, test } from '@playwright/test';

const route = '/construction';

test('Construction follows the finalized six-section story and retains its detail routes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  await expect(page.locator('main section')).toHaveCount(6);
  await expect(page.locator('main section')).toHaveClass([
    /platform-hero/, /construction-intro/, /landing-expertise/, /construction-process/,
    /construction-audiences/, /explore-band--cta/,
  ]);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('From Concept to Construction.');
  await expect(page.locator('main .eyebrow')).toHaveCount(1);
  await expect(page.locator('.platform-hero .eyebrow')).toHaveText('Gradum Construction');
  await expect(page.locator('.platform-hero__description')).toHaveText('Architecture, engineering, and construction execution for residential, commercial, and development projects.');
  await expect(page.locator('.platform-hero .outline-button')).toHaveCount(0);
  await expect(page.locator('.construction-intro h2')).toHaveText('Integrated Expertise. Flexible Engagements.');
  await expect(page.locator('.construction-intro p')).toHaveText([
    'We bring together architectural design, technical engineering, and construction execution to support projects from early planning through completion.',
    "Whether you need a specific deliverable or a team to carry out a broader scope, we tailor our involvement to your project's requirements.",
  ]);

  await expect(page.locator('.landing-expertise h2')).toHaveText('Three Disciplines. One Commitment to Delivery.');
  await expect(page.locator('.landing-expertise .item-code, .construction-process__number')).toHaveCount(0);
  await expect(page.locator('.landing-expertise h3')).toHaveText(['Architecture', 'Engineering', 'Execution']);
  await expect(page.locator('.landing-expertise .landing-card__subtitle')).toHaveText([
    'Design & Documentation', 'Technical & Cost Engineering', 'Construction & Project Delivery',
  ]);
  await expect(page.locator('.landing-expertise .landing-card .arrow-link')).toHaveText([
    'Explore Architecture →', 'Explore Engineering →', 'Explore Execution →',
  ]);
  await expect(page.locator('.construction-process h2')).toHaveText('One Project. The Right Expertise.');
  await expect(page.locator('.construction-process__step h3')).toHaveText([
    'Define the Scope', 'Develop the Solution', 'Execute & Coordinate',
  ]);
  await expect(page.locator('.construction-audiences h2')).toHaveText('Built Around Your Project Needs.');
  await expect(page.locator('.construction-audiences__group h3')).toHaveText([
    'Developers & Property Owners', 'Contractors & Construction Firms', 'Architects & Engineering Firms',
  ]);
  await expect(page.locator('.explore-band--cta h2')).toHaveText('Have a Project in Mind?');
  await expect(page.locator('.explore-band--cta p')).toHaveText("From a technical deliverable to a complete construction scope, let's discuss what your project requires.");

  const links = [
    ['Architecture', '/construction/architecture'],
    ['Engineering', '/construction/engineering'],
    ['Execution', '/construction/execution'],
  ] as const;
  for (const [title, href] of links) {
    await page.getByRole('link', { name: new RegExp(`Explore ${title}`) }).click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await page.goto(route);
  }

  for (const button of [page.locator('.platform-hero .pill-button'), page.locator('.explore-band--cta .pill-button')]) {
    await expect(button).toHaveText('Discuss Your Project');
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('input#name')).toBeFocused();
    await page.keyboard.press('Escape');
  }
});

test('Construction reflows without overflow in both languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const lang of ['en', 'es']) {
    await page.evaluate((value) => localStorage.setItem('lang', value), lang);
    await page.reload();
    for (const width of [320, 375, 390, 430, 768, 900, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const layout = await page.evaluate(() => {
        const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
        const cards = [...document.querySelectorAll('.landing-expertise .landing-card')].map((element) => element.getBoundingClientRect());
        const links = [...document.querySelectorAll('.landing-expertise .arrow-link')].map((element) => element.getBoundingClientRect());
        const dividers = [...document.querySelectorAll('.construction-audiences__group')].map((element) => element.getBoundingClientRect());
        const copy = rect('.platform-hero__copy');
        const image = rect('.platform-hero__media');
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          clippedHeadings: [...document.querySelectorAll('main h1, main h2, main h3')].some((heading) => heading.scrollWidth > heading.clientWidth + 2),
          headerBottom: rect('.site-header').bottom,
          eyebrowTop: rect('.platform-eyebrow').top,
          copyRight: copy.right,
          copyBottom: copy.bottom,
          imageLeft: image.left,
          imageTop: image.top,
          cards: cards.map(({ left, right, top, width, height }) => ({ left, right, top, width, height })),
          linkBottoms: links.map(({ bottom }) => bottom),
          dividers: dividers.map(({ top, width }) => ({ top, width })),
        };
      });

      expect(layout.overflow, `${lang} overflow at ${width}px`).toBeLessThanOrEqual(1);
      expect(layout.clippedHeadings, `${lang} heading at ${width}px`).toBe(false);
      expect(layout.eyebrowTop, `${lang} navigation at ${width}px`).toBeGreaterThan(layout.headerBottom);
      if (width > 1180) {
        expect(layout.imageLeft).toBeGreaterThan(layout.copyRight);
        expect(new Set(layout.cards.map((card) => Math.round(card.top))).size).toBe(1);
        expect(layout.cards.every((card) => Math.abs(card.height - layout.cards[0].height) < 2)).toBe(true);
        expect(layout.linkBottoms.every((bottom) => Math.abs(bottom - layout.linkBottoms[0]) < 2)).toBe(true);
        expect(layout.dividers.every((divider) => Math.abs(divider.top - layout.dividers[0].top) < 2 && Math.abs(divider.width - layout.dividers[0].width) < 2)).toBe(true);
      } else {
        expect(layout.imageTop).toBeGreaterThanOrEqual(layout.copyBottom);
        expect(new Set(layout.cards.map((card) => Math.round(card.top))).size).toBe(width <= 760 ? 3 : 2);
      }
      expect(layout.cards.every((card) => card.left >= 0 && card.right <= width + 1 && card.width > 0)).toBe(true);
    }
  }
});

test('Construction images and scroll reveals load once and respect reduced motion', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const target = page.locator('.construction-audiences__group').first();
  const opacity = () => target.evaluate((element) => Number(getComputedStyle(element).opacity));
  expect(await opacity()).toBe(0);
  await target.scrollIntoViewIfNeeded();
  await expect.poll(opacity).toBeGreaterThan(.99);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  expect(await opacity()).toBeGreaterThan(.99);

  const executionImage = page.locator('.landing-expertise .landing-card > img').last();
  await executionImage.scrollIntoViewIfNeeded();
  await expect.poll(() => executionImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const selector of ['.construction-intro__inner > div', '.landing-expertise__heading > div', '.construction-process__heading > div', '.construction-process__step', '.construction-audiences__group', '.explore-band__content > div']) {
    const visible = await page.locator(selector).evaluateAll((elements) => elements.every((element) => {
      const style = getComputedStyle(element);
      return Number(style.opacity) === 1 && style.transform === 'none';
    }));
    expect(visible, selector).toBe(true);
  }
  expect(errors).toEqual([]);
});
