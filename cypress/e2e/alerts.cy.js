describe("Validações de Alertas em JavaScript", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Alertas JS", "JavaScript Alerts");
  });

  it("Deve validar a mensagem de alerta", () => {
    // O cy.on() é um método do Cypress que escuta e reage a eventos globais durante a execução dos testes.
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Olá QA, eu sou um Alert Box!");
    });
    cy.contains("button", "Mostrar Alert").click();
  });

  it("Deve confirmar um diálogo e validar a resposta positiva", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.equal("Aperte um botão!");
      return true;
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Você clicou em Ok!");
    });
    cy.contains("button", "Mostrar Confirm").click();
  });

  it("Deve confirmar um diálogo e validar a resposta negativa", () => {
    cy.on("window:confirm", (msg) => {
      expect(msg).to.equal("Aperte um botão!");
      return false;
    });
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Você cancelou!");
    });
    cy.contains("button", "Mostrar Confirm").click();
  });

  it("Deve interagir com um prompt, inserir um texto e validar uma mensagem", () => {
    // Aqui você pode acessar coisas como win.prompt, win.alert, etc.
    cy.window().then((win) => {
      // Substitui o método prompt do navegador por uma função simulada
      cy.stub(win, "prompt").returns("Daniel");
    });

    cy.on("window:alert", (msg) => {
      expect(msg).to.equal("Olá Daniel! Boas-vindas ao WebDojo!");
    });
    cy.contains("button", "Mostrar Prompt").click();
  });
});
