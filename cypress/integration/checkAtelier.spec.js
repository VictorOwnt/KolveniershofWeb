describe('Check ateliers', function () {
    it('Check the length of the atelier', function () {
        cy.visit('http://localhost:4200/a');
    });

    it('mock activities get', function () {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://kolv02-backend.herokuapp.com/API/activities',
            status: 204,
            response: [{
                    "_id": "5dce5258fb69c00affb083f4",
                    "name": "Bakken",
                    "icon": "icons/icon-mixer.svg"
                },
                {
                    "_id": "5dce5258fb69c00affb083f5",
                    "name": "Balanske",
                    "icon": "icons/icon-sofa.svg"
                }
            ]
        });

        cy.get('[data-cy=Activities]').should('have.length', 2);
    });

})