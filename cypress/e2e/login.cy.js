
describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login')
        cy.get('[data-test="loginRegisterButton"]').should('be.visible').click({ force: true })
        cy.url().should("include","/register")
    })
    it('login test', () => {
      cy.visit('http://localhost:5173/login')
      cy.get('[data-test="loginUsername"]').should('be.visible').type('Veli')
      cy.get('[data-test="loginEmail"]').should('be.visible').type('veli@site.com')
      cy.get('[data-test="loginPassword"]').should('be.visible').type('aA?123456')
      cy.get('[data-test="loginSubmit"]').should('be.visible').click({ force: true })
      cy.url().should('include', '/blogs')
    })
  })

//   username: "Veli",
//   password: "aA?123456",
//   email: "veli@site.com",