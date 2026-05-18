"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Stat,
  Badge,
  Button,
  DataTable,
  Pagination,
  Avatar,
  HeroBanner,
  Toaster,
  toast,
  Grid,
  type Column,
} from "@impactxlabs/ui"
import {
  MatriculaModal,
  type MatriculaFormData,
} from "@/components/matricula-modal"
import { ALUNOS, STATS, type Aluno } from "@/app/templates/_mock-kumon-data"

const STATUS_VARIANT: Record<
  Aluno["status"],
  "primary" | "success" | "ink" | "warning"
> = {
  novo: "primary",
  ativo: "success",
  trancado: "warning",
  concluido: "ink",
}

const STATUS_LABEL: Record<Aluno["status"], string> = {
  novo: "Novo",
  ativo: "Ativo",
  trancado: "Trancado",
  concluido: "Concluído",
}

const PAGE_SIZE = 8

export default function MatriculaTemplate() {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)

  // Recentes = novos + ativos ordenados por matriculadoDesde desc
  const recentes = ALUNOS.filter(
    (a) => a.status === "novo" || a.status === "ativo"
  )
    .slice()
    .sort((a, b) =>
      b.matriculadoDesde.localeCompare(a.matriculadoDesde)
    )

  const pageData = recentes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSubmit = (data: MatriculaFormData) => {
    toast.success(`Matrícula de ${data.aluno.nome} criada`, {
      description: `Disciplinas: ${data.disciplinas.join(", ")}`,
    })
  }

  const columns: Column<Aluno>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" fallback={row.nome} alt={row.nome} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--color-text)]">
              {row.nome}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "disciplinas",
      header: "Disciplinas",
      cell: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.disciplinas.map((d) => (
            <Badge key={d.disciplina} variant="ink" size="sm">
              {d.disciplina}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "orientadora",
      header: "Orientadora",
      cell: (row) => (
        <span className="text-sm text-[var(--color-text-muted)]">
          {row.orientadora}
        </span>
      ),
    },
    {
      key: "matriculadoDesde",
      header: "Matriculado em",
      cell: (row) =>
        new Date(row.matriculadoDesde).toLocaleDateString("pt-BR"),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      cell: (row) => (
        <Badge variant={STATUS_VARIANT[row.status]} size="sm">
          {STATUS_LABEL[row.status]}
        </Badge>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6 pb-10">
      <HeroBanner
        eyebrow="MATRÍCULAS"
        title="Matrículas"
        description={`Gerencie matrículas e pré-matrículas da unidade ${STATS.unidadeNome}.`}
      />

      <div className="px-4 md:px-8 flex flex-col gap-6">
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
          <Stat asCard label="Pré-matrículas" value="7" />
          <Stat
            asCard
            label="Matriculados (mês)"
            value={String(STATS.novosNoMes)}
            delta="+12%"
            deltaTrend="up"
          />
          <Stat asCard label="Conversão" value="78%" delta="+4 pp" deltaTrend="up" />
          <Stat asCard label="Aguardando diagnóstica" value="4" />
        </Grid>

        <Card>
          <CardHeader className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle>Matrículas recentes</CardTitle>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Nova matrícula
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable<Aluno>
              columns={columns}
              data={pageData}
              density="comfortable"
              emptyState={
                <span className="text-sm text-[var(--color-text-muted)]">
                  Nenhuma matrícula recente.
                </span>
              }
            />
          </CardContent>
        </Card>

        <Pagination
          total={recentes.length}
          pageSize={PAGE_SIZE}
          value={page}
          onChange={setPage}
        />
      </div>

      <MatriculaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <Toaster />
    </div>
  )
}
