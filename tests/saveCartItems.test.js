const saveCartItems = require('../helpers/saveCartItems');

const mock = '<ol><li>Item</li></ol>';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  fail('Teste vazio');
});
