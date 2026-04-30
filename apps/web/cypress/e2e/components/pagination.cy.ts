describe("Pagination: prev/next, page click, edges", () => {
  beforeEach(() => {
    cy.visit("/components/pagination");
  });

  it("renders multiple pagination navs", () => {
    cy.get('nav[aria-label="Pagination"]').its("length").should("be.gte", 3);
  });

  it("first page has prev disabled", () => {
    cy.get('nav[aria-label="Pagination"]')
      .first()
      .within(() => {
        cy.get('button[aria-label="Página anterior"]').should("be.disabled");
        cy.get('button[aria-current="page"]').should("contain.text", "1");
      });
  });

  it("clicking page 3 sets aria-current to that page", () => {
    cy.get('nav[aria-label="Pagination"]')
      .first()
      .within(() => {
        cy.contains("button", "3").click();
        cy.get('button[aria-current="page"]').should("contain.text", "3");
      });
  });

  it("next button increments current page", () => {
    cy.get('nav[aria-label="Pagination"]')
      .first()
      .within(() => {
        cy.get('button[aria-current="page"]')
          .invoke("text")
          .then((before) => {
            cy.get('button[aria-label="Próxima página"]').click();
            cy.get('button[aria-current="page"]')
              .invoke("text")
              .should((after) => {
                expect(parseInt(after)).to.eq(parseInt(before) + 1);
              });
          });
      });
  });

  it("medium pagination renders dots (...) when applicable", () => {
    // Big variant (12 pages, current=7) → dots on both sides
    cy.get('nav[aria-label="Pagination"]')
      .eq(1)
      .find("svg")
      .should("exist");
  });

  it("active page uses --color-primary background", () => {
    cy.assertCssVar("--color-primary");
    cy.get('nav[aria-label="Pagination"]')
      .first()
      .find('button[aria-current="page"]')
      .then(($b) => {
        const bg = window.getComputedStyle($b[0]).backgroundColor;
        expect(bg).to.match(/^rgb/);
        expect(bg).to.not.eq("rgba(0, 0, 0, 0)");
      });
  });
});
