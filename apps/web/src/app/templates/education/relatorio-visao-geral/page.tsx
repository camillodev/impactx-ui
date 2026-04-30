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
  DonutScore,
  CampoCard,
  DataTable,
  type Column,
  Badge,
  Stat,
} from "@impactx/ds-education"
import { ClipboardList } from "lucide-react"

type EscolaRow = {
  escola: string
  alunos: number
  acertos: number
  nacional: number
  status: "acima" | "media" | "abaixo"
}

const escolas: EscolaRow[] = [
  { escola: "EM Camargos", alunos: 312, acertos: 71, nacional: 58, status: "acima" },
  { escola: "EM Padre Eustáquio", alunos: 284, acertos: 64, nacional: 58, status: "acima" },
  { escola: "EM Cristiano Machado", alunos: 256, acertos: 59, nacional: 58, status: "media" },
  { escola: "EM São Bernardo", alunos: 198, acertos: 52, nacional: 58, status: "abaixo" },
  { escola: "EM Independência", alunos: 174, acertos: 47, nacional: 58, status: "abaixo" },
  { escola: "EM Dom Bosco", alunos: 221, acertos: 66, nacional: 58, status: "acima" },
]

const columns: Column<EscolaRow>[] = [
  { key: "escola", header: "Escola", cell: (r) => <span className="font-medium">{r.escola}</span> },
  { key: "alunos", header: "Alunos", align: "right", cell: (r) => r.alunos.toLocaleString("pt-BR") },
  { key: "acertos", header: "Acertos", align: "right", cell: (r) => `${r.acertos}%` },
  { key: "nacional", header: "Nacional", align: "right", cell: (r) => `${r.nacional}%` },
  {
    key: "status",
    header: "Posição",
    cell: (r) =>
      r.status === "acima" ? (
        <Badge variant="success">Acima da média</Badge>
      ) : r.status === "abaixo" ? (
        <Badge variant="warning">Abaixo da média</Badge>
      ) : (
        <Badge variant="ink">Na média</Badge>
      ),
  },
]

export default function RelatorioVisaoGeralTemplate() {
  const [tab, setTab] = useState("visao-geral")

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <AssessmentHeader
        breadcrumbs={[
          { label: "Avaliações", href: "/templates/education/avaliacoes" },
          { label: "Relatórios", href: "/templates/education/catalogo" },
          { label: "Visão geral" },
        ]}
        subtitle="Diagnóstica · 5º EF · 2026"
        title="Relatório · Visão geral"
        icon={<ClipboardList className="size-6" />}
        tabs={[
          { value: "visao-geral", label: "Visão geral" },
          { value: "questoes", label: "Questões" },
          { value: "alunos", label: "Alunos" },
        ]}
        activeTab={tab}
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Stat asCard label="Alunos" value="1.445" />
            <Stat asCard label="Acertos médios" value="61%" delta="+4 p.p." deltaTrend="up" />
            <Stat asCard label="Habilidades em fragilidade" value="9" delta="-2" deltaTrend="down" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acertos por área de conhecimento</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={68} label="Língua Portuguesa" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={54} label="Matemática" warning />
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={71} label="Ciências" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CampoCard
              title="Leitura e interpretação"
              questoes={12}
              acertosEscola={68}
              acertosNacional={62}
            />
            <CampoCard
              title="Operações com frações"
              questoes={8}
              acertosEscola={42}
              acertosNacional={51}
              isFragilidade
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho por escola</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={escolas}
                defaultSort={{ key: "acertos", direction: "desc" }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
