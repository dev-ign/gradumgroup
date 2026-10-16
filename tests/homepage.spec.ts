import { expect, test, type Page } from '@playwright/test';

const fillRatio = (page: Page) => page.locator('.engagement-timeline__fill').evaluate((fill) => {
  const trackHeight = fill.parentElement!.getBoundingClientRect().height;
  return fill.getBoundingClientRect().height / trackHeight;
});

const captureReveal = (page: Page, selector: string, index = 0) => page.evaluate(async ({ selector, index }) => {
  const element = document.querySelectorAll<HTMLElement>(selector)[index];
  const before = Number(getComputedStyle(element).opacity);
  window.scrollTo(0, element.getBoundingClientRect().top + scrollY - innerHeight + 80);
  const frames: number[] = [];
  for (let frame = 0; frame < 55; frame += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    frames.push(Number(getComputedStyle(element).opacity));
  }
  return { before, frames };
}, { selector, index });

const expectOneWayReveal = ({ before, frames }: { before: number; frames: number[] }) => {
  expect(before).toBe(0);
  expect(frames.some((opacity) => opacity > 0.05 && opacity < 0.95)).toBe(true);
  expect(frames.every((opacity, index) => index === 0 || opacity >= frames[index - 1] - 0.02)).toBe(true);
  expect(frames.at(-1)).toBeGreaterThan(0.99);
};

test('approved English homepage copy and contact actions are present', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.goto('/');

  await expect(page.locator('.home-hero .eyebrow')).toHaveCount(0);
  await expect(page.locator('.home-hero h1')).toHaveText('Specialized Expertise. Real-World Impact.');
  await expect(page.locator('.home-hero__description')).toHaveText('Engineering, construction, and professional business services for organizations navigating technical, operational, and commercial challenges.');
  await expect(page.locator('.home-hero__actions button')).toHaveText(['Discuss Your Project', 'Explore Our Expertise']);

  await expect(page.locator('#expertise h2')).toHaveText('Three Disciplines. Focused Expertise.');
  await expect(page.locator('#expertise .section-heading p')).toHaveText([
    'We bring together specialized capabilities across engineering and technology, the built environment, and business operations.',
    'Each division provides dedicated expertise, with engagements tailored to the requirements of the client and project.',
  ]);
  await expect(page.locator('.discipline-card h3')).toHaveText(['Gradum Consulting', 'Gradum Construction', 'Gradum Services']);
  await expect(page.locator('.discipline-card__category')).toHaveText(['Engineering & Technology', 'Architecture, Engineering & Execution', 'Finance, Creative & Legal']);
  await expect(page.locator('.discipline-card p')).toHaveText([
    'Engineering modeling, simulation, technical software, and analytical solutions for complex systems and industrial applications.',
    'Architectural design, engineering services, construction estimating, and project execution—from individual technical deliverables to broader construction scopes.',
    'Accounting and financial advisory, creative and digital production, and corporate legal support through project-based and ongoing professional engagements.',
  ]);
  await expect(page.locator('.discipline-card__cta')).toHaveText(['Explore Consulting →', 'Explore Construction →', 'Explore Services →']);
  await expect(page.locator('.discipline-card .item-code')).toHaveCount(0);

  await expect(page.locator('#how-we-work-title')).toHaveText('The Right Expertise. For the Work That Matters.');
  await expect(page.locator('.home-insight__intro p')).toHaveText([
    'Every engagement begins with understanding the requirements, constraints, and intended outcomes.',
    "We define the scope, bring together the appropriate capabilities, and focus on delivering practical work that addresses the client's needs.",
  ]);
  await expect(page.locator('.engagement-timeline__content h3')).toHaveText(['Understand the Challenge', 'Define the Scope', 'Deliver the Work']);
  await expect(page.locator('.engagement-timeline__content p')).toHaveText([
    'Clarify objectives, requirements, and project constraints.',
    'Establish deliverables, responsibilities, and the appropriate engagement model.',
    'Apply specialized expertise with clear communication and accountability.',
  ]);
  await expect(page.locator('.latam-section h2')).toHaveText('Rooted in the Dominican Republic. Connected to Broader Markets.');
  await expect(page.locator('.latam-section p')).toHaveText([
    'Based in the Dominican Republic, Gradum Group supports organizations locally while pursuing selected opportunities across Latin America and North America.',
    'Our multidisciplinary structure allows us to address different types of technical, construction, and business needs through focused service divisions.',
  ]);
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('alt', 'Network map showing connections from the Dominican Republic across the Americas.');
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('loading', 'lazy');
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('decoding', 'async');
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('width', '1774');
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('height', '887');
  await expect(page.locator('.latam-section__visual source')).toHaveAttribute('type', 'image/webp');
  await expect(page.locator('.latam-section img[src*="latam-flags"]')).toHaveCount(0);
  await page.locator('.latam-section__visual img').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.latam-section__visual img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(await page.locator('.latam-section__visual img').evaluate((image: HTMLImageElement) => image.currentSrc)).toContain('.webp');
  await expect(page.locator('.home-cta h2')).toHaveText("Let's Discuss What You're Building.");
  await expect(page.locator('.home-cta p')).toHaveText("Whether you're developing a technical solution, planning a construction project, or strengthening a business function, let's explore how Gradum can support your objectives.");
  await expect(page.locator('.home-cta .pill-button')).toHaveText('Discuss Your Project');

  await page.locator('.home-hero__actions .pill-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('.home-cta .pill-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('Spanish homepage copy follows the same structure', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'es'));
  await page.goto('/');

  await expect(page.locator('.home-hero h1')).toHaveText('Experiencia especializada. Impacto en el mundo real.');
  await expect(page.locator('.home-hero__actions button')).toHaveText(['Hablemos de su proyecto', 'Explore nuestra experiencia']);
  await expect(page.locator('#expertise h2')).toHaveText('Tres disciplinas. Experiencia especializada.');
  await expect(page.locator('.discipline-card__category')).toHaveText(['Ingeniería y tecnología', 'Arquitectura, ingeniería y ejecución', 'Finanzas, creatividad y asuntos legales']);
  await expect(page.locator('#how-we-work-title')).toHaveText('La experiencia adecuada. Para el trabajo que importa.');
  await expect(page.locator('.engagement-timeline__content h3')).toHaveText(['Comprender el desafío', 'Definir el alcance', 'Entregar el trabajo']);
  await expect(page.locator('.latam-section h2')).toHaveText('Con raíces en la República Dominicana. Conectados con mercados más amplios.');
  await expect(page.locator('.latam-section__visual img')).toHaveAttribute('alt', 'Mapa de conexiones desde la República Dominicana hacia el resto de las Américas.');
  await expect(page.locator('.home-cta h2')).toHaveText('Hablemos de lo que está construyendo.');
});

test('timeline fill and active nodes follow measured positions in desktop and mobile layouts', async ({ page }) => {
  await page.goto('/');

  for (const width of [1440, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const geometry = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('.engagement-timeline__node')];
      const track = document.querySelector('.engagement-timeline__track')!;
      const trackRect = track.getBoundingClientRect();
      return {
        nodeY: nodes.map((node) => { const rect = node.getBoundingClientRect(); return rect.top + rect.height / 2 + scrollY; }),
        nodeX: nodes.map((node) => { const rect = node.getBoundingClientRect(); return rect.left + rect.width / 2; }),
        trackTop: trackRect.top + scrollY,
        trackBottom: trackRect.bottom + scrollY,
        trackX: trackRect.left + trackRect.width / 2,
        activationOffset: innerHeight * 0.65,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });

    expect(geometry.overflow, `${width}px overflow`).toBe(false);
    expect(Math.abs(geometry.trackTop - geometry.nodeY[0]), `${width}px first node`).toBeLessThan(2);
    expect(Math.abs(geometry.trackBottom - geometry.nodeY[2]), `${width}px last node`).toBeLessThan(2);
    expect(geometry.nodeX.every((x) => Math.abs(x - geometry.trackX) < 2), `${width}px center line`).toBe(true);

    for (const index of [0, 1, 2]) {
      await page.evaluate(({ y, offset }) => window.scrollTo(0, y - offset + 2), { y: geometry.nodeY[index], offset: geometry.activationOffset });
      const expected = (geometry.nodeY[index] - geometry.nodeY[0]) / (geometry.nodeY[2] - geometry.nodeY[0]);
      await expect.poll(() => fillRatio(page), { message: `${width}px node ${index + 1} lower bound` }).toBeGreaterThanOrEqual(Math.max(0, expected - 0.035));
      await expect.poll(() => fillRatio(page), { message: `${width}px node ${index + 1} upper bound` }).toBeLessThanOrEqual(Math.min(1, expected + 0.035));
      await expect.poll(() => page.locator('.engagement-timeline__node-fill').nth(index).evaluate((node) => node.getBoundingClientRect().width)).toBeGreaterThan(6);
    }

    await page.evaluate(({ y, offset }) => window.scrollTo(0, y - offset - 24), { y: geometry.nodeY[2], offset: geometry.activationOffset });
    await expect.poll(() => fillRatio(page)).toBeLessThan(1);
    await expect.poll(() => page.locator('.engagement-timeline__node-fill').nth(2).evaluate((node) => node.getBoundingClientRect().width)).toBeLessThan(1);
  }
});

test('reduced motion shows the complete timeline and expertise CTA scrolls immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect.poll(() => fillRatio(page)).toBeGreaterThan(0.99);
  for (const node of await page.locator('.engagement-timeline__node-fill').all()) {
    await expect.poll(() => node.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(6);
  }
  await page.locator('.home-hero__actions .outline-button').click();
  await expect.poll(() => page.locator('#expertise').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
  expect(await page.locator('#expertise').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(200);
  for (const card of await page.locator('.discipline-card-reveal').all()) {
    expect(await card.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
    expect(await card.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  }
  for (const element of await page.locator('.home-insight__intro > div, .engagement-timeline__content').all()) {
    expect(await element.evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
    expect(await element.evaluate((node) => getComputedStyle(node).transform)).toBe('none');
  }
});

test('expertise cards enter in left-to-right order on desktop and do not replay', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  expect(await page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.map((card) => Number(getComputedStyle(card).opacity)))).toEqual([0, 0, 0]);
  const samples = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll<HTMLElement>('.discipline-card-reveal')];
    const grid = document.querySelector<HTMLElement>('.discipline-grid')!;
    window.scrollTo(0, grid.getBoundingClientRect().top + scrollY - innerHeight * 0.8);
    const frames: number[][] = [];
    for (let frame = 0; frame < 50; frame += 1) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      frames.push(cards.map((card) => Number(getComputedStyle(card).opacity)));
    }
    return frames;
  });

  expect(samples.some(([first, second, third]) => first > second + 0.12 && second > third + 0.12)).toBe(true);
  expect(samples.at(-1)!.every((opacity) => opacity > 0.99)).toBe(true);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await page.locator('.discipline-grid').scrollIntoViewIfNeeded();
  expect(await page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99))).toBe(true);
});

test('stacked expertise cards reveal individually as each card enters view', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');

  for (const index of [0, 1, 2]) {
    expect(await page.locator('.discipline-card-reveal').nth(index).evaluate((card) => Number(getComputedStyle(card).opacity)), `mobile card ${index + 1} starts prepared`).toBe(0);
    const samples = await page.evaluate(async (cardIndex) => {
      const cards = [...document.querySelectorAll<HTMLElement>('.discipline-card-reveal')];
      const card = cards[cardIndex];
      window.scrollTo(0, card.getBoundingClientRect().top + scrollY - innerHeight + 80);
      const frames: number[][] = [];
      for (let frame = 0; frame < 45; frame += 1) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        frames.push(cards.map((item) => Number(getComputedStyle(item).opacity)));
      }
      return frames;
    }, index);
    expect(samples.some((frame) => frame[index] < 0.9), `mobile card ${index + 1} animates`).toBe(true);
    expect(samples.at(-1)![index], `mobile card ${index + 1} completes`).toBeGreaterThan(0.99);
    expect(samples.every((frame) => frame.slice(index + 1).every((opacity) => opacity < 0.01)), `lower mobile cards wait for their own entry`).toBe(true);
  }
});

test('timeline text enters once while node-based progress reverses on upward scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');

  expect(await page.locator('.home-insight__intro > div').evaluateAll((items) => items.map((item) => Number(getComputedStyle(item).opacity)))).toEqual([0, 0, 0]);
  expectOneWayReveal(await captureReveal(page, '.home-insight__intro > div'));
  await expect.poll(() => page.locator('.home-insight__intro > div').evaluateAll((items) => items.every((item) => Number(getComputedStyle(item).opacity) > 0.99))).toBe(true);

  for (const index of [0, 1, 2]) {
    expectOneWayReveal(await captureReveal(page, '.engagement-timeline__content', index));
  }

  const nodes = await page.locator('.engagement-timeline__node').evaluateAll((items) => items.map((item) => {
    const box = item.getBoundingClientRect();
    return box.top + scrollY + box.height / 2;
  }));
  await page.evaluate((y) => window.scrollTo(0, y - innerHeight * 0.65 + 20), nodes[2]);
  await expect.poll(() => fillRatio(page)).toBeGreaterThan(0.99);
  await page.evaluate((y) => window.scrollTo(0, y - innerHeight * 0.65 - 25), nodes[0]);
  await expect.poll(() => fillRatio(page)).toBeLessThan(0.01);
  expect(await page.locator('.home-insight__intro > div, .engagement-timeline__content').evaluateAll((items) => items.every((item) => Number(getComputedStyle(item).opacity) > 0.99))).toBe(true);
  expect(errors).toEqual([]);
});

test('rapid scrolling and browser history leave revealed content visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => {
    const lastStep = document.querySelector('.engagement-timeline__step:last-child')!;
    window.scrollTo(0, lastStep.getBoundingClientRect().top + scrollY - innerHeight + 80);
  });
  await expect.poll(() => page.locator('.engagement-timeline__content').last().evaluate((item) => Number(getComputedStyle(item).opacity))).toBeGreaterThan(0.99);
  expect(await page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) === 0))).toBe(true);

  await page.evaluate(() => {
    const grid = document.querySelector('.discipline-grid')!;
    window.scrollTo(0, grid.getBoundingClientRect().top + scrollY - innerHeight + 80);
  });
  await expect.poll(() => page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99))).toBe(true);
  await page.locator('.discipline-card').first().scrollIntoViewIfNeeded();
  const homeScroll = await page.evaluate(() => scrollY);
  await page.locator('.discipline-card').first().click();
  await expect(page).toHaveURL(/\/consulting$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate((savedScroll) => Math.abs(scrollY - savedScroll), homeScroll)).toBeLessThan(40);
  await expect.poll(() => page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99))).toBe(true);
  await page.goForward();
  await expect(page).toHaveURL(/\/consulting$/);
  await expect(page.locator('main h1')).toBeVisible();
});

test('viewport content remains visible when IntersectionObserver is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', { value: undefined, configurable: true });
  });
  await page.goto('/');
  for (const selector of ['.discipline-card-reveal', '.home-insight__intro > div', '.engagement-timeline__content']) {
    expect(await page.locator(selector).evaluateAll((items) => items.every((item) => Number(getComputedStyle(item).opacity) > 0.99))).toBe(true);
  }
});

test('revealed cards remain visible when the layout crosses its stacking breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('.discipline-grid').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99))).toBe(true);

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    expect(await page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99)), `${width}px cards remain revealed`).toBe(true);
  }

  await page.setViewportSize({ width: 390, height: 900 });
  await page.reload();
  await page.evaluate(() => {
    const first = document.querySelector('.discipline-card-reveal')!;
    window.scrollTo(0, first.getBoundingClientRect().top + scrollY - innerHeight + 80);
  });
  await expect.poll(() => page.locator('.discipline-card-reveal').first().evaluate((card) => Number(getComputedStyle(card).opacity))).toBeGreaterThan(0.99);
  expect(await page.locator('.discipline-card-reveal').nth(1).evaluate((card) => Number(getComputedStyle(card).opacity))).toBe(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect.poll(() => page.locator('.discipline-card-reveal').evaluateAll((cards) => cards.every((card) => Number(getComputedStyle(card).opacity) > 0.99))).toBe(true);
});

test('switching languages keeps revealed timeline steps mounted and visible', async ({ page }) => {
  await page.goto('/');
  await page.locator('.engagement-timeline__content').first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.engagement-timeline__content').first().evaluate((item) => Number(getComputedStyle(item).opacity))).toBeGreaterThan(0.99);
  await page.locator('.engagement-timeline__content').first().evaluate((item) => { (item as HTMLElement).dataset.revealIdentity = 'preserved'; });
  await page.locator('.footer-language button').last().click();
  await expect(page.locator('.engagement-timeline__content h3').first()).toHaveText('Comprender el desafío');
  const reveal = await page.locator('.engagement-timeline__content').first().evaluate((item) => ({ identity: (item as HTMLElement).dataset.revealIdentity, opacity: Number(getComputedStyle(item).opacity) }));
  expect(reveal.identity).toBe('preserved');
  expect(reveal.opacity).toBeGreaterThan(0.99);
});

test('expertise hover moves only the image and reduced motion removes the zoom', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('.discipline-card.family-services');
  const image = card.locator('img');
  const paragraph = card.locator('p');
  await card.scrollIntoViewIfNeeded();

  const paragraphOffset = () => paragraph.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const cardRect = element.closest('.discipline-card')!.getBoundingClientRect();
    return { x: rect.x - cardRect.x, y: rect.y - cardRect.y, width: rect.width, height: rect.height };
  });
  const before = await paragraphOffset();
  await card.hover();
  await expect.poll(() => image.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element, '::before').opacity)).toBe('0.97');
  expect(await paragraphOffset()).toEqual(before);

  await page.mouse.move(0, 0);
  await expect.poll(() => image.evaluate((element) => getComputedStyle(element).transform)).toBe('none');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.hover();
  expect(await image.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  expect(await card.evaluate((element) => getComputedStyle(element, '::before').opacity)).toBe('1');
});

test('updated sections stay readable at the requested viewport widths', async ({ page }) => {
  await page.goto('/');

  for (const width of [320, 375, 390, 430, 768, 900, 1024, 1101, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => {
      const heading = document.querySelector<HTMLElement>('.home-hero h1')!;
      const cards = [...document.querySelectorAll('.discipline-card')];
      const ctas = [...document.querySelectorAll('.discipline-card__cta')];
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        headingOverflow: heading.scrollWidth > heading.clientWidth + 1,
        mosaicImages: document.querySelectorAll('.home-hero__media img').length,
        cardHeights: cards.map((card) => card.getBoundingClientRect().height),
        cardCenters: cards.map((card) => { const rect = card.getBoundingClientRect(); return rect.left + rect.width / 2; }),
        ctaBottoms: ctas.map((cta) => cta.getBoundingClientRect().bottom),
        carouselVisible: !!document.querySelector('.regional-marquee__viewport'),
        mapBox: document.querySelector('.latam-section__visual img')!.getBoundingClientRect().toJSON(),
        visualBox: document.querySelector('.latam-section__visual')!.getBoundingClientRect().toJSON(),
        copyBox: document.querySelector('.latam-section__copy')!.getBoundingClientRect().toJSON(),
        maskImage: getComputedStyle(document.querySelector('.latam-section__visual picture')!).maskImage,
        visualPointerEvents: getComputedStyle(document.querySelector('.latam-section__visual')!).pointerEvents,
        perspectiveCopyBottom: document.querySelector('.latam-section p:last-child')!.getBoundingClientRect().bottom,
      };
    });
    expect(layout.overflow, `${width}px page overflow`).toBe(false);
    expect(layout.headingOverflow, `${width}px hero heading overflow`).toBe(false);
    expect(layout.mosaicImages).toBe(3);
    expect(layout.cardHeights.every((height) => height >= 250)).toBe(true);
    expect(layout.carouselVisible).toBe(true);
    expect(layout.mapBox.width / layout.mapBox.height, `${width}px map aspect ratio`).toBeCloseTo(2, 1);
    expect(layout.mapBox.left, `${width}px map left`).toBeGreaterThanOrEqual(0);
    expect(layout.mapBox.right, `${width}px map right`).toBeLessThanOrEqual(width + 1);
    expect(layout.visualPointerEvents).toBe('none');
    if (width <= 900) {
      expect(layout.mapBox.top, `${width}px stacked map`).toBeGreaterThan(layout.perspectiveCopyBottom);
      expect(layout.maskImage, `${width}px full map visibility`).toBe('none');
    } else {
      expect(layout.visualBox.left, `${width}px left map`).toBeLessThan(layout.copyBox.left);
      expect(layout.visualBox.right, `${width}px map reaches text column`).toBeGreaterThan(layout.copyBox.left);
      expect(layout.visualBox.left + layout.visualBox.width * 0.93, `${width}px fade ends before copy`).toBeLessThanOrEqual(layout.copyBox.left + 2);
      expect(layout.maskImage, `${width}px horizontal map fade`).toContain('linear-gradient');
    }
    if (width > 760 && width <= 900) {
      expect(Math.abs(layout.ctaBottoms[0] - layout.ctaBottoms[1]), `${width}px first-row card CTA alignment`).toBeLessThan(3);
      expect(Math.abs(layout.cardCenters[2] - width / 2), `${width}px final card centered`).toBeLessThan(2);
    } else if (width > 900) {
      expect(Math.max(...layout.ctaBottoms) - Math.min(...layout.ctaBottoms), `${width}px card CTA alignment`).toBeLessThan(3);
    }
  }
});
