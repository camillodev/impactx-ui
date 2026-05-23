---
"@impactxlab/design-system": minor
"@impactxlab/tokens": patch
---

feat(ds): G3 — 5 componentes Onda 1 unblock

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
