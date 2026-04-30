const themes = ["alfabeto", "kumon", "impactx"] as const;

describe("themes: switching <html class> changes resolved colors", () => {
  it("primary button bg-color differs across themes", () => {
    cy.visit("/components/button");

    const colors: Record<string, string> = {};

    themes.forEach((theme) => {
      cy.setTheme(theme);
      // Allow CSS to recalculate
      cy.wait(150);
      cy.get("button").first().then(($btn) => {
        const bg = window.getComputedStyle($btn[0]).backgroundColor;
        colors[theme] = bg;
      });
    });

    cy.then(() => {
      const values = Object.values(colors);
      expect(values).to.have.length(3);
      const unique = new Set(values);
      expect(unique.size, `expected 3 distinct bg colors, got ${JSON.stringify(colors)}`).to.eq(3);
    });
  });

  it("--color-primary CSS var resolves to non-empty value", () => {
    cy.visit("/components/button");
    themes.forEach((theme) => {
      cy.setTheme(theme);
      cy.wait(100);
      cy.document().then((doc) => {
        const value = getComputedStyle(doc.documentElement)
          .getPropertyValue("--color-primary")
          .trim();
        expect(value, `--color-primary for ${theme}`).to.not.eq("");
      });
    });
  });
});
