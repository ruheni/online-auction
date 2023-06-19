describe('LogIn', () => {
  it('Displays the username in the header', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('[data-testid="email-input"]').type('shadcn@gmail.com');

    cy.get('[data-testid="password-input"]').type('shadcn');

    cy.get('[data-testid="login-button"]').click();

    // user name
    cy.contains('shadcn');
  });
});
