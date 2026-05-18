# Tasks: add-agent-onboarding-docs

## Phase 1 — Setup
- [x] Criar branch `feature/docs-agent-onboarding` a partir de `develop`
- [x] Criar diretorio `openspec/changes/add-agent-onboarding-docs/`

## Phase 2 — Escrever os 5 docs (paralelizavel)
- [x] `docs/README.md` — indice + decision tree
- [x] `docs/AGENT-ONBOARDING.md` — TL;DR + checklist + fluxograma + hard rules
- [x] `docs/VISION.md` — norte + F1-F8 com status
- [x] `docs/ARCHITECTURE.md` — 4 camadas + source-of-truth table
- [x] `docs/GLOSSARY.md` — 18+ termos alfabetico

## Phase 3 — Ajustes estruturais
- [x] `.impactx/INDEX.md` — indice opcional das 28 rules
- [x] `AGENTS.md` — adicionar secao "Como contribuir como agent"

## Phase 4 — Verificacao
- [x] Source-of-truth table (ARCHITECTURE.md) cobre todos os topicos do repo
- [x] Decision tree (README.md) cobre tarefas mais comuns
- [x] Hard rules (AGENT-ONBOARDING.md) coerentes com RULES.md
- [x] Tamanhos alvo respeitados (≤80, ≤120, ≤60 linhas)

## Phase 5 — Spec viva
- [x] `openspec/changes/add-agent-onboarding-docs/specs/agent-onboarding/spec.md` com 10 requisitos WHEN/THEN

## Phase 6 — Ship
- [ ] Commit (sem Co-Authored-By)
- [ ] Push origin
- [ ] PR pra `develop`
- [ ] Aprovacao CTO (RULE-WF-003)
- [ ] Merge
- [ ] Apos merge: `openspec archive add-agent-onboarding-docs`
