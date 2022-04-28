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
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  createCustomElement('span', 'span.item__sku');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL', minimunSignificantDigits: 2 }).format(number);
}

const listaPai = document.getElementsByClassName('items')[0];

async function addToCart(event) {
  // const priceEl = event.target.previousSibling;
  // const nameEl = priceEl.previousSibling;
  // const idEl = nameEl.previousSibling.previousSibling;
  // const newItemList = {
  //   sku: idEl.innerText,
  //   name: nameEl.innerText,
  //   salePrice: priceEl.innerText,
  // };
  const newItemList = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { id, title, price } = newItemList;
  const newCartItem = createCartItemElement({ id, title, price });
  cartList.appendChild(newCartItem);
}

window.onload = async () => {
  const result = await fetchProducts();
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
