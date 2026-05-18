# @impactxlab/tokens

## 0.2.0

### Minor Changes

- 929dfa6: Novo package `@impactxlab/tokens` — design tokens em 3 camadas (primitive / semantic / component) via Style Dictionary v4 + DTCG.

  **Entregue nesta PR:**
  - Package `packages/tokens/` com 3 tiers (primitive 5 arquivos, semantic 5 arquivos, component 5 arquivos) em DTCG ($value/$type)
  - Build pipeline gera: `tokens.css` (bundle, 425 vars), `themes/{education,kumon,impactx}.css`, `tokens.js` (programático), `tailwind.js` (preset)
  - Script `pnpm tokens:check` valida paridade 1:1 (nome + valor normalizado) com ds-education legado — passa 100% (base 57 / education 53 / kumon 58 / impactx 58)
  - ds-education ganha `@impactxlab/tokens` como devDep (workspace link)
  - Regra `.impactx/rules/styling/tokens.md` reescrita para documentar 3-tier

  **NÃO entregue (fica para PR7):**
  - Consumo do `tokens.css` pelo `ds-education/styles.css` — paridade está provada via script, mas migration do import vai numa PR separada com visual regression rodando explicitamente sobre a nova origem.

  **Como verificar localmente:**
  - `pnpm tokens:build && pnpm tokens:check` — paridade total
  - Editar `packages/tokens/src/primitive/radius.json` → `pnpm tokens:build` → `--radius-md` muda no `dist/tokens.css`
