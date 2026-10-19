import { expect, test } from '@playwright/test';

const route = '/construction/build';

test('Execution renders the approved four-section content and inquiry CTA', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  await expect(page.locator('main section')).toHaveClass([
    /detail-hero/, /detail-features/, /approach-band/, /explore-band--cta/,
  ]);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('From Planning. To Built Reality.');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/construction');
  await expect(page.locator('.detail-hero__category')).toHaveText('Execution');
  await expect(page.locator('.detail-hero__description')).toHaveText('Construction execution, project management, and site supervision for residential and commercial projects.');
  await expect(page.locator('.detail-hero__image')).toHaveAttribute('alt', 'Construction supervisors coordinating work at an active building site');
  expect(await page.locator('.detail-hero__image').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const expertise = page.getByRole('region', { name: 'Our Expertise' });
  await expect(expertise.locator('article')).toHaveCount(6);
  await expect(expertise.locator('h2')).toHaveText([
    'Construction Execution',
    'Preconstruction & Planning',
    'Construction Management',
    'Site Supervision & Quality Control',
    'Contractor & Supplier Coordination',
    'Project Closeout & Handover',
  ]);
  await expect(expertise.locator('p')).toHaveText([
    'Construction of residential, commercial, and development projects in accordance with approved plans and specifications.',
    'Scope assessment, construction sequencing, resource planning, and site preparation.',
    'Management of project schedules, resources, contractors, and construction activities.',
    'On-site supervision, progress monitoring, and quality control throughout construction.',
    'Coordination of subcontractors, suppliers, materials, and construction logistics.',
    'Final inspections, completion reviews, outstanding-item resolution, and project handover.',
  ]);
  await expect(page.locator('.approach-band .eyebrow')).toHaveText('Our Approach');
  await expect(page.locator('.approach-band h2')).toHaveText('Built on Planning. Delivered Through Execution.');
  await expect(page.locator('.approach-band p:not(.eyebrow)')).toHaveText("From individual construction scopes to complete project execution, we align technical requirements, resources, and on-site coordination with each project's objectives.");
  await expect(page.locator('.explore-band--cta h2')).toHaveText('Ready to Build?');
  await expect(page.locator('.explore-band--cta p')).toHaveText("Tell us about your project. We'll evaluate the scope, requirements, and next steps.");

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
});

test('Execution reflows across desktop, tablet, and mobile in both languages', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const lang of ['en', 'es']) {
    await page.evaluate((value) => localStorage.setItem('lang', value), lang);
    await page.reload();
    for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const layout = await page.evaluate(() => {
        const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
        const heading = document.querySelector('main h1')!;
        const text = heading.firstChild!;
        const separator = text.textContent!.indexOf('\n');
        const lineCount = (start: number, end: number) => {
          const range = document.createRange();
          range.setStart(text, start);
          range.setEnd(text, end);
          return range.getClientRects().length;
        };
        return {
          overflow: document.documentElement.scrollWidth - innerWidth,
          clipped: [...document.querySelectorAll('main h1, main h2')].some((item) => item.scrollWidth > item.clientWidth + 2),
          heroLines: [lineCount(0, separator), lineCount(separator + 1, text.textContent!.length)],
          heroCopy: rect('.detail-hero__copy'),
          heroImage: rect('.detail-hero__image-frame'),
          features: [...document.querySelectorAll('.detail-feature')].map((item) => item.getBoundingClientRect()),
          supportHeading: rect('.approach-band h2'),
          supportBody: rect('.approach-band p:not(.eyebrow)'),
        };
      });
      expect(layout.overflow, `${lang} overflow at ${width}px`).toBeLessThanOrEqual(1);
      expect(layout.clipped, `${lang} heading at ${width}px`).toBe(false);
      if (lang === 'en') expect(layout.heroLines).toEqual([1, 1]);
      expect(layout.features.every((item) => item.left >= 0 && item.right <= width + 1)).toBe(true);
      if (width > 1024) expect(layout.heroImage.left).toBeGreaterThan(layout.heroCopy.right);
      else expect(layout.heroImage.top).toBeGreaterThanOrEqual(layout.heroCopy.bottom);
      if (width > 760) expect(layout.features[0].right).toBeLessThan(layout.features[1].left);
      else expect(layout.features[1].top).toBeGreaterThan(layout.features[0].top);
      if (width > 900) expect(layout.supportHeading.right).toBeLessThanOrEqual(layout.supportBody.left);
      else expect(layout.supportBody.top).toBeGreaterThanOrEqual(layout.supportHeading.bottom);
    }
  }
  expect(errors).toEqual([]);
});

test('Execution reveals once and respects reduced motion', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);

  const targets = [page.locator('.detail-feature').last(), page.locator('.approach-band h2'), page.locator('.explore-band--cta h2')];
  const opacity = (target: typeof targets[number]) => target.evaluate((element) => Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));
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
