function parseRgb(rgb: string): [number, number, number] {
  const match = rgb.match(/rgba?\(([^)]+)\)/);
  if (!match) return [255, 255, 255];
  const parts = match[1].split(",").map((p) => parseFloat(p.trim()));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

function luminance(rgb: string): number {
  const [r, g, b] = parseRgb(rgb);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

describe("dark mode toggling via data-mode", () => {
  it("dark mode produces dark background, light mode produces light background", () => {
    cy.visit("/components/card");

    cy.setMode("dark");
    cy.wait(200);
    cy.get("body").then(($body) => {
      const bg = window.getComputedStyle($body[0]).backgroundColor;
      const lum = luminance(bg);
      expect(lum, `dark luminance (${bg})`).to.be.lessThan(0.5);
      cy.wrap(lum).as("darkLum");
    });

    cy.setMode("light");
    cy.wait(200);
    cy.get("body").then(($body) => {
      const bg = window.getComputedStyle($body[0]).backgroundColor;
      const lum = luminance(bg);
      expect(lum, `light luminance (${bg})`).to.be.greaterThan(0.5);
    });
  });
});
