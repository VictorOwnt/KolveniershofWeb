describe('Make atelier', function () {
    it('Make a new atelier', function () {
        cy.visit('http://localhost:4200/a');
    });

    it('mock activities get', function () {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'API/Activities',
            response: 'fixture:activities.json'
        });

        cy.get('[data-cy=Activities]').should('have.length', 2);
    });

    it('Fill in form correct => make', function () {
        cy.get('[data-cy=makeAtelierButton]').click()
        cy.get('[data-cy=NewNameInput]').type('Artisanaal bier brouwen')
        cy.get('[data-cy=chosePicture]').click()
        cy.get('[data-cy=SaveButton]').click()
        // cy.get('[data-cy=CancelButton]').click()
        cy.get('[data-cy=Activities]').should('have.length', 3);
    });
})