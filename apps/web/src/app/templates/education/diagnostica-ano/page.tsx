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
  DonutScore,
  Badge,
} from "@impactx/ds-education"
import { Users, ClipboardCheck, TrendingUp, BookOpen } from "lucide-react"

const subjects = [
  { subject: "Matemática", mediaSerie: "Level 3A médio", mediaNacional: "Avanço médio: +2 levels/ano" },
  { subject: "Português", mediaSerie: "Level B médio", mediaNacional: "Avanço médio: +2 levels/ano" },
  { subject: "Inglês", mediaSerie: "Level 5A médio", mediaNacional: "Avanço médio: +1.5 levels/ano" },
]

const historico = [
  { mes: "Jan", levelsAvancados: 6 },
  { mes: "Fev", levelsAvancados: 9 },
  { mes: "Mar", levelsAvancados: 14 },
  { mes: "Abr", levelsAvancados: 18 },
]

export default function DiagnosticaAnoTemplate() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Diagnóstica anual · Kumon"
        title="Resumo do ano"
        description="Visão consolidada das diagnósticas e avanços de level dos alunos em 2026."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Stat asCard label="Alunos avaliados" value="124" icon={<Users className="size-5" />} delta="+8%" deltaTrend="up" />
        <Stat asCard label="Diagnósticas aplicadas" value="312" icon={<ClipboardCheck className="size-5" />} />
        <Stat asCard label="Levels avançados (ano)" value="187" icon={<TrendingUp className="size-5" />} delta="+24" deltaTrend="up" />
        <Stat asCard label="Folhas concluídas" value="4.812" icon={<BookOpen className="size-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aproveitamento global por disciplina</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <DonutScore value={78} label="Matemática" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <DonutScore value={64} label="Português" warning />
          </div>
          <div className="flex flex-col items-center gap-2">
            <DonutScore value={71} label="Inglês" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Levels médios por disciplina</CardTitle>
          <Badge variant="ink">2026</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {subjects.map((s) => (
            <SubjectStatCard key={s.subject} {...s} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de avanços de level (2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {historico.map((h) => (
              <li key={h.mes} className="flex items-center justify-between border-b border-border/40 py-2 last:border-0">
                <span className="font-medium">{h.mes}/2026</span>
                <Badge variant="success">{h.levelsAvancados} levels avançados</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <CtaBanner
        heading="Identifique alunos prontos pra avançar de level"
        description="Abra o relatório individual e planeje as folhas das próximas sessões."
        buttonLabel="Ver alunos elegíveis"
      />
    </div>
  )
}
