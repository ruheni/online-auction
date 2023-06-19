describe('Deposit Money Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/deposit');
  });

  it('should display the deposit money page', () => {
    cy.get('[data-testid="deposit-page-title"]').should('be.visible');

    cy.get('[data-testid="deposit-form"]').should('be.visible');

    cy.get('[data-testid="amount-input"]').should('be.visible');

    cy.get('[data-testid="deposit-cancel-button"]').should('be.visible');

    cy.get('[data-testid="deposit-button"]').should('be.visible');
  });

  it('should deposit money successfully', () => {
    cy.get('[data-testid="amount-input"]').type('100');
    cy.get('[data-testid="deposit-button"]').click();
  });
});
