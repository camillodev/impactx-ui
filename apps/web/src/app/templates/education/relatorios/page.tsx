"use client"

import { Trophy, Star, Sparkles } from "lucide-react"
import {
  AreaChart,
  BarChart,
  Badge,
  BigCard,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  type Column,
  DataTable,
  Cluster,
  DonutChart,
  Grid,
  HeroBanner,
  LineChart,
  Stack,
  Stat,
  SubjectStatCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@impactxlab/ds-education"

import {
  ALUNOS,
  STATS,
  type Aluno,
} from "../../_mock-kumon-data"

const TOP_PERFORMERS_ICONS = [Trophy, Star, Sparkles] as const

const ATIVOS = ALUNOS.filter((a) => a.status === "ativo")

const TOP_PERFORMERS = [...ATIVOS]
  .sort((a, b) => {
    const taxaA =
      a.disciplinas.reduce((s, d) => s + d.taxaAcerto, 0) / a.disciplinas.length
    const taxaB =
      b.disciplinas.reduce((s, d) => s + d.taxaAcerto, 0) / b.disciplinas.length
    return taxaB - taxaA
  })
  .slice(0, 3)

const TABLE_DATA: Aluno[] = ATIVOS.slice(0, 12)

const COLUMNS: Column<Aluno>[] = [
  {
    key: "nome",
    header: "Aluno",
    cell: (row) => (
      <Stack direction="vertical">
        <span className="font-medium text-[var(--color-text)]">{row.nome}</span>
        <span className="text-xs text-[var(--color-text-muted)]">
          {row.orientadora}
        </span>
      </Stack>
    ),
    sortable: true,
    sortAccessor: (row) => row.nome,
  },
  {
    key: "disciplinas",
    header: "Disciplinas",
    cell: (row) => (
      <Cluster gap="xs">
        {row.disciplinas.map((d) => (
          <Badge key={d.disciplina} variant="primary" size="sm">
            {d.disciplina} · {d.levelAtual}
          </Badge>
        ))}
      </Cluster>
    ),
  },
  {
    key: "folhas",
    header: "Folhas",
    align: "right",
    cell: (row) => (
      <span className="tabular-nums">
        {row.disciplinas
          .reduce((s, d) => s + d.folhasConcluidas, 0)
          .toLocaleString("pt-BR")}
      </span>
    ),
    sortable: true,
    sortAccessor: (row) =>
      row.disciplinas.reduce((s, d) => s + d.folhasConcluidas, 0),
  },
  {
    key: "acerto",
    header: "Acerto médio",
    align: "right",
    cell: (row) => {
      const media = Math.round(
        row.disciplinas.reduce((s, d) => s + d.taxaAcerto, 0) /
          row.disciplinas.length,
      )
      return <span className="tabular-nums">{media}%</span>
    },
    sortable: true,
    sortAccessor: (row) =>
      row.disciplinas.reduce((s, d) => s + d.taxaAcerto, 0) /
      row.disciplinas.length,
  },
  {
    key: "ultima",
    header: "Última sessão",
    align: "right",
    cell: (row) =>
      new Date(row.ultimaSessao).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
    sortable: true,
    sortAccessor: (row) => row.ultimaSessao,
  },
]

export default function RelatoriosTemplate() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <HeroBanner
        eyebrow="RELATÓRIOS"
        title="Relatórios"
        description={`Visão geral da unidade ${STATS.unidadeNome} — alunos, folhas, sessões e evolução de levels.`}
      />

      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
        <Stat
          asCard
          label="Alunos ativos"
          value={STATS.alunosAtivos}
          delta="+5 no mês"
          deltaTrend="up"
        />
        <Stat
          asCard
          label="Sessões (mês)"
          value={STATS.sessoesNoMes}
          delta="+12 vs anterior"
          deltaTrend="up"
        />
        <Stat
          asCard
          label="Folhas concluídas"
          value={STATS.folhasConcluidasNoMes.toLocaleString("pt-BR")}
        />
        <Stat
          asCard
          label="Levels avançados"
          value={STATS.levelsAvancadosNoMes}
          delta="+3 vs anterior"
          deltaTrend="up"
        />
      </Grid>

      <Tabs defaultValue="geral">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="por-aluno">Por aluno</TabsTrigger>
          <TabsTrigger value="por-disciplina">Por disciplina</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Grid cols={{ base: 1, lg: 2 }} gap="md">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por disciplina</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  showLegend
                  size={220}
                  series={[
                    { name: "Matemática", value: 45, tone: "primary" },
                    { name: "Português", value: 32, tone: "warning" },
                    { name: "Inglês", value: 23, tone: "success" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Folhas por semana</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  height={260}
                  categories={["S1", "S2", "S3", "S4"]}
                  series={[
                    {
                      name: "Folhas",
                      data: [720, 845, 712, 865],
                      tone: "primary",
                    },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Levels avançados (12 meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  height={260}
                  categories={[
                    "Mai",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez",
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                  ]}
                  series={[
                    {
                      name: "Levels",
                      data: [8, 10, 12, 9, 14, 11, 13, 15, 12, 16, 14, 18],
                      tone: "primary",
                    },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de acerto média</CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  height={260}
                  categories={[
                    "Sem 1",
                    "Sem 2",
                    "Sem 3",
                    "Sem 4",
                    "Sem 5",
                    "Sem 6",
                    "Sem 7",
                    "Sem 8",
                  ]}
                  series={[
                    {
                      name: "Acerto %",
                      data: [86, 88, 87, 90, 91, 89, 92, 93],
                      tone: "success",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        <TabsContent value="por-aluno">
          <Grid cols={{ base: 1, md: 3 }} gap="md" className="mb-6">
            {TOP_PERFORMERS.map((aluno, idx) => {
              const Icon = TOP_PERFORMERS_ICONS[idx] ?? Trophy
              const media = Math.round(
                aluno.disciplinas.reduce((s, d) => s + d.taxaAcerto, 0) /
                  aluno.disciplinas.length,
              )
              return (
                <BigCard
                  key={aluno.id}
                  icon={Icon}
                  title={aluno.nome}
                  description={`${media}% de acerto médio · ${aluno.disciplinas.length} disciplina${
                    aluno.disciplinas.length > 1 ? "s" : ""
                  } · ${aluno.orientadora}`}
                />
              )
            })}
          </Grid>

          <Card>
            <CardHeader>
              <CardTitle>Alunos ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={COLUMNS}
                data={TABLE_DATA}
                defaultSort={{ key: "folhas", direction: "desc" }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="por-disciplina">
          <Grid cols={{ base: 1, md: 3 }} gap="md">
            <SubjectStatCard
              subject="Matemática"
              mediaSerie="3A"
              mediaNacional="4A"
            />
            <SubjectStatCard
              subject="Português"
              mediaSerie="4A"
              mediaNacional="5A"
            />
            <SubjectStatCard
              subject="Inglês"
              mediaSerie="5A"
              mediaNacional="6A"
            />
          </Grid>
        </TabsContent>
      </Tabs>
    </div>
  )
}
