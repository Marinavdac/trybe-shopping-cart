const cartList = document.getElementsByClassName('cart__items')[0];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const shopCart = document.querySelector('.cart__items');
const resetCart = document.querySelector('.empty-cart');
resetCart.addEventListener('click', () => {
  shopCart.innerHTML = '';
  localStorage.clear();
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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  event.target.parentNode.remove();
  // console.log((event.target.parentNode.firstChild.innerText))
  // localStorage.removeItem.find(event.target.parentNode.firstChild.innerText);
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL', minimunSignificantDigits: 2 }).format(number);
}

function createCartItemElement({ thumbnail: image, id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(image));
  li.appendChild(createCustomElement('span', 'item__sku', sku));
  li.appendChild(createCustomElement('span', 'item__title', name));
  li.appendChild(createCustomElement('button', 'item__remove', 'x'))
    .addEventListener('click', cartItemClickListener);
  li.appendChild(createCustomElement('span', 'item__price', `${formatNumber(salePrice)}`));
  return li;
}

const listaPai = document.getElementsByClassName('items')[0];

async function addToCart(event) {
  const newItemList = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { thumbnail, id, title, price } = newItemList;
  const newCartItem = createCartItemElement({ thumbnail, id, title, price });
  saveCartItems({ thumbnail, id, title, price });
  cartList.appendChild(newCartItem);
}

function createLoader() {
  const section = document.createElement('section');
  section.className = 'container';
  section.appendChild(createCustomElement('section', 'loading', ' '));
  return section;
}

window.onload = async () => {
  const loader = createLoader();
  listaPai.appendChild(loader);
  const result = await fetchProducts();
  listaPai.removeChild(loader);
  const productList = result.map((element) => {
  const { id, title, thumbnail, price } = element;
    const product = {
      sku: id,
      name: title,
      image: thumbnail,
      salePrice: `${formatNumber(price)}`,
      };
    return createProductItemElement(product);
  });
  productList.map((productListItem) => {
    productListItem.addEventListener('click', addToCart);
    return listaPai.appendChild(productListItem);
  });
};