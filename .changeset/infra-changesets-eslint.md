---
"@impactxlab/ds-education": patch
---

Infra: Changesets release workflow + ESLint plugin custom contra Tailwind cru.

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
