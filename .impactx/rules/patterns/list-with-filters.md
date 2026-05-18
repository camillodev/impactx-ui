# Pattern: Lista com filtros

> **Trigger:** bot recebeu "página de listagem", "lista de [entidade]", "tabela com filtros", "página de alunos/faturas/responsáveis/etc", "lista paginada", "search + filtros + tabela", "filtros e tabela", "página com filtros", "listar com busca".

## Decisão em 30 segundos

| Cenário | Componente | Por quê |
|---|---|---|
| Lista padrão (header + filtros + tabela paginada) | `ListPageTemplate` + `DataTableWithPagination` | Receita padrão — chrome estruturado + dados |
| Lista com cards em vez de tabela | `ListPageTemplate` + `Grid` de `Card` | Visual, menos denso que tabela |
| Lista sem header (embedded num dashboard) | `DataTableWithPagination` solto | Não precisa chrome |
| Múltiplos filtros (status, data, search) | `FiltersBar` (stack horizontal) | Toolbar organizada entre header e table |

## Receita (15 linhas)

```tsx
import { ListPageTemplate, DataTableWithPagination, Button, Input, Select } from "@camillodev/ui"

export default function AlunosPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  const filtered = alunos.filter(a => 
    a.nome.includes(search) && (!status || a.status === status)
  )

  return (
    <ListPageTemplate
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Alunos" }]}
      title="Alunos"
      description="Gerencie todos os alunos da unidade"
      primaryAction={<Button variant="primary">+ Novo aluno</Button>}
      filters={
        <Stack direction="horizontal" gap="sm">
          <Input placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={status} onValueChange={setStatus}>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="paused">Pausado</SelectItem>
          </Select>
        </Stack>
      }
    >
      <DataTableWithPagination columns={columns} data={filtered} pageSize={20} />
    </ListPageTemplate>
  )
}
```

## Variações Comuns

### Sem breadcrumb

```tsx
<ListPageTemplate
  title="Responsáveis"
  primaryAction={<Button variant="primary">+ Adicionar</Button>}
>
  <DataTableWithPagination columns={colunas} data={responsaveis} pageSize={15} />
</ListPageTemplate>
```

### Sem filtros (tabela pura)

```tsx
<ListPageTemplate
  title="Faturas"
  primaryAction={<Button variant="primary">Nova fatura</Button>}
>
  <DataTableWithPagination columns={colunas} data={faturas} pageSize={20} />
</ListPageTemplate>
```

### Múltiplas ações secundárias

```tsx
<ListPageTemplate
  title="Cobranças"
  secondaryActions={
    <>
      <Button variant="outline">Exportar</Button>
      <Button variant="outline">Filtros avançados</Button>
    </>
  }
  primaryAction={<Button variant="primary">+ Nova cobrança</Button>}
>
  <DataTableWithPagination columns={colunas} data={cobranças} pageSize={20} />
</ListPageTemplate>
```

### Grid de cards em vez de tabela

```tsx
<ListPageTemplate
  title="Cursos"
  primaryAction={<Button variant="primary">+ Novo curso</Button>}
>
  <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="md">
    {cursos.map(curso => (
      <Card key={curso.id} onClick={() => navigate(`/cursos/${curso.id}`)}>
        <Heading level={3}>{curso.nome}</Heading>
        <Text size="sm" color="muted">{curso.descricao}</Text>
      </Card>
    ))}
  </Grid>
</ListPageTemplate>
```

### Filtros com estado reativo

```tsx
const [filters, setFilters] = useState({ search: "", status: "", dateRange: null })
const filtered = applyFilters(data, filters)

<ListPageTemplate
  title="Transações"
  filters={
    <Stack direction="horizontal" gap="sm">
      <Input 
        placeholder="Buscar..." 
        value={filters.search} 
        onChange={(e) => setFilters({ ...filters, search: e.target.value })} 
      />
      <Select value={filters.status} onValueChange={(s) => setFilters({ ...filters, status: s })}>
        <SelectItem value="">Todas</SelectItem>
        <SelectItem value="pending">Pendente</SelectItem>
        <SelectItem value="completed">Completa</SelectItem>
      </Select>
    </Stack>
  }
>
  <DataTableWithPagination columns={colunas} data={filtered} pageSize={20} />
</ListPageTemplate>
```

## Anti-patterns ❌

- ❌ **NUNCA** monte `<PageContainer><Stack><h1>` na mão — use `ListPageTemplate.title`
- ❌ **NUNCA** coloque filtros dentro de `children` — use prop `filters` dedicada
- ❌ **NUNCA** duplique `<h1>` em children — template já renderiza do `title`
- ❌ **NUNCA** use `<div className="grid grid-cols-3">` — use `<Grid cols={3}>`
- ❌ **NUNCA** invente loading state inline — leia `patterns/empty-loading-error-states.md`
- ❌ **NUNCA** esqueça de filtrar dados antes de passar pra `DataTableWithPagination` — paginação trabalha com dataset filtrado

## Links Relacionados

- Template: `.impactx/rules/templates/list-page.md`
- DataTable: `.impactx/rules/components/data-table-with-pagination.md`
- Empty/Loading/Error: `.impactx/rules/patterns/empty-loading-error-states.md`
- Componentes: `.impactx/rules/components/` (Input, Select, Button, Grid, Card)
