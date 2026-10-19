import { expect, test } from '@playwright/test';

test('Construction centers mobile hero content while its eyebrow reaches the left edge', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/construction');

  const layout = await page.locator('.platform-hero').evaluate((hero) => {
    const eyebrow = hero.querySelector<HTMLElement>('.platform-eyebrow')!;
    const heading = hero.querySelector<HTMLElement>('h1')!;
    const description = hero.querySelector<HTMLElement>('.platform-hero__description')!;
    const actions = hero.querySelector<HTMLElement>('.button-row')!;
    const image = hero.querySelector<HTMLElement>('.platform-hero__media')!;
    return {
      heroLeft: hero.getBoundingClientRect().left,
      heroCenter: hero.getBoundingClientRect().left + hero.getBoundingClientRect().width / 2,
      eyebrowLeft: eyebrow.getBoundingClientRect().left,
      eyebrowBackgroundLeft: eyebrow.getBoundingClientRect().left + parseFloat(getComputedStyle(eyebrow, '::before').left),
      headingAlignment: getComputedStyle(heading).textAlign,
      descriptionAlignment: getComputedStyle(description).textAlign,
      actionsAlignment: getComputedStyle(actions).justifyContent,
      imageCenter: image.getBoundingClientRect().left + image.getBoundingClientRect().width / 2,
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(layout.eyebrowLeft).toBeCloseTo(layout.heroLeft, 0);
  expect(layout.eyebrowBackgroundLeft).toBeCloseTo(0, 0);
  expect(layout.headingAlignment).toBe('center');
  expect(layout.descriptionAlignment).toBe('center');
  expect(layout.actionsAlignment).toBe('center');
  expect(layout.imageCenter).toBeCloseTo(layout.heroCenter, 0);
  expect(layout.overflow).toBeLessThanOrEqual(1);
});

test('Capabilities retains its editorial hero and left-anchored eyebrow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/consulting/capabilities');

  const layout = await page.locator('.detail-hero').evaluate((hero) => {
    const eyebrow = hero.querySelector<HTMLElement>('.platform-eyebrow')!;
    const heading = hero.querySelector<HTMLElement>('h1')!;
    const description = hero.querySelector<HTMLElement>('.detail-hero__description')!;
    const image = hero.querySelector<HTMLElement>('.detail-hero__image-frame')!;
    return {
      heroLeft: hero.getBoundingClientRect().left,
      eyebrowLeft: eyebrow.getBoundingClientRect().left,
      eyebrowBackgroundLeft: eyebrow.getBoundingClientRect().left + parseFloat(getComputedStyle(eyebrow, '::before').left),
      headingAlignment: getComputedStyle(heading).textAlign,
      descriptionAlignment: getComputedStyle(description).textAlign,
      imageTop: image.getBoundingClientRect().top,
      descriptionBottom: description.getBoundingClientRect().bottom,
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });

  expect(layout.eyebrowLeft).toBeCloseTo(layout.heroLeft, 0);
  expect(layout.eyebrowBackgroundLeft).toBeCloseTo(0, 0);
  expect(layout.headingAlignment).not.toBe('center');
  expect(layout.descriptionAlignment).not.toBe('center');
  expect(layout.imageTop).toBeGreaterThan(layout.descriptionBottom);
  expect(layout.overflow).toBeLessThanOrEqual(1);
});
