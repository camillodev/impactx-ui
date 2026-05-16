# impactx-ui — Plano de Implementação

> Documento vivo. Fonte de verdade pra **terminar o DS** e seguir construindo apps. Atualizar conforme execução evolui.
>
> Autor: Rafael Camillo + Caio · Data inicial: 2026-05-16 · Status: v0.1 (esperando review)

---

## 0. Por que esse documento existe

Frontend deixa de ser variável quando N bots (Caio + futuros agents) constroem apps Impact X em paralelo sem revisão humana de cada PR. Tu já tem `impactx-ui` 70% pronto (22 base components + 10 organisms + 3 temas + CLI shadcn-style + 6 audits). Falta:

1. **Contrato declarativo** que bot lê antes de gerar código (padrão `.lovable/` da Lovable)
2. **Layout primitives** pra bot não inventar grid/responsividade
3. **Templates de página** pra bot compor tela em ≤ 15 linhas
4. **Gates automáticos** (lint, visual regression, a11y) que viram code review num regime de N bots paralelos
5. **Versionamento + distribuição** que propaga mudança visual em N apps com 1 PR

Esse plano define exatamente como construir essas 5 peças, em qual ordem, com finish criteria claro pra **parar de planejar e construir apps de verdade**.

---

## 1. Finish criteria — quando o DS está "pronto"

O DS termina quando **todos os critérios abaixo são verdade simultaneamente**. Sem isso, conversa volta a "tá quase pronto?" daqui a 2 semanas.

| # | Critério | Como medir |
|---|---|---|
| F1 | Bot cria página de lista completa em ≤ 15 linhas usando só `@impactxlab/ds-education` | Reescrever `kumon-app/src/app/alunos/page.tsx` |
| F2 | Mudar 1 token (`radius.card`) propaga em todos os componentes sem editar componente | Edit token → `pnpm build` → diff zero em `.tsx` |
| F3 | PR no `impactx-ui` com regressão visual é bloqueado por CI antes de merge | Provocar regressão deliberada → ver CI vermelho |
| F4 | Bot tentando `<div className="grid grid-cols-3">` no kumon-app falha no lint | Rodar lint com código ruim deliberado → ver falha |
| F5 | `.impactx/system.md` + `rules/` cobrem 10 componentes mais usados | `wc -l` em `.impactx/rules/components/*.md` ≥ 10 arquivos |
| F6 | axe-core no `apps/web` showcase passa zero violations | CI verde |
| F7 | Skill `ix-design-system` carregada em Caio/Cursor responde corretamente a "como uso DataTable com paginação?" | Teste manual numa sessão Claude Code |
| F8 | kumon-app migrou ≥ 80% das telas existentes pra `<Template>` + `<Primitives>` | Grep `grid-cols-` no kumon-app → ≤ 5 ocorrências |

Quando F1-F8 = verdade → DS está pronto, foco vira app novo (Phase 2).

---

## 2. Context engineering — técnicas aplicadas

O plano todo segue 8 princípios de context engineering. Cada técnica é referenciada nas semanas com `[CE-N]`.

### CE-1. Hierarchical loading
`system.md` sempre carregado (~500 linhas max, número validado pela Lovable). `rules/*.md` carregado **sob demanda** por trigger (skill detecta menção a "button" → carrega `rules/components/button.md`). Mantém custo de token flat conforme DS cresce.

### CE-2. Decision trees em markdown
Cada rule embute "se precisa de X, use Y". Substitui parágrafos longos. Bot pattern-matches mais rápido com árvores que com prosa.

### CE-3. Anti-patterns explícitos
Toda rule tem seção "❌ NUNCA" com exemplo de código errado. Bot evita por exemplo concreto, não por instrução abstrata.

### CE-4. Exemplos em code blocks
Bot pattern-matches melhor de exemplos que de descrição. Toda rule tem ≥ 2 code blocks: certo + errado.

### CE-5. Single source of truth
`.impactx/` é canonical. Skill aponta. `CLAUDE.md` dos apps aponta pra skill. Zero duplicação de regra — atualiza em 1 lugar, propaga.

### CE-6. Progressive disclosure
Começa com atoms (5 rules), adiciona molecules/organisms conforme demanda real. Não pré-escreve rule pra componente que pode mudar.

### CE-7. Self-correcting loops
Playwright screenshot diffs + axe-core failures voltam pra Caio como input do próximo turno. CI não é só red light, é feedback contextual ("tela X regrediu, diff aqui").

### CE-8. Token economy
Nunca carregar `.impactx/` inteiro. Trigger-based retrieval. `system.md` sempre + rules específicas conforme task. Em sessão típica: ~3-5k tokens de contexto DS, não 50k.

---

## 3. Arquitetura alvo

```
impactx-ui/
├── .impactx/                           ← contrato pro bot (NOVO)
│   ├── system.md                       (sempre carregado, ~500 linhas max)
│   └── rules/
│       ├── components/                 (button.md, input.md, …)
│       ├── templates/                  (list-page.md, form-page.md, …)
│       ├── primitives/                 (grid.md, stack.md, …)
│       ├── styling/                    (tokens.md, responsive.md, …)
│       └── patterns/                   (forms.md, navigation.md, …)
├── packages/
│   ├── tokens/                         (NOVO — Phase 1 Sem 3, Style Dictionary)
│   ├── ds-education/                   (existe)
│   └── cli/                            (existe — distribui via Registry shadcn-style)
├── apps/
│   └── web/                            (existe — showcase Next 16, vira gate visual)
│       ├── tests/                      (NOVO — Playwright + axe)
│       └── .axe-config.json
└── docs/                               (existe — audits + este plano)

kumon-app/
├── CLAUDE.md                           (1 linha aponta pra skill ix-design-system)
└── .eslintrc                           (NOVO — custom rule bloqueia Tailwind cru)

~/.claude/skills/ix-design-system/
└── SKILL.md                            (NOVO — aponta pra .impactx/ no impactx-ui)
```

**Princípio:** `.impactx/` é a porta de entrada pro bot. Componente React continua existindo embaixo pra implementação. Skill é o ponteiro reutilizável entre projetos e máquinas.

---

## 4. Phase 1 — Finalizar o DS (4-6 semanas)

### Semana 1 — `.impactx/system.md` + 5 rules de atoms + skill básica

**Status: ✅ COMPLETA em 2026-05-16 (overnight)**

**Entregas:**
- [x] `.impactx/system.md` — instalação, decision tree alto nível, anti-patterns globais, lista de 32 componentes disponíveis
- [x] `.impactx/rules/components/button.md` — 213 linhas, todas as 9 variants reais documentadas
- [x] `.impactx/rules/components/input.md` — 221 linhas, integração com react-hook-form + Zod
- [x] `.impactx/rules/components/card.md` — 281 linhas, Card/CardHeader/CardTitle/CardContent
- [x] `.impactx/rules/components/badge.md` — 278 linhas, 5 variants semânticas + iconOnly
- [x] `.impactx/rules/components/modal.md` — namespace completo com Split/Carousel/Banner/InfoList
- [x] `.impactx/rules/styling/tokens.md` — 48 tokens catalogados de 3 temas (education/kumon/impactx) + dark mode
- [x] `~/.claude/skills/ix-design-system/SKILL.md` — triggers, hierarchical loading, anti-padrões pro bot
- [x] Linha em `kumon-app/CLAUDE.md` apontando pra skill
- [x] Seção `.impactx/` adicionada em `impactx-ui/CLAUDE.md`

**Técnicas aplicadas:** [CE-1] hierarchical loading · [CE-3] anti-patterns · [CE-4] code examples · [CE-5] single source · [CE-6] atoms-first

**Verificação:** abrir nova sessão Caio em `kumon-app`, perguntar "como uso Button com loading state?" → resposta vem de `rules/components/button.md`, não de inferência.

**Custo estimado:** 2-3 dias úteis. Trabalho de escrita, baixa complexidade técnica.

---

### Semana 2 — Layout primitives + DataTableWithPagination

**Entregas (código no `ds-education`):**
- [ ] `<Grid cols={{base:1, md:2, lg:3}} gap="md">` — grid declarativo
- [ ] `<Stack gap="md" direction="vertical">` — flex direção única
- [ ] `<Cluster gap="sm">` — flex-wrap com gap
- [ ] `<PageContainer maxWidth="lg">` — wrapper de página com padding responsivo
- [ ] `<DataTableWithPagination>` — composto: DataTable + Pagination + loading + empty state
- [ ] `.impactx/rules/primitives/grid.md`, `stack.md`, `cluster.md`, `page-container.md`
- [ ] `.impactx/rules/components/data-table-with-pagination.md`

**Técnicas aplicadas:** [CE-2] decision tree ("preciso de grid? Grid. Preciso de stack? Stack.") · [CE-3] anti-pattern `grid-cols-N` cru explícito

**Verificação:** Caio reescreve uma página existente do kumon usando só primitives. Diff mostra zero `className="grid grid-cols-..."` cru.

**Custo:** 4-5 dias. Componentes simples, mas precisa cobrir os 4 audits já identificados em `docs/responsive-rootcause.md`.

---

### Semana 3 — 4 templates de página + tokens 3-tier (paralelo)

**Track A — Templates (~3 dias):**
- [ ] `<ListPageTemplate>` — title + breadcrumb + filters + primaryAction + table/grid
- [ ] `<DetailPageTemplate>` — header + sidebar + main + actions
- [ ] `<FormPageTemplate>` — header + form steps + actions footer
- [ ] `<DashboardTemplate>` — metric row + chart area + filters
- [ ] `.impactx/rules/templates/*.md` (4 arquivos)

**Track B — Tokens 3-tier via Style Dictionary (~2 dias, paralelo):**
- [ ] `packages/tokens/` novo package
- [ ] Tokens em JSON com 3 níveis: primitive → semantic → component
- [ ] Build gera: `tokens.css`, `tokens.ts` (tipos), `tokens.tailwind.js` (preset)
- [ ] `ds-education` passa a consumir `@impactx/tokens` em vez de CSS hardcoded
- [ ] `.impactx/rules/styling/tokens.md` atualizado pra refletir 3 níveis

**Técnicas aplicadas:** [CE-4] code examples completos em cada template rule · [CE-6] progressive disclosure (organisms vêm depois conforme demanda)

**Verificação:** mudar `radius.card` (semantic token) propaga em todos componentes que usam Card sem editar `.tsx`. Tipo TS bloqueia uso de token inexistente.

**Custo:** 5 dias total (2 tracks paralelas).

---

### Semana 4 — Gates automáticos (Playwright + axe + ESLint)

**Entregas (no `apps/web` e `kumon-app`):**
- [ ] `apps/web/tests/visual-regression.spec.ts` — Playwright varre todas rotas em 3 viewports (375/768/1440) × 3 temas × dark/light = 18 baseline screenshots por rota
- [ ] `.github/workflows/visual-gate.yml` — CI roda Playwright em todo PR
- [ ] Screenshot baselines commitados em `apps/web/tests/__screenshots__/` (versionado no git)
- [ ] axe-core integrado no mesmo Playwright run — falha CI em zero violations
- [ ] ESLint custom rule no `kumon-app/.eslintrc`: bloqueia `className` com `grid-cols-\d`, `p-\d`, `bg-(red|blue|green)-\d`, etc — força uso dos primitives
- [ ] `.impactx/system.md` atualizado: documenta o gate

**Técnicas aplicadas:** [CE-7] self-correcting loops — diff screenshot vira input pro bot do próximo turno · [CE-3] lint formaliza anti-patterns

**Verificação:** PR deliberado quebrando visual → CI vermelho com diff anexado. PR com `<div className="grid grid-cols-3">` → lint falha local + CI.

**Custo:** 3-4 dias. Maior parte é setup de baselines + tuning de tolerância de diff.

---

### Semana 5 — Changesets + CLI MCP server + 5 rules adicionais

**Entregas:**
- [ ] Changesets instalado e configurado no monorepo
- [ ] CI: PR sem changeset = bloqueado
- [ ] CI: merge na main = abre "Version Packages" PR automático
- [ ] `packages/cli` expõe MCP server endpoint que serve `.impactx/rules/*` como recursos MCP (v0/Cursor/Caio podem consumir via MCP)
- [ ] 5 rules adicionais de organisms domain (hero-banner, assessment-card, big-card, donut-score, cta-banner)
- [ ] `.impactx/rules/patterns/forms.md` — pattern de form com validação Zod
- [ ] `.impactx/rules/patterns/navigation.md` — pattern de sidebar + breadcrumb

**Técnicas aplicadas:** [CE-1] MCP serve hierarchical retrieval real · [CE-8] token economy via trigger-based retrieval

**Verificação:** abrir Cursor num projeto novo, conectar ao MCP do `@impactx/ui`, ver rules sendo carregadas sob demanda.

**Custo:** 3-4 dias.

---

### Semana 6 — Buffer + kumon migration kickoff

**Entregas:**
- [ ] Resolver os 4 root causes pendentes em `docs/responsive-rootcause.md` (caso não tenham caído nas semanas anteriores)
- [ ] Migrar 1 tela do kumon-app pro novo padrão (`ListPageTemplate` + primitives) como exemplo canônico
- [ ] Documentar processo de migração em `docs/migration-guide.md`
- [ ] Validar todos os finish criteria F1-F8

**Verificação:** rodar checklist F1-F8 → todos verdes → DS oficialmente "pronto".

**Custo:** 3-5 dias (buffer pra slippage das semanas anteriores).

---

## 5. Phase 2 — kumon-app migra + bootstrap do próximo app (4-6 semanas)

**Objetivo:** provar que `.impactx/` + DS funciona em escala. Bot constrói telas reais sem inventar.

**Tracks paralelas:**
1. **kumon-app migration** — substituir telas existentes por composições de `<Template>` + primitives. ~80% das telas em 4 semanas.
2. **Próximo app IX (a definir)** — nasce já consumindo `npx @impactx/ui add education --kumon|alfabeto|impactx`, validando "frontend mockado em horas".

**Aprendizados que viram update no `.impactx/`:**
- Cada vez que bot inventa algo que deveria ter rule → criar rule
- Cada vez que humano corrige bot → virar anti-pattern em rule existente
- DS evolui via PRs no `.impactx/`, versionado via Changesets

**Métrica chave:** tempo médio "ideia → tela navegável" em apps consumindo o DS. Meta: ≤ 1h pra tela CRUD padrão.

---

## 6. Phase 3 — Backend serverless + mesma técnica (sketch, decidir depois)

Mesma filosofia de context engineering aplica em backend. Bot precisa de contrato pra:
- API contracts (REST/tRPC schemas como rules)
- Database access patterns (queries como rules)
- Auth + permissions (Clerk/Supabase RLS como rules)
- Deploy patterns (Vercel/Cloudflare Workers como rules)

**Estrutura sugerida:**
```
impactx-backend/
├── .impactx-backend/
│   ├── system.md
│   └── rules/
│       ├── api/         (route handlers, validation, error shape)
│       ├── data/        (Prisma patterns, query modules)
│       ├── auth/        (Clerk + RLS patterns)
│       └── deploy/      (Vercel/Workers config)
└── packages/
    ├── api-kit/         (Hono routes brandados, validation, error handler)
    ├── data-kit/        (Prisma helpers, multi-tenant, RLS)
    └── deploy-kit/      (templates Vercel/Workers)
```

**Quando começar:** depois de Phase 1 + 2 completos. Não antes — risco de over-engineer sem dado real de uso.

**Próximo passo (não bloqueia este plano):** validar com 1 PRD de produto novo se backend tá no escopo de Q3/Q4 2026.

---

## 7. Phase 4 — Distribuição além da IX (pergunta aberta)

Pergunta pra Rafa decidir depois:
- `@impactx/ui` open-source com tema "impact-x" como showcase?
- Vender `impactx-ui` como template/boilerplate ($497 one-time, tipo Tailwind UI)?
- Manter privado, vantagem competitiva?

Não bloqueia Phase 1-3. Skip se incerto.

---

## 8. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Rules viram desatualizadas vs código | Alta | Médio | CI rule: edit em `ds-education/<componente>.tsx` exige edit correspondente em `.impactx/rules/components/<nome>.md` |
| Bot ignora rules e inventa mesmo assim | Média | Alto | ESLint + Playwright visual regression = revisão automática que pega o erro |
| Visual regression queue explode com N PRs | Média | Médio | Roda visual regression só no `impactx-ui`, não em apps consumidores. Apps consumidores rodam Cypress E2E em fluxo crítico, não visual. |
| `.impactx/` cresce e perde foco | Baixa | Médio | Limite hard de 500 linhas em `system.md` (validado pela Lovable). Rules ≤ 200 linhas cada. |
| Token economy explode | Baixa | Médio | Trigger-based retrieval garantido pela skill — só carrega rules relevantes pro turno |
| Migration do kumon trava porque rule está incompleta | Média | Baixo | Phase 2 trata como discovery — gaps viram backlog de rules em `.impactx/` |

---

## 9. Anexo A — Skeleton de `.impactx/system.md`

```markdown
# Impact X Design System — Sistema

> Sempre carregado por agents (Caio, Cursor, v0). Limite: 500 linhas. Específicos vão pra rules/.

## Stack
- React 19, TypeScript strict, Tailwind v4
- Distribuição: `npx @impactx/ui add education [<componente>]`
- Temas: alfabeto / kumon / impactx (CSS vars via `<html className="theme-X">`)
- Mode: light (default) / dark (`<html data-mode="dark">`)

## Hierarquia de decisão visual

1. Token (cor, radius, spacing, tipografia) — `rules/styling/tokens.md`
2. Componente (Button, Input, Card) — `rules/components/<nome>.md`
3. Primitive de layout (Grid, Stack, PageContainer) — `rules/primitives/<nome>.md`
4. Template de página (ListPage, FormPage, etc) — `rules/templates/<nome>.md`
5. App (kumon-app, futuros) — compõe templates + primitives + componentes

## Anti-patterns globais (NUNCA)

❌ `<div className="grid grid-cols-3 p-4">` — use `<Grid cols={3}>` + `<PageContainer>`
❌ `className="bg-blue-500"` — use `variant`/`intent` props ou token via CSS var
❌ Inventar componente que já existe em `@impactxlab/ds-education` — sempre checar antes
❌ `border-radius: 4px` hardcoded — use `var(--radius-card)` ou token
❌ Componente novo sem testes RTL — TDD obrigatório pra lógica
❌ Editar `apps/web/src/app/components/<showcase>.tsx` sem regenerar baseline visual

## Decision tree

- "Preciso fazer uma página de lista?" → `rules/templates/list-page.md`
- "Preciso fazer um form?" → `rules/templates/form-page.md` + `rules/patterns/forms.md`
- "Preciso de grid responsivo?" → `rules/primitives/grid.md`
- "Preciso de cor que não tem no token?" → para. Não inventar. Discutir com Rafa.
- "Preciso de componente que não existe?" → checar `rules/components/` primeiro; se de fato falta, abrir PR no `ds-education` antes de usar no app.

## Diretórios

- `rules/components/` — atoms e molecules (Button, Input, DataTable, …)
- `rules/primitives/` — layout (Grid, Stack, Cluster, PageContainer)
- `rules/templates/` — páginas inteiras (ListPage, FormPage, DetailPage, Dashboard)
- `rules/patterns/` — composições comuns (forms, navigation, modals)
- `rules/styling/` — tokens, responsive, dark mode

## Quando atualizar este arquivo

- Mudou stack (React 20, Tailwind 5) → atualizar Stack
- Adicionou novo diretório em `rules/` → atualizar Diretórios
- Mudou decisão global de design → atualizar Anti-patterns ou Decision tree
- Específico de 1 componente → vai pra `rules/components/<nome>.md`, NÃO aqui
```

---

## 10. Anexo B — Skeleton de `.impactx/rules/components/button.md`

```markdown
# Button — `@impactxlab/ds-education`

> Carrega quando: bot menciona button, botão, CTA, ação, primary action, submit.

## Import

\`\`\`tsx
import { Button } from "@impactxlab/ds-education"
\`\`\`

## Variants (hierarquia, não cor)

- `primary` (default) — ação principal da tela. Máximo 1 por viewport.
- `secondary` — ação secundária. Outline com `border-2` da intent color.
- `tertiary` — ação opcional. Ghost em **todos** os temas (incluindo impactx — amarelo é brand-secondary, não tertiary).

## Intents (semântica, ortogonal a variants)

- `default` — sem intent, usa primary color do tema
- `danger` — destructive (delete, cancelar permanente)
- `success` — confirmação (raro, normalmente toast já cobre)
- `warning` — atenção (raro)

## Sizes

- `sm` (32px) · `md` (40px, default) · `lg` (48px)

## Decision tree

- "É a ação principal da tela?" → `variant="primary"` (só 1 por viewport)
- "É ação alternativa?" → `variant="secondary"`
- "É opcional/cancelar?" → `variant="tertiary"`
- "É delete/destructive?" → `variant="primary" intent="danger"`
- "Botão dentro de table row?" → considera `<IconButton>` ou `variant="tertiary" size="sm"`

## Exemplos corretos ✅

\`\`\`tsx
// Página de lista — botão "Novo aluno"
<Button variant="primary" onClick={handleNew}>Novo aluno</Button>

// Modal — confirmar delete
<Button variant="primary" intent="danger" onClick={handleDelete}>
  Excluir permanentemente
</Button>

// Form — submit + cancelar
<Cluster gap="sm">
  <Button variant="primary" type="submit">Salvar</Button>
  <Button variant="tertiary" onClick={handleCancel}>Cancelar</Button>
</Cluster>

// Loading state
<Button variant="primary" loading disabled>Salvando…</Button>
\`\`\`

## Anti-patterns ❌

\`\`\`tsx
// ❌ Cor hardcoded
<Button className="bg-green-500">Salvar</Button>

// ❌ Múltiplos primary na mesma viewport
<Button variant="primary">Salvar</Button>
<Button variant="primary">Cancelar</Button>  // este deveria ser tertiary

// ❌ Tertiary com background colorido
<Button variant="tertiary" className="bg-yellow-200">Editar</Button>

// ❌ <button> nativo em vez do componente
<button className="px-4 py-2 bg-blue-500 rounded">Novo</button>
\`\`\`

## Props completos

\`\`\`tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary"
  intent?: "default" | "danger" | "success" | "warning"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  fullWidth?: boolean
  // + todos atributos HTML de <button>
}
\`\`\`

## Acessibilidade

- Sempre tem `aria-label` se só ícone (use `<IconButton>` em vez disso)
- `loading=true` automaticamente seta `aria-busy="true"` e desabilita
- Focus visível em todos os variants (não remover via CSS)

## Quando NÃO usar Button

- Só ícone → use `<IconButton>` (`rules/components/icon-button.md`)
- Link interno → use `<a>` estilizado como Button via `asChild`
- Toggle on/off → use `<Switch>` ou `<ToggleButton>`

## Implementação técnica

Código em `packages/ds-education/src/components/button.tsx`. CSS vars consumidas: `--color-primary`, `--color-danger`, `--radius-button`, `--space-button-x`.

Mudanças visuais → editar tokens em `packages/tokens/`, não Button.tsx direto.
```

---

## 11. Próximo passo concreto

Depois do review deste plano, Caio começa pela Semana 1:

1. Criar `.impactx/system.md` (versão completa do anexo A, adaptada à realidade do repo)
2. Criar `.impactx/rules/components/button.md` (anexo B verbatim, ajustar se Rafa apontar gap)
3. Criar `.impactx/rules/components/input.md`, `card.md`, `badge.md`, `modal.md`
4. Criar `.impactx/rules/styling/tokens.md`
5. Criar skill `~/.claude/skills/ix-design-system/SKILL.md`
6. Adicionar linha em `kumon-app/CLAUDE.md` + `impactx-ui/CLAUDE.md`

Estimativa: 2-3 dias úteis pra Semana 1 inteira.

---

## 12. Como atualizar este plano

- Rafa aponta gap → edit direto, commit em `chore(docs): refine ds-implementation-plan`
- Semana termina → marcar checkboxes, anotar aprendizados em "Notas de execução" (seção a criar)
- Risco materializou → mover de "Riscos" pra "Notas" com mitigação aplicada
- Phase 1 finalizada → arquivo vira referência histórica, foco muda pra Phase 2

---

**Fim do v0.1. Esperando review do Rafa antes de Caio iniciar Semana 1.**

---

## 13. Notas de execução

### v0.2 — 2026-05-16 (overnight, Caio)

**Semana 1 entregue.** Branch: `feature/impactx-folder` no `impactx-ui`.

**Decisões tomadas durante execução:**

1. **Variants do Button são 9, não 4.** O plano original assumia `primary/secondary/tertiary` + prop `intent`. Realidade do código: `primary/secondary/tertiary/ghost/tertiary-dark/danger/danger-primary/danger-secondary/danger-tertiary` (sem prop `intent`). Rule reflete a API real.
2. **Temas chamam-se `theme-education`, não `theme-alfabeto`.** `llms.txt` estava desatualizado. system.md usa nomes corretos.
3. **Modal é namespace com 25+ subcomponentes** (Split, Carousel, Banner, InfoList). Rule alocou 280 linhas (acima da meta de 200) — justificado pela complexidade.
4. **Card NÃO tem CardFooter nem CardDescription** — só Card/CardHeader/CardTitle/CardContent. Rule só documenta o que existe.
5. **Paralelização Haiku:** 4 das 5 rules de componentes + tokens.md foram delegadas a sub-agents Haiku em paralelo (input/card/badge/modal/tokens). Button + system.md ficaram com o orquestrador Sonnet. Tempo total ~5 minutos vs ~30+ min sequencial.

**Gaps identificados (backlog pra revisar):**

- Falta listar TODOS os componentes em `system.md` seção 7 — atualmente cita os 32 mas só 5 têm rule. Próximos a documentar (ordem de uso real no kumon): DataTable, Tabs, Select, Sheet, Toast, Tooltip, Pagination, Sidebar.
- `tokens.md` documenta CSS vars como fonte de verdade, mas plano prevê Style Dictionary 3-tier na Semana 3 — rule precisará ser atualizada quando isso landar.
- Não há rule pra primitives ainda (`<Grid>`, `<Stack>`, `<PageContainer>`) — esses componentes nem existem (Semana 2 do plano).
- `ESLint custom rule` pra bloquear Tailwind cru no kumon-app não foi criada (Semana 4 do plano).

**Validação de manhã:** ver `docs/overnight-notes.md` na raiz do `impactx-ui` (sai dessa branch).
