const productsReducer = (state, action) => {
  switch (action.type) {
    case '': {
      return state;
    }
    default: {
      return state;
    }
  }
};

/* eslint-disable no-underscore-dangle */
const store = Redux.createStore(
  productsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const CART_ITEMS_CLASS = '.cart__items';

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const saveTotalPrice = () => {
  const totalPriceElement = document.querySelector('.total-price');

  const itemElements = Array.from(document.querySelectorAll('.cart__item'));
  
  const totalPrice = itemElements.reduce((acc, cur) => {
    const itemPrice = cur.innerText.substring(cur.innerText.indexOf('$') + 1);
    return acc + Number(itemPrice);
  }, 0);

  totalPriceElement.innerText = totalPrice;
};

const cartItemClickListener = (event) => {
  event.target.remove();

  // localStorage
  const FIRST_SKU_INDEX = 5;
  const LAST_SKU_INDEX = 18;
  const productId = event.target.innerText.substring(FIRST_SKU_INDEX, LAST_SKU_INDEX);
  const localStorageItems = JSON.parse(localStorage.getItem('cartItem'));
  const filteredProducts = localStorageItems.filter((item) => item.id !== productId);
  saveCartItems(filteredProducts);

  saveTotalPrice();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addProductToCart = async (id) => {
  const parentElement = document.querySelector(CART_ITEMS_CLASS);

  const product = await fetchItem(id);

  // localStorage
  const localStorageItems = JSON.parse(localStorage.getItem('cartItem'));
  const allProducts = localStorageItems ? [...localStorageItems, product] : [product];
  saveCartItems(allProducts);  

  const productElement = createCartItemElement(product);

  parentElement.appendChild(productElement);
  saveTotalPrice();
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  const addProductToCartBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addProductToCartBtn.addEventListener('click', (e) => {
    const productIdFromHTML = getSkuFromProductItem(e.target.parentElement);
    
    addProductToCart(productIdFromHTML);
  });
  
  section.appendChild(addProductToCartBtn);
  return section;
};

const renderProductsFromAPI = async () => {
  const frag = document.createDocumentFragment();
  const parentElement = document.querySelector('.items');
  
  const loadingElement = document.createElement('h1');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'carregando...';
  parentElement.appendChild(loadingElement);

  const products = await fetchProducts('computador');

  parentElement.removeChild(loadingElement);

  products.forEach((product) => {
    const itemElement = createProductItemElement(product);
    frag.appendChild(itemElement);
  });

  parentElement.appendChild(frag);
};

const renderLocalStorageCartItems = () => {
  const frag = document.createDocumentFragment();
  const parentElement = document.querySelector(CART_ITEMS_CLASS);
  const cartItemsList = JSON.parse(getSavedCartItems());

  if (cartItemsList && cartItemsList.length > 0) {
    cartItemsList.forEach((item) => {
      const productElement = createCartItemElement(item);
      frag.appendChild(productElement);
    });
    
    parentElement.appendChild(frag);
  }

  saveTotalPrice();
  return null;
};

const emptyCart = () => {
  const parentElement = document.querySelector(CART_ITEMS_CLASS);
  parentElement.innerText = '';

  saveCartItems([]);
};

const emptyCartBtn = document.querySelector('.empty-cart');
emptyCartBtn.addEventListener('click', emptyCart);

window.onload = () => {
  renderLocalStorageCartItems();
  renderProductsFromAPI();
};
