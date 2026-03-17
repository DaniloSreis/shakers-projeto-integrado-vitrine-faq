export default class Cart {
  constructor() {
    this.locale = window.Shopify.routes.root;
  }

  async addToCart(id, quantity) {
    const response = await fetch(this.locale + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ id, quantity }],
      }),
    });

    const data = await response.json();
    return data;
  }

  async updateQuantity(id, quantity) {
    const updates = { [id]: quantity };
    const response = await fetch(this.locale + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updates }),
    });

    const data = await response.json();
    return data;
  }

  async getCart() {
    const response = await fetch(this.locale + 'cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }

  async clearCart() {
    const response = await fetch(this.locale + 'cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
