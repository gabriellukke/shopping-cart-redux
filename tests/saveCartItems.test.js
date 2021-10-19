const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

afterEach(jest.clearAllMocks);

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  fail('Teste vazio');
});
