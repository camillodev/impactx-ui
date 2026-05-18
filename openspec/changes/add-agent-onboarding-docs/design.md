# Design: add-agent-onboarding-docs

## Decisões (D1-D8)

### D1 — Hibrido /docs + OpenSpec
Conteudo operacional mora em `/docs`. Governance da mudanca mora em `/openspec/changes/`. Agents nao precisam ler historico de governance pra trabalhar; quem audita decisoes encontra em /openspec.

### D2 — Formato: imperativo + decision tree
Sem prosa longa. Tabelas, checklists, fluxogramas. Cada doc declara tamanho alvo no topo.

### D3 — `docs/README.md` como entrada unica
Decision tree "qual pergunta → qual doc". Evita agent ler 5 arquivos pra descobrir onde tem a resposta.

### D4 — AGENT-ONBOARDING aponta system.md, nao duplica
On-ramp ensina **quando** consultar `.impactx/system.md`, nao replica conteudo dele. Single source of truth pra rules de DS continua em `.impactx/`.

### D5 — VISION destila F1-F8 do plano completo
`ds-implementation-plan.md` continua source-of-truth do plano detalhado. `VISION.md` so destila os 8 finish criteria com status visual (✅🚧⏳) pra leitura rapida.

### D6 — GLOSSARY como referencia rapida
Ordem alfabetica, definicao em 1 linha. Agent pode pingar Ctrl+F sem ler outro doc.

### D7 — `.impactx/INDEX.md` opcional
`system.md` continua sendo o entry point default do contrato declarativo. INDEX e fallback quando rules crescem alem do que cabe em system.md §6.

### D8 — AGENTS.md ganha secao, nao reescreve
Adiciona "Como contribuir como agent" antes da secao Skills. Mantem AGENTS.md compativel com spec agentsmd.org.

## Alternativas rejeitadas

### A1 — Tudo em /openspec/
**Rejeitado**: agents teriam que filtrar governance pra encontrar onboarding. /openspec e pra mudancas propostas, nao pra conteudo vivo.

### A2 — Tudo em .impactx/
**Rejeitado**: .impactx e contrato declarativo pra **consumir** o DS. Visao/arquitetura/onboarding sao operacional, escopo diferente.

### A3 — Tudo em AGENTS.md
**Rejeitado**: AGENTS.md vira monolito. Spec agentsmd.org pede arquivo unico curto apontando pra docs.

### A4 — README.md no root
**Rejeitado**: root README e pra dev humano (npm consumer). Onboarding de agent e auditoria separada.

## Open questions

### Q1 — Versionamento dos docs?
**Resolvido**: docs vivem com a branch. Mudanca estrutural requer change OpenSpec; mudanca incremental e PR direto.

### Q2 — i18n dos docs?
**Resolvido**: PT-BR pra prosa, EN pra code/identifiers. Agents internacionais lidam — owner e PT-BR.

### Q3 — Agent default consulta o que primeiro?
**Resolvido**: ordem em AGENT-ONBOARDING.md: AGENTS.md (root) → docs/AGENT-ONBOARDING.md → skill da stack → `.impactx/system.md` (se tarefa for consumir DS) ou `docs/design-principles.md` (se for editar DS).
