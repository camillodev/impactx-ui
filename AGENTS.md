# AGENTS.md — Impact X UI

Spec: https://agentsmd.org

Documento canonico para agentes de IA (Cursor, Codex, Copilot, Aider, etc) que vao trabalhar neste repo. Para Claude Code, ver tambem `CLAUDE.md` e `.claude/skills/`.

## Projeto
Monorepo do design system multi-DS / multi-theme da Impact X.
- `@impactx/ui` — CLI shadcn-style distribuindo componentes
- `@impactxlab/design-system` — DS canonico (22 atoms/molecules + 10 organisms)
- `apps/web` — showcase + docs publicado em `ui.impactx.com.br`

## Stack
- pnpm workspaces + turbo
- Next 16 (App Router) + React 19 + Tailwind v4
- TypeScript strict, ESM only
- @clack/prompts (CLI), picocolors (cores), Vitest (testes)

## Comandos essenciais
- `pnpm dev` — turbo, todos apps em paralelo
- `pnpm --filter web dev` — somente showcase
- `pnpm build` — build completo
- `pnpm registry:build` — gera registry JSON em `apps/web/public/r/`
- `pnpm lint` / `pnpm typecheck` / `pnpm test`

## Estrutura
```
apps/web/                # showcase + docs (Next)
packages/cli/            # @impactx/ui CLI
packages/ds-education/   # source canonico do DS
scripts/                 # build-registry, check-cohesion
```

## Convencoes de codigo
- ESM only — nunca `require`
- TypeScript strict — nada de `any` sem justificativa
- Tokens via `var(--color-*)` — nunca hex hardcoded
- Theme via classe HTML (`theme-education`/`theme-kumon`/`theme-impactx`)
- Mode via atributo HTML (`data-mode="dark"`); light eh default sem atributo
- @clack/prompts pra interacao CLI; picocolors pra cores (nao chalk)

## Themes (ortogonais ao DS)
- `alfabeto` — `#0467DB`
- `kumon` — `#00A9E3`
- `impactx` — `#11C76F` + `#F5C400`

## Decisoes de design (fechadas)
1. Outline buttons usam `border-2` da intent color
2. Helper text de Input usa primary color
3. Toast bg eh tinted da intent
4. Tertiary buttons no theme impactx = amarelo `#F5C400`
5. DataTable eh headless; Pagination compoem externamente

## Git
- NUNCA `Co-Authored-By` em commits — historia eh 100% do owner humano
- NUNCA push direto em `main` — sempre branch `feature/` / `fix/` / `chore/` / `report/` + PR
- Mensagens curtas e diretas, em portugues ou ingles

## Como contribuir como agent

Se voce eh um agent de IA (Claude, Cursor, Codex, Aider, etc) caindo neste repo pela primeira vez, leia **`docs/AGENT-ONBOARDING.md`** primeiro. Ele resolve em ≤2min:

- TL;DR do projeto + pre-flight checklist
- Fluxograma "qual doc consultar pra qual tarefa"
- Hard rules cross-cutting (NUNCA / SEMPRE)
- Quando parar e pedir ajuda humana

Outros docs operacionais em `docs/` (indice em `docs/README.md`): `VISION.md`, `ARCHITECTURE.md`, `GLOSSARY.md`.

Contrato declarativo pra consumir o DS: `.impactx/system.md` + `.impactx/rules/` (indice em `.impactx/INDEX.md`).

## Skills (Claude Code)
Em `.claude/skills/`. Outros agents podem ler como referencia:
`ix-frontend`, `ix-engineering`, `ix-code-guidelines`, `ix-code-review`, `ix-brand`, `frontend-design`, `test-driven-development`, `official-docs-first`.

## Owner
Rafael Camillo — Impact X. Codigo eh 100% propriedade do owner.
