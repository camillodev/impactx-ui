"use client"

import { useState } from "react"
import {
  HeroBanner,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Stat,
  DataTable,
  type Column,
  Pagination,
} from "@impactx/ds-education"

type FolhaRow = {
  numero: string
  level: string
  disciplina: "matematica" | "portugues" | "ingles"
  taxaAcerto: number
  tempoMedio: string
  status: "boa" | "media" | "fraca"
}

const folhas: FolhaRow[] = [
  { numero: "5A-21", level: "5A", disciplina: "matematica", taxaAcerto: 92, tempoMedio: "4m 12s", status: "boa" },
  { numero: "4A-08", level: "4A", disciplina: "matematica", taxaAcerto: 78, tempoMedio: "5m 30s", status: "media" },
  { numero: "3A-15", level: "3A", disciplina: "matematica", taxaAcerto: 54, tempoMedio: "8m 02s", status: "fraca" },
  { numero: "B-12", level: "B", disciplina: "portugues", taxaAcerto: 88, tempoMedio: "6m 45s", status: "boa" },
  { numero: "C-04", level: "C", disciplina: "portugues", taxaAcerto: 62, tempoMedio: "9m 18s", status: "media" },
  { numero: "D-22", level: "D", disciplina: "portugues", taxaAcerto: 41, tempoMedio: "12m 05s", status: "fraca" },
  { numero: "5A-09", level: "5A", disciplina: "ingles", taxaAcerto: 81, tempoMedio: "5m 50s", status: "boa" },
  { numero: "4A-17", level: "4A", disciplina: "ingles", taxaAcerto: 67, tempoMedio: "7m 22s", status: "media" },
]

const disciplinaLabel: Record<FolhaRow["disciplina"], string> = {
  matematica: "Matemática",
  portugues: "Português",
  ingles: "Inglês",
}

const columns: Column<FolhaRow>[] = [
  { key: "numero", header: "Folha", cell: (r) => <span className="font-mono font-medium">{r.numero}</span> },
  { key: "level", header: "Level", cell: (r) => <Badge variant="ink">{r.level}</Badge> },
  { key: "disciplina", header: "Disciplina", cell: (r) => disciplinaLabel[r.disciplina] },
  { key: "taxaAcerto", header: "Taxa de acerto", align: "right", cell: (r) => `${r.taxaAcerto}%` },
  { key: "tempoMedio", header: "Tempo médio", align: "right", cell: (r) => r.tempoMedio },
  {
    key: "status",
    header: "Posição",
    cell: (r) =>
      r.status === "boa" ? (
        <Badge variant="success">Acima da média</Badge>
      ) : r.status === "fraca" ? (
        <Badge variant="warning">Abaixo da média</Badge>
      ) : (
        <Badge variant="ink">Na média</Badge>
      ),
  },
]

const filtros = ["todas", "matematica", "portugues", "ingles"] as const

export default function RelatorioQuestoesTemplate() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("todas")
  const [page, setPage] = useState(1)
  const data = filtro === "todas" ? folhas : folhas.filter((f) => f.disciplina === filtro)
  const fragilidades = data.filter((f) => f.status === "fraca").length

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Relatório"
        title="Folhas & taxa de acerto"
        description="Análise por folha — taxa de acerto, tempo médio e posição relativa por disciplina."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat asCard label="Total de folhas" value={data.length} />
        <Stat asCard label="Fragilidades" value={fragilidades} delta="+1" deltaTrend="up" />
        <Stat asCard label="Acima da média" value={data.filter((f) => f.status === "boa").length} delta="+2" deltaTrend="up" />
      </div>

      <Tabs value={filtro} onValueChange={(v) => setFiltro(v as typeof filtro)}>
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="matematica">Matemática</TabsTrigger>
          <TabsTrigger value="portugues">Português</TabsTrigger>
          <TabsTrigger value="ingles">Inglês</TabsTrigger>
        </TabsList>

        <TabsContent value={filtro} className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Desempenho por folha</CardTitle>
              <Badge variant="warning">{fragilidades} fragilidades</Badge>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={data}
                defaultSort={{ key: "taxaAcerto", direction: "desc" }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Pagination total={48} pageSize={8} value={page} onChange={setPage} />
    </div>
  )
}
