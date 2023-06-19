describe('Deposit Money Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should open the deposit money modal', () => {
    cy.get('[data-testid="deposit-modal-button"]').should('be.visible');

    cy.get('[data-testid="deposit-modal-button"]').click();

    cy.get('[data-testid="deposit-form"]').should('be.visible');
  });
});
