const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('Função getSavedCartItems', () => {
  it('Ao executar getSavedCartItems, o método localStorage.getItem é chamado.', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toBeCalled();
  });

  it('Ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
    getSavedCartItems();

    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
