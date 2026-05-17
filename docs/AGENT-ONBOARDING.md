# AGENT-ONBOARDING — Impact X UI

> Tamanho alvo: ≤120 linhas. On-ramp pra qualquer agent de IA caindo no repo pela primeira vez. Resolve em ≤2min.

## TL;DR (30 segundos)

Monorepo do design system multi-DS / multi-theme da Impact X. Você está aqui pra **escrever código consistente usando o DS** — não pra reinventar componente, cor ou pattern.

- **Visão**: agents geram telas consumindo o DS, zero divergência entre marcas.
- **Stack**: pnpm + turbo, Next 16, React 19, Tailwind v4, TS strict, ESM only.
- **Para consumir o DS** (montar tela): leia `../.impactx/system.md`.
- **Para editar o DS** (componente novo, token novo): abra change em `../openspec/changes/`.

## Pre-flight checklist

- [ ] Li `VISION.md` (norte do projeto)
- [ ] Li `ARCHITECTURE.md` (mapa das 4 camadas)
- [ ] Tenho clareza se a tarefa é **consumir** ou **editar** o DS
- [ ] Identifiquei a skill relevante em `.claude/skills/` (se for Claude Code)
- [ ] Sei em qual branch estou (NUNCA editar em `main` ou `develop`)

## Fluxograma — qual doc consultar pra qual tarefa

| Tarefa | Comece em |
|---|---|
| Montar tela nova | `../.impactx/system.md` → `../.impactx/rules/patterns/` |
| Escolher entre Grid/Stack/Cluster | `../.impactx/rules/primitives/` |
| Usar Button/Input/Card/Modal | `../.impactx/rules/components/<nome>.md` |
| Escolher cor / token | `../.impactx/rules/styling/tokens.md` |
| Criar componente novo no DS | `design-principles.md` + change em `../openspec/changes/` |
| Criar pattern novo | change em `../openspec/changes/` |
| Migrar marca pra consumir DS | `ds-implementation-plan.md` (F8) |
| Entender taxonomia atoms/molecules/organisms | `atomic-design-audit.md` |
| Debug de página quebrada do showcase | `page-audit.md` + `links-audit.md` |
| Debug de problema responsivo | `responsive-rootcause.md` |
| Adicionar componente ao registry da CLI | `../scripts/build-registry.*` + PR |
| Code review de PR de outro agent | `.claude/skills/ix-code-review` |

## Hard rules (cross-cutting, sempre valem)

### NUNCA
- ❌ Hardcodar hex no CSS/Tailwind — sempre `var(--color-*)` (RULE-DS-001)
- ❌ Criar componente de DS fora de `packages/ds-education/src/components/` (RULE-DS-002)
- ❌ Exportar componente sem adicionar em `packages/ds-education/src/index.ts` (RULE-DS-003)
- ❌ Arquivo de código > 500 linhas (RULE-DS-004)
- ❌ Commitar direto em `main` ou `develop` — sempre branch `feature/`/`fix/`/`chore/`/`report/`
- ❌ Adicionar `Co-Authored-By` em commit — código é 100% do owner humano
- ❌ Mergear PR sem aprovação do CTO (RULE-WF-003)
- ❌ Abrir PR sem cobertura de teste pra comportamento novo (RULE-WF-002)
- ❌ Mexer em territórios de outros agents sem coordenar (`packages/*`, `apps/*`)

### SEMPRE
- ✅ TDD pra comportamento não-trivial (RULE-DS-005): teste falhando → impl mínima → refactor
- ✅ `pnpm lint && pnpm typecheck && pnpm test` antes de abrir PR
- ✅ ESM only (`import`/`export`, nunca `require`)
- ✅ TypeScript strict, sem `any` sem justificativa documentada
- ✅ @clack/prompts pra CLI, picocolors pra cores (não chalk)
- ✅ Theme via classe HTML (`theme-*`), mode via atributo (`data-mode="dark"`)
- ✅ Consultar docs oficiais antes de inventar arquitetura (`official-docs-first`)

## Comandos essenciais

```bash
pnpm dev                  # turbo, todos apps em paralelo
pnpm --filter web dev     # somente showcase
pnpm build                # build completo
pnpm registry:build       # gera registry JSON em apps/web/public/r/
pnpm lint                 # ESLint
pnpm typecheck            # tsc --noEmit
pnpm test                 # Vitest
```

## Stack (versões críticas)

- Next **16** (App Router)
- React **19**
- Tailwind **v4**
- TypeScript strict
- pnpm workspaces + turbo
- Vitest + Testing Library

Atenção: cutoff do treino tende a estar desatualizado. Use `mcp__context7__query-docs` antes de propor sintaxe/config de Next/React/Tailwind.

## Quando parar e pedir ajuda humana

- Mudança estrutural na arquitetura (4 camadas, governance) → change OpenSpec, espera CTO
- Decisão de design fechada (ver lista em `AGENTS.md` §Decisões) — não reabrir sem discussão
- Migração de marca (F8) — coordenar com DS lead antes
- Conflito entre rules / tokens / código — abrir issue, não resolver no escuro
- Build/CI quebrado em main após merge — alertar CTO, não fazer hotfix direto

## Próximos passos

1. Identifique sua tarefa no fluxograma acima
2. Abra a skill correspondente (se Claude Code) via `Skill` tool
3. Crie branch `feature/<slug>` a partir de `develop`
4. Execute → teste → PR → aguarda QA → aguarda CTO → merge
