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
  Button,
  AssessmentListItem,
  Pagination,
} from "@impactx/ds-education"

const allAssessments = [
  { id: 1, disciplina: "matematica", title: "Mariana Silva · Matemática · Level atual 4A · suspeita 3A", applicationPeriod: "Diagnóstica agendada para 02/05/2026", status: "pending" as const },
  { id: 2, disciplina: "matematica", title: "Pedro Oliveira · Matemática · Level atual D · suspeita E", applicationPeriod: "Diagnóstica em 04/05/2026", status: "pending" as const },
  { id: 3, disciplina: "portugues", title: "Ricardo Tavares · Português · Level atual B · suspeita C", applicationPeriod: "Aplicada em 22/04/2026", status: "in-progress" as const },
  { id: 4, disciplina: "portugues", title: "Beatriz Mendes · Português · Level atual A · suspeita B", applicationPeriod: "Aplicada em 24/04/2026", status: "in-progress" as const },
  { id: 5, disciplina: "ingles", title: "Camila Ferreira · Inglês · Level atual 5A · suspeita 4A", applicationPeriod: "Concluída em 18/04/2026", status: "concluded" as const },
  { id: 6, disciplina: "ingles", title: "João Pedro Lima · Inglês · Level atual 6A · suspeita 5A", applicationPeriod: "Concluída em 16/04/2026", status: "concluded" as const },
  { id: 7, disciplina: "matematica", title: "Larissa Costa · Matemática · Level atual 2A · suspeita A", applicationPeriod: "Agendada para 06/05/2026", status: "pending" as const },
]

const filtros = ["todos", "matematica", "portugues", "ingles"] as const

export default function ListaDiagnosticaTemplate() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("todos")
  const [page, setPage] = useState(1)
  const list = filtro === "todos" ? allAssessments : allAssessments.filter((a) => a.disciplina === filtro)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Avaliações"
        title="Lista Diagnóstica"
        description="Alunos pendentes de diagnóstica — usadas para confirmar ou ajustar o level antes da próxima sessão."
      />

      <Tabs value={filtro} onValueChange={(v) => setFiltro(v as typeof filtro)}>
        <TabsList>
          <TabsTrigger value="todos">Todas as disciplinas</TabsTrigger>
          <TabsTrigger value="matematica">Matemática</TabsTrigger>
          <TabsTrigger value="portugues">Português</TabsTrigger>
          <TabsTrigger value="ingles">Inglês</TabsTrigger>
        </TabsList>

        <TabsContent value={filtro} className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Diagnósticas</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="primary">{list.length} alunos</Badge>
                <Button size="sm" variant="primary">Nova diagnóstica</Button>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {list.map((a) => (
                <AssessmentListItem
                  key={a.id}
                  title={a.title}
                  applicationPeriod={a.applicationPeriod}
                  status={a.status}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Pagination total={48} pageSize={7} value={page} onChange={setPage} />
    </div>
  )
}
