import {
  bunBottom,
  bunTop,
  burgerConstructor,
  ingredientBun,
  ingredientMain,
  ingredientSauce,
  modal,
  modalCloseButton,
  modalOverlay,
  orderButton,
  orderNumber,
  userName
} from './constants';

const URL = 'https://norma.nomoreparties.space/api';

describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('user');
    cy.fixture('order.json').as('order');

    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', `${URL}/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', `${URL}/orders`, {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('http://localhost:8080/');

    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Отображение ингредиентов бургера и добавление их в конструктор', () => {
      cy.get(burgerConstructor).should('exist');
      cy.get(burgerConstructor).should('not.contain', bunTop);
      cy.get(burgerConstructor).should('not.contain', bunBottom);
      cy.get(ingredientBun)
        .first()
        .parent()
        .find('button')
        .contains('Добавить')
        .should('exist')
        .click();
      cy.get(bunTop).should('exist');
      cy.get(bunTop).contains('Краторная булка N-200i (верх)');
      cy.get(bunBottom).should('exist');
      cy.get(bunBottom).contains('Краторная булка N-200i (низ)');
      cy.get(ingredientMain)
        .first()
        .parent()
        .find('button')
        .contains('Добавить')
        .should('exist')
        .click();
      cy.get(burgerConstructor).contains('Биокотлета из марсианской Магнолии');
      cy.get(ingredientSauce)
        .first()
        .parent()
        .find('button')
        .contains('Добавить')
        .should('exist')
        .click();
      cy.get(burgerConstructor).contains('Соус Spicy-X');
    });

    describe('Тест модальных окон', () => {
      it('Открытие и закрытие модального окна с ингредиентом', () => {
        cy.get(ingredientMain).first().click();
        cy.get(modal).should('be.visible');
        cy.get(modalCloseButton).should('exist').click();
        cy.get(modal).should('not.exist');
        cy.get(ingredientMain).first().click();
        cy.get(modalOverlay).click({ force: true });
        cy.get(modal).should('not.exist');
      });
    });

    describe('Тест на создание заказа', () => {
      beforeEach(() => {
        cy.setCookie('accessToken', 'mockAccessToken');
        cy.setCookie('refreshToken', 'mockRefreshToken');
        cy.visit('/', {
          onBeforeLoad(win) {
            win.localStorage.setItem('accessToken', 'mockedAccessToken');
            win.localStorage.setItem('refreshToken', 'mockedRefreshToken');
          }
        });
        cy.wait('@getUser');
      });

      it('Создание заказа', () => {
        cy.get(userName).contains('user');
        cy.contains('Добавить').should('exist').click();
        cy.get(bunTop).should('exist');
        cy.get(bunBottom).should('exist');
        cy.get(ingredientMain)
          .first()
          .parent()
          .find('button')
          .contains('Добавить')
          .click();
        cy.get(ingredientSauce)
          .first()
          .parent()
          .find('button')
          .contains('Добавить')
          .click();

        cy.get(orderButton).click();

        cy.get(modal).should('be.visible');

        cy.get(orderNumber).should('contain', '1');

        cy.get(modalCloseButton).should('exist').click();
        cy.get(modal).should('not.exist');
        cy.get(burgerConstructor).should('not.contain', bunTop);
        cy.get(burgerConstructor).should('not.contain', bunBottom);
        cy.get(burgerConstructor).should('not.contain', ingredientMain);
        cy.get(burgerConstructor).should('not.contain', ingredientSauce);
      });

      afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
      });
    });
  });
});