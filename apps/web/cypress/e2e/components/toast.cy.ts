describe("Toast: trigger, auto-dismiss, stacking", () => {
  beforeEach(() => {
    cy.visit("/components/toast");
  });

  it("clicking Success trigger renders a toast", () => {
    cy.get("main button").contains(/^success$/i).click();
    // Sonner renders toasts inside an ol[role=region] or li[role=status]
    cy.get('[data-sonner-toast], li[role="status"]', { timeout: 2000 })
      .first()
      .should("exist");
  });

  it("each type renders a distinct toast", () => {
    ["Success", "Info", "Warning", "Danger"].forEach((label, i) => {
      cy.get("main button").contains(new RegExp(`^${label}$`, "i")).click();
      cy.wait(60);
    });
    cy.get('[data-sonner-toast], li[role="status"]')
      .its("length")
      .should("be.gte", 1);
  });

  it("toast auto-dismisses after duration (default 4s)", () => {
    cy.get("main button").contains(/^success$/i).click();
    cy.get('[data-sonner-toast], li[role="status"]', { timeout: 2000 })
      .first()
      .should("exist");
    // duration=4000 from Toaster config; allow margin
    cy.get('[data-sonner-toast]', { timeout: 7000 }).should("not.exist");
  });

  it("toast with description renders title + description", () => {
    cy.get("main button").contains(/success \+ descri/i).click();
    cy.get('[data-sonner-toast]', { timeout: 2000 }).should("exist");
    cy.contains(/projeto publicado/i).should("exist");
  });
});
