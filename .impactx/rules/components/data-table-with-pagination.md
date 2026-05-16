# DataTableWithPagination — Tabela Paginada Cliente

**Carrega quando bot mencionar:** tabela paginada, lista paginada, data-table, pagination, mostrar X de Y, lista de alunos paginada, tabela com paginação, tabela client-side.

## Import

```ts
import { DataTableWithPagination, type Column } from "@impactx/ds-education"
```

## Props

```ts
interface DataTableWithPaginationProps<T> extends Omit<DataTableProps<T>, "data"> {
  /** Dados completos. Pagina internamente. */
  data: T[]
  /** Itens por página. Default: 10. */
  pageSize?: number
  /** Página inicial (1-indexed). Default: 1. */
  defaultPage?: number
  /** Callback quando a página muda. */
  onPageChange?: (page: number) => void
  /** Mostrar contador "Mostrando X-Y de Z". Default: true. */
  showSummary?: boolean
  /** Label customizado pro contador. Recebe {from, to, total}. */
  summaryLabel?: (info: { from: number; to: number; total: number }) => React.ReactNode
  /** Classe do wrapper externo (table + footer). */
  containerClassName?: string
}

// Plus todos os DataTableProps:
interface Column<T> {
  key: string
  header: React.ReactNode
  cell: (row: T, rowIndex: number) => React.ReactNode
  align?: "left" | "right" | "center"
  width?: string
  sortable?: boolean
  sortAccessor?: (row: T) => string | number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[] // IGNORED em DataTableWithPagination (usar `data` da composição)
  defaultSort?: { key: string; direction: "asc" | "desc" }
  onRowClick?: (row: T, rowIndex: number) => void
  emptyState?: React.ReactNode
  className?: string
  loading?: boolean
  loadingRows?: number
  density?: "comfortable" | "compact"
}
```

## Árvore de Decisão

| Caso | Componente | Motivo |
|------|-----------|--------|
| Tabela paginada cliente (≤ 5MB dados) | **DataTableWithPagination** | State interno, sortable, contador automático |
| Tabela server-paginated (página em URL) | DataTable + Pagination manual | Controle externo de paginação |
| Tabela sem paginação (≤ 20 rows) | DataTable só | Nenhuma paginação necessária |
| Lista visual (cards por linha) | Stack/Grid + Card | Melhor UX que tabela, menos denso |

## Exemplos ✅

### Lista de alunos completa com sortable
```tsx
const columns: Column<Aluno>[] = [
  { 
    key: "nome", 
    header: "Nome", 
    cell: (a) => a.nome, 
    sortable: true, 
    sortAccessor: (a) => a.nome 
  },
  { 
    key: "status", 
    header: "Status", 
    cell: (a) => <Badge variant={statusVariant(a.status)}>{a.status}</Badge> 
  },
  { 
    key: "actions", 
    header: "", 
    cell: (a) => <Button variant="tertiary" size="sm">Editar</Button>, 
    align: "right" 
  },
]

<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  pageSize={20} 
  defaultSort={{ key: "nome", direction: "asc" }}
/>
```

### Com loading skeleton
```tsx
<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  loading={isLoading} 
  loadingRows={10} 
  pageSize={15}
/>
```

### Com onRowClick pra navegar
```tsx
<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  pageSize={20}
  onRowClick={(aluno) => router.push(`/alunos/${aluno.id}`)}
/>
```

### Sem summary (só paginação)
```tsx
<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  pageSize={10}
  showSummary={false}
/>
```

### Custom summary label
```tsx
<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  pageSize={20}
  summaryLabel={({ total }) => <span>{total} alunos no total</span>}
/>
```

### Rastreando mudanças de página
```tsx
const [page, setPage] = useState(1)

<DataTableWithPagination 
  columns={columns} 
  data={alunos} 
  pageSize={10}
  defaultPage={page}
  onPageChange={(newPage) => {
    setPage(newPage)
    // Analytics, scroll to top, etc.
  }}
/>
```

## Anti-patterns ❌

### ❌ Composição manual de DataTable + Pagination
```tsx
// ERRADO: reinventando a roda
const page = useState(1)
const [paged] = alunos.slice((page - 1) * 10, page * 10)
<DataTable data={paged} columns={...} />
<Pagination total={alunos.length} pageSize={10} value={page} onChange={setPage} />

// CORRETO:
<DataTableWithPagination data={alunos} columns={...} pageSize={10} />
```

### ❌ Esquecer keys únicas no mapa de colunas
```tsx
// ERRADO: renderizando sem chaves rastreáveis
{alunos.map(a => <TableRow key={Math.random()} {...a} />)}

// CORRETO: usar id ou índice estável
columns={{ key: "id", header: "ID", cell: (a) => a.id }}
```

### ❌ Cell que faz fetch
```tsx
// ERRADO: fetch na célula (N chamadas)
cell: (a) => {
  const [bio, setBio] = useState()
  useEffect(() => fetch(`/bio/${a.id}`), [])
  return bio
}

// CORRETO: dados já enriquecidos na entrada
cell: (a) => a.biography
```

### ❌ Sortable sem sortAccessor
```tsx
// ERRADO: coluna sortable mas sem saber extrair valor
{ key: "created", header: "Criado", cell: (a) => new Date(a.createdAt).toLocaleDateString(), sortable: true }

// CORRETO: sortAccessor sabe extrair
{ 
  key: "created", 
  header: "Criado", 
  cell: (a) => new Date(a.createdAt).toLocaleDateString(), 
  sortable: true,
  sortAccessor: (a) => a.createdAt // timestamp ou string ISO
}
```

### ❌ Muitas ações inline
```tsx
// ERRADO: 5 botões de ação em cada linha é caótico
cell: (a) => <div className="flex gap-2"><Btn>Edit</Btn><Btn>Delete</Btn><Btn>Duplicate</Btn><Btn>Share</Btn><Btn>Archive</Btn></div>

// CORRETO: menu dropdown
cell: (a) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild><Button variant="ghost">⋮</Button></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => edit(a)}>Editar</DropdownMenuItem>
      <DropdownMenuItem onClick={() => duplicate(a)}>Duplicar</DropdownMenuItem>
      <DropdownMenuItem onClick={() => archive(a)}>Arquivar</DropdownMenuItem>
      <DropdownMenuItem className="text-red-500" onClick={() => delete(a)}>Deletar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
```

### ❌ pageSize muito pequeno em desktop
```tsx
// ERRADO: pageSize={5} força muita navegação
<DataTableWithPagination pageSize={5} data={alunos} />

// CORRETO: 15-20 itens por página em desktop
<DataTableWithPagination pageSize={20} data={alunos} />
```

## Quando NÃO usar DataTableWithPagination

| Caso | Use | Motivo |
|------|-----|--------|
| Dados server-paginated (URL state) | DataTable + Pagination manual | Controle externo de fetch |
| Lista visual com cards | Grid + Card ou Stack | Melhor UX, menos denso |
| Tabela com colspan/rowspan complexos | DataTable + estrutura manual | Compositions não suportam |
| ≤ 20 rows sem ordenação | DataTable só | Paginação desnecessária |

## Implementação Técnica

**Localização:** `packages/ds-education/src/components/data-table-with-pagination.tsx`

**Paginação cliente:** usa `data.slice()` internamente — não há fetch. Ideal pra ≤ 1000 rows ou ≤ 5MB de JSON.

**Auto-reset pra página 1:** quando `data.length` shrink abaixo da página atual (ex: após filtro removeu rows), o componente automaticamente reseta pra página 1.

**Sortable:** colunas com `sortable: true` exigem `sortAccessor` (função que extrai o valor comparável). Sem `sortAccessor`, a coluna não sai do ar apesar de `sortable: true`.

**Hidratação:** é um Client Component (`"use client"`) — use em layouts RSC sem problemas, o componente é responsivo e lida com estado local sem hidratação assincrona.
