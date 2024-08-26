describe('newBlog', () => {
    beforeEach(()=> {
       cy.login()
    })
   it('adding new blog test', () => {
     cy.visit('http://localhost:5173/blogs')

     cy.get('[data-test="addNewBlog"]').should('be.visible').click({force: true})
     cy.url().should('include', '/new-blog')
     cy.get('[data-test="newBlogTitle"]').should('be.visible').type("Cypress Test")
     cy.get('div.ql-editor.ql-blank').should('be.visible').type("Cypress Test Quill Content")
    //  cy.get('[data-test="newBlogQuill"]').should('be.visible').type("Cypress Test Quill Content")
     cy.get('[data-test="newBlogImage"]').should('be.visible').type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ5xTmR1y7vS0lXIk7dhqrIBzDJQGq1XN9nQ&s")
     cy.get('[data-test="newBlogSelectCategory"]').select("WEB DEVELOPMENT")
     
     cy.get('[data-test="newBlogPublishSelect"]').select("Publish")
     cy.get('[data-test="newBlogSubmit"]').should('be.visible').click({force:true})
     cy.url().should('include','/blogs')

     
      cy.wait(1000)
      cy.get('[data-test="blogTitle"]').should('exist').contains('Cypress Test')
      cy.get('[data-test="blogImage"]').first().should('exist').and('have.attr','src').and('include', 'tbn:ANd9GcQQ5xTmR1y7vS0lXIk7dhqrIBzDJQGq1XN9nQ&s')
      cy.get('[data-test="blogContent"]').should('exist').and('not.be.empty').contains("Cypress Test Quill Content")

   })
 })