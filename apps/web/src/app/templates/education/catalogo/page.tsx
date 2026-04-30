"use client"

import { useState } from "react"
import {
  HeroBanner,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  DataTable,
  type Column,
  Input,
  Pagination,
} from "@impactx/ds-education"

type Item = {
  id: string
  name: string
  category: string
  status: "active" | "draft" | "archived"
  updatedAt: string
}

const items: Item[] = [
  { id: "001", name: "Item Alpha", category: "Categoria A", status: "active", updatedAt: "28/04/2026" },
  { id: "002", name: "Item Bravo", category: "Categoria B", status: "active", updatedAt: "27/04/2026" },
  { id: "003", name: "Item Charlie", category: "Categoria A", status: "draft", updatedAt: "26/04/2026" },
  { id: "004", name: "Item Delta", category: "Categoria C", status: "active", updatedAt: "25/04/2026" },
  { id: "005", name: "Item Echo", category: "Categoria B", status: "archived", updatedAt: "20/04/2026" },
  { id: "006", name: "Item Foxtrot", category: "Categoria A", status: "active", updatedAt: "18/04/2026" },
  { id: "007", name: "Item Golf", category: "Categoria C", status: "draft", updatedAt: "16/04/2026" },
  { id: "008", name: "Item Hotel", category: "Categoria B", status: "active", updatedAt: "12/04/2026" },
]

const columns: Column<Item>[] = [
  { key: "id", header: "ID", cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span> },
  { key: "name", header: "Nome", cell: (r) => <span className="font-medium">{r.name}</span> },
  { key: "category", header: "Categoria", cell: (r) => r.category },
  {
    key: "status",
    header: "Status",
    cell: (r) =>
      r.status === "active" ? (
        <Badge variant="success">Ativo</Badge>
      ) : r.status === "draft" ? (
        <Badge variant="ink">Rascunho</Badge>
      ) : (
        <Badge variant="warning">Arquivado</Badge>
      ),
  },
  { key: "updatedAt", header: "Última atualização", align: "right", cell: (r) => r.updatedAt },
]

export default function CatalogoTemplate() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const filtered = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Catálogo"
        title="DataTable example"
        description="Demonstração do componente DataTable com filtros, badges e paginação — dados neutros."
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Itens</CardTitle>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Buscar por nome…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64"
            />
            <Badge variant="primary">{filtered.length} itens</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filtered}
            defaultSort={{ key: "updatedAt", direction: "desc" }}
          />
        </CardContent>
      </Card>

      <Pagination total={64} pageSize={8} value={page} onChange={setPage} />
    </div>
  )
}
