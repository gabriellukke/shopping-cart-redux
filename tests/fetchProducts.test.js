require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('Função fetchProducts', () => {
  it('fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  });

  it('Função fetch é chamada ao executar a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');

    expect(global.fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const mockValue = await fetchProducts('computador');

    expect(mockValue).toStrictEqual(computadorSearch.results);
  });

  it('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    const mockError = await fetchProducts();

    expect(mockError).toEqual(new Error('You must provide an url'));
  });
});
