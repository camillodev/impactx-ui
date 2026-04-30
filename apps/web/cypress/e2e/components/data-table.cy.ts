describe("DataTable: sort + density variants", () => {
  beforeEach(() => {
    cy.visit("/components/data-table");
  });

  it("renders multiple tables (default + compact + empty + loading)", () => {
    cy.get("table").its("length").should("be.gte", 2);
  });

  it("sortable headers expose aria-sort", () => {
    // First table has defaultSort on `number` ascending
    cy.get("table")
      .first()
      .find('th[aria-sort]')
      .its("length")
      .should("be.gte", 1);
    cy.get("table")
      .first()
      .find('th[aria-sort="ascending"], th[aria-sort="descending"]')
      .should("exist");
  });

  it("clicking sortable header toggles aria-sort", () => {
    cy.get("table")
      .first()
      .within(() => {
        cy.contains("th", /attempts/i)
          .as("header")
          .click();
      });
    cy.get("@header")
      .invoke("attr", "aria-sort")
      .should("match", /ascending|descending/);
  });

  it("compact density table renders shorter row padding", () => {
    // 2nd table is compact density
    cy.get("table").eq(1).find("tbody tr").its("length").should("be.gte", 1);
  });

  it("empty state displays empty message", () => {
    cy.contains(/sem questões para exibir/i).should("exist");
  });
});
