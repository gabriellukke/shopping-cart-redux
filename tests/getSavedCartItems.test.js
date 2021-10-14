const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

afterEach(jest.clearAllMocks);

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  fail('Teste vazio');
});
