"use client"

import { useState } from "react"
import {
  AssessmentHeader,
  Tabs,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  QuestionRow,
  Badge,
  Stat,
  Pagination,
} from "@impactx/ds-education"
import { ListChecks } from "lucide-react"

const questoes = [
  { numero: "01", campoAtuacao: "Leitura · Localizar informação", acertosEscola: "78%", acertosNacional: "71%" },
  { numero: "02", campoAtuacao: "Leitura · Inferir sentido", acertosEscola: "64%", acertosNacional: "58%" },
  { numero: "03", campoAtuacao: "Leitura · Identificar tese", acertosEscola: "52%", acertosNacional: "55%", isFragilidade: true },
  { numero: "04", campoAtuacao: "Gramática · Concordância", acertosEscola: "71%", acertosNacional: "66%" },
  { numero: "05", campoAtuacao: "Gramática · Pontuação", acertosEscola: "44%", acertosNacional: "49%", isFragilidade: true },
  { numero: "06", campoAtuacao: "Matemática · Operações", acertosEscola: "68%", acertosNacional: "61%" },
  { numero: "07", campoAtuacao: "Matemática · Frações", acertosEscola: "39%", acertosNacional: "47%", isFragilidade: true },
  { numero: "08", campoAtuacao: "Matemática · Geometria", acertosEscola: "62%", acertosNacional: "58%" },
  { numero: "09", campoAtuacao: "Matemática · Estatística", acertosEscola: "55%", acertosNacional: "52%" },
  { numero: "10", campoAtuacao: "Ciências · Sistema solar", acertosEscola: "73%", acertosNacional: "65%" },
  { numero: "11", campoAtuacao: "Ciências · Ecossistemas", acertosEscola: "48%", acertosNacional: "54%", isFragilidade: true },
  { numero: "12", campoAtuacao: "Ciências · Corpo humano", acertosEscola: "67%", acertosNacional: "60%" },
]

export default function RelatorioQuestoesTemplate() {
  const [tab, setTab] = useState("questoes")
  const [page, setPage] = useState(1)
  const fragilidades = questoes.filter((q) => q.isFragilidade).length

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <AssessmentHeader
        breadcrumbs={[
          { label: "Avaliações", href: "/templates/education/avaliacoes" },
          { label: "Relatórios", href: "/templates/education/catalogo" },
          { label: "Questões" },
        ]}
        subtitle="Diagnóstica · 5º EF · 2026"
        title="Relatório · Análise por questão"
        icon={<ListChecks className="size-6" />}
        tabs={[
          { value: "visao-geral", label: "Visão geral" },
          { value: "questoes", label: "Questões" },
          { value: "alunos", label: "Alunos" },
        ]}
        activeTab={tab}
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="questoes" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Stat asCard label="Total de questões" value={questoes.length} />
            <Stat asCard label="Fragilidades" value={fragilidades} delta="+1" deltaTrend="up" />
            <Stat asCard label="Acima da média" value={questoes.length - fragilidades} delta="+2" deltaTrend="up" />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Desempenho item a item</CardTitle>
              <Badge variant="warning">{fragilidades} fragilidades</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-12 border-b border-border bg-muted/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-7">Campo de atuação</div>
                <div className="col-span-2 text-right">Sua escola</div>
                <div className="col-span-2 text-right">Nacional</div>
              </div>
              {questoes.map((q, i) => (
                <QuestionRow key={q.numero} {...q} isEven={i % 2 === 0} />
              ))}
            </CardContent>
          </Card>

          <Pagination total={48} pageSize={12} value={page} onChange={setPage} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
