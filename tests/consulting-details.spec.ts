import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
  });
});

test('Capabilities keeps its wide image, four skills, and photographic contact section', async ({ page }) => {
  await page.goto('/consulting/capabilities');
  await expect(page.locator('article h1')).toHaveText('Engineering Expertise. Applied to Complex Challenges.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Modeling, simulation, software, and engineering analysis to help organizations evaluate systems, improve performance, and advance technical projects.');
  await expect(page.locator('article h1')).toHaveCount(1);
  await expect(page.locator('.consulting-capabilities .detail-feature h2')).toHaveText([
    'Engineering Intelligence', 'Modeling, Simulation & Control', 'Engineering Software & Automation', 'Embedded & Intelligent Systems',
  ]);
  await expect(page.locator('.consulting-capabilities .detail-feature p')).toHaveText([
    'Data analysis, optimization, and decision-support solutions for complex engineering challenges.',
    'Modeling and simulation to evaluate system behavior, performance, and control strategies.',
    'Technical software, algorithms, and automated workflows that improve engineering processes.',
    'Software and system-level engineering for embedded, connected, and intelligent applications.',
  ]);
  await expect(page.locator('.consulting-approach h2')).toHaveText('Technology Follows the Problem.');
  await expect(page.locator('.consulting-approach p')).toHaveText('The right methods and technologies, selected around your technical requirements—not the other way around.');
  await expect(page.locator('.consulting-approach .approach-band__background')).toBeVisible();
  await page.locator('.consulting-approach .pill-button').focus();
  await expect(page.locator('.consulting-approach .pill-button')).toBeFocused();
  expect(await page.locator('.consulting-approach .pill-button').evaluate((button) => getComputedStyle(button).outlineStyle)).not.toBe('none');
  await page.locator('.consulting-approach .pill-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('Industries renders six distinct relevant image rows and its final CTA', async ({ page }) => {
  await page.goto('/consulting/industries');
  await expect(page.locator('article h1')).toHaveText('Engineering Expertise. Across Critical Industries.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Engineering and technology consulting for organizations across the Dominican Republic and Latin America.');
  await expect(page.locator('.consulting-industries .detail-feature h2')).toHaveText([
    'Industrial Manufacturing', 'Energy, Utilities & Oil and Gas', 'Technology & Product Engineering',
    'Medical Devices & Life Sciences', 'Agriculture & AgTech', 'Infrastructure & Transportation',
  ]);
  await expect(page.locator('.consulting-industries .detail-feature p')).toHaveText([
    'Modeling, simulation, automation, and engineering software for industrial processes and production systems.',
    'Engineering analysis, modeling, simulation, and technical software for energy infrastructure and operations.',
    'Engineering software, simulation, algorithms, and technical development for products and connected systems.',
    'Modeling, technical software, and engineering support for medical technologies and device development.',
    'Engineering analysis, automation, and data-driven solutions for agricultural equipment and systems.',
    'Simulation, analytics, and optimization for infrastructure, logistics, and transportation systems.',
  ]);
  const sources = await page.locator('.consulting-industries img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
  expect(new Set(sources).size).toBe(6);
  for (const image of await page.locator('.consulting-industries img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    await expect(image).toHaveAttribute('alt', /.+/);
  }
  await expect(page.locator('.consulting-final-cta h2')).toHaveText('Have a Technical Challenge?');
  await expect(page.locator('.consulting-final-cta p')).toHaveText("Let's discuss your engineering requirements and explore how Gradum Consulting can support your team.");
  await expect(page.locator('.consulting-final-cta .pill-button')).toHaveText('Discuss Your Project');
});

test('How We Work keeps six numbered steps, Flexible Engagements, and completed CTA copy', async ({ page }) => {
  await page.goto('/consulting/how-we-work');
  await expect(page.locator('article h1')).toHaveText('A Disciplined Approach. From Analysis to Implementation.');
  await expect(page.locator('.detail-hero__description')).toHaveText('We structure each engagement around your technical requirements, project scope, and objectives.');
  await expect(page.locator('.consulting-process .item-code')).toHaveText(['01', '02', '03', '04', '05', '06']);
  await expect(page.locator('.consulting-process h2')).toHaveText(['Discover', 'Assess', 'Model & Prototype', 'Validate', 'Implement', 'Improve']);
  await expect(page.locator('.consulting-process p')).toHaveText([
    'Understand the objectives, technical requirements, and operating constraints.',
    'Evaluate alternatives, technical feasibility, and project priorities.',
    'Develop models, simulations, or prototypes to test potential solutions.',
    'Assess performance, technical trade-offs, and readiness for implementation.',
    'Support integration and the transition to practical applications.',
    'Refine performance and adapt solutions as requirements evolve.',
  ]);
  await expect(page.locator('.consulting-support h2')).toHaveText('The Right Expertise. At the Right Stage.');
  await expect(page.locator('.consulting-support p')).toHaveText('From focused technical assessments to broader engineering projects, our involvement is defined by your needs—not a fixed process.');
  await expect(page.locator('.consulting-final-cta h2')).toHaveText("Let's Define Your Next Step.");
  await expect(page.locator('.consulting-final-cta p')).toHaveText("Tell us about your technical challenge. We'll explore the right approach and next steps for your project.");
  await page.locator('.consulting-final-cta .pill-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('all Consulting detail layouts fit requested widths in English and Spanish', async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/consulting');
  for (const lang of ['en', 'es']) {
    await page.evaluate((value) => localStorage.setItem('lang', value), lang);
    for (const route of ['capabilities', 'industries', 'how-we-work']) {
      await page.goto(`/consulting/${route}`);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const layout = await page.evaluate(() => {
          const hero = document.querySelector('.detail-hero')!.getBoundingClientRect();
          const cta = document.querySelector('article .pill-button')!.getBoundingClientRect();
          return { overflow: document.documentElement.scrollWidth - innerWidth, heroRight: hero.right, ctaLeft: cta.left, ctaRight: cta.right };
        });
        expect(layout.overflow, `${lang} ${route} at ${width}px`).toBeLessThanOrEqual(1);
        expect(layout.heroRight).toBeLessThanOrEqual(width + 1);
        expect(layout.ctaLeft).toBeGreaterThanOrEqual(0);
        expect(layout.ctaRight).toBeLessThanOrEqual(width + 1);
      }
    }
  }
});

async function expectIndustriesContent(page: Page) {
  await expect(page).toHaveURL(/\/consulting\/industries$/);
  await expect(page.locator('.consulting-industries .detail-feature')).toHaveCount(6);
  await expect.poll(() => page.locator('.detail-hero__copy').evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);
  await expect.poll(() => page.evaluate(() => {
    const row = document.querySelector('.consulting-industries .detail-feature');
    row?.scrollIntoView({ block: 'center', behavior: 'instant' });
    return row ? Number(getComputedStyle(row).opacity) : 0;
  })).toBeGreaterThan(.99);
}

test('Industries remains visible through direct, client, history, and reduced-motion navigation', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/consulting/industries');
  await expectIndustriesContent(page);

  for (let i = 0; i < 3; i++) {
    await page.goto('/consulting');
    await page.locator('.landing-card[href="/consulting/industries"]').click();
    await expectIndustriesContent(page);
    await page.goBack();
    await page.goForward();
    await expectIndustriesContent(page);
  }

  for (const route of ['capabilities', 'how-we-work']) {
    await page.goto(`/consulting/${route}`);
    await page.locator('footer a[href="/consulting/industries"]').click();
    await expectIndustriesContent(page);
  }

  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.consulting-industries .detail-feature').last().scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
  await page.reload();
  await expectIndustriesContent(page);
  await page.locator('.consulting-industries .detail-feature').last().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.consulting-industries .detail-feature').last().evaluate((element) => Number(getComputedStyle(element).opacity))).toBe(1);
});

test('Consulting detail reveals settle after scrolling and reduced motion exposes content', async ({ page }) => {
  test.setTimeout(60_000);
  for (const route of ['capabilities', 'industries', 'how-we-work']) {
    await page.goto(`/consulting/${route}`);
    const targets = page.locator('.detail-features .detail-feature, .consulting-support__inner, .consulting-final-cta .explore-band__content, .consulting-approach .approach-band__inner');
    for (const target of await targets.all()) {
      await target.scrollIntoViewIfNeeded();
      await expect.poll(() => target.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => targets.evaluateAll((elements) => elements.every((element) => Number(getComputedStyle(element).opacity) > .99))).toBe(true);
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect.poll(() => page.locator('.consulting-process .detail-feature, .consulting-support__inner, .consulting-final-cta .explore-band__content').evaluateAll((elements) => elements.every((element) => Number(getComputedStyle(element).opacity) === 1))).toBe(true);
});
