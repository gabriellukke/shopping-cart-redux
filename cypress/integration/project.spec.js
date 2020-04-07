const API_URL = "https://api.mercadolibre.com/sites/MLB/search?q=$computador"
const PROJECT_URL = './index.html'

const LOADING = '.loading';
const ITEM_SELECTOR = '.item';
const ADD_CART_BUTTON = '.item__add'
const CART_ITEMS = '.cart__items'
const EMPTY_CART_BUTTON = '.button-items'
const TOTAL_PRICE = '.totalPrice_items'

const addToCart = (index) => {
  cy.get(ITEM_SELECTOR)
    .should('exist')
    .eq(index)
    .children(ADD_CART_BUTTON)
    .click();
}

const countCart = (amount) => {
  cy.get(CART_ITEMS)
      .children()
      .should('have.length', amount);
}

describe('Shopping Cart Project', () => {
  let results;
  before(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        results = data.results
        console.log(results);
      })
  })

  beforeEach(() => {
    cy.visit(PROJECT_URL);
  });

  it('Listagem de produtos');
  it('Adicione o produto ao carrinho de compras',() => {
    cy.wait(1000);
    addToCart(36);
    countCart(1);
    cy.get(CART_ITEMS)
      .first()
      .contains(`SKU: ${results[36].id} | NAME: ${results[36].title} | PRICE: $${results[36].price}`)
  });

  it('Remova o item do carrinho de compras ao clicar nele', () => {
    addToCart(29);
    addToCart(31);
    countCart(2);

  });

  it('Carregue o carrinho de compras através do **LocalStorage** ao iniciar a página', () => {
    let first = 36;
    let last = 29;

    cy.wait(1000);
    addToCart(first);
    countCart(1);
    cy.get(CART_ITEMS)
      .first()
      .contains(`SKU: ${results[first].id} | NAME: ${results[first].title} | PRICE: $${results[first].price}`)
      addToCart(last);
    cy.get(CART_ITEMS)
    .last()
    .contains(`SKU: ${results[last].id} | NAME: ${results[last].title} | PRICE: $${results[last].price}`)

    cy.reload()
    cy.get(CART_ITEMS)
    .first()
    .contains(`SKU: ${results[first].id} | NAME: ${results[first].title} | PRICE: $${results[first].price}`)
    cy.get(CART_ITEMS)
    .last()
    .contains(`SKU: ${results[last].id} | NAME: ${results[last].title} | PRICE: $${results[last].price}`)
  });

  it('Some o valor total dos itens do carrinho de compras de forma assíncrona');
  it('Botão para limpar carrinho de compras', () => {
    addToCart(3);
    addToCart(0);
    addToCart(1);
    countCart(3);
    cy.get(EMPTY_CART_BUTTON)
      .click()
    countCart(0);
  });
  it('Custo total do carrinho de compras', () => {
    cy.visit(PROJECT_URL);
    addToCart(9);
    addToCart(40);
    addToCart(23);
    cy.get(TOTAL_PRICE)
      .should('have.value', (results[9].price +
                             results[40].price +
                             results[23].price).toString());
    cy.get(CART_ITEMS)
        .children()
        .eq(1)
        .click()
    cy.get(TOTAL_PRICE)
    .should('have.value', (results[9].price +
                            results[23].price).toString());
  });
  it('Adicionar um texto de "loading" durante uma requisição à API', () => {
    cy.request(PROJECT_URL)
    cy.get(LOADING)
      .should('exist')
      .wait(3000)
      .should('not.exist');
  });
});
