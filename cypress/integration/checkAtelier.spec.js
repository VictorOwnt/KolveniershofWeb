describe("Check ateliers", function() {
  it("mock ateliers get", function() {
    cy.server();
    cy.route({
      method: "GET",
      url: "/API/activities",
      status: 200,
      response: "fixture:activities.json"
    });

    // login should happen somewhere else
    cy.visit("http://localhost:4200/login");
    cy.get("[data-cy=login-email]").type("client10@gmail.com");
    cy.get("[data-cy=login-password]").type("test00##");
    cy.get("[data-cy=login-button").click();

    cy.wait(200);
    cy.visit("http://localhost:4200/a");
    cy.wait(200);

    // length is 3 because of the 2 mocked responses and 1 title above the 2
    cy.get("[data-cy=Activities]").should("have.length", 3);
  });
});
