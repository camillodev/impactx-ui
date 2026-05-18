# DashboardTemplate — Página de Dashboard com Métricas e Gráficos

**Carrega quando bot mencionar:** dashboard, painel, métricas, KPI, indicadores, overview, home, página inicial admin, charts, performance, relatório executivo.

## Import

```tsx
import { DashboardTemplate, type DashboardMetric, Badge, Stack, Card } from "@impactxlabs/ui"
```

## Props

```tsx
interface DashboardTemplateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbItem[]
  /** Slot pra controles (seletor de período, filtros globais). Opcional. */
  controls?: React.ReactNode
  /** Ações no topo direito (export, settings, etc). Opcional. */
  actions?: React.ReactNode
  /** Array de métricas top. Renderiza em Grid responsivo (máx 4 cols). Opcional. */
  metrics?: DashboardMetric[]
  /** Conteúdo principal — geralmente Stack de Charts/Tabelas/Seções. */
  children?: React.ReactNode
  /** Max-width do container. Default: "xl" (dashboards são wider). */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

interface DashboardMetric {
  /** Label da métrica (ex: "Alunos ativos"). */
  label: React.ReactNode
  /** Valor principal (ex: "124" ou "R$ 47.300"). */
  value: React.ReactNode
  /** Trend badge ou indicador (ex: <Badge variant="success">+12%</Badge>). Opcional. */
  trend?: React.ReactNode
  /** Texto pequeno de contexto (ex: "vs mês passado"). Opcional. */
  hint?: React.ReactNode
}

interface BreadcrumbItem {
  label: string
  href?: string
}
```

## Árvore de Decisão

| Caso | Componente | Motivo |
|------|-----------|--------|
| Dashboard com métricas top + charts/seções | **DashboardTemplate** | Grade de cards de métrica responsiva, header com controls/actions, sem ação primária |
| Lista de entidades com ação principal | ListPageTemplate | Chrome pra listagem (header + table/grid), primaryAction em destaque |
| Detalhe de 1 entidade | DetailPageTemplate | Layout 2-col (main + sidebar), conteúdo especializado |
| Form multi-step | FormPageTemplate | Validação por etapa, estado de wizard |

## Exemplos ✅

### Dashboard de unidade Kumon completo

```tsx
export default function DashboardUnidade({ unitId }: { unitId: string }) {
  const metrics: DashboardMetric[] = [
    { 
      label: "Alunos ativos", 
      value: "124", 
      trend: <Badge variant="success">+12%</Badge>, 
      hint: "vs mês passado" 
    },
    { 
      label: "Matrículas mês", 
      value: "18", 
      trend: <Badge variant="ink">+3</Badge> 
    },
    { 
      label: "Inadimplência", 
      value: "3.2%", 
      trend: <Badge variant="danger">+0.4%</Badge>, 
      hint: "alerta" 
    },
    { 
      label: "Receita", 
      value: "R$ 47k", 
      trend: <Badge variant="success">+8%</Badge> 
    },
  ]

  return (
    <DashboardTemplate
      title="Dashboard"
      description="Visão geral da unidade Camargos."
      controls={<Select>...</Select>}
      actions={<Button variant="tertiary">Exportar</Button>}
      metrics={metrics}
    >
      <Stack gap="lg">
        <Card>
          <CardContent>Gráfico de alunos por mês</CardContent>
        </Card>
        <Card>
          <CardContent>Tabela de alunos próximos do vencimento</CardContent>
        </Card>
      </Stack>
    </DashboardTemplate>
  )
}
```

### Dashboard simples com breadcrumb e 3 métricas

```tsx
<DashboardTemplate
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Administração" }
  ]}
  title="Performance de Vendas"
  description="Últimos 30 dias"
  metrics={[
    { label: "Leads", value: "342", trend: <Badge>+21%</Badge> },
    { label: "Conversão", value: "18.5%", hint: "acima da meta" },
    { label: "Ticket médio", value: "R$ 2.100" }
  ]}
  actions={<Button variant="outline" size="sm">Relatório PDF</Button>}
>
  <Stack gap="lg">
    <Card><CardContent>Gráfico de leads</CardContent></Card>
  </Stack>
</DashboardTemplate>
```

### Dashboard sem métricas, só gráficos

```tsx
<DashboardTemplate
  title="Análise de Conteúdo"
  description="Engajamento de artigos publicados"
  controls={<DateRangePicker />}
>
  <Stack gap="lg">
    <Card><CardContent>Visualizações por semana</CardContent></Card>
    <Card><CardContent>Taxa de bounce por página</CardContent></Card>
  </Stack>
</DashboardTemplate>
```

### Dashboard com 2 métricas (renderiza em 2 colunas mobile)

```tsx
<DashboardTemplate
  title="Saúde do Produto"
  metrics={[
    { label: "Uptime", value: "99.9%", trend: <Badge variant="success">✓</Badge> },
    { label: "Tempo resposta P95", value: "142ms", hint: "abaixo do SLA" }
  ]}
>
  <Card><CardContent>Série temporal de latência</CardContent></Card>
</DashboardTemplate>
```

## Anti-padrões ❌

### ❌ Métricas inline em children (perde semântica e responsividade)

```tsx
// ERRADO: métricas renderizadas dentro do Stack de conteúdo
<DashboardTemplate title="Dashboard">
  <Stack gap="lg">
    <div className="grid grid-cols-4">
      <div>Métrica 1: 100</div>
      <div>Métrica 2: 200</div>
    </div>
    <Chart />
  </Stack>
</DashboardTemplate>

// CORRETO: métricas em prop dedicada
<DashboardTemplate
  title="Dashboard"
  metrics={[
    { label: "Métrica 1", value: "100" },
    { label: "Métrica 2", value: "200" }
  ]}
>
  <Chart />
</DashboardTemplate>
```

### ❌ Mais que 4 métricas top (quebra visual, usar agrupamento)

```tsx
// ERRADO: 6 métricas caem em 2 cols em mobile/tablet
<DashboardTemplate
  metrics={[
    { label: "M1", value: "10" },
    { label: "M2", value: "20" },
    { label: "M3", value: "30" },
    { label: "M4", value: "40" },
    { label: "M5", value: "50" },
    { label: "M6", value: "60" },
  ]}
>
  ...
</DashboardTemplate>

// CORRETO: 3-4 métricas, agrupar o resto em cards na seção de conteúdo
<DashboardTemplate
  metrics={[
    { label: "M1", value: "10" },
    { label: "M2", value: "20" },
    { label: "M3", value: "30" },
  ]}
>
  <Card>
    <Stack direction="horizontal" gap="lg">
      <div>M4: 40</div>
      <div>M5: 50</div>
      <div>M6: 60</div>
    </Stack>
  </Card>
</DashboardTemplate>
```

### ❌ Charts sem container Card (perde affordance visual)

```tsx
// ERRADO: componente Chart nu
<DashboardTemplate title="Dashboard">
  <Stack gap="lg">
    <Chart data={...} />
    <Chart data={...} />
  </Stack>
</DashboardTemplate>

// CORRETO: cada chart em Card
<DashboardTemplate title="Dashboard">
  <Stack gap="lg">
    <Card><CardContent><Chart data={...} /></CardContent></Card>
    <Card><CardContent><Chart data={...} /></CardContent></Card>
  </Stack>
</DashboardTemplate>
```

### ❌ Dashboard com maxWidth="md" (forms são estreitos, dashboards exigem espaço)

```tsx
// ERRADO: maxWidth="md" deixa métrica em 1 coluna mesmo em desktop
<DashboardTemplate title="Dashboard" maxWidth="md">
  ...
</DashboardTemplate>

// CORRETO: default é "xl" (4 cols em desktop)
<DashboardTemplate title="Dashboard">
  ...
</DashboardTemplate>
```

### ❌ Esquecer hint/trend quando aplicável (perde contexto comparativo)

```tsx
// ERRADO: valor isolado sem contexto
{ label: "Receita", value: "R$ 47k" }

// CORRETO: valor + tendência + dica
{
  label: "Receita",
  value: "R$ 47k",
  trend: <Badge variant="success">+8%</Badge>,
  hint: "vs mês anterior"
}
```

## Quando NÃO usar DashboardTemplate

| Caso | Use | Motivo |
|------|-----|--------|
| Lista paginada com ação principal | ListPageTemplate | Ação destaque (botão novo), filtros toolbar, tabela paginada |
| Formulário criação/edição | FormPageTemplate | Validação por etapa, estado local de wizard |
| Detalhe de 1 entidade | DetailPageTemplate | Layout 2-col (main + sidebar), breadcrumb, ações contextuais |
| Landing página | Componentes customizados | Sem PageContainer, hero section, marketing copy |

## Implementação Técnica

**Localização:** `packages/ds-education/src/templates/dashboard-template.tsx`

**Estrutura renderizada:**

```tsx
<PageContainer as="main" maxWidth="xl" padding="md">
  <Stack gap="lg">
    {/* Breadcrumb (condicional) */}
    {breadcrumbs && <Breadcrumb />}
    
    {/* Header: title/description | controls + actions */}
    <Cluster gap="md" justify="between" align="start">
      <Stack gap="xs">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </Stack>
      {(controls || actions) && (
        <Cluster gap="sm">
          {controls}
          {actions}
        </Cluster>
      )}
    </Cluster>
    
    {/* Métricas em Grid responsivo (condicional) */}
    {metrics && metrics.length > 0 && (
      <Grid
        cols={{
          base: 1,
          sm: 2,
          lg: metrics.length === 4 ? 4 : 3,
        }}
        gap="md"
      >
        {metrics.map(m => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </Grid>
    )}
    
    {/* Conteúdo: charts, tabelas, seções */}
    <div>{children}</div>
  </Stack>
</PageContainer>
```

**Grid responsivo:**
- **Mobile (base):** 1 coluna — métrica toma toda largura
- **Tablet (sm):** 2 colunas — máx 2 métricas por linha
- **Desktop (lg):** 3 colunas por padrão, 4 se exato 4 métricas (máximo aproveitamento)

**Semântica:**
- `<main>` explicita conteúdo principal (SEO + a11y)
- `<h1>` vem da prop `title` (nunca duplica)
- Breadcrumb, métricas e children em `<Stack gap="lg">` (spacing 24px consistente)
- Header usa `<Cluster justify="between">` (title/desc à esquerda, controls/actions à direita)
