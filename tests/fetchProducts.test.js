const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');

window.fetch = jest.fn(fetchSimulator)

describe('1 - Teste a função fecthProducts', () => {

  fail('Teste vazio');

});
