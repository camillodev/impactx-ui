/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setTheme(name: "alfabeto" | "kumon" | "impactx"): Chainable<void>;
      setMode(mode: "light" | "dark"): Chainable<void>;
      themedVisit(
        url: string,
        theme: "alfabeto" | "kumon" | "impactx",
        mode?: "light" | "dark"
      ): Chainable<void>;
      assertCssVar(
        name: string,
        matcher?: (value: string) => void
      ): Chainable<string>;
      openModal(triggerText?: string | RegExp): Chainable<JQuery<HTMLElement>>;
      closeModalEsc(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("setTheme", (name: "alfabeto" | "kumon" | "impactx") => {
  cy.document().then((doc) => {
    const html = doc.documentElement;
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

Cypress.Commands.add(
  "themedVisit",
  (
    url: string,
    theme: "alfabeto" | "kumon" | "impactx",
    mode: "light" | "dark" = "light"
  ) => {
    cy.visit(url);
    cy.setTheme(theme);
    cy.setMode(mode);
    cy.wait(150);
  }
);

Cypress.Commands.add(
  "assertCssVar",
  (name: string, matcher?: (value: string) => void) => {
    return cy.document().then((doc) => {
      const value = getComputedStyle(doc.documentElement)
        .getPropertyValue(name)
        .trim();
      if (matcher) {
        matcher(value);
      } else {
        expect(value, `CSS var ${name}`).to.not.eq("");
      }
      return cy.wrap(value);
    });
  }
);

Cypress.Commands.add(
  "openModal",
  (triggerText: string | RegExp = /simple|confirm|form|abrir|open/i) => {
    cy.contains("button", triggerText).first().click();
    return cy
      .get('[role="dialog"]', { timeout: 4000 })
      .should("be.visible") as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
  }
);

Cypress.Commands.add("closeModalEsc", () => {
  cy.get("body").type("{esc}");
  cy.get('[role="dialog"]').should("not.exist");
});

export {};
