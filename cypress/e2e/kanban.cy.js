describe("Kanban board", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Deve mover uma tarefa de To Do para Done e atualizar o board", () => {
    cy.contains("Kanban").click();

    cy.contains("h1", "Kanban Board").should("be.visible");

    const dataTransfer = new DataTransfer();

    cy.contains('[draggable="true"]', "Documentar API").trigger("dragstart", {
      dataTransfer,
    });

    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");

    cy.get(".column-done")
      .should("include.text", "Documentar API")
      .and("include.text", "Criar documentação da API com Swagger");
  });
});
