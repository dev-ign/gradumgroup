import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/consulting');
});

test('Consulting overview uses approved copy and distinct conversion paths', async ({ page }) => {
  await expect(page.locator('.platform-hero h1')).toHaveText('Engineering Solutions for Complex Systems.');
  await expect(page.locator('.platform-hero__description')).toHaveText('We apply engineering, modeling, simulation, data, and software to help organizations address technical challenges.');
  await expect(page.locator('.family-consulting .eyebrow')).toHaveCount(0);

  const heroActions = page.locator('.platform-hero .button-row > *');
  await expect(heroActions).toHaveText(['Discuss Your Project', 'Explore Capabilities']);
  await expect(heroActions.first()).toHaveClass(/pill-button/);
  await expect(heroActions.last()).toHaveAttribute('href', '/consulting/capabilities');

  await expect(page.locator('.landing-card h2')).toHaveText(['Capabilities', 'Industries', 'How We Work']);
  await expect(page.locator('.landing-card p')).toHaveText([
    'Engineering analysis, modeling, simulation, and technical software.',
    'Engineering expertise applied across industrial and technology-driven environments.',
    'A structured approach from technical assessment to implementation support.',
  ]);
  await expect(page.locator('.landing-card .arrow-link')).toHaveText([
    'Explore Capabilities →', 'Explore Industries →', 'Explore Our Approach →',
  ]);
  await expect(page.locator('.landing-card').evaluateAll((cards) => cards.map((card) => card.getAttribute('href')))).resolves.toEqual([
    '/consulting/capabilities', '/consulting/industries', '/consulting/how-we-work',
  ]);
  await expect(page.locator('.landing-card').first().locator('img')).toHaveAttribute('src', /woman-analyzing-data-flowchart-computer-of/);

  await expect(page.locator('.platform-statement--consulting h2')).toHaveText('From Technical Complexity to Practical Solutions.');
  await expect(page.locator('.platform-statement--consulting .platform-statement__body')).toHaveText('We work with engineering and leadership teams to assess requirements, evaluate alternatives, and develop solutions suited to real operating environments.');
  await expect(page.locator('.tools-section h2')).toHaveText('Engineering Tools. Applied with Purpose.');
  await expect(page.locator('.tools-section p')).toHaveText('Our technical work can incorporate MATLAB & Simulink, Python, C/C++, data technologies, and embedded systems—selected according to project requirements.');
  await expect(page.locator('.tool-pills span')).toHaveText(['MATLAB & Simulink', 'Python', 'C/C++', 'Data Technologies', 'Embedded Systems']);
  await expect(page.locator('.tools-section__link')).toHaveAttribute('href', '/consulting/capabilities');
  await expect(page.locator('.explore-band--cta h2')).toHaveText("Let's Solve Your Next Technical Challenge.");
  await expect(page.locator('.explore-band--cta p')).toHaveText("Tell us about your project. We'll explore how Gradum Consulting can support your team.");

  await heroActions.first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await heroActions.last().click();
  await expect(page).toHaveURL(/\/consulting\/capabilities$/);
});

test('Consulting composition fits the requested widths and keeps keyboard access', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 1280, 1024, 768, 430, 390, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const result = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const hero = rect('.platform-hero__media');
      const chart = rect('.schematic');
      const toolsLink = rect('.tools-section__link');
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        hero: { left: hero.left, right: hero.right },
        chart: { left: chart.left, right: chart.right },
        toolsLink: { left: toolsLink.left, right: toolsLink.right },
      };
    });
    expect(result.overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(result.hero.left).toBeGreaterThanOrEqual(0);
    expect(result.hero.right).toBeLessThanOrEqual(width + 1);
    expect(result.chart.right).toBeLessThanOrEqual(width + 1);
    expect(result.toolsLink.left).toBeGreaterThanOrEqual(0);
    expect(result.toolsLink.right).toBeLessThanOrEqual(width + 1);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.tools-section__link').focus();
  await expect(page.locator('.tools-section__link')).toBeFocused();
  expect(await page.locator('.tools-section__link').evaluate((link) => getComputedStyle(link).outlineStyle)).not.toBe('none');
  await page.locator('.explore-band--cta .pill-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('Consulting scroll reveals settle once and reduced motion remains visible', async ({ page }) => {
  const sections = ['.landing-card-reveal', '.platform-statement__inner', '.tools-section', '.explore-band__content'];
  for (const selector of sections) {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator(selector).first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const selector of sections) {
    await expect.poll(() => page.locator(selector).first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.99);
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const selector of sections) {
    await expect.poll(() => page.locator(selector).first().evaluate((element) => Number(getComputedStyle(element).opacity))).toBe(1);
  }
});
