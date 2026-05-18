# Dashboard com KPIs — Padrão de Página

## Dispara quando
- Bot menciona: "dashboard", "painel", "métricas", "KPI", "overview", "performance", "relatório executivo"
- Usuário quer página com **séries de cards métricos no topo** + **gráficos/seções abaixo**

## Árvore de Decisão

| Situação | Use | Razão |
|----------|-----|-------|
| Painel com 2–4 KPIs top + charts/tabelas | **DashboardTemplate** | Grid responsivo de métricas, sem ação primária |
| Lista paginada com ação "Novo" em destaque | ListPageTemplate | Toolbar com filtros, primaryAction proeminente |
| Detalhe de 1 entidade (contato, empresa) | DetailPageTemplate | Layout 2-col (main + sidebar), dados estruturados |
| Form multi-etapa | FormPageTemplate | Validação por step, estado local de wizard |

## Receita

```tsx
// Dashboard de unidade com 3-4 KPIs + charts
import { DashboardTemplate, type DashboardMetric, Badge, Stack, Card } from "@camillodev/ui"

export default function DashboardUnidade() {
  const metrics: DashboardMetric[] = [
    { label: "Alunos ativos", value: "124", trend: <Badge variant="success">+12%</Badge> },
    { label: "Matrículas", value: "18", hint: "mês atual" },
    { label: "Receita", value: "R$ 47k", trend: <Badge variant="success">+8%</Badge> },
  ]
  return (
    <DashboardTemplate title="Dashboard Unidade" description="Visão geral" metrics={metrics}>
      <Stack gap="lg">
        <Card><CardContent>Gráfico alunos/mês</CardContent></Card>
        <Card><CardContent>Tabela vencimentos</CardContent></Card>
      </Stack>
    </DashboardTemplate>
  )
}
```

## Variações

**Com breadcrumb + controles:**
```tsx
<DashboardTemplate
  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Admin" }]}
  title="Performance"
  controls={<Select>...</Select>}
  actions={<Button variant="tertiary">Exportar</Button>}
  metrics={[...]}
>
  ...
</DashboardTemplate>
```

**Sem métricas (só charts):**
```tsx
<DashboardTemplate title="Conteúdo" description="Engajamento">
  <Stack gap="lg">
    <Card>Visualizações por semana</Card>
  </Stack>
</DashboardTemplate>
```

## Anti-padrões ❌

❌ **Renderizar métricas como filhos (perde semântica):**
```tsx
<DashboardTemplate><Stack>Métrica1: 100 | Métrica2: 200</Stack></DashboardTemplate>
// CORRETO: passar array na prop metrics
<DashboardTemplate metrics={[{label:"M1", value:"100"}, ...]}>
```

❌ **6+ métricas no topo (quebra responsividade mobile):**
```tsx
// ERRADO: cai em 2 cols em mobile
<DashboardTemplate metrics={[m1, m2, m3, m4, m5, m6]} />
// CORRETO: 3–4 no topo, resto em Card de seção
<DashboardTemplate metrics={[m1, m2, m3]}>
  <Card><Stack>m4, m5, m6</Stack></Card>
</DashboardTemplate>
```

❌ **Usar maxWidth="md" (dashboards exigem espaço):**
```tsx
// ERRADO: métrica em 1 col desktop
<DashboardTemplate maxWidth="md" />
// CORRETO: default "xl" (4 cols desktop)
<DashboardTemplate />
```

## Links
- Implementação: `packages/ds-education/src/templates/dashboard-template.tsx`
- Props: `DashboardTemplateProps`, `DashboardMetric`
- Grid responsivo: base:1, sm:2, lg:(4 if 4 métricas else 3)
