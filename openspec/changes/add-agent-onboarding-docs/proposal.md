# Change Proposal: add-agent-onboarding-docs

## Why

Agents de IA (Claude, Cursor, Codex, Aider, etc) caindo neste repo pela primeira vez nao tem um ponto de entrada unico. Hoje precisam ler AGENTS.md + CLAUDE.md + system.md + skills + plano de implementacao pra entender o que e o projeto, onde editar o que, e quais sao as regras inegociaveis. Isso quebra o norte do projeto ("frontend que nao da mais trabalho pros agents") logo na primeira interacao.

## What

Criar camada operacional em `/docs` com 5 documentos novos + ajustes estruturais:

1. `docs/README.md` — indice + decision tree "qual doc pra qual pergunta"
2. `docs/AGENT-ONBOARDING.md` — on-ramp ≤2min com TL;DR, checklist, fluxograma, hard rules
3. `docs/VISION.md` — norte + finish criteria F1-F8 com status
4. `docs/ARCHITECTURE.md` — mapa das 4 camadas (root pointers → /docs → /.impactx → /packages+/apps)
5. `docs/GLOSSARY.md` — referencia rapida de termos (atom, theme, intent, variant, etc)

Ajustes:
- `AGENTS.md` ganha secao "Como contribuir como agent" apontando pra `docs/AGENT-ONBOARDING.md`
- `.impactx/INDEX.md` (opcional) lista todas as rules navegavel

Governance: este change proposal mora em `/openspec` pra rastrear a decisao; o conteudo operacional mora em `/docs` pra agents nao precisarem ler historico de governance pra fazer o trabalho.

## Impact

**Benefits**
- Agent novo resolve "o que e isso e por onde comeco" em ≤2min
- Source-of-truth explicito por topico (tabela em ARCHITECTURE.md)
- Hard rules concentradas num lugar — menos retrabalho de "agente quebrou rule X"
- Visao versionada e auditavel (status F1-F8 visivel)

**Risks**
- Duplicacao com `.impactx/system.md` se docs operacionais comecarem a repetir rules → mitigacao: `docs/` aponta pra `.impactx/`, nao duplica
- Drift se docs nao forem atualizados → mitigacao: convencoes claras + mudanca estrutural requer change OpenSpec

**Files added/modified**
- `docs/README.md` (new)
- `docs/AGENT-ONBOARDING.md` (new)
- `docs/VISION.md` (new)
- `docs/ARCHITECTURE.md` (new)
- `docs/GLOSSARY.md` (new)
- `.impactx/INDEX.md` (new)
- `AGENTS.md` (modified — secao "Como contribuir como agent")
- `openspec/changes/add-agent-onboarding-docs/` (this change)
