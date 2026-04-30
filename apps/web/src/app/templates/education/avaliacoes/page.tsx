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
import { Users, ClipboardList, GraduationCap } from "lucide-react"

const mockAssessments = [
  { id: 1, title: "Mariana Silva · Matemática · Level 4A → 3A · 92% acerto", applicationPeriod: "Diagnóstica em 12/04/2026", status: "concluded" as const },
  { id: 2, title: "Ricardo Tavares · Português · Level B → C · 88% acerto", applicationPeriod: "Diagnóstica em 14/04/2026", status: "concluded" as const },
  { id: 3, title: "Camila Ferreira · Inglês · Level 5A · em avaliação", applicationPeriod: "Aplicada em 22/04/2026", status: "in-progress" as const },
  { id: 4, title: "Pedro Oliveira · Matemática · Level D · em avaliação", applicationPeriod: "Aplicada em 23/04/2026", status: "in-progress" as const },
  { id: 5, title: "Beatriz Mendes · Português · Level A · pendente", applicationPeriod: "Agendada para 02/05/2026", status: "pending" as const },
  { id: 6, title: "João Pedro Lima · Matemática · Level 6A · pendente", applicationPeriod: "Agendada para 04/05/2026", status: "pending" as const },
]

export default function AvaliacoesTemplate() {
  const [page, setPage] = useState(1)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Hub da orientadora"
        title="Avaliações & Diagnósticas"
        description="Acompanhe diagnósticas e avanços de level dos alunos sob sua orientação."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BigCard
          title="Diagnósticas em andamento"
          description="2 alunos em ciclo de avaliação para próximo level esta semana."
          icon={ClipboardList}
        />
        <BigCard
          title="Avanços de level recentes"
          description="Visualize avanços consolidados por aluno e disciplina."
          icon={GraduationCap}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat asCard label="Alunos ativos" value="124" icon={<Users className="size-5" />} />
        <Stat asCard label="Levels avançados (mês)" value="18" delta="+12%" deltaTrend="up" />
        <Stat asCard label="Diagnósticas pendentes" value="7" delta="-3" deltaTrend="down" />
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
        heading="Pronta para a próxima sessão?"
        description="Veja a lista de alunos agendados, folhas planejadas e levels prováveis de avanço."
        buttonLabel="Abrir agenda"
      />

      <Pagination total={120} pageSize={10} value={page} onChange={setPage} />
    </div>
  )
}
