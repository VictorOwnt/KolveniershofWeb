// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.visit("http://localhost:4200/login");
    const email = 'admin1@gmail.com';
    cy.request({
        method: 'POST',
        url: '/Users/login',
        body: {
            email,
            password: 'test00##'
        }
    }).then(res => localStorage.setItem('currentUser', res.body));
});

Cypress.Commands.add('register', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/account/register',
        body: {
            email,
            password
        }
    }).then(res => localStorage.setItem('currentUser', res.body));
});