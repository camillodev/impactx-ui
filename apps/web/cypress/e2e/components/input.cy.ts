describe("Input: label, error, helper, disabled", () => {
  beforeEach(() => {
    cy.visit("/components/input");
  });

  it("renders all input states", () => {
    cy.get("input").its("length").should("be.gte", 5);
  });

  it("label is associated with input via htmlFor/id", () => {
    cy.contains("label", "Default").invoke("attr", "for").then((id) => {
      expect(id).to.match(/^ix-input-/);
      cy.get(`#${id}`).should("exist").and("have.prop", "tagName", "INPUT");
    });
  });

  it("typing into Default updates value", () => {
    cy.contains("label", "Default")
      .invoke("attr", "for")
      .then((id) => {
        cy.get(`#${id}`).clear().type("hello world");
        cy.get(`#${id}`).should("have.value", "hello world");
      });
  });

  it("error state sets aria-invalid and renders error span", () => {
    cy.get('input[aria-invalid="true"]').should("exist");
    cy.contains(/senha precisa ter pelo menos 8 caracteres/i).should("exist");
  });

  it("helper text is described via aria-describedby", () => {
    cy.contains("label", /com helper/i)
      .invoke("attr", "for")
      .then((id) => {
        cy.get(`#${id}`).should("have.attr", "aria-describedby", `${id}-helper`);
        cy.get(`#${id}-helper`).should("contain.text", "Usaremos");
      });
  });

  it("disabled input cannot be typed into", () => {
    cy.contains("label", "Disabled")
      .invoke("attr", "for")
      .then((id) => {
        cy.get(`#${id}`).should("be.disabled");
      });
  });
});
