const { sumProducts } = require('../helpers/sumProducts');
const computadorSearch = require('../mocks/search.js');

const selectProducts = (obj) => {
  const results = obj.results.filter((_product, index) => index <= 9)
  return results;
}
const expected = selectProducts(computadorSearch);

describe('sumProducts', () => {
  it('should return the sum of products of each element in the array', () => {
    expect(sumProducts(expected)).toEqual(19293.1);
    expect(expected).toBeInstanceOf(Array);
    expect(sumProducts).toBeInstanceOf(Function);
    expect(sumProducts([])).toBe(0);
  });
});
