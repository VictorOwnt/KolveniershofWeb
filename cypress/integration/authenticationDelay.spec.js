describe('Login Page', () => {
    beforeEach(() => {});

    it('mock login with a delay', function () {
        cy.server({
            delay: 2000
        });
        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/login'
        });
        cy.visit('http://localhost:4200/login');
        cy.get('[data-cy=login-email]').type('client10@gmail.com');
        cy.get('[data-cy=login-password]').type('test00##');
        cy.get('[data-cy=login-button').click();
        // login name should be in the title balk
        cy.contains('Cliënten');
    });
});