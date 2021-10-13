const sumProducts = (array) => array.reduce((acc, { price }) => acc + price, 0);

if (typeof module !== 'undefined') {
  module.exports = {
    sumProducts,
  };
}