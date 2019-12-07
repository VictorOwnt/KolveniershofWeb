describe('Page not foud, incorrect url', function () {

    it('Incorrect url', function () {
        cy.visit('http://localhost:4200/utyjhtg');
        cy.get('[data-cy=pageNotFound]').contains("Oeps! Pagina niet gevonden")
    });

});