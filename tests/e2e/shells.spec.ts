import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const internalUrl = 'http://127.0.0.1:3000';
const externalUrl = 'http://127.0.0.1:3003';

async function expectNoSeriousAccessibilityViolations(page: Page): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  const serious = result.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact || ''),
  );
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
}

test.describe('B01 technical browser shells', () => {
  test('internal shell is live, keyboard reachable and accessible', async ({ page }) => {
    await page.goto(internalUrl);
    await expect(page.getByRole('heading', { level: 1, name: 'Internal workspace' })).toBeVisible();
    await expect(page.getByText('The technical shell is ready')).toBeVisible();

    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    await expectNoSeriousAccessibilityViolations(page);
  });

  test('external shell stays external and contains no internal route or account surface', async ({ page }) => {
    await page.goto(externalUrl);
    await expect(page.getByRole('heading', { level: 1, name: 'Secure external task' })).toBeVisible();
    await expect(page.getByText('No supplier account, company profile, or project data')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Internal workspace' })).toHaveCount(0);

    await page.goto(`${externalUrl}/internal`);
    await expect(page.getByRole('heading', { level: 1, name: 'Secure external task' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Internal workspace' })).toHaveCount(0);

    await expectNoSeriousAccessibilityViolations(page);
  });

  test('Arabic changes language and direction without losing status meaning', async ({ page }) => {
    await page.goto(internalUrl);
    await page.getByRole('button', { name: 'العربية' }).click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', { level: 1, name: 'مساحة العمل الداخلية' })).toBeVisible();
    await expect(page.getByText('الواجهة التقنية جاهزة')).toBeVisible();
  });

  test('both shells remain inside the mobile viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only viewport assertion');

    for (const url of [internalUrl, externalUrl]) {
      await page.goto(url);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });
});
