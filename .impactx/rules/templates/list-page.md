# ListPageTemplate — Página de Lista Padrão

**Carrega quando bot mencionar:** lista, página de lista, alunos, responsáveis, listagem, tabela paginada, list page, breadcrumb, página com header e tabela.

## Import

```tsx
import { ListPageTemplate, DataTableWithPagination, type Column, Button } from "@impactxlab/ds-education"
```

## Props

```tsx
interface ListPageTemplateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbItem[]
  /** Ação principal (botão direita). Geralmente <Button variant="primary">. */
  primaryAction?: React.ReactNode
  /** Ações secundárias (à esquerda do primary). */
  secondaryActions?: React.ReactNode
  /** Toolbar de filtros. Aparece entre header e conteúdo. */
  filters?: React.ReactNode
  /** Conteúdo principal — geralmente DataTableWithPagination ou Grid de Cards. */
  children: React.ReactNode
  /** Max-width do container. Default: "lg". */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

interface BreadcrumbItem {
  label: string
  href?: string
}
```

## Árvore de Decisão

| Caso | Componente | Motivo |
|------|-----------|--------|
| Lista de entidades com header + ação principal | **ListPageTemplate** | Chrome estruturado (breadcrumb, h1, descrição, ações, filtros), children (table/grid) |
| Detalhe de 1 entidade, layout 2-col (main+sidebar) | DetailPageTemplate | Layout especializado pra detalhe |
| Form criação/edição com wizard | FormPageTemplate | Multi-step, validação, estado local |
| Dashboard com KPIs/métricas | DashboardTemplate | Grade de cards de métrica, sem actions |

## Exemplos ✅

### Página de alunos completa com breadcrumb, filtros e tabela paginada

```tsx
export default function AlunosPage() {
  const [page, setPage] = useState(1)

  return (
    <ListPageTemplate
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Alunos" }
      ]}
      title="Alunos"
      description="Gerencie todos os alunos da unidade"
      primaryAction={<Button variant="primary">+ Novo Aluno</Button>}
      filters={
        <Stack direction="horizontal" gap="sm">
          <Input placeholder="Buscar por nome..." />
          <Select>
            <SelectItem value="">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="paused">Pausado</SelectItem>
          </Select>
        </Stack>
      }
    >
      <DataTableWithPagination
        columns={[
          { key: "nome", header: "Nome", cell: (a) => a.nome, sortable: true },
          { key: "status", header: "Status", cell: (a) => <Badge>{a.status}</Badge> },
          { key: "actions", header: "", cell: (a) => <Button variant="tertiary" size="sm">Editar</Button>, align: "right" }
        ]}
        data={alunos}
        pageSize={20}
        defaultPage={page}
        onPageChange={setPage}
      />
    </ListPageTemplate>
  )
}
```

### Página simples sem breadcrumb nem filtros

```tsx
<ListPageTemplate
  title="Responsáveis"
  primaryAction={<Button variant="primary">+ Adicionar</Button>}
>
  <DataTableWithPagination
    columns={colunas}
    data={responsaveis}
    pageSize={15}
  />
</ListPageTemplate>
```

### Página com múltiplas ações secundárias

```tsx
<ListPageTemplate
  title="Faturas"
  secondaryActions={
    <>
      <Button variant="outline">Exportar</Button>
      <Button variant="outline">Filtros avançados</Button>
    </>
  }
  primaryAction={<Button variant="primary">Nova Fatura</Button>}
  filters={<FilterBar />}
>
  <DataTableWithPagination columns={colunas} data={faturas} pageSize={20} />
</ListPageTemplate>
```

### Página com grid de cards em vez de tabela

```tsx
<ListPageTemplate
  title="Cursos"
  primaryAction={<Button variant="primary">+ Novo Curso</Button>}
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

### Breadcrumb multi-nível

```tsx
<ListPageTemplate
  breadcrumbs={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Unidades", href: "/unidades" },
    { label: "São Paulo", href: "/unidades/sp" },
    { label: "Alunos" }
  ]}
  title="Alunos — Unidade São Paulo"
  primaryAction={<Button variant="primary">+ Novo Aluno</Button>}
>
  <DataTableWithPagination columns={colunas} data={alunos} pageSize={20} />
</ListPageTemplate>
```

## Anti-padrões ❌

### ❌ Composição manual de PageContainer + Stack quando ListPageTemplate resolve

```tsx
// ERRADO: reinventando a roda
<PageContainer as="main" maxWidth="lg" padding="md">
  <Stack gap="lg">
    <h1>Alunos</h1>
    <DataTableWithPagination columns={...} data={alunos} />
  </Stack>
</PageContainer>

// CORRETO:
<ListPageTemplate title="Alunos">
  <DataTableWithPagination columns={...} data={alunos} />
</ListPageTemplate>
```

### ❌ h1 inline no children (template já renderiza h1 do title)

```tsx
// ERRADO: h1 duplicado
<ListPageTemplate title="Alunos">
  <div>
    <h1>Alunos</h1>
    <DataTableWithPagination columns={...} data={alunos} />
  </div>
</ListPageTemplate>

// CORRETO: title vai pra h1, children é só conteúdo
<ListPageTemplate title="Alunos">
  <DataTableWithPagination columns={...} data={alunos} />
</ListPageTemplate>
```

### ❌ Múltiplos primaryAction (há só um espaço à direita)

```tsx
// ERRADO: dois botões como primaryAction
<ListPageTemplate
  primaryAction={<Button>Novo</Button>}
  secondaryActions={<Button>Outro</Button>}
>
  ...
</ListPageTemplate>

// CORRETO: ações secundárias em secondaryActions
<ListPageTemplate
  primaryAction={<Button variant="primary">+ Novo</Button>}
  secondaryActions={
    <>
      <Button variant="outline">Exportar</Button>
      <Button variant="outline">Filtros</Button>
    </>
  }
>
  ...
</ListPageTemplate>
```

### ❌ Filtros dentro de children

```tsx
// ERRADO: filtros renderizados junto com table
<ListPageTemplate title="Alunos">
  <div>
    <FilterBar />
    <DataTableWithPagination columns={...} data={alunos} />
  </div>
</ListPageTemplate>

// CORRETO: filtros em prop dedicada
<ListPageTemplate
  title="Alunos"
  filters={<FilterBar />}
>
  <DataTableWithPagination columns={...} data={alunos} />
</ListPageTemplate>
```

### ❌ Esquecer as="main" (template já garante isso)

```tsx
// ERRADO: renderizar em div quando a template já é <main>
<ListPageTemplate title="Alunos">
  <div role="main">
    <DataTableWithPagination columns={...} data={alunos} />
  </div>
</ListPageTemplate>

// CORRETO: template renderiza <PageContainer as="main">
<ListPageTemplate title="Alunos">
  <DataTableWithPagination columns={...} data={alunos} />
</ListPageTemplate>
```

## Quando NÃO usar ListPageTemplate

| Caso | Use | Motivo |
|------|-----|--------|
| Página com layout 2-col (main + sidebar) | DetailPageTemplate | Layout especializado pra detalhe |
| Wizard multi-step | FormPageTemplate | Estado local de steps, validação por etapa |
| Dashboard com KPIs | DashboardTemplate | Grade de métricas, sem ações |
| Landing page, home pública | Componentes customizados | Não é chrome de app, sem PageContainer |

## Implementação Técnica

**Localização:** `packages/ds-education/src/templates/list-page-template.tsx`

**Estrutura renderizada:**

```tsx
<PageContainer as="main" maxWidth={maxWidth} padding={padding}>
  <Stack gap="lg">
    {/* Breadcrumb (condicional) */}
    {breadcrumbs && <Breadcrumb />}
    
    {/* Header: title/description + actions */}
    <Cluster gap="md" justify="between" align="start">
      <Stack gap="xs">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </Stack>
      {(primaryAction || secondaryActions) && (
        <Cluster gap="sm">
          {secondaryActions}
          {primaryAction}
        </Cluster>
      )}
    </Cluster>
    
    {/* Filtros (condicional) */}
    {filters && <div>{filters}</div>}
    
    {/* Conteúdo (table, grid, etc) */}
    <div>{children}</div>
  </Stack>
</PageContainer>
```

**Semântica:**
- `<main>` explicita o conteúdo principal da página (SEO + a11y)
- `<h1>` vem da prop `title` (nunca duplica)
- Breadcrumb, filtros e children são sempre renderizados em `<Stack gap="lg">` (spacing consistente)
- Actions cluster (secondary à esquerda, primary à direita) usa `<Cluster justify="between">`
