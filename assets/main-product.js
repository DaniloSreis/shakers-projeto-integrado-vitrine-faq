import CartApi from './cart-api.js';

const cart = new CartApi();

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

buyButton.addEventListener('click', () => {
  if (!match) return;

  const quantityDisplay = document.querySelector('.product__quantity-value');
  const currentQuantity = parseInt(quantityDisplay.textContent);

  cart.addToCart(match.id, currentQuantity);
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

syncProductStateFromURL();
