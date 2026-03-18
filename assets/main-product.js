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
  colors: document.querySelectorAll(".product__color"),
  sizes: document.querySelectorAll(".product__size"),
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

console.log(cartDom.clearBtn)
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

function updateProductInfos(variant) {
  dom.image.src = variant.featured_image.src;
  dom.price.innerText = currencyFormatter.format(variant.price / 100);

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

function updateVariantState(type, value) {
  state.options[type] = value;
  
  const matchedVariant = variants.find(v => 
    v.option1 === state.options.color && 
    v.option2 === state.options.size
  );

  state.match = matchedVariant || null;
  
  return matchedVariant;
}

function handleVariantChange(type, value) {
  const variant = updateVariantState(type, value);
  renderProductUpdate(variant);
}

function syncProductStateFromURL() {
  const urlParam = new URLSearchParams(window.location.search);
  const variantIdFromURL = urlParam.get('variant');

  const variantMatch = variants.find((v) => v.id == variantIdFromURL);

  options.color = variantMatch.option1;
  options.size = variantMatch.option2;

  match = variantMatch;

  renderProductUpdate(variantMatch);
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

dom.minusBtn.addEventListener('click', () => {
  let current = parseInt(dom.quantity.textContent);
  if (current > 1) dom.quantity.textContent = --current;
});

dom.plusBtn.addEventListener('click', () => {
  let current = parseInt(dom.quantity.textContent);
  dom.quantity.textContent = ++current;
});

dom.colors.forEach(color => {
  color.addEventListener('click', () => handleVariantChange('color', color.dataset.color));
});

dom.sizes.forEach(size => {
  size.addEventListener('click', () => handleVariantChange('size', size.textContent));
});

cartDom.openBtn.addEventListener('click', () => setCartVisibility(true));
cartDom.closeBtn.addEventListener('click', () => setCartVisibility(false));

cartDom.clearBtn.addEventListener("click", async () => {
  await cartApi.clearCart();
  await renderCartItems();
});

dom.buyButton.addEventListener('click', async () => {
  if (!state.match) return;
  
  const qty = parseInt(dom.quantity.textContent);
  dom.buyButton.disabled = true;

  try {
    await cartApi.addToCart(state.match.id, qty);
    await renderCartItems();
    setCartVisibility(true);
  } finally {
    dom.buyButton.disabled = false;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  syncProductStateFromURL();
  updateProductInfos(state.match);
});
