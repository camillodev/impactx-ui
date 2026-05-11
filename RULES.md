# Code Rules — impactx-ui

Regras persistentes lidas em toda sessão. Valeam para agentes de IA e humanos.

## Design System / Tokens

- **RULE-DS-001**: Nunca usar hex hardcoded no CSS/Tailwind.
  Sempre referenciar tokens via `var(--color-*)`.
  Correto: `color: var(--color-primary)` — Errado: `color: #11C76F`.

- **RULE-DS-002**: Componentes novos de DS vão em `packages/ds-education/src/components/`.
  Nunca criar componentes de DS diretamente em `apps/web/` ou outra pasta sem mover depois.

- **RULE-DS-003**: Todo componente exportado publicamente deve estar em `packages/ds-education/src/index.ts`.
  Não criar exports paralelos ou re-exports espalhados em outros arquivos.

## Qualidade de Código

- **RULE-DS-004**: Arquivos de código aplicativo não devem exceder **500 linhas**.
  Dividir proativamente a partir de 400+ linhas.
  Não se aplica a: arquivos gerados, `src/components/ui/` (shadcn), configs.

- **RULE-DS-005**: TDD é obrigatório para comportamento não-trivial.
  Fluxo: teste falhando → implementação mínima que passa → refactor.
  Stack: Vitest + Testing Library. Rodar `pnpm test` antes de considerar a tarefa concluída.

## Development Workflow

- **RULE-WF-001**: Toda PR deve passar por **QA antes de chegar ao CTO**.
  Fluxo obrigatório: `implementação → QA review → CTO aprova → merge`.
  QA deve comentar na issue **e** no PR com resultado dos testes antes de liberar para o CTO.

- **RULE-WF-002**: Testes são obrigatórios e devem passar no CI antes de qualquer review.
  Nenhuma PR sem cobertura de teste para comportamento novo será aprovada.
  Rodar `pnpm test` localmente antes de abrir PR.

- **RULE-WF-003**: O CTO é o único aprovador final de merge em `develop` e `main`.
  PRs não podem ser mergeadas sem aprovação explícita do CTO.
  Aprovação de outros reviewers é bem-vinda mas não suficiente.
