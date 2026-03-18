import CartApi from './cart-api.js';

const cartApi = new CartApi();

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dom = {
  details: document.querySelector(".product__details"),
  image: document.querySelector(".product__image"),
  price: document.querySelector(".product__price"),
  colors: document.querySelector(".product__color"),
  sizes: document.querySelector(".product__size"),
  quantity: document.querySelector(".product__quantity-value"),
  minusBtn: document.querySelector("[data-action='minus']"),
  plusBtn: document.querySelector("[data-action='plus']"),
  buyButton: document.querySelector(".button--buy"),
}

const cartDom = {
  openBtn: document.querySelector(".header__cart-open"),
  drawer: document.querySelector(".header__cart-drawer"),
  closeBtn: document.querySelector(".header__cart-close"),
  content: document.querySelector(".header__cart-content"),
  clearBtn: document.querySelector(".header__button-clear"),
}

let variants = JSON.parse(dom.details.dataset.variants);
const state = {
  options: {
    color: variants[0].option1,
    size: variants[0].option2,
  },
  match: variants[0]
}

function  setCartVisibility(isOpen) {
  cartDom.drawer.classList.toggle("is-open", isOpen)
}

dom.clearBtn.addEventListener("click", async () => {
  await cartApi.clearCart()
  await renderCartItems()
})

cartBtn.addEventListener('click', () => {
  cartDrawer.classList.toggle('is-open');
});

cartClose.addEventListener('click', () => {
  cartDrawer.classList.remove('is-open');
});

function syncProductStateFromURL() {
  const urlParam = new URLSearchParams(window.location.search);
  const variantIdFromURL = urlParam.get('variant');

  if (!variantIdFromURL) return;

  const variantMatch = variants.find((v) => v.id == variantIdFromURL);

  if (variantMatch) {
    options.color = variantMatch.option1;
    options.size = variantMatch.option2;

    match = variantMatch;

    renderProductUpdate(variantMatch);
  }
}

function updateProductInfos(variant) {
  dom.image.src = variant.featured_image.src;
  dom.price = currencyFormatter.format(variant.price / 100);

  dom.colors.forEach((color) =>
    color.classList.toggle(
      'is-selected',
      color.dataset.color === state.options.color,
    ),
  );

  dom.sizes.forEach((size) =>
    size.classList.toggle(
      'is-selected',
       size.textContent === state.options.size,
    ),
  );
}

const renderCartItems = async () => {
  const cart = await cartApi.getCart();
  
  cartDom.content.innerHTML = cart.items.map(item => `
    <div class="product-cart">
      <img class="product-cart__image" src="${item.image}" alt="${item.product_title}">
      <div class="product-cart__details">
        <h3 class="product-cart__title">${item.product_title}</h3>
        <span class="product-cart__color">${item.variant_options[0] || ''}</span>
        <span class="product-cart__size">${item.variant_options[1] || ''}</span>
        <span class="product-cart__price">${currencyFormatter.format(item.price / 100)}</span>
      </div>
      <span class="product-cart__quantity">Qtd: ${item.quantity}</span>
    </div>
  `).join('\n');
};

minusBtn.addEventListener('click', () => {
  const quantityDisplay = document.querySelector('.product__quantity-value');

  let currentQuantity = parseInt(quantityDisplay.textContent);

  if (currentQuantity > 1) {
    currentQuantity--;
    quantityDisplay.textContent = currentQuantity;
  }
});

plusBtn.addEventListener('click', () => {
  const quantityDisplay = document.querySelector('.product__quantity-value');

  let currentQuantity = parseInt(quantityDisplay.textContent);

  currentQuantity++;
  quantityDisplay.textContent = currentQuantity;
});

function updateVariant(type, value) {
  options[type] = value;

  if (options.color && options.size) {
    const foundVariant = variants.find(
      (v) => v.option1 === options.color && v.option2 === options.size,
    );

    if (foundVariant) {
      match = foundVariant;

      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      productImage.src = match.featured_image.src;
      productPrice.innerText = formatter.format(match.price / 100);
      return;
    }
    match = null;
  }
}

function initDefaultSelection() {
  colors.forEach((color) => {
    if (color.dataset.color === options.color) {
      color.classList.add('is-selected');
    }
  });

  sizes.forEach((size) => {
    if (size.textContent === options.size) {
      size.classList.add('is-selected');
    }
  });
}

function findAndUpdateVariant(type, value) {
  state.options[type] = value;
  
  const found = variants.find(v => 
    v.option1 === state.options.color && v.option2 === state.options.size
  );

  state.match = found;
  updateProductInfos(found);
}

dom.colors.forEach(color => {
  color.addEventListener('click', () => findAndUpdateVariant('color', color.dataset.color));
});
dom.sizes.forEach(size => {
  size.addEventListener('click', () => findAndUpdateVariant('size', size.textContent));
});

cartDom.openBtn.addEventListener('click', () => {
  setCartVisibility(true);
});

cartDom.closeBtn.addEventListener('click', () => {
  setCartVisibility(false);
});

dom.buyButton.addEventListener('click', async () => {
  const quantity = parseInt(dom.quantity.textContent);

  await cartApi.addToCart(match.id, quantity);

  await renderCartItems();

  setCartVisibility(true);
});

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems
  syncProductStateFromURL();
  initDefaultSelection();
});
