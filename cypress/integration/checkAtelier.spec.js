describe('Check ateliers', function () {
    beforeEach(function () {
        cy.login();
    });
    // it('Check the length of the atelier', function () {
    //     cy.visit('http://localhost:4200/a');
    // });

    it('mock activities get', function () {
        cy.server();
        cy.route({
            delay: 2000,
            method: 'GET',
            url: '/activities',
            status: 200,
            response: 'fixture:activities.json'
        });

        it('Check the length of the atelier', function () {
            cy.visit('http://localhost:4200/a');
        });
        cy.get('[data-cy=Activities]').should('have.length', 2);
    });

})