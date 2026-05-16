"use client"

import * as React from "react"
import {
  DashboardTemplate,
  type DashboardMetric,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Stack,
  Cluster,
} from "@impactxlab/ds-education"
import { BarChart3, Share2 } from "lucide-react"

interface StudentWithPendingLessons {
  id: number
  nome: string
  aulasAtrasadas: number
}

const metrics: DashboardMetric[] = [
  {
    label: "Alunos ativos",
    value: "124",
    trend: <Badge variant="success" size="sm">+12%</Badge>,
    hint: "vs mês passado",
  },
  {
    label: "Matrículas mês",
    value: "18",
    trend: <Badge variant="ink" size="sm">+3</Badge>,
    hint: "vs mês passado",
  },
  {
    label: "Inadimplência",
    value: "3.2%",
    trend: <Badge variant="danger" size="sm">+0.4%</Badge>,
    hint: "alerta",
  },
  {
    label: "Receita prevista",
    value: "R$ 47k",
    trend: <Badge variant="success" size="sm">+8%</Badge>,
    hint: "próximos 30 dias",
  },
]

const studentsWithPendingLessons: StudentWithPendingLessons[] = [
  { id: 1, nome: "Maria Silva", aulasAtrasadas: 4 },
  { id: 2, nome: "João Pedro", aulasAtrasadas: 2 },
  { id: 3, nome: "Ana Beatriz", aulasAtrasadas: 3 },
]

export default function DashboardExample() {
  const [period, setPeriod] = React.useState("30")

  return (
    <DashboardTemplate
      title="Dashboard"
      description="Visão geral da unidade Camargos · 16 de maio de 2026"
      breadcrumbs={[{ label: "Dashboard" }]}
      controls={
        <select
          aria-label="Período do dashboard"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="h-9 rounded-lg border-2 border-[var(--color-border-input)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      }
      actions={
        <Cluster gap="sm">
          <Button variant="tertiary">Exportar</Button>
          <Button variant="primary">
            <Share2 /> Compartilhar
          </Button>
        </Cluster>
      }
      metrics={metrics}
    >
      <Stack gap="lg">
        {/* Card: Evolução de matrículas */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de matrículas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-60 bg-[var(--color-bg-subtle)] rounded-lg text-[var(--color-text-muted)]">
              <BarChart3 className="w-12 h-12 opacity-30" />
            </div>
          </CardContent>
        </Card>

        {/* Card: Top alunos com aulas pendentes */}
        <Card>
          <CardHeader>
            <CardTitle>Top alunos com aulas pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="sm">
              {studentsWithPendingLessons.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-subtle)]"
                >
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {student.nome}
                  </span>
                  <Badge variant="danger" size="sm">
                    {student.aulasAtrasadas} aula{student.aulasAtrasadas !== 1 ? "s" : ""}
                  </Badge>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Grid 2 cols: Distribuição + Inadimplência */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por turma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60 bg-[var(--color-bg-subtle)] rounded-lg text-[var(--color-text-muted)]">
                <BarChart3 className="w-12 h-12 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inadimplência por mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60 bg-[var(--color-bg-subtle)] rounded-lg text-[var(--color-text-muted)]">
                <BarChart3 className="w-12 h-12 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Stack>
    </DashboardTemplate>
  )
}
