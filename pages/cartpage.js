// pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemTitle = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
  }

  async verifyProductInCart(expectedName, expectedPrice) {
    const name = await this.cartItemTitle.textContent();
    const price = await this.cartItemPrice.textContent();
    return name === expectedName && price === expectedPrice;
  }
}

export default CartPage;
