// Cross-component theme interaction smoke.
// Granular per-component specs live in cypress/e2e/components/*.cy.ts
import "../support/commands";

describe("cross-component theme interaction smoke", () => {
  it("themedVisit applies theme class and primary var resolves", () => {
    cy.themedVisit("/components/button", "education");
    cy.document().then((doc) => {
      expect(doc.documentElement.classList.contains("theme-education")).to.eq(
        true
      );
    });
    cy.assertCssVar("--color-primary");
  });

  it("openModal helper opens dialog on /components/modal", () => {
    cy.visit("/components/modal");
    cy.openModal(/simple/i);
    cy.closeModalEsc();
  });
});
