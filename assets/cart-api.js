export default class Cart {
  constructor() {}

  async addToCart(id, quantity) {
    const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
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
    const response = await fetch(
      window.Shopify.routes.root + 'cart/update.js',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      },
    );

    const data = await response.json();
    return data;
  }

  async getCart() {
    const response = await fetch(window.Shopify.routes.root + 'cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }

  async clearCart() {
    const response = await fetch(window.Shopify.routes.root + 'cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data
  }
}
