// tests/cart.test.js
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginpage';
import ProductsPage from '../pages/Productspage';
import CartPage from '../pages/cartpage';

test.describe('Add to Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');
  });

  test('Verify add to cart functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('.title')).toHaveText('Products');

    // Get product details and store in text file
    const { name, price } = await productsPage.getFirstProductDetails();

    // Add product to cart
    await productsPage.addToCart();

    // Navigate to cart and verify product
    await productsPage.navigateToCart();
    const isProductInCart = await cartPage.verifyProductInCart(name, price);
    expect(isProductInCart).toBeTruthy();

    // Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
