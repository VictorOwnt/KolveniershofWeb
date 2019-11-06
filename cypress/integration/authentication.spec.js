describe('logintest', () => {
    beforeEach(() => {});

    it('logintest', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('[data-cy=login-email]').type('test10@gmail.com');
        cy.get('[data-cy=login-password]').type('test00##');
        cy.get('[data-cy=login-button').click();
        // login name should be in the title balk
        cy.contains('test10@gmail.com');
    });
});