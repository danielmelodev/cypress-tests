Cypress.Commands.add("fillConsultancyForm", (form) => {
  // const consultancyForm = consultancyData.personal;

  cy.get("#name").type(form.name);
  cy.get("#email").type(form.email);
  cy.get("#phone").type(form.phone).should("have.value", "(81) 99387-8365");

  // cy.get("#consultancyType").select("inCompany");

  // Ou forma de pegar um select que não tenha identificador

  cy.contains("label", "Tipo de Consultoria")
    .parent()
    .find("select")
    .select(form.consultancyType);

  if (form.personType === "cpf") {
    // Verificar se o radio "Pessoa Física"  está marcado
    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");

    // Verificar se o radio "Pessoa Jurídica" não está marcado
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF").parent().find("input").type(form.document);
    // .should("have.value", "129.627.014-93");
  }

  if (form.personType === "cnpj") {
    // Verificar se o radio "Pessoa Física"  está marcado
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .check()
      .should("be.checked");

    // Verificar se o radio "Pessoa Jurídica" não está marcado
    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CNPJ").parent().find("input").type(form.document);
    // .should("have.value", "129.627.014-93");
  }

  // cy.get('input[placeholder="000.000.000-00"]')
  //   .type("12962701493")
  //   .should("have.value", "129.627.014-93");

  form.discoveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });

  cy.get('input[type="file"]').selectFile(form.file, {
    force: true,
  });

  cy.get(
    'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
  ).type(form.description);

  form.tags.forEach((tag) => {
    cy.get("#technologies").type(`${tag}{enter}`);

    cy.get('label[for="technologies"]')
      .parent()
      .contains("span", tag)
      .should("be.visible");
  });

  if (form.terms === true) {
    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");
  }
});

Cypress.Commands.add("submitConsultancyForm", () => {
  cy.contains("button", "Enviar formulário").click();
});

Cypress.Commands.add("validateConsultancyModal", () => {
  cy.get(".modal", { timeout: 6000 })
    .should("be.visible")
    .find(".modal-content")
    .should("be.visible")
    .and(
      "have.text",
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
    );
});
