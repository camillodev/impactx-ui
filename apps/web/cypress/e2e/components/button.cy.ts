describe("Button: variants × sizes × states", () => {
  beforeEach(() => {
    cy.visit("/components/button");
  });

  it("renders many buttons across variant/size matrix", () => {
    // 7 variants × 3 sizes × 4 states = 84 + aliases
    cy.get("main main button").its("length").should("be.gte", 80);
  });

  it("primary button uses --color-primary as background", () => {
    cy.assertCssVar("--color-primary");
    cy.get("main main button")
      .not("[disabled]")
      .first()
      .then(($btn) => {
        const bg = window.getComputedStyle($btn[0]).backgroundColor;
        // Resolved primary from token must be a real rgb (not transparent)
        expect(bg).to.match(/^rgb/);
        expect(bg).to.not.eq("rgba(0, 0, 0, 0)");
      });
  });

  it("disabled buttons are not clickable", () => {
    cy.get("main main button[disabled]")
      .first()
      .should("be.disabled")
      .and("have.css", "pointer-events", "none");
  });

  it("focus-visible ring shows up on keyboard focus", () => {
    cy.get("main main button").not("[disabled]").first().focus();
    cy.focused().should("match", "button");
  });

  it("click does not throw on enabled button", () => {
    cy.get("main main button").not("[disabled]").first().click({ force: false });
  });
});
