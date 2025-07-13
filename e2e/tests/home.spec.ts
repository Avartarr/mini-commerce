import { test, expect } from '@playwright/test';

test.describe('Mini-Commerce', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/');
        await page.waitForLoadState('networkidle');
      });

  test('should display homepage content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /our products/i })).toBeVisible();
  });

  test('should search products', async ({ page }) => {
    const search = page.getByPlaceholder(/search products/i);
    await search.waitFor();
    await search.fill('headphones');
    await expect(page.getByText(/wireless headphones/i)).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add to Cart' }).first();
    await addButton.click();
    await expect(page.getByText('added to cart')).toBeVisible();
  });

  test('should navigate to cart', async ({ page }) => {
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /Toggle theme/ });
    const html = page.locator('html');
    
    await themeToggle.click();
    await expect(html).toHaveClass(/dark/);
    
    await themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });
});