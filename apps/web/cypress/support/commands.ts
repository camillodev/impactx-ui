/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setTheme(name: "alfabeto" | "kumon" | "impactx"): Chainable<void>;
      setMode(mode: "light" | "dark"): Chainable<void>;
    }
  }
}

Cypress.Commands.add("setTheme", (name: "alfabeto" | "kumon" | "impactx") => {
  cy.document().then((doc) => {
    const html = doc.documentElement;
    // Remove any existing theme-* class
    const classesToRemove = Array.from(html.classList).filter((c) =>
      c.startsWith("theme-")
    );
    classesToRemove.forEach((c) => html.classList.remove(c));
    html.classList.add(`theme-${name}`);
  });
});

Cypress.Commands.add("setMode", (mode: "light" | "dark") => {
  cy.document().then((doc) => {
    doc.documentElement.setAttribute("data-mode", mode);
  });
});

export {};
