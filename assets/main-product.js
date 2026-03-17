import CartApi from './cart-api.js';

const cartApi = new CartApi();

const colors = document.querySelectorAll('.product__color');
const sizes = document.querySelectorAll('.product__size');
const details = document.querySelector('.product__details');
const productImage = document.querySelector('.product__image');
const productPrice = document.querySelector('.product__price');
const minusBtn = document.querySelector('[data-action="minus"]');
const plusBtn = document.querySelector('[data-action="plus"]');
let variants = JSON.parse(details.dataset.variants);
const options = { color: '', size: '34' };
let match;
const buyButton = document.querySelector('.button--buy');
const cartBtn = document.querySelector('.header__cart-trigger');
const cartDrawer = document.querySelector('.header__cart-drawer');
const cartClose = document.querySelector('.header__cart-close');
const cartContent = document.querySelector('.header__cart-content');

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

function renderProductUpdate(variant) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  productImage.src = variant.featured_image.src;
  productPrice.innerText = formatter.format(variant.price / 100);
}

async function renderProductCart() {
  const cart = await cartApi.getCart();

  if (!cart || !cart.items) return;

  cartContent.innerHTML = '';

  cart.items.forEach((item) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-cart');

    productCard.innerHTML = `
      <img class="product-cart__image" src="${item.image}" alt="${item.product_title}">
      <div class="product-cart__details">
        <h3 class="product-cart__title">${item.product_title}</h3>
        <span class="product-cart__color">${item.variant_options[0] || ''}</span>
        <span class="product-cart__size">${item.variant_options[1] || ''}</span>
        <span class="product-cart__price">${(item.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
      <span class="product-cart__quantity">Qtd: ${item.quantity}</span>
    `;

    cartContent.appendChild(productCard);
  });
}

buyButton.addEventListener('click', async () => {
  if (!match) return;

  const quantityDisplay = document.querySelector('.product__quantity-value');
  const currentQuantity = parseInt(quantityDisplay.textContent);

  await cartApi.addToCart(match.id, currentQuantity);

  await renderProductCart();

  cartDrawer.classList.add('is-open');
});

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
    match = variants.find(
      (v) => v.option1 === options.color && v.option2 === options.size,
    );
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  productImage.src = match.featured_image.src;
  productPrice.innerText = formatter.format(match.price / 100);
}

colors.forEach((color) => {
  color.addEventListener('click', (event) => {
    updateVariant('color', event.currentTarget.dataset.color);
  });
});

sizes.forEach((size) => {
  size.addEventListener('click', (event) => {
    updateVariant('size', event.currentTarget.textContent);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  renderProductCart();
  syncProductStateFromURL();
});