const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

afterEach(jest.clearAllMocks);

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  fail('Teste vazio');
});
