import { expect, test } from '@playwright/test';

test('map routes start on scroll, draw in order, and keep their completed state', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/');
  const map = page.locator('.regional-network-map');
  const overlay = map.locator('svg');
  await expect(overlay).toHaveCount(0);

  await map.scrollIntoViewIfNeeded();
  await expect(overlay).toHaveCount(1);
  await expect(map.locator('img')).toHaveAttribute('src', '/assets/glowing-americas-map-clean.png');
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  await expect(overlay.locator('[data-network-route]')).toHaveCount(6);

  const coordinates = await overlay.evaluate((svg) => [...svg.querySelectorAll<SVGGElement>('[data-network-route]')].map((group) => {
    const path = group.querySelector<SVGPathElement>('path')!;
    const destination = group.querySelector<SVGCircleElement>('.regional-network-map__destination')!;
    const start = path.getPointAtLength(0);
    const end = path.getPointAtLength(path.getTotalLength());
    return {
      start: [start.x, start.y],
      end: [end.x, end.y],
      destination: [Number(destination.getAttribute('cx')), Number(destination.getAttribute('cy'))],
    };
  }));
  expect(coordinates.every((route) => route.start[0] === 894 && route.start[1] === 323)).toBe(true);
  expect(coordinates.every((route) => route.end[0] === route.destination[0] && route.end[1] === route.destination[1])).toBe(true);

  const sample = async (time: number) => overlay.evaluate((svg, at) => {
    (svg as SVGSVGElement).setCurrentTime(at);
    const groups = [...svg.querySelectorAll<SVGGElement>('[data-network-route]')];
    return groups.map((group) => ({
      dash: parseFloat(getComputedStyle(group.querySelector('path')!).strokeDashoffset),
      routeOpacity: Number(getComputedStyle(group.querySelector('path')!).opacity),
      particleOpacity: Number(getComputedStyle(group.querySelector('.regional-network-map__particle')!).opacity),
      destinationOpacity: Number(getComputedStyle(group.querySelector('.regional-network-map__destination')!).opacity),
    }));
  }, time);

  const progress = await sample(1.2);
  expect(progress[0].dash).toBeGreaterThan(0);
  expect(progress[0].dash).toBeLessThan(1);
  expect(progress[0].particleOpacity).toBeGreaterThan(0.5);
  expect(progress[0].destinationOpacity).toBe(0);
  expect(progress.slice(1).every((route) => route.dash === 1 && route.routeOpacity === 0)).toBe(true);

  const complete = await sample(9.5);
  expect(complete.every((route) => route.dash === 0 && route.routeOpacity > 0.5 && route.destinationOpacity > 0.5)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await map.scrollIntoViewIfNeeded();
  await expect(overlay).toHaveCount(1);
  const revisited = await overlay.evaluate((svg) => [...svg.querySelectorAll('path')].map((path) => parseFloat(getComputedStyle(path).strokeDashoffset)));
  expect(revisited.every((dash) => dash === 0)).toBe(true);
});

test('image and SVG keep one coordinate system at every map breakpoint', async ({ page }) => {
  await page.goto('/');
  const map = page.locator('.regional-network-map');
  await map.scrollIntoViewIfNeeded();
  await expect(map.locator('svg')).toHaveCount(1);

  for (const width of [375, 390, 430, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const layout = await map.evaluate((element) => {
      const image = element.querySelector('img')!;
      const svg = element.querySelector('svg')!;
      const a = image.getBoundingClientRect();
      const b = svg.getBoundingClientRect();
      return {
        loaded: image.complete && image.naturalWidth === 1774 && image.naturalHeight === 887,
        image: [a.left, a.top, a.width, a.height],
        overlay: [b.left, b.top, b.width, b.height],
        viewBox: svg.getAttribute('viewBox'),
        overflow: document.documentElement.scrollWidth - innerWidth,
      };
    });
    expect(layout.loaded, `${width}px clean map`).toBe(true);
    expect(layout.viewBox).toBe('0 0 1774 887');
    layout.image.forEach((value, index) => expect(value, `${width}px image/SVG coordinate ${index}`).toBeCloseTo(layout.overlay[index], 1));
    expect(layout.overflow, `${width}px page overflow`).toBeLessThanOrEqual(1);
  }
});

test('reduced motion shows only the clean, accessible map', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const map = page.locator('.regional-network-map');
  await map.scrollIntoViewIfNeeded();
  await expect(map.locator('svg')).toHaveCount(0);
  await expect(map.locator('img')).toHaveAttribute('alt', 'Map of the Americas with the Dominican Republic highlighted.');
  await expect.poll(() => map.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test('routes wait for a delayed map image before playback begins', async ({ page }) => {
  let releaseImage!: () => void;
  const imageGate = new Promise<void>((resolve) => { releaseImage = resolve; });
  await page.route('**/assets/glowing-americas-map-clean.png', async (route) => {
    await imageGate;
    await route.continue();
  });
  try {
    await page.goto('/');
    const map = page.locator('.regional-network-map');
    await map.scrollIntoViewIfNeeded();
    await expect(map.locator('svg')).toHaveCount(0);
    releaseImage();
    await expect.poll(() => map.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(map.locator('svg')).toHaveCount(1);
    const clock = await map.locator('svg').evaluate((svg) => (svg as SVGSVGElement).getCurrentTime());
    expect(clock).toBeLessThan(1);
  } finally {
    releaseImage();
  }
});
