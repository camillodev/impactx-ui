# Impact X Design System — Sistema

> Contrato declarativo pro bot que vai gerar código consumindo `@impactxlabs/ui`.
> Sempre carregado. Limite: 500 linhas. Detalhes vão pra `rules/`.
>
> Pattern inspirado em Lovable (`.lovable/`) + Vercel AI-Native DS (shadcn registry + MCP).

## 1. Stack

- React 19 + TypeScript strict + Tailwind v4
- Monorepo pnpm + turbo (`apps/web` showcase + `packages/ds-education` + `packages/cli`)
- Distribuição shadcn-style: `npx @impactx/ui add education [<componente>]`
- Tema por classe HTML: `<html className="theme-education | theme-kumon | theme-impactx">`
- Mode por atributo HTML: `<html data-mode="dark">` (light é default sem atributo)

## 2. Como tokens funcionam

Tudo visual vem de **CSS vars** definidas em `packages/ds-education/src/tokens/themes/<theme>.css`.

Componente nunca usa hex hardcoded. Sempre `var(--color-X)`:

```tsx
// ✅ Certo
<div className="bg-[var(--color-primary)] text-[var(--color-primary-fg)]">

// ❌ Errado
<div className="bg-blue-500 text-white">
```

Trocar tema = trocar classe no `<html>`. Nenhum componente é editado.

Variáveis principais (todos os temas expõem o mesmo conjunto):

- `--color-primary` / `-hover` / `-active` / `-disabled` / `-fg` / `-soft`
- `--color-secondary` / `-bd` (border) / `-fg` / `-hover` / `-active`
- `--color-tertiary` (ghost) / `-fg` / `-hover` / `-active`
- `--color-danger-primary|secondary|tertiary` (mesmo padrão por estado)
- `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`
- `--radius-lg`, `--shadow-md`

Detalhes: `rules/styling/tokens.md`.

## 3. Hierarquia de decisão

Quando bot for gerar UI, decide nessa ordem:

| Camada | Pergunta | Onde achar |
|---|---|---|
| 0. **Pattern** (por intenção) | "Cria página de listagem", "form simples", "dashboard"... | `rules/patterns/<intenção>.md` ← **comece aqui se for tela inteira** |
| 1. Token | Cor, radius, spacing, tipografia | `rules/styling/tokens.md` |
| 2. Componente | Button, Input, Card, Modal | `rules/components/<nome>.md` |
| 3. Layout primitive | Grid, Stack, Cluster, PageContainer (responsivo declarado) | `rules/primitives/<nome>.md` |
| 4. Template | Página inteira (Lista, Form, Detail, Dashboard) | `rules/templates/<nome>.md` |
| 5. Organism domain | Education-specific (assessment, hero-banner) | `rules/organisms/<nome>.md` |
| 6. App | Lógica de negócio | Código do app (kumon-app, etc) |

**Regra:** consome só a camada de baixo. Não pula camadas.

**Fluxo recomendado pra tela nova:**
1. Bot recebe "monta página X" → vai direto pra **`rules/patterns/`** (indexado por intenção)
2. Pattern aponta pra template + organisms certos
3. Template usa primitives + componentes
4. Componentes usam tokens

## 3.1. Patterns por intenção (camada Lovable)

Quando bot recebe pedido de tela completa, **sempre lê `.impactx/rules/patterns/` primeiro**. Patterns são indexados por *intenção*, não por nome de componente.

| Pedido típico do usuário | Pattern |
|---|---|
| "lista de [entidade] com filtros + tabela paginada" | `patterns/list-with-filters.md` |
| "lista de cursos/produtos em cards visuais" | `patterns/list-as-grid.md` |
| "detalhe de [entidade] com metadados ao lado" | `patterns/detail-with-sidebar.md` |
| "criar/editar [entidade]" (≤10 campos) | `patterns/form-simple.md` |
| "wizard / matrícula em N etapas" | `patterns/form-multistep.md` |
| "dashboard com KPIs + charts" | `patterns/dashboard-overview.md` |
| "como tratar loading/empty/error em qualquer tela" | `patterns/empty-loading-error-states.md` |
| "como escolher Grid vs Stack vs Cluster + breakpoints" | `patterns/responsive-layout-choices.md` |

Cada pattern entrega: decision tree em 30s + receita ≤15 linhas + variações + anti-patterns + links.

## 4. Decision tree alto nível

- **Preciso de cor?** → Token (`var(--color-X)`). Nunca hex.
- **Preciso de botão?** → `<Button>` de `@impactxlabs/ui`. Ver `rules/components/button.md`.
- **Preciso de input com label/erro/helper?** → `<Input>`. Ver `rules/components/input.md`.
- **Preciso de container com header/content?** → `<Card>` + `<CardHeader>` + `<CardContent>`. Ver `rules/components/card.md`.
- **Preciso de label colorido (status, contagem)?** → `<Badge>`. Ver `rules/components/badge.md`.
- **Preciso de diálogo modal?** → `<Modal>` (namespace). Ver `rules/components/modal.md`.
- **Preciso de tabela com paginação?** → ver `<DataTable>` + `<Pagination>` (componente composto em construção).
- **Preciso de grid responsivo?** → primitive em construção (Semana 2). Por enquanto, evitar `grid-cols-N` cru sem breakpoints.
- **Preciso de algo que não está aqui?** → para. Abre issue ou rule antes de usar no app.

## 5. Anti-patterns globais (NUNCA)

### Estilo cru fora do DS

```tsx
// ❌ Cor Tailwind hardcoded
<button className="bg-blue-500 hover:bg-blue-600">Salvar</button>

// ❌ Hex direto
<div style={{ background: "#0467DB" }}>...</div>

// ❌ Border-radius cru
<div className="rounded-[4px]">  // use var(--radius-lg) ou rounded-lg do tema
```

### Reinventar componente existente

```tsx
// ❌ Botão nativo onde Button do DS resolve
<button type="submit" className="...">Salvar</button>

// ✅
<Button type="submit">Salvar</Button>
```

### Variant errada por hierarquia

```tsx
// ❌ 2 primary na mesma viewport
<Button variant="primary">Salvar</Button>
<Button variant="primary">Cancelar</Button>  // este deveria ser tertiary

// ✅
<Button variant="primary">Salvar</Button>
<Button variant="tertiary">Cancelar</Button>
```

### Grid/Layout cru em vez de primitive

```tsx
// ❌ Tailwind cru — bot inventa breakpoint
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="flex flex-col md:flex-row gap-4">
<div className="max-w-7xl mx-auto px-4">

// ✅ Primitives com responsive prop declarada
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
<Stack direction={{ base: "vertical", md: "horizontal" }} gap="md">
<PageContainer maxWidth="lg">
```

Ver `rules/primitives/` e `patterns/responsive-layout-choices.md`.

### Editar componente em vez de token

```tsx
// ❌ Quer cantos mais redondos no Card globalmente? Não edita Card.tsx.
// Edita o token --radius-lg em packages/ds-education/src/tokens/themes/*.css.
```

## 6. Diretórios e o que vive onde

```
.impactx/
├── system.md                    ← este arquivo (sempre carregado)
└── rules/
    ├── patterns/                ← receitas por intenção (8 patterns) ← COMECE AQUI pra tela nova
    ├── templates/               ← ListPage, DetailPage, FormPage, Dashboard
    ├── components/              ← Button, Input, Card, Badge, Modal, DataTableWithPagination
    ├── primitives/              ← Grid, Stack, Cluster, PageContainer (responsive declarado)
    ├── organisms/               ← education domain (assessment-card, hero-banner, etc)
    └── styling/
        └── tokens.md            ← como tokens vivem, anti-patterns de cor
```

Em construção (PRs futuras, ver `docs/ds-implementation-plan.md`):

- Organisms SaaS-genéricos (PageHeader, EmptyState, ErrorState, Stepper) — puxados por necessidade real
- Templates novos (Settings, Wizard, Auth) — quando padrão emergir
- Tokens 3-tier via Style Dictionary
- MCP server expondo `.impactx/` pra v0/Cursor
- ESLint custom contra Tailwind cru

## 7. Componentes disponíveis em `@impactxlabs/ui`

### Atoms / Molecules (32)

`alert-dialog`, `assessment-card`, `avatar`, `badge`, `banner-cta`, `breadcrumb`, `button`, `card`, `chart`, `checkbox`, `chip`, `code-block`, `command-palette`, `data-table`, `dropdown-menu`, `help-fab`, `icon-button`, `input`, `label`, `modal`, `pagination`, `progress-bar`, `select`, `separator`, `sheet`, `sidebar`, `sidebar-from-config`, `skeleton`, `stat`, `switch`, `tabs`, `textarea`, `toast`, `tooltip`

### Organisms de domínio educacional (10)

`assessment-header`, `assessment-list-item`, `big-card`, `campo-card`, `category-card`, `cta-banner`, `donut-score`, `hero-banner`, `question-row`, `subject-stat-card`

**Regra:** se bot precisa de algo, **primeiro checa essa lista**. Se existe, importa. Se não existe, abre rule + PR antes de inventar no app.

## 8. Convenção de variants

Variants do `<Button>` (mesmo padrão se espalha pra outros componentes):

| Variant | Quando usar |
|---|---|
| `primary` | Ação principal da tela. **Máximo 1 por viewport.** |
| `secondary` | Ação alternativa. Outline com border-2 da intent color. |
| `tertiary` (alias: `ghost`) | Ação opcional, cancelar, terciária. Ghost em todos os temas. |
| `tertiary-dark` | Variante escura do tertiary pra fundos escuros. |
| `danger` (alias: `danger-primary`) | Destructive principal (delete, cancelar permanente). |
| `danger-secondary` | Destructive outline. |
| `danger-tertiary` | Destructive ghost. |

**Tertiary é ghost em TODOS os temas — inclusive impactx.** Amarelo IX é brand-secondary (logo, accent pontual), nunca variant.

## 9. Acessibilidade — não negociável

- Todo `<Input>` que recebe `error` vira `aria-invalid="true"` e `aria-describedby` apontando pro span do erro
- `<IconButton>` precisa de `aria-label` sempre
- Focus visível em todos os variants — não remover via CSS
- `loading=true` em Button automaticamente seta `aria-busy="true"` e desabilita interação
- Modal usa Radix Dialog por baixo (focus trap, ESC, scroll lock — gratuito)

## 10. Quando atualizar este arquivo

- **Mudou stack** (React 20, Tailwind 5) → atualizar seção 1
- **Adicionou novo diretório em `rules/`** → atualizar seção 6
- **Mudou decisão global de design** (variants, anti-pattern global) → atualizar seção 5 ou 8
- **Específico de 1 componente** → vai pra `rules/components/<nome>.md`, NÃO aqui
- **Específico de 1 template** → vai pra `rules/templates/<nome>.md`
- **Decisão arquitetural** (tokens 3-tier, primitives) → atualizar plano em `docs/ds-implementation-plan.md` primeiro, depois reflete aqui

Limite hard: 500 linhas. Se passar, mover detalhes pra rule específica.

## 11. Plano de evolução

Status atual: **Lovable-ready** — bot consegue montar tela completa em ≤15 linhas via patterns.

Já entregue:
- ✅ 32 componentes + 10 organisms domain
- ✅ 4 layout primitives com responsive props declarado (`{ base, sm, md, lg, xl }`)
- ✅ 4 templates de página (List/Detail/Form/Dashboard) + rules
- ✅ 8 patterns por intenção em `rules/patterns/`
- ✅ Visual regression em 3 viewports (Playwright)
- ✅ Tokens CSS + 3 temas (education/kumon/impactx) + dark mode

Próximas PRs (puxadas por necessidade real, não especulação):

| PR | Trigger | Conteúdo |
|---|---|---|
| Ajustes visuais | "tá feio" no shell | Sidenav primitives, skeleton shimmer, button rename, breadcrumb/inputs/labels |
| Organisms novos | Pattern aponta pra um inexistente | PageHeader, EmptyState, ErrorState (case-by-case) |
| Templates novos | Precisa /settings ou /onboarding real | SettingsTemplate, WizardTemplate |
| MCP server | v0/Cursor entram no fluxo | Servidor expondo patterns + registry |
| Infra | 2 bots conflitam token | Style Dictionary 3-tier + Changesets + ESLint custom |

Finish criteria F1-F8 em `docs/ds-implementation-plan.md` seção 1.
