import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'en'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
async function choose(page: Page, name: string, next: string | RegExp) {
  await page.getByRole('radio', { name: new RegExp(`^${name}`) }).check();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(next);
}
async function partnerToContact(page: Page) {
  await page.goto('/start?source=construction');
  await choose(page, 'Partner', 'What best describes your work?');
  await choose(page, 'Engineering', "What's your primary engineering specialty?");
  await expect(page.locator('form')).toHaveCSS('opacity', '1');
  await page.screenshot({ path: 'test-results/intake-engineering.png', fullPage: true });
  await choose(page, 'Civil', 'How long have you been practicing civil engineering?');
  await choose(page, 'More than 10 years', 'Where are you available to work?');
  await page.getByRole('checkbox', { name: 'Nationwide', exact: true }).check();
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(5);
  await page.getByRole('checkbox', { name: 'East', exact: true }).uncheck();
  await expect(page.getByRole('checkbox', { name: 'Nationwide', exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('What kinds of projects interest you?');
  await page.getByRole('checkbox', { name: 'Commercial', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Other', exact: true }).check();
  await page.getByLabel('Tell us about other projects').fill('Water systems');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await choose(page, 'Available now', "Let's stay in touch.");
}
async function contact(page: Page) {
  await page.getByLabel('Full name', { exact: true }).fill('María Test');
  await page.getByLabel('Email', { exact: true }).fill('maria@example.com');
  await page.getByLabel('Phone / WhatsApp', { exact: true }).fill('+1 809 555 0142');
  await page.getByRole('button', { name: 'Review answers' }).click();
  await expect(page.locator('h1')).toHaveText('Everything look right?');
  await expect(page.locator('form')).toHaveCSS('opacity', '1');
}
test('full partner flow, inline detail, edit into a new branch, mock submit and no network delivery', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const outbound: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') outbound.push(request.url()); });
  await partnerToContact(page);
  await page.getByRole('button', { name: 'Review answers' }).click();
  await expect(page.getByText('Enter your name so we know how to address you.')).toBeVisible();
  await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
  await contact(page);
  await page.screenshot({ path: 'test-results/intake-partner-review.png', fullPage: true });
  await expect(page.locator('.intake-review')).toContainText('Water systems');
  await page.getByRole('button', { name: 'Edit Your work', exact: true }).click();
  await page.getByRole('radio', { name: 'Architecture', exact: true }).check();
  await page.getByRole('button', { name: 'Save and return to review' }).click();
  await expect(page.locator('h1')).toHaveText('What is your architecture focus?');
  await page.getByRole('textbox', { name: 'What is your architecture focus?', exact: true }).fill('Residential');
  await page.getByRole('button', { name: 'Save and return to review' }).click();
  await expect(page.locator('h1')).toHaveText('Everything look right?');
  await expect(page.locator('.intake-review')).not.toContainText('Civil');
  await expect(page.locator('.intake-review')).toContainText('Residential');
  await page.getByRole('button', { name: 'Send to Gradum' }).click();
  await expect(page.getByText('Please confirm that Gradum may contact you before sending.')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Gradum may store' }).check();
  await page.getByRole('button', { name: 'Send to Gradum' }).click();
  await expect(page.getByRole('button', { name: 'Submitting' })).toBeDisabled();
  await expect(page.locator('h1')).toHaveText("You're all set, María.");
  await page.screenshot({ path: 'test-results/intake-confirmation.png', fullPage: true });
  await expect(page.locator('.intake-notice')).toHaveText('This was a demo. Your answers were not sent to Gradum or saved on a server.');
  expect(outbound).toEqual([]);
  expect(await page.evaluate(() => localStorage.getItem('gradum:intake:draft:v1'))).toBeNull();
});
test('client path saves, exits, resumes, refreshes and keeps contact private', async ({ page, context }) => {
  await page.goto('/start?source=unknown');
  await choose(page, 'Client', 'What can Gradum help with?');
  await choose(page, 'Consulting', "Let's stay in touch.");
  await page.getByLabel('Full name', { exact: true }).fill('Client Test');
  await page.getByLabel('Email', { exact: true }).fill('client@example.com');
  const storage = await page.evaluate(() => localStorage.getItem('gradum:intake:draft:v1'));
  expect(storage).not.toContain('client@example.com'); expect(storage).toContain('"source":"direct"');
  const otherTab = await context.newPage(); await otherTab.goto('/'); await page.bringToFront();
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Client Test');
  await otherTab.close();
  await page.getByRole('button', { name: 'Save & exit', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Save & exit', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Save & exit', exact: true }).click();
  await page.getByRole('button', { name: 'Save & exit to Gradum' }).click();
  await expect(page).toHaveURL('/');
  await page.goto('/start');
  await page.getByRole('button', { name: 'Resume conversation' }).click();
  await expect(page.locator('h1')).toHaveText("Let's stay in touch.");
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('');
  await contact(page);
  await expect(page.locator('.intake-review')).toContainText('Consulting');
  await expect(page.locator('.intake-review')).not.toContainText('Experience');
  await page.reload();
  await page.getByRole('button', { name: 'Resume conversation' }).click();
  await expect(page.locator('h1')).toHaveText("Let's stay in touch.");
});
test('keyboard cancels auto-advance, Back restores choices, other specialty validates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/start');
  await page.getByRole('radio', { name: /^Partner/ }).focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await choose(page, 'Engineering', "What's your primary engineering specialty?");
  await page.getByRole('radio', { name: 'Another specialty' }).check();
  await expect(page.getByLabel('Which specialty?')).toBeFocused();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByText('Enter a few words to continue.')).toBeVisible();
  await page.getByLabel('Which specialty?').fill('Geotechnical');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('How long have you been practicing Geotechnical?');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('radio', { name: 'Another specialty' })).toBeChecked();
  await page.getByRole('radio', { name: 'Civil', exact: true }).check();
  await expect(page.locator('h1')).toHaveText("What's your primary engineering specialty?");
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible();
});
for (const width of [1440, 1180, 1024, 768, 760, 390, 375, 320]) {
  test(`responsive intake, labels, asset geometry and focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width <= 390 ? 640 : 900 });
    await page.goto('/start');
    await expect(page.locator('h1')).toHaveText('How would you like to work with Gradum?');
    await expect(page.locator('h1')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const label of await page.locator('.intake-choice').all()) { const box = await label.boundingBox(); expect(box!.height).toBeGreaterThanOrEqual(44); }
    expect(await page.locator('.intake-page img').evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
    if (width === 1440 || width === 390) await page.screenshot({ path: `test-results/intake-relationship-${width}.png`, fullPage: true });
    await choose(page, 'Client', 'What can Gradum help with?');
    await choose(page, 'Services', "Let's stay in touch.");
    await contact(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width === 1440 || width === 390) await page.screenshot({ path: `test-results/intake-review-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: 'ES', exact: true }).click();
    await expect(page.locator('h1')).toHaveText('¿Todo se ve bien?');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
test('homepage and footer CTAs open intake in the same tab with source', async ({ page }) => {
  await page.goto('/');
  await page.locator('.home-hero__cta.pill-button').click();
  await expect(page).toHaveURL('/start?source=homepage');
  await expect(page.locator('h1')).toHaveText('How would you like to work with Gradum?');
  await page.goto('/');
  await page.locator('footer a[href="/start?source=footer"]').click();
  await expect(page).toHaveURL('/start?source=footer');
});
test('dialog traps keyboard focus, selection has a focus ring, errors are linked, and draft corruption recovers', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('gradum:intake:draft:v1', '{broken'));
  await page.goto('/start');
  const client = page.getByRole('radio', { name: /^Client/ });
  await client.focus();
  expect(await client.locator('..').evaluate(label => getComputedStyle(label).outlineStyle)).toBe('solid');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: /^Partner/ })).toBeChecked();
  await page.keyboard.press('Tab');
  await page.getByRole('button', { name: 'Save & exit', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Save & exit', exact: true })).toBeFocused();
  await page.getByRole('radio', { name: /^Client/ }).check();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await choose(page, 'Services', "Let's stay in touch.");
  await page.getByLabel('Email', { exact: true }).fill('bad');
  await page.getByLabel('Phone / WhatsApp', { exact: true }).focus();
  await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('aria-describedby', 'email-error');
  await expect(page.locator('#email-error')).toHaveAttribute('role', 'alert');
});
test('all map-only partner qualifications render without invented option catalogs', async ({ page }) => {
  test.setTimeout(60000);
  for (const [choice, title] of [['Architecture', 'What is your architecture focus?'], ['Construction', 'What is your construction trade?'], ['Project management', 'What is your project management scope?'], ['Business & professional services', 'What is your service area?'], ['Something else', 'Tell us what you do.']]) {
    await page.goto('/start');
    const fresh = page.getByRole('button', { name: 'Start over', exact: true });
    if (await fresh.isVisible()) await fresh.click();
    await choose(page, 'Partner', 'What best describes your work?');
    await choose(page, choice.replace('&', '\\&'), title);
    await page.getByRole('textbox', { name: title, exact: true }).fill('Example qualification');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    if (choice === 'Construction') {
      await expect(page.locator('h1')).toHaveText('How large is your crew?');
      await page.getByRole('textbox', { name: 'How large is your crew?', exact: true }).fill('12');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
    }
    await expect(page.locator('h1')).toHaveText('How long have you been practicing your field?');
    await page.evaluate(() => localStorage.removeItem('gradum:intake:draft:v1'));
  }
});
