describe('Fill in registration form with incorrect email', function () {
    it('REgistration works', function () {
        cy.visit('http://localhost:4200/r');
        cy.get('button').should('be.disabled');
    });
    it('Fill in form incorrect => button disabled', function () {
        cy.get('[data-cy=firstNameInput]').type('Wout')
            .get('[data-cy=lastNameInput]').type('Maes')
            .get('[data-cy=emailInput]').type('maeswout1gmail.com')
            .get('[data-cy=passwordInput]').type('test00##')
            .get('[data-cy=repeatPasswordInput]').type('test00##')
            .get('[data-cy=birthdateInput]').type('01/01/1999')
            .get('[data-cy=adres]').type('veldstraat 1a')
            .get('[data-cy=postcode]').type('9000')
            .get('[data-cy=gemeente]').type('Gent');
        cy.get('button').should('be.disabled');
    });
});