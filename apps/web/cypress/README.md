# Cypress E2E — `@impactx/web`

Smoke + visual sanity tests for the design system showcase.

## Comandos

- `pnpm cypress` — abre o Cypress em modo interativo (precisa do `pnpm dev` rodando em `:3002`).
- `pnpm cypress:run` — roda headless (precisa do `pnpm dev` rodando).
- `pnpm test:e2e` — sobe `pnpm dev`, espera `http://localhost:3002`, roda headless e derruba o servidor ao fim. Recomendado em CI.

## Estrutura

```
cypress/
  cypress.config.ts         # baseUrl 3002, viewport 1280x800
  support/
    e2e.ts                  # bootstrap (importa commands)
    commands.ts             # cy.setTheme(), cy.setMode()
  e2e/
    routes.cy.ts            # smoke: visita as 20 rotas /components/*
    themes.cy.ts            # alfabeto/kumon/impactx geram cores distintas
    dark-mode.cy.ts         # data-mode=dark/light troca background
    charts.cy.ts            # canvas/svg do echarts em /charts e /donut
    interactions.cy.ts      # modal, tabs, tooltip, toast
```

## Custom commands

- `cy.setTheme("alfabeto" | "kumon" | "impactx")` — adiciona class `theme-X` no `<html>` (remove themes anteriores).
- `cy.setMode("light" | "dark")` — seta `data-mode` no `<html>`.

## Notas

Os specs `interactions.cy.ts`, `themes.cy.ts` e `charts.cy.ts` usam seletores genéricos (`[role="dialog"]`, `[role="tab"]`, `[role="tooltip"]`, `[role="status"]`, `canvas`, `svg`). Se algum componente do `@camillodev/ui` não expuser esses ARIA roles ou usar wrappers customizados, ajustar os seletores aqui.
