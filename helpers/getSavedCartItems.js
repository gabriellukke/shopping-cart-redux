const getSavedCartItems = () => {
  return localStorage.getItem('cartItem');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
