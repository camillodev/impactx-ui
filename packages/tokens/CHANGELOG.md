# @impactxlab/tokens

## 1.1.0

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

### Patch Changes

- 9aa7dc9: feat(ds): G3 — 5 componentes Onda 1 unblock

  Adicionados ao `@impactxlab/design-system`:
  - **`EmptyState`** — estado vazio padronizado (3 variants: default/compact/card) com icon + title + description + action. `role=status` + aria-label derivado.
  - **`StatusBadge`** + **`STATUS_MAPS`** — wrapper opinionated em cima de `Badge` que resolve enum domain (enrollment/invoice/role) em label PT-BR + visual tone. Union discriminada `domain+value` XOR `label+tone`.
  - **`UnitPicker`** — header multi-tenant: 0/1 unit → null, N units → dropdown, admin → busca client-side + "Todas as unidades". `aria-current` no ativo, `'use client'`, persistência fica no consumer.
  - **`FieldLabel`** — label de form com `required` (asterisco + sr-only "obrigatório") XOR `tag` (Badge) + `hint` opcional com id `${htmlFor}-hint`.
  - **`MaskedInput`** — input com máscaras cpf/cnpj/phone (10/11 auto)/cep/currency-brl via imask. `onRawChange` retorna digits (text masks) ou centavos `number` (currency-brl). Não valida (Zod no consumer).

  Estende `Badge` primitive com 2 novos variants: `info` e `neutral` (consomem tokens novos).

  `@impactxlab/tokens` ganha 2 tokens semânticos:
  - `--badge-info-{bg,fg}` — light: `{info.bg-light}` / `{info.500}`; dark: `{info.toast-bg-dark}` / `{blue.200}`
  - `--badge-neutral-{bg,fg}` — light: `{gray.100}` / `{gray.700}`; dark: `{slate.600}` / `{slate.200}`

  78/78 tests passing, typecheck verde, build verde.
