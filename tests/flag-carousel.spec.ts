import { expect, test } from '@playwright/test';

test('regional carousel uses local SVGs and keeps its circular infinite track', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/');

  const carousel = page.locator('.regional-marquee');
  const sequences = carousel.locator('.regional-marquee__sequence');
  await expect(sequences).toHaveCount(2);
  await expect(sequences.nth(1)).toHaveAttribute('aria-hidden', 'true');
  await expect(sequences.first().locator('img')).toHaveCount(23);
  await expect(carousel.locator('.regional-marquee__emoji')).toHaveCount(0);

  const geometry = await carousel.evaluate(async (element) => {
    const images = [...element.querySelectorAll<HTMLImageElement>('img')];
    await Promise.all(images.map((image) => image.decode()));
    const sourcePaths = [...new Set(images.map((image) => new URL(image.src).pathname))];
    const flag = element.querySelector<HTMLElement>('.regional-support__flag')!;
    const viewport = element.querySelector<HTMLElement>('.regional-marquee__viewport')!;
    const track = element.querySelector<HTMLElement>('.regional-marquee__track')!;
    const sequences = [...element.querySelectorAll<HTMLElement>('.regional-marquee__sequence')];
    return {
      sourcePaths,
      imageWidths: images.map((image) => image.naturalWidth),
      borderRadius: getComputedStyle(flag).borderRadius,
      objectFit: getComputedStyle(images[0]).objectFit,
      mask: getComputedStyle(viewport).maskImage,
      animationName: getComputedStyle(track).animationName,
      animationState: getComputedStyle(track).animationPlayState,
      sequenceWidths: sequences.map((sequence) => sequence.getBoundingClientRect().width),
      trackWidth: track.getBoundingClientRect().width,
    };
  });

  expect(geometry.sourcePaths).toHaveLength(23);
  expect(geometry.sourcePaths.every((path) => /^\/assets\/flags\/[a-z]{2}\.svg$/.test(path))).toBe(true);
  expect(geometry.imageWidths.every((width) => width > 0)).toBe(true);
  expect(geometry.borderRadius).toBe('50%');
  expect(geometry.objectFit).toBe('cover');
  expect(geometry.mask).toContain('linear-gradient');
  expect(geometry.animationName).toBe('regional-marquee');
  expect(geometry.animationState).toBe('running');
  expect(geometry.sequenceWidths[0]).toBeCloseTo(geometry.sequenceWidths[1], 1);
  expect(geometry.trackWidth).toBeCloseTo(geometry.sequenceWidths[0] * 2, 1);

  await carousel.hover();
  await expect.poll(() => carousel.locator('.regional-marquee__track').evaluate((track) => getComputedStyle(track).animationPlayState)).toBe('paused');
  await page.mouse.move(0, 0);
  await carousel.focus();
  await expect.poll(() => carousel.locator('.regional-marquee__track').evaluate((track) => getComputedStyle(track).animationPlayState)).toBe('paused');
});

test('reduced motion keeps one accessible, scrollable flag sequence', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const carousel = page.locator('.regional-marquee');
  await expect(carousel).toHaveClass(/regional-marquee--static/);
  await expect(carousel.locator('.regional-marquee__sequence')).toHaveCount(1);
  await expect(carousel.locator('img')).toHaveCount(23);
  await expect(carousel.locator('img').first()).toHaveAttribute('alt', 'Estados Unidos');
  const dimensions = await carousel.evaluate((element) => ({
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    overflow: document.documentElement.scrollWidth - innerWidth,
  }));
  expect(dimensions.scrollWidth).toBeGreaterThan(dimensions.clientWidth);
  expect(dimensions.overflow).toBeLessThanOrEqual(1);
});
