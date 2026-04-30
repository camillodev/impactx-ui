const routes = [
  "/components",
  "/components/assessment-card",
  "/components/avatar",
  "/components/badge",
  "/components/banner-cta",
  "/components/breadcrumb",
  "/components/button",
  "/components/card",
  "/components/charts",
  "/components/chip",
  "/components/data-table",
  "/components/donut",
  "/components/icon-button",
  "/components/input",
  "/components/modal",
  "/components/pagination",
  "/components/stat",
  "/components/tabs",
  "/components/toast",
  "/components/tooltip",
];

describe("smoke: all component routes render", () => {
  routes.forEach((route) => {
    it(`renders ${route}`, () => {
      cy.request(route).its("status").should("eq", 200);
      cy.visit(route);
      cy.get("body").should("not.be.empty");
      cy.get("body").invoke("text").should((text) => {
        expect(text).to.not.match(/Application error/i);
        expect(text).to.not.match(/Unhandled Runtime Error/i);
        expect(text.trim().length).to.be.greaterThan(0);
      });
    });
  });
});
