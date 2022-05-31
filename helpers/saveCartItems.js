const saveCartItems = (items) => {
  const convertedItems = items.outerHTML;
  localStorage.setItem('cartItem', convertedItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
