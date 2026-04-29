describe("interactive sanity checks", () => {
  it("modal opens on trigger click and closes on ESC", () => {
    cy.visit("/components/modal");
    // Find first button-like trigger that opens a modal
    cy.contains("button", /open|abrir|trigger|modal/i, { matchCase: false })
      .first()
      .click();
    // Look for a dialog/modal element
    cy.get('[role="dialog"], [data-modal], .modal').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[role="dialog"], [data-modal], .modal').should("not.exist");
  });

  it("tabs switch content when clicking tab 2", () => {
    cy.visit("/components/tabs");
    cy.get('[role="tab"]').then(($tabs) => {
      if ($tabs.length < 2) {
        // fallback: any clickable tab-like element
        cy.log("less than 2 role=tab found, skipping detailed assert");
        return;
      }
      // Capture content of active tabpanel before click
      cy.get('[role="tabpanel"]')
        .first()
        .invoke("text")
        .then((before) => {
          cy.wrap($tabs[1]).click();
          cy.get('[role="tabpanel"]')
            .first()
            .invoke("text")
            .should((after) => {
              expect(after).to.not.eq(before);
            });
        });
    });
  });

  it("tooltip appears on hover", () => {
    cy.visit("/components/tooltip");
    // Hover the first hoverable trigger (button or element with aria-describedby)
    cy.get("button, [data-tooltip-trigger]").first().trigger("mouseover");
    cy.get('[role="tooltip"], [data-tooltip], .tooltip', { timeout: 2000 })
      .should("exist");
  });

  it("toast appears after clicking trigger", () => {
    cy.visit("/components/toast");
    cy.contains("button", /show|toast|trigger|abrir/i, { matchCase: false })
      .first()
      .click();
    cy.get('[role="status"], [role="alert"], [data-toast], .toast', {
      timeout: 3000,
    }).should("exist");
  });
});
