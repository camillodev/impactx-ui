# Spec: agent-onboarding

Capacidade: agent de IA caindo no repo pela primeira vez consegue trabalhar produtivamente em ≤2min.

## Requisitos

### REQ-001 — Ponto de entrada unico
**WHEN** um agent abre o repo pela primeira vez
**THEN** ele deve conseguir identificar `docs/AGENT-ONBOARDING.md` como ponto de entrada lendo apenas `AGENTS.md` (root).

### REQ-002 — Indice navegavel
**WHEN** um agent precisa encontrar um doc especifico
**THEN** ele deve usar a decision tree em `docs/README.md` que mapeia pergunta → doc em ≤1 lookup.

### REQ-003 — Separacao operacional / governance
**WHEN** um agent precisa fazer trabalho operacional (consumir o DS, montar tela, escrever componente)
**THEN** ele NAO deve precisar ler `/openspec/` — apenas `/docs` e `/.impactx`.

### REQ-004 — Single source of truth
**WHEN** existe informacao sobre um topico (visao, arquitetura, glossario, rules, tokens, codigo)
**THEN** ela deve estar em exatamente um lugar, mapeado na tabela source-of-truth em `docs/ARCHITECTURE.md`.

### REQ-005 — Hard rules visiveis
**WHEN** um agent vai executar uma acao (commit, edit, criar componente, etc)
**THEN** as hard rules aplicaveis devem estar em `docs/AGENT-ONBOARDING.md` §Hard rules como NUNCA/SEMPRE, coerentes com `RULES.md`.

### REQ-006 — Fluxograma por tarefa
**WHEN** um agent identifica sua tarefa (montar tela, criar componente, debug, etc)
**THEN** `docs/AGENT-ONBOARDING.md` deve indicar qual doc/skill consultar pra essa tarefa especifica.

### REQ-007 — Coerencia agentsmd.org
**WHEN** um agent compativel com spec agentsmd.org (Cursor, Codex, Aider) le `AGENTS.md`
**THEN** ele deve encontrar projeto + stack + comandos + git rules + ponteiro pra docs/.

### REQ-008 — Tamanho limitado
**WHEN** qualquer doc em `/docs/*` (excluindo audits e plano completo) e criado/atualizado
**THEN** ele deve declarar tamanho alvo no topo e respeita-lo (≤60 linhas glossary, ≤80 linhas vision, ≤120 linhas onboarding/architecture).

### REQ-009 — Formato consistente
**WHEN** um agent le qualquer doc em `/docs/*`
**THEN** ele encontra tabelas e decision trees em vez de prosa longa; imperativo em vez de descritivo.

### REQ-010 — Validacao manual
**WHEN** este change for archive
**THEN** um humano (CTO) confirma que um agent IA real (Claude, Cursor) conseguiu fazer onboarding seguindo apenas estes docs, sem perguntar contexto adicional fora deles.
