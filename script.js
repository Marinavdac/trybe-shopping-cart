const cartList = document.getElementsByClassName('cart__items')[0];
const subtotal = document.getElementsByClassName('total-price')[0];
const subTotal = [];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cleanArray(array) {
  for (let i = 0; i < array.length; i += 1) {
    array.splice([i]);
  }
  return array;
}

const shopCart = document.querySelector('.cart__items');
const resetCart = document.querySelector('.empty-cart');
resetCart.addEventListener('click', () => {
  shopCart.innerHTML = '';
  localStorage.clear();
  cleanArray(subTotal);
  subtotal.innerText = '0, 00';
});

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', salePrice));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL', minimunSignificantDigits: 2 }).format(number);
}
function getSubtotal(price) {
  if (price) {
    subTotal.push(price); 
  }
  
  let sum = 0;
  for (let i = 0; i < subTotal.length; i += 1) {
    sum += subTotal[i];
  }
  subtotal.innerText = sum;
}

function updateCartValues(event) {
  const value = event.innerText.slice(event.innerText.indexOf('$'), (event.innerText).length)
  .split('$');
  const salePrice = parseFloat(value[1]);  
  subTotal.splice(subTotal.indexOf(salePrice), 1);   
  getSubtotal();
}

function cartItemClickListener(event) {
  event.remove();
  updateCartValues(event);  
  localStorage.removeItem('cartItems', event.innerText.slice(4, 18));
}

function createCartItemElement({ thumbnail: image, id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createCustomElement('button', 'item__remove', 'x'))
  .addEventListener('click', (event) => cartItemClickListener(event.target.parentNode));
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', (event) => cartItemClickListener(event.target));
  return li;
}

const listaPai = document.getElementsByClassName('items')[0];

async function addToCart(event) {
  const newItemList = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { thumbnail, id, title, price } = newItemList;
  const newCartItem = createCartItemElement({ thumbnail, id, title, price });
  saveCartItems(id);
  getSubtotal(price);
  cartList.appendChild(newCartItem);
}

function createLoader() {
  const section = document.createElement('section');
  section.className = 'container';
  section.appendChild(createCustomElement('section', 'loading', ' '));
  return section;
}
async function loadSaved() {
  const savedCart = getSavedCartItems();
  savedCart.forEach(async (itemid) => {
    const refreshCartItem = await fetchItem(itemid);
    const { thumbnail, id, title, price } = refreshCartItem;
    const newCartItem = createCartItemElement({ thumbnail, id, title, price });
    getSubtotal(price);
    cartList.appendChild(newCartItem);
  });
}

window.onload = async () => {
  loadSaved();
  const loader = createLoader();
  listaPai.appendChild(loader);
  const data = await fetchProducts('computador');
  listaPai.removeChild(loader);
  const productList = data.results.map((element) => {
  const { id, title, thumbnail, price } = element;
    const product = { sku: id, name: title, image: thumbnail, salePrice: `${formatNumber(price)}`,
    };
    return createProductItemElement(product);
  });
  productList.map((productListItem) => {
    productListItem.addEventListener('click', addToCart);
    return listaPai.appendChild(productListItem);
  });
};