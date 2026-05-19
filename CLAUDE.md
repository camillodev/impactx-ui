# Impact X UI — Claude Code Instructions

@AGENTS.md
@RULES.md

## Visao geral
Monorepo do design system multi-DS / multi-theme da Impact X. Composto por:
- `@impactx/ui` — CLI shadcn-style (`npx @impactx/ui add <ds> [<component>]`)
- `@impactxlab/design-system` — package canonico com 22 atoms/molecules + 10 organisms domain-specific
- `apps/web` — showcase + docs (Next 16, App Router) servido em `ui.impactx.com.br`

Stack: pnpm + turbo, Next 16, React 19, Tailwind v4, TypeScript strict, ESM only.

## Comandos
- `pnpm dev` — turbo, sobe todos os apps em paralelo
- `pnpm --filter web dev` — somente o showcase web
- `pnpm build` — turbo build de tudo
- `pnpm registry:build` — gera `apps/web/public/r/*.json` a partir do source canonico
- `pnpm lint` / `pnpm typecheck` — valida codigo
- `pnpm test` — testes Vitest

## Regras de codigo
- TypeScript strict, ESM only (`import/export`, nunca `require`)
- Sem hex hardcoded — sempre tokens via `var(--color-*)`
- Theme aplicado em `<html className="theme-education">` (ou `theme-kumon` / `theme-impactx`)
- Mode aplicado em `<html data-mode="dark">` (light eh default sem data-mode)
- @clack/prompts pra qualquer interacao CLI nova; picocolors pra output colorido (nao chalk)

## Regras de Git (obrigatorio)
- NUNCA adicionar `Co-Authored-By` ou referencias a Claude/Anthropic em commits
- NUNCA commitar direto no `main` — sempre branch `feature/`, `fix/`, `chore/` ou `report/`
- Sempre PR pro main, nunca merge local

## Contrato declarativo `.impactx/` (LER PRIMEIRO)

Pasta `.impactx/` no root do repo contem o contrato pro bot que vai gerar/consumir codigo do DS. Pattern inspirado em Lovable + Vercel AI-Native DS.

- **`.impactx/system.md`** — sempre carregar antes de tocar codigo frontend
- **`.impactx/rules/components/*.md`** — regra por componente (button, input, card, badge, modal, +)
- **`.impactx/rules/styling/tokens.md`** — tokens, temas, anti-patterns de cor
- **`.impactx/rules/primitives/`** — em construcao (Semana 2)
- **`.impactx/rules/templates/`** — em construcao (Semana 3)

Plano completo: `docs/ds-implementation-plan.md`. Skill: `ix-design-system`.

## Skills disponiveis (`.claude/skills/`)
Leia a skill relevante ANTES de tocar em codigo:
- `ix-design-system` — contrato do DS, aponta pra `.impactx/` (NOVO)
- `ix-frontend` — padroes obrigatorios de frontend Impact X
- `ix-engineering` — system design, arquitetura, PRDs
- `ix-code-guidelines` — regras de qualidade cross-cutting (naming, TDD, error handling, DRY)
- `ix-code-review` — processo e formato de code review
- `ix-brand` — design system Impact X (verde #11C76F, Plus Jakarta Sans)
- `frontend-design` — geracao de interfaces production-grade
- `test-driven-development` — TDD obrigatorio em features e bugfixes
- `official-docs-first` — priorizar docs oficiais antes de inventar arquitetura

## Decisoes de design fechadas (NAO reabrir)
1. Outline buttons usam `border-2` da intent color (nao cinza)
2. Helper text de Input usa primary color (nao muted)
3. Toast bg eh tinted da intent (nao branco/preto puro)
4. Tertiary buttons no theme `impactx` = amarelo `#F5C400`
5. DataTable eh headless — Pagination eh composta externamente
6. Theme switching via classe (`theme-*`), mode via `data-mode`

## Themes
- `alfabeto` — primary `#0467DB`
- `kumon` — primary `#00A9E3`
- `impactx` — primary `#11C76F` + tertiary `#F5C400`

## Estrutura monorepo
```
impactx-ui/
  apps/
    web/                       # Next 16 showcase + docs
  packages/
    cli/                       # @impactx/ui (bin/cli.mjs)
    ds-education/              # 22 atoms/molecules + 10 organisms
  scripts/                     # build-registry, check-cohesion
  pnpm-workspace.yaml
  turbo.json
```

## NAO MEXER
`apps/`, `packages/cli/`, `packages/ds-education/` sao territorio de outros agents — coordene antes via PR/issue.
