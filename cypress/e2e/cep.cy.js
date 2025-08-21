describe("", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Integração", "Consulta de CEP");
  });

  it("Deve validar a consulta de CEP", () => {
    cy.get("#cep").type("54070180");
    cy.contains("button", "Buscar").click();
  });
});
