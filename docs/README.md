# /docs — Impact X UI

Documentação operacional do `impactx-ui`. Para mudanças propostas/governance, ver `/openspec`.

## Comece aqui

| Sua pergunta | Leia |
|---|---|
| Eu sou um agent de IA, o que faço? | `AGENT-ONBOARDING.md` |
| O que é este repo? Qual a visão? | `VISION.md` |
| Como o repo está organizado? | `ARCHITECTURE.md` |
| O que significa 'DS' / 'theme' / 'intent' / 'variant'? | `GLOSSARY.md` |
| Qual a filosofia de design? | `design-principles.md` |
| Qual o plano de implementação? | `ds-implementation-plan.md` |
| Como monto uma tela usando o DS? | `../.impactx/system.md` |

## Docs vivos

- `README.md` — este arquivo (índice + decision tree)
- `AGENT-ONBOARDING.md` — on-ramp pra agents de IA caindo no repo
- `VISION.md` — norte do projeto + finish criteria F1-F8 com status
- `ARCHITECTURE.md` — mapa das 4 camadas + source-of-truth
- `GLOSSARY.md` — referência rápida de termos
- `design-principles.md` — filosofia (theme × intent × variant)
- `ds-implementation-plan.md` — plano completo do DS

## Audits (histórico)

- `atomic-design-audit.md` — taxonomia atoms/molecules/organisms
- `page-audit.md` — varredura de páginas e 404s do showcase
- `links-audit.md` — links quebrados
- `responsive-rootcause.md` — análise de problemas responsivos
- `templates-quality-audit.md` — qualidade dos 4 templates
- `overnight-notes.md` — changelog de execuções overnight

## Anexos

- `ds-roadmap.pdf` — roadmap visual do DS

## Convenções de doc

- PT-BR pra prosa, EN pra code/identifiers
- Imperativo, frases curtas
- Tabelas e decision trees > prosa longa
- Cada doc tem tamanho alvo declarado no topo
- Mudança estrutural requer change proposal em `/openspec`
- Audits são pontuais — criar novo, não atualizar in-place

## Para mais

- Contrato declarativo: `../.impactx/system.md`
- Spec agentsmd.org: `../AGENTS.md`
- Convenções Claude: `../CLAUDE.md`
