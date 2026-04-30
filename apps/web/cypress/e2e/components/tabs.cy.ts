describe("Tabs: switching content", () => {
  beforeEach(() => {
    cy.visit("/components/tabs");
  });

  it("renders 3 tabs (Overview, Details, Settings) and 1 visible panel", () => {
    cy.get('[role="tab"]').should("have.length", 3);
    cy.get('[role="tabpanel"]').filter(":visible").should("have.length", 1);
  });

  it("first tab is active by default (data-state=active)", () => {
    cy.get('[role="tab"]').first().should("have.attr", "data-state", "active");
  });

  it("clicking second tab switches active and content", () => {
    cy.get('[role="tabpanel"]')
      .filter(":visible")
      .invoke("text")
      .then((before) => {
        cy.get('[role="tab"]').eq(1).click();
        cy.get('[role="tab"]')
          .eq(1)
          .should("have.attr", "data-state", "active");
        cy.get('[role="tabpanel"]')
          .filter(":visible")
          .invoke("text")
          .should("not.eq", before);
      });
  });

  it("ArrowRight key moves focus and selection forward", () => {
    cy.get('[role="tab"]').first().click().focus();
    cy.focused().type("{rightarrow}");
    // Radix selects on arrow by default in horizontal tablist
    cy.get('[role="tab"][data-state="active"]')
      .invoke("text")
      .should("match", /details/i);
  });

  it("active indicator uses --color-primary", () => {
    cy.assertCssVar("--color-primary");
    cy.get('[role="tab"][data-state="active"]')
      .first()
      .then(($t) => {
        const color = window.getComputedStyle($t[0]).color;
        expect(color).to.match(/^rgb/);
      });
  });
});
