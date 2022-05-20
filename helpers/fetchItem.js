const fetchItem = async (productId) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const results = await response.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
