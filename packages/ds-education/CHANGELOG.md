# @impactxlab/design-system

## 2.0.0

### Minor Changes

- 167b18a: Make `@impactxlab/design-system` publishable to npm.
  - Add `build` script (tsc + `scripts/copy-assets.mjs` for CSS tokens)
  - Emit `.d.ts` + `.js` + sourcemaps to `dist/`
  - Override `tsconfig` with `jsx: "react-jsx"` (automatic runtime, no React import needed)
  - Switch `main` / `types` / `exports` to point at `dist/`
  - Remove `private: true`, add `files: ["dist"]`, `sideEffects: ["*.css"]`, `prepublishOnly`
  - Add `publishConfig.access = "restricted"` (final scope/registry decision pending — see `docs/decisions/ADR-0001-ds-education-publish.md` in kumon-app workspace notes)

  Dry-run publish verified: 234 files, 90.5kB tarball, all subpath exports resolve.

  Not yet published — first publish requires choosing scope (`@impactx` paid org vs `@impactxlab` free user scope) and rotating GitHub token if GH Packages route is preferred.

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

- 9906574: Add `.impactx/` declarative AI contract, layout primitives, and page templates.

  **Layout primitives** (new):
  - `<Grid>` — responsive declarative grid (cols={3} or {base:1, md:2, lg:3})
  - `<Stack>` — flex container with consistent gap, vertical or horizontal
  - `<Cluster>` — flex with automatic wrap (Every Layout pattern)
  - `<PageContainer>` — page wrapper with typed max-width and responsive padding

  **Composite components** (new):
  - `<DataTableWithPagination>` — DataTable + Pagination + internal state

  **Page templates** (new):
  - `<ListPageTemplate>` — header + filters + primaryAction + body
  - `<DetailPageTemplate>` — back link + title + sidebar (optional) + main
  - `<FormPageTemplate>` — header + form (with onSubmit) + actions footer
  - `<DashboardTemplate>` — metrics row + controls + actions + charts area

  **Declarative AI contract** (`.impactx/`):
  - Pattern inspired by Lovable's `.lovable/` + Vercel AI-Native DS
  - `system.md` always-loaded base context
  - `rules/{components,primitives,templates,styling}/*.md` loaded on-demand
  - Bot consumers read rules before generating UI

### Patch Changes

- bfb029e: Infra: Changesets release workflow + ESLint plugin custom contra Tailwind cru.

  **Changesets**
  - `release.yml` GitHub Action: cria "Version Packages" PR automatico no push pra `develop`; publica no npm via `changeset publish` quando o PR de versao for mergeado.
  - `.changeset/config.json`: `baseBranch` corrigido pra `develop` (antes apontava pra `main` que nao e default).
  - `changesets-check.yml` atualizado pra rodar contra `develop`.
  - Scripts npm: `changeset`, `changeset:version`, `changeset:publish` no root.

  **ESLint plugin (`@impactx/eslint-plugin-ui` v0.1.0)**
  - 3 rules: `no-raw-tailwind-colors`, `no-raw-tailwind-layout`, `no-duplicate-component`.
  - Ativado em `apps/web/src/**` como **`warn`** (nao `error`) — codigo legado tem 38 violacoes (37 `grid-cols-1` + 1 Sidebar duplicada).
  - Cleanup das violacoes existentes vai em PR separada (mecanico, paralelizavel).
  - Apos cleanup, regras viram `error` em PR de 1 linha.

- Updated dependencies [9aa7dc9]
- Updated dependencies [929dfa6]
  - @impactxlab/tokens@1.1.0
