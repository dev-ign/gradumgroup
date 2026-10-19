import { expect, test } from '@playwright/test';

const route = '/services/accounting-finance';

test('Accounting keeps its page identity and approved copy without section labels or card numbers', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto(route);

  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Services');
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveAttribute('href', '/services');
  await expect(page.locator('.detail-hero__category')).toHaveText('Accounting & Finance');
  await expect(page.locator('main h1')).toHaveText('Financial Clarity. Stronger Decisions.');
  await expect(page.locator('.detail-hero__description')).toHaveText('Accounting, tax compliance, financial reporting, and advisory services to help businesses maintain control, meet their obligations, and plan with confidence.');
  await expect(page.locator('.service-expertise h2')).toHaveText('Financial Support at Every Stage.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
  await expect(page.locator('.detail-feature h3')).toHaveText([
    'Accounting & Bookkeeping', 'Tax & Regulatory Compliance', 'Financial Reporting',
    'Payroll & TSS Administration', 'Budgeting & Cash Flow Planning', 'Fractional CFO & Financial Advisory',
  ]);
  await expect(page.locator('.detail-feature p')).toHaveText([
    'Monthly accounting, bank reconciliations, transaction recording, and financial recordkeeping.',
    'DGII tax filings, regulatory reporting, and ongoing support with applicable tax obligations.',
    'Financial statements, management reports, and performance analysis to provide a clearer view of your business.',
    'Payroll processing, TSS reporting, and administration of related employment obligations.',
    'Budget preparation, cash-flow forecasts, and financial planning to support business decisions.',
    'Senior-level financial oversight, strategic planning, and ongoing advisory without the need for a full-time CFO.',
  ]);
  await expect(page.locator('.approach-band h2')).toHaveText('Beyond Compliance. Toward Financial Clarity.');
  await expect(page.locator('.approach-band p')).toHaveText([
    'Reliable accounting is the foundation of sound financial management.',
    'We combine organized records, regulatory compliance, and practical financial insight to help businesses understand their financial position and make informed decisions.',
    'From monthly accounting to fractional CFO engagements, our services are structured around your needs.',
  ]);

  for (const button of [page.locator('.detail-hero__copy .pill-button'), page.locator('.service-final-cta .pill-button')]) {
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }

  await page.goto('/services/admin-legal');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
});

test('Accounting retains its Spanish identity and DGII/TSS wording', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.goto(route);
  await expect(page.locator('.detail-hero__breadcrumb a')).toHaveText('Gradum Servicios');
  await expect(page.locator('.detail-hero__category')).toHaveText('Contabilidad y Finanzas');
  await expect(page.locator('main h1')).toHaveText('Claridad financiera. Decisiones más sólidas.');
  await expect(page.locator('.service-expertise .eyebrow, .approach-band .eyebrow, .detail-feature .item-code')).toHaveCount(0);
  await expect(page.locator('.detail-feature').nth(1).locator('p')).toHaveText('Declaraciones tributarias ante la DGII, informes regulatorios y apoyo continuo con las obligaciones tributarias aplicables.');
  await expect(page.locator('.detail-feature').nth(3).locator('p')).toHaveText('Procesamiento de nómina, reportes ante la TSS y administración de las obligaciones laborales relacionadas.');
});

test('Accounting reflows from three to two to one columns without overflow', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);

  for (const width of [320, 375, 390, 430, 640, 768, 900, 901, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const layout = await page.evaluate(() => {
      const rect = (selector: string) => {
        const box = document.querySelector(selector)!.getBoundingClientRect();
        return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width };
      };
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        cards: [...document.querySelectorAll('.detail-feature')].map((element) => {
          const box = element.getBoundingClientRect();
          return { left: box.left, top: box.top, width: box.width };
        }),
        image: rect('.approach-band__visual'),
        copy: rect('.approach-band__inner > div:last-child'),
        heroButtonHeight: document.querySelector('.detail-hero .pill-button')!.getBoundingClientRect().height,
        finalButtonHeight: document.querySelector('.service-final-cta .pill-button')!.getBoundingClientRect().height,
      };
    });

    expect(layout.overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
    expect(layout.cards).toHaveLength(6);
    expect(layout.cards.every((card) => Math.abs(card.width - layout.cards[0].width) < 2)).toBe(true);
    expect(new Set(layout.cards.map((card) => Math.round(card.top))).size).toBe(width <= 760 ? 6 : width <= 1024 ? 3 : 2);
    expect(layout.heroButtonHeight).toBeGreaterThanOrEqual(44);
    expect(layout.finalButtonHeight).toBeGreaterThanOrEqual(44);
    if (width <= 900) expect(layout.copy.top).toBeGreaterThanOrEqual(layout.image.bottom);
    else expect(layout.copy.left).toBeGreaterThanOrEqual(layout.image.right);
  }

  await page.locator('.approach-band__visual').scrollIntoViewIfNeeded();
  expect(await page.locator('.approach-band__visual img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  const selectors = ['.detail-feature', '.approach-band__visual', '.approach-band__inner > div:last-child h2', '.service-final-cta h2'];
  for (const selector of selectors) {
    expect(await page.locator(selector).first().evaluate((element) => {
      const animated = element.closest('[style*="opacity"]') ?? element;
      const style = getComputedStyle(animated);
      return Number(style.opacity) === 1 && style.transform === 'none';
    })).toBe(true);
  }
});

test('Accounting reveals enter on scroll and stay visible when scrolling back', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await expect.poll(() => page.locator('.detail-hero h1').evaluate((element) => Number(getComputedStyle(element.parentElement!).opacity))).toBeGreaterThan(.99);

  const lastCard = page.locator('.detail-feature').last();
  const approachImage = page.locator('.approach-band__visual');
  const approachHeading = page.locator('.approach-band h2');
  const finalHeading = page.locator('.service-final-cta h2');
  const opacity = (selector: typeof lastCard) => selector.evaluate((element) => Number(getComputedStyle(element.closest('[style*="opacity"]') ?? element).opacity));

  expect(await opacity(lastCard)).toBe(0);
  expect(await opacity(approachImage)).toBe(0);
  expect(await opacity(approachHeading)).toBe(0);
  expect(await opacity(finalHeading)).toBe(0);

  for (const target of [lastCard, approachImage, approachHeading, finalHeading]) {
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => opacity(target)).toBeGreaterThan(.99);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  for (const target of [lastCard, approachImage, approachHeading, finalHeading]) {
    expect(await opacity(target)).toBeGreaterThan(.99);
  }
});
