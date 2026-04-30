"use client"

import {
  HeroBanner,
  Stat,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CtaBanner,
  SubjectStatCard,
  Badge,
} from "@impactx/ds-education"
import { Users, School, ClipboardCheck, Target } from "lucide-react"

const subjects = [
  { subject: "Língua Portuguesa", mediaSerie: "62%", mediaNacional: "58%" },
  { subject: "Matemática", mediaSerie: "54%", mediaNacional: "51%" },
  { subject: "Ciências", mediaSerie: "67%", mediaNacional: "63%" },
  { subject: "História", mediaSerie: "71%", mediaNacional: "65%" },
]

export default function DiagnosticaAnoTemplate() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Diagnóstica · 5º Ano EF"
        title="Resumo do ano letivo"
        description="Visão consolidada das diagnósticas aplicadas ao longo de 2026."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Stat asCard label="Alunos avaliados" value="1.284" icon={<Users className="size-5" />} delta="+8%" deltaTrend="up" />
        <Stat asCard label="Escolas" value="42" icon={<School className="size-5" />} />
        <Stat asCard label="Aplicações" value="12" icon={<ClipboardCheck className="size-5" />} delta="+3" deltaTrend="up" />
        <Stat asCard label="Habilidades cobertas" value="86" icon={<Target className="size-5" />} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Desempenho por componente</CardTitle>
          <Badge variant="ink">5º EF · 2026</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {subjects.map((s) => (
            <SubjectStatCard key={s.subject} {...s} />
          ))}
        </CardContent>
      </Card>

      <CtaBanner
        heading="Identifique fragilidades por habilidade"
        description="Abra o relatório detalhado por descritor BNCC para planejar a recomposição da aprendizagem."
        buttonLabel="Ver fragilidades"
      />
    </div>
  )
}
