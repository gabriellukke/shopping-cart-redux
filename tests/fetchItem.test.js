require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Função fetchItem', () => {
  it('fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  it('Função fetch é chamada ao executar a função fetchItem com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchProducts('MLB1615760527');

    expect(global.fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('O retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
    const mockValue = await fetchItem('MLB1615760527');

    expect(mockValue).toStrictEqual(item);
  });

  it('Ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const mockError = await fetchItem();

    expect(mockError).toEqual(new Error('You must provide an url'));
  });
});
