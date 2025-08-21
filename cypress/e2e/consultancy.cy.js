// Importa de forma desestruturada
import { personal, company } from "../fixtures/consultancy.json";

// Forma convencional de importa todos os dados do arquivo JSON
// import consultancyData from "../fixtures/consultancy.json";

describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.login();

    cy.goTo("Formulários", "Consultoria");
    // Um alternativa para usar dados da pasta fixture
    // cy.fixture("consultancy").as("consultancyData");
  });

  it("Deve solicitar consultoria individual", () => {
    cy.fillConsultancyForm(personal);
    cy.submitConsultancyForm();
    cy.validateConsultancyModal();
  });

  it("Deve solicitar consultoria In Company", () => {
    cy.fillConsultancyForm(company);
    cy.submitConsultancyForm();
    cy.validateConsultancyModal();

    cy.log("Heitor QA");
  });

  it.only("Deve verificar os campos obrigatórios", () => {
    cy.submitConsultancyForm();

    const labels = [
      { label: "Nome Completo", message: "Campo obrigatório" },
      { label: "Email", message: "Campo obrigatório" },
      {
        label: "termos de uso",
        message: "Você precisa aceitar os termos de uso",
      },
    ];

    labels.forEach(({ label, message }) => {
      cy.contains("label", label)
        .parent()
        .find("p")
        .should("be.visible")
        .should("have.text", message)
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");
    });
  });
});
