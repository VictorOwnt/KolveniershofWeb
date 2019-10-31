describe('Datepicker WeekSchedule', function () {
    it('logintest', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('[data-cy=login-email]').type('test10@gmail.com');
        cy.get('[data-cy=login-password]').type('test00##');
        cy.get('[data-cy=login-button').click();
        // login name should be in the title balk
        cy.contains('test10@gmail.com');
    });
    it('Datepicker works', function () {
        cy.visit('http://localhost:4200/week');
        cy.get('picker').should('be.picker');
    });
    it('Fill in date', function () {
        cy.get('[data-cy=dateInput]').type('1/1/2019').click()
        cy.get('[data-cy=dataDatum]').should('have.value', 'Datum: 01/01/2019');
    });
});

//cy.get('[data-cy=date-button]')