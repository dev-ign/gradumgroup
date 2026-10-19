import { expect, test } from '@playwright/test';

const route = '/construction/engineering';

test('Engineering uses the Construction service structure and approved copy', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  await expect(page.locator('main section')).toHaveClass([
    /detail-hero/, /detail-features/, /approach-band/, /explore-band--cta/,
  ]);
  await expect(page.locator('main h1')).toHaveText('Engineering Precision. From Design to Delivery.');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Construction');
  await expect(page.locator('.detail-hero__category')).toHaveText('Engineering');
  await expect(page.locator('.detail-hero__description')).toHaveText('Structural engineering, building systems, cost estimating, and technical project support for residential, commercial, and construction projects.');
  await expect(page.locator('.detail-hero__image')).toHaveAttribute('alt', 'Two engineers reviewing construction plans beside a building under construction');
  await expect(page.locator('.detail-hero__image')).toHaveJSProperty('complete', true);
  expect(await page.locator('.detail-hero__image').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const expertise = page.getByRole('region', { name: 'Our Expertise' });
  await expect(expertise.locator('article')).toHaveCount(6);
  await expect(expertise.locator('h2')).toHaveText([
    'Cost Estimating & Budgeting',
    'Quantity Takeoffs & Progress Valuations',
    'Structural Engineering',
    'Building Systems Engineering',
    'Technical Documentation & Coordination',
    'Project Planning & Cost Control',
  ]);
  await expect(expertise.locator('p')).toHaveText([
    'Construction budgets, detailed cost estimates, and unit price analysis for project planning and procurement.',
    'Material quantities, construction measurements, and progress valuations for accurate project assessment.',
    'Structural design, calculations, and technical drawings aligned with project requirements.',
    'Electrical, plumbing, and sanitary engineering design and technical coordination.',
    'Construction drawings, technical reviews, and coordination across architectural and engineering disciplines.',
    'Project schedules, budget monitoring, cost reporting, and analysis of changes during execution.',
  ]);
  await expect(expertise.locator('img, .item-code, button')).toHaveCount(0);
  await expect(page.locator('.approach-band h2')).toHaveText('Technical Expertise. When You Need It.');
  await expect(page.locator('.approach-band p')).toHaveText('From individual engineering deliverables to broader project coordination, we support contractors, developers, design firms, and project owners.');
  await expect(page.locator('.explore-band--cta h2')).toHaveText("Let's Discuss Your Engineering Requirements.");
  await expect(page.locator('.explore-band--cta p')).toHaveText("Share your project scope. We'll identify the technical services and deliverables your team needs.");

  await page.locator('.detail-hero__breadcrumb a').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('.detail-hero .pill-button')).toBeFocused();
  expect(await page.locator('.detail-hero .pill-button').evaluate((button) => getComputedStyle(button).outlineStyle)).not.toBe('none');

  for (const button of [page.locator('.detail-hero .pill-button'), page.locator('.explore-band--cta .pill-button')]) {
    await expect(button).toHaveText('Discuss Your Project');
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
});

test('Engineering keeps the Architecture layout across desktop, tablet, and mobile', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/construction/architecture');
  await page.getByRole('link', { name: 'Engineering', exact: true }).last().click();
  await expect(page).toHaveURL(/\/construction\/engineering$/);

  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const layout = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const heading = document.querySelector('.detail-hero h1')!;
      const textNode = heading.firstChild!;
      const separator = textNode.textContent!.indexOf('\n');
      const lines = (start: number, end: number) => {
        const range = document.createRange();
        range.setStart(textNode, start);
        range.setEnd(textNode, end);
        return range.getClientRects().length;
      };
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        headingLines: [lines(0, separator), lines(separator + 1, textNode.textContent!.length)],
        heroCopy: rect('.detail-hero__copy'),
        heroImage: rect('.detail-hero__image-frame'),
        features: [...document.querySelectorAll('.detail-feature')].map((item) => item.getBoundingClientRect()),
        supportHeading: rect('.approach-band h2'),
        supportBody: rect('.approach-band p'),
      };
    });
    expect(layout.overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.headingLines, `hero title at ${width}px`).toEqual([1, 1]);
    expect(layout.features.every((item) => item.left >= 0 && item.right <= width + 1)).toBe(true);
    if (width > 1024) expect(layout.heroImage.left).toBeGreaterThan(layout.heroCopy.right);
    else expect(layout.heroImage.top).toBeGreaterThanOrEqual(layout.heroCopy.bottom);
    if (width > 760) expect(layout.features[0].right).toBeLessThan(layout.features[1].left);
    else expect(layout.features[1].top).toBeGreaterThan(layout.features[0].top);
    if (width > 900) expect(layout.supportBody.left).toBeGreaterThan(layout.supportHeading.right);
    else expect(layout.supportBody.top).toBeGreaterThanOrEqual(layout.supportHeading.bottom);
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const selector of ['.detail-hero__image-frame', '.detail-feature:last-child', '.approach-band h2', '.explore-band--cta h2']) {
    expect(await page.locator(selector).evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('Engineering reveals content once and keeps reduced-motion content visible', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const targets = [
    page.locator('.detail-feature').last(),
    page.locator('.approach-band h2'),
    page.locator('.explore-band--cta h2'),
  ];
  const opacity = (target: typeof targets[number]) => target.evaluate((element) =>
    Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));

  for (const target of targets) expect(await opacity(target)).toBe(0);
  for (const target of targets) {
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => opacity(target)).toBeGreaterThan(.99);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const target of targets) expect(await opacity(target)).toBeGreaterThan(.99);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const target of targets) {
    expect(await target.evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
});
