"use client"

import { useState } from "react"
import {
  HeroBanner,
  BigCard,
  CtaBanner,
  Stat,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  AssessmentListItem,
  Badge,
  Pagination,
} from "@impactx/ds-education"
import { BookOpen, ClipboardList, GraduationCap } from "lucide-react"

const mockAssessments = [
  { id: 1, title: "Avaliação Bimestral · Matemática", applicationPeriod: "10/03 a 17/03/2026", status: "concluded" as const },
  { id: 2, title: "Diagnóstica · Língua Portuguesa", applicationPeriod: "20/03 a 27/03/2026", status: "concluded" as const },
  { id: 3, title: "Simulado SAEB · 5º Ano", applicationPeriod: "03/04 a 10/04/2026", status: "in-progress" as const },
  { id: 4, title: "Avaliação Bimestral · Ciências", applicationPeriod: "15/04 a 22/04/2026", status: "in-progress" as const },
  { id: 5, title: "Diagnóstica · História", applicationPeriod: "29/04 a 06/05/2026", status: "pending" as const },
  { id: 6, title: "Simulado ENEM · 3º EM", applicationPeriod: "10/05 a 17/05/2026", status: "pending" as const },
]

export default function AvaliacoesTemplate() {
  const [page, setPage] = useState(1)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Hub do educador"
        title="Avaliações"
        description="Acompanhe o desempenho dos seus alunos em todas as avaliações aplicadas pela rede."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BigCard
          title="Avaliações em andamento"
          description="2 avaliações abertas para aplicação esta semana."
          icon={ClipboardList}
        />
        <BigCard
          title="Resultados consolidados"
          description="Visualize relatórios completos por turma, escola ou rede."
          icon={GraduationCap}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat asCard label="Total no bimestre" value="24" icon={<BookOpen className="size-5" />} />
        <Stat asCard label="Concluídas" value="18" delta="+12%" deltaTrend="up" />
        <Stat asCard label="Pendentes" value="6" delta="-3" deltaTrend="down" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Avaliações recentes</CardTitle>
          <Badge variant="primary">{mockAssessments.length} resultados</Badge>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {mockAssessments.map((a) => (
            <AssessmentListItem
              key={a.id}
              title={a.title}
              applicationPeriod={a.applicationPeriod}
              status={a.status}
            />
          ))}
        </CardContent>
      </Card>

      <CtaBanner
        heading="Quer comparar a sua escola com a rede?"
        description="Ative o relatório comparativo e veja onde sua escola se destaca."
        buttonLabel="Abrir relatório"
      />

      <Pagination total={120} pageSize={10} value={page} onChange={setPage} />
    </div>
  )
}
