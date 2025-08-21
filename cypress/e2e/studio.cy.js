describe("template spec", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("login com sucesso", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000");
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana123");
    cy.get(".lucide").click();
    cy.get(".bg-\\[\\#8257E5\\]").click();
  });
});
