describe("charts render without console errors", () => {
  const pages = ["/components/charts", "/components/donut"];

  pages.forEach((path) => {
    it(`renders chart canvas/svg on ${path}`, () => {
      const errors: string[] = [];
      cy.visit(path, {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").callsFake((...args: unknown[]) => {
            errors.push(args.map(String).join(" "));
          });
        },
      });

      cy.wait(1000);

      cy.get("body").then(($body) => {
        const hasCanvas = $body.find("canvas").length > 0;
        const hasEchartsSvg = $body.find("svg").length > 0;
        expect(
          hasCanvas || hasEchartsSvg,
          `expected canvas or svg on ${path}`
        ).to.be.true;
      });

      cy.then(() => {
        const meaningful = errors.filter(
          (e) => !/Download the React DevTools|Warning:/i.test(e)
        );
        expect(meaningful, `console errors on ${path}: ${meaningful.join(" | ")}`).to.have.length(0);
      });
    });
  });
});
