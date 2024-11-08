// pages/ProductsPage.js
import fs from 'fs';

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.inventory_item_name').first();
    this.productPrice = page.locator('.inventory_item_price').first();
    this.addToCartButton = page.locator('.btn_inventory').first();
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async getFirstProductDetails() {
    const name = await this.productTitle.textContent();
    const price = await this.productPrice.textContent();
    fs.writeFileSync('./data/product.txt', `Product: ${name}, Price: ${price}`);
    return { name, price };
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async navigateToCart() {
    await this.cartButton.click();
  }
}

export default ProductsPage;
