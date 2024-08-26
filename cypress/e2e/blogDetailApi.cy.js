describe("blogDetailApiTest", () => {
    before(() => {
      cy.loginGetToken();
    });
    it("blog detail API request response test", () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}blogs`,
        headers: {
          Authorization: `Token ${Cypress.env("AUTH_TOKEN")}`,
        },
      }).then((response) => {
        const id = response.body.data[0]._id;
        console.log("id for url: ",id);
        cy.request({
          method: "GET",
          url: `${Cypress.env("API_BASE_URL")}blogs/${id}`,
          headers: {
            Authorization: `Token ${Cypress.env("AUTH_TOKEN")}`,
          },
        }).then((response) => {
          expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('object');
  
        expect(response.body.data).to.have.property('categoryId').that.is.a('string');
        expect(response.body.data).to.have.property('title').that.is.a('string').and.is.not.empty;
        expect(response.body.data).to.have.property('content').that.is.a('string').and.is.not.empty;
        expect(response.body.data).to.have.property('createdAt').that.is.a('string');
        });
      });
    });
  });