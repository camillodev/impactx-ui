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
  { id: 1, ano: "5", title: "Diagnóstica · Língua Portuguesa · 5º EF", applicationPeriod: "10/02 a 17/02/2026", status: "concluded" as const },
  { id: 2, ano: "5", title: "Diagnóstica · Matemática · 5º EF", applicationPeriod: "18/02 a 25/02/2026", status: "concluded" as const },
  { id: 3, ano: "9", title: "Diagnóstica · Língua Portuguesa · 9º EF", applicationPeriod: "01/03 a 08/03/2026", status: "in-progress" as const },
  { id: 4, ano: "9", title: "Diagnóstica · Matemática · 9º EF", applicationPeriod: "09/03 a 16/03/2026", status: "in-progress" as const },
  { id: 5, ano: "3", title: "Diagnóstica · Língua Portuguesa · 3º EM", applicationPeriod: "20/03 a 27/03/2026", status: "pending" as const },
  { id: 6, ano: "3", title: "Diagnóstica · Matemática · 3º EM", applicationPeriod: "28/03 a 04/04/2026", status: "pending" as const },
  { id: 7, ano: "5", title: "Diagnóstica · Ciências · 5º EF", applicationPeriod: "10/04 a 17/04/2026", status: "pending" as const },
]

const filtros = ["todos", "5", "9", "3"] as const

export default function ListaDiagnosticaTemplate() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("todos")
  const [page, setPage] = useState(1)
  const list = filtro === "todos" ? allAssessments : allAssessments.filter((a) => a.ano === filtro)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Avaliações"
        title="Diagnósticas"
        description="Aplicações usadas para mapear fragilidades antes do início de cada bimestre."
      />

      <Tabs value={filtro} onValueChange={(v) => setFiltro(v as typeof filtro)}>
        <TabsList>
          <TabsTrigger value="todos">Todos os anos</TabsTrigger>
          <TabsTrigger value="5">5º EF</TabsTrigger>
          <TabsTrigger value="9">9º EF</TabsTrigger>
          <TabsTrigger value="3">3º EM</TabsTrigger>
        </TabsList>

        <TabsContent value={filtro} className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Aplicações</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="primary">{list.length} avaliações</Badge>
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
