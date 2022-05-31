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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const parentElement = event.target.parentElement;
  event.target.remove();

  saveCartItems(parentElement);
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
  const productElement = createCartItemElement(product);

  parentElement.appendChild(productElement);
  saveCartItems(parentElement);  
}

const renderLocalStorageCartItems = () => {
  const cartSection = document.querySelector('.cart');
  const cartItemsList = getSavedCartItems();
  
  if (cartItemsList) {
    cartSection.innerHTML = cartItemsList;

    const cartItemsElements = document.querySelectorAll('.cart__item');
    cartItemsElements.forEach((cartItemsElement) => {
      cartItemsElement.addEventListener('click', cartItemClickListener);
    })
  }

  return null;
}

window.onload = () => {
  renderLocalStorageCartItems();
  renderProductsFromAPI();
};
