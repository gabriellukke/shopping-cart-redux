const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('Função getSavedCartItems', () => {
  it('Ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');

    expect(localStorage.setItem).toBeCalled();
  });

  it('Ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const paramValue = '<ol><li>Item</li></ol>';
    saveCartItems(paramValue);

    expect(localStorage.setItem).toBeCalledWith('cartItems', paramValue);
  });
});
