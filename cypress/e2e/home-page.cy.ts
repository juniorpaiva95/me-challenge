// https://on.cypress.io/api

describe('CT01 - Home Page', () => {
  it('Should correctly render content', () => {
    cy.visit('/')
    cy.get('[data-testid="view-order-1"]').should('exist')
    cy.get('[data-testid="view-order-2"]').should('exist')
  })
  it('Should correctly navigate to order view with sucess order (1)', () => {
    cy.visit('/')
    cy.get('[data-testid="view-order-1"] button').click()
    cy.url().should('include', '/order/1')
  })
  it('Should correctly navigate to order view with failed order (2)', () => {
    cy.visit('/')
    cy.get('[data-testid="view-order-2"] button').click()
    cy.url().should('include', '/order/2')
  })
})
