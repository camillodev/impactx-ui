# ARCHITECTURE — Impact X UI

> Tamanho alvo: ≤120 linhas. Mapa das 4 camadas e fluxo de informação.

## As 4 camadas

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ROOT POINTERS                                            │
│    AGENTS.md  CLAUDE.md  RULES.md  README.md                │
│    └─ apontam pra /docs, /.impactx, /.claude/skills         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. /docs — operacional + visão                              │
│    README.md   AGENT-ONBOARDING.md   VISION.md              │
│    ARCHITECTURE.md   GLOSSARY.md   design-principles.md     │
│    ds-implementation-plan.md   *-audit.md                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. /.impactx — contrato declarativo (Lovable-style)         │
│    system.md                                                │
│    rules/{patterns,templates,components,primitives,         │
│           organisms,styling}/*.md                           │
│    INDEX.md (navegação opcional)                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. /packages + /apps — source de verdade do código          │
│    packages/ds-education  (canônico)                        │
│    packages/cli           (@impactx/ui)                     │
│    packages/tokens        (3-tier)                          │
│    apps/web               (showcase + docs)                 │
└─────────────────────────────────────────────────────────────┘
```

## Source of truth

| Tópico | Onde mora | Quem atualiza |
|---|---|---|
| Visão e finish criteria | `docs/VISION.md` | CTO/founder |
| Mapa do repo | `docs/ARCHITECTURE.md` (este arquivo) | qualquer agent via PR |
| Glossário de termos | `docs/GLOSSARY.md` | qualquer agent via PR |
| On-ramp pra agent novo | `docs/AGENT-ONBOARDING.md` | qualquer agent via PR |
| Filosofia de design | `docs/design-principles.md` | DS lead |
| Plano de implementação | `docs/ds-implementation-plan.md` | DS lead |
| Contrato global pra montar tela | `.impactx/system.md` | DS lead |
| Regras por componente/pattern | `.impactx/rules/**/*.md` | DS lead |
| Tokens (cor, type, space) | `packages/tokens/` + `.impactx/rules/styling/tokens.md` | DS lead |
| Código dos componentes | `packages/ds-education/src/` | DS lead |
| Showcase visual | `apps/web/` | DS lead |
| Skills Claude Code | `.claude/skills/` | qualquer agent |
| Convenções Claude Code | `CLAUDE.md` | dono do repo |
| Spec agentsmd.org | `AGENTS.md` | dono do repo |
| Rules persistentes | `RULES.md` | dono do repo |
| Mudanças estruturais propostas | `openspec/changes/<change-id>/` | qualquer agent |
| Specs vivas | `openspec/specs/<capability>/spec.md` | DS lead após archive |

## Fluxo

1. Agent lê AGENTS.md (root) → cai em `docs/AGENT-ONBOARDING.md`
2. Onboarding manda agent ler skill da stack (`ix-design-system`, `ix-frontend`)
3. Pra **consumir o DS** (montar tela): segue `.impactx/system.md` → resolve com rules específicas
4. Pra **editar o DS** (novo componente/pattern): consulta `docs/design-principles.md` + abre change em `openspec/changes/`
5. Mudança estrutural (arquitetura, governance, processo): change proposal em `openspec/`

## Territórios

| Pasta | Quem pode mexer |
|---|---|
| `packages/ds-education/` | DS lead com PR review do CTO |
| `packages/cli/` | DS lead com PR review do CTO |
| `packages/tokens/` | DS lead com PR review do CTO |
| `apps/web/` | DS lead com PR review do CTO |
| `docs/` (vivos) | Qualquer agent via PR |
| `docs/*-audit.md` | Criar novo, não editar existente |
| `.impactx/` | DS lead via PR — agents podem propor via change OpenSpec |
| `openspec/changes/` | Qualquer agent (proposal) |
| `openspec/specs/` | Após archive de change aprovada |

## Como propor mudança estrutural

1. Abra `openspec/changes/<slug>/proposal.md` + `design.md` + `tasks.md` + `specs/<capability>/spec.md`
2. CTO revisa → aprovado → agent aplica os tasks
3. PR pra `develop` (nunca direto em `main`)
4. Após merge: `openspec archive <slug>` move pra `openspec/changes/archive/` e promove spec pra `openspec/specs/`
