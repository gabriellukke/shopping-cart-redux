const API_URL = "https://api.mercadolibre.com/sites/MLB/search?q=$computador"
const PROJECT_URL = './JulioCezar/index.html'

const LOADING = '.loading';
const ITEM_SELECTOR = '.item';
const ADD_CART_BUTTON = '.item__add'
const CART_ITEMS = '.cart__items'
const EMPTY_CART_BUTTON = '.button-items'
const TOTAL_PRICE = '.totalPrice_items'

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
    cy.get(ITEM_SELECTOR)
    .should('exist')
    .eq(36)
    .children(ADD_CART_BUTTON)
    .click();
    cy.get(CART_ITEMS)
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', results[36].title)
  });
  it('Remova o item do carrinho de compras ao clicar nele');
  it('Salve o carrinho de compras no **LocalStorage**');
  it('Carregue o carrinho de compras através do **LocalStorage** ao iniciar a página');
  it('Some o valor total dos itens do carrinho de compras de forma assíncrona');
  it('Botão para limpar carrinho de compras', () => {
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(3)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(0)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(1)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(CART_ITEMS)
      .children()
      .should('have.length', 3)
    cy.get(EMPTY_CART_BUTTON)
      .click()
    cy.get(CART_ITEMS)
      .children()
      .should('have.length', 0)
  });
  it('Custo total do carrinho de compras', () => { 
    cy.visit(PROJECT_URL);
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(9)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(40)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(ITEM_SELECTOR)
      .should('exist')
      .eq(23)
      .children(ADD_CART_BUTTON)
      .click();
    cy.get(TOTAL_PRICE)
      .should('have.value', (results[9].price +
                             results[40].price +
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
