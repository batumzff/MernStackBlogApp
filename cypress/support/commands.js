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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
    // beforeEach(() => {
    //     cy.visit('http://localhost:5173/login')
    //     cy.get('[data-test="loginRegisterButton"]').should('be.visible').click({ force: true })
    //     cy.url().should("include","/register")
    // })
  
    cy.visit("http://localhost:5173/login");
    cy.get('[data-test="loginUsername"]').should("be.visible").type("Veli");
    cy.get('[data-test="loginEmail"]').should("be.visible").type("veli@site.com");
    cy.get('[data-test="loginPassword"]').should("be.visible").type("aA?123456");
    cy.get('[data-test="loginSubmit"]')
      .should("be.visible")
      .click({ force: true });
    cy.url().should("include", "/blogs");
  });
  
  Cypress.Commands.add("loginGetToken", () => {
    cy.request("POST", `${Cypress.env("API_BASE_URL")}auth/login`, {
      username: "Veli",
      email: "veli@site.com",
      password: "aA?123456",
    }).then((response) => {
      const token = response.body.token;
      Cypress.env("AUTH_TOKEN", token);
    });
  });
  
  Cypress.Commands.add("fetchBlogId", () => {
    cy.loginGetToken().then(() => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}blogs?limit=20&sort[createdAt]=desc`,
        headers: {
          Authorization: `Token ${Cypress.env("AUTH_TOKEN")}`,
        },
      }).then((response) => {
        const id = response.body.data[0]._id;
        Cypress.env("BLOG_ID", id);
        console.log(id);
      });
    });
  });