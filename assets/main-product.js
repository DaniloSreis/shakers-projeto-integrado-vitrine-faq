import CartApi from './cart-api.js';

const cart = new CartApi();

const colors = document.querySelectorAll('.product__color');
const sizes = document.querySelectorAll('.product__size');
const details = document.querySelector('.product__details');
const productImage = document.querySelector('.product__image');
const productPrice = document.querySelector('.product__price');

let variants = JSON.parse(details.dataset.variants);
const options = { color: '', size: '' };
let match;

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
