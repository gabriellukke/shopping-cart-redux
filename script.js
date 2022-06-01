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

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  
  const addProductToCartBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addProductToCartBtn.addEventListener('click', (e) => {
    // Using DOM Methods
    // const productIdFromHTML = e.target.parentElement.firstChild.innerText;
    
    // Using created Function
    const productIdFromHTML = getSkuFromProductItem(e.target.parentElement);
    
    addProductToCart(productIdFromHTML);
  });
  
  section.appendChild(addProductToCartBtn);
  return section;
};

const saveTotalPrice = () => {
  const totalPriceElement = document.querySelector('.total-price');

  const itemElements = Array.from(document.querySelectorAll('.cart__item'));
  
  const totalPrice = itemElements.reduce((acc, cur) => {
    const itemPrice = cur.innerText.substring(cur.innerText.indexOf('$') + 1);
    return acc + Number(itemPrice);
  }, 0);

  totalPriceElement.innerText = totalPrice;
}

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

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

const renderProductsFromAPI = async () => {
  /**
   * Using createDocumentFragment to improve perfomance when add multiples elements into DOM
   * https://davidwalsh.name/documentfragment
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
   */
  const frag = document.createDocumentFragment();
  const parentElement = document.querySelector('.items');

  const products = await fetchProducts('computador');

  products.forEach((product) => {
    const itemElement = createProductItemElement(product);
    frag.appendChild(itemElement);
  });

  parentElement.appendChild(frag);
}

const addProductToCart = async (id) => {
  const parentElement = document.querySelector('.cart__items');

  const product = await fetchItem(id);

  // localStorage
  const localStorageItems = JSON.parse(localStorage.getItem('cartItem'));
  const allProducts = localStorageItems ? [...localStorageItems, product] : [product];
  saveCartItems(allProducts);  

  const productElement = createCartItemElement(product);

  parentElement.appendChild(productElement);
  saveTotalPrice();
}

const renderLocalStorageCartItems = () => {
  const frag = document.createDocumentFragment();
  const parentElement = document.querySelector('.cart__items');
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
}

window.onload = () => {
  renderLocalStorageCartItems();
  renderProductsFromAPI();
};
