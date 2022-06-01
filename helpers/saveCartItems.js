const saveCartItems = (items) => {
  // const convertedItems = items.outerHTML;
  localStorage.setItem('cartItem', JSON.stringify(items));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
