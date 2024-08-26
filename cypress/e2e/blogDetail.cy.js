describe('blogs', () => {
    beforeEach(()=> {
       cy.fetchBlogId()
       cy.login()
    })
   it('blog detail page with comments test', () => 
    {
     cy.visit('http://localhost:5173/blogs')
     cy.wait(1000)
     
    
    cy.get('[data-test="blogDetailButton"]').should('be.visible').first().click({force:true})
     cy.wait(2000)
     cy.url().should('include', `/blog-details/${Cypress.env('BLOG_ID')}`)
     cy.visit(`http://localhost:5173/blog-details/${Cypress.env('BLOG_ID')}`);
     cy.get('[data-test="showHideComments"]').should('exist').and('be.visible').should('have.text','Show Comments').click({force:true})
     cy.get('[data-test="showHideComments"]').should('be.visible').should('have.text','Hide Comments').click({force:true})
   })
 })