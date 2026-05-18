# `.impactx/` — Index das rules

Indice navegavel das rules em `.impactx/rules/`. Opcional — `system.md` continua sendo a entrada default. Use este indice quando o numero de rules crescer alem do que cabe no `system.md` §6.

## Patterns (por intenção — comece aqui pra tela nova)

| Pattern | Quando usar |
|---|---|
| [`patterns/list-with-filters.md`](rules/patterns/list-with-filters.md) | Lista de entidades com filtros + tabela paginada |
| [`patterns/list-as-grid.md`](rules/patterns/list-as-grid.md) | Lista de cursos/produtos em cards visuais |
| [`patterns/detail-with-sidebar.md`](rules/patterns/detail-with-sidebar.md) | Detalhe de entidade com metadados ao lado |
| [`patterns/form-simple.md`](rules/patterns/form-simple.md) | Criar/editar entidade (≤10 campos) |
| [`patterns/form-multistep.md`](rules/patterns/form-multistep.md) | Wizard / matricula em N etapas |
| [`patterns/dashboard-overview.md`](rules/patterns/dashboard-overview.md) | Dashboard com KPIs + charts |
| [`patterns/empty-loading-error-states.md`](rules/patterns/empty-loading-error-states.md) | Tratar loading/empty/error em qualquer tela |
| [`patterns/responsive-layout-choices.md`](rules/patterns/responsive-layout-choices.md) | Escolher Grid vs Stack vs Cluster + breakpoints |

## Templates (página inteira)

| Template | Função |
|---|---|
| [`templates/list-page.md`](rules/templates/list-page.md) | Header + filtros + tabela/grid + primaryAction |
| [`templates/detail-page.md`](rules/templates/detail-page.md) | Header + sidebar + main + actions |
| [`templates/form-page.md`](rules/templates/form-page.md) | Header + steps + actions footer |
| [`templates/dashboard.md`](rules/templates/dashboard.md) | Metric row + chart area + filters |

## Components (atoms + molecules)

| Componente | Quando usar |
|---|---|
| [`components/button.md`](rules/components/button.md) | Acao CTA (variants primary/secondary/tertiary/danger) |
| [`components/input.md`](rules/components/input.md) | Campo de formulario com label, error, helper |
| [`components/card.md`](rules/components/card.md) | Container com header/title/content |
| [`components/badge.md`](rules/components/badge.md) | Label colorido (status, contagem) |
| [`components/modal.md`](rules/components/modal.md) | Dialog modal (Default/Welcome/Split/Carousel/InfoList) |
| [`components/data-table-with-pagination.md`](rules/components/data-table-with-pagination.md) | Tabela com paginacao composta |

## Primitives (layout responsivo)

| Primitive | Função |
|---|---|
| [`primitives/grid.md`](rules/primitives/grid.md) | `<Grid cols={{ base, md, lg }}>` declarativo |
| [`primitives/stack.md`](rules/primitives/stack.md) | `<Stack gap direction>` flex direção única |
| [`primitives/cluster.md`](rules/primitives/cluster.md) | `<Cluster gap>` flex-wrap com gap |
| [`primitives/page-container.md`](rules/primitives/page-container.md) | `<PageContainer maxWidth>` wrapper com padding responsivo |

## Organisms (domínio educacional)

| Organism | Quando usar |
|---|---|
| [`organisms/hero-banner.md`](rules/organisms/hero-banner.md) | Banner principal de página com CTA |
| [`organisms/assessment-card.md`](rules/organisms/assessment-card.md) | Card de avaliação com 5 status |
| [`organisms/big-card.md`](rules/organisms/big-card.md) | Card destaque para curso/produto |
| [`organisms/donut-score.md`](rules/organisms/donut-score.md) | Donut chart educacional (legacy) |
| [`organisms/cta-banner.md`](rules/organisms/cta-banner.md) | Banner full-width com CTA |

## Styling

| Rule | Conteúdo |
|---|---|
| [`styling/tokens.md`](rules/styling/tokens.md) | 48 tokens dos 3 temas + dark mode + anti-patterns de cor |

## Operações

| Rule | Conteúdo |
|---|---|
| [`publishing.md`](rules/publishing.md) | **Onde publicar:** GitHub Packages (`@camillodev/ui`, restricted). Não usar npm público. |

---

Total: 8 patterns + 4 templates + 6 components + 4 primitives + 5 organisms + 1 styling + 1 ops = **29 rules**.

Para o contrato global e decisões high-level, ver `.impactx/system.md`.
