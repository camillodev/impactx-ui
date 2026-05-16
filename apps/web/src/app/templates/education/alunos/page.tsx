"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  Badge,
  Button,
  IconButton,
  Input,
  Chip,
  DataTable,
  Pagination,
  HeroBanner,
  type Column,
} from "@impactxlab/ds-education"
import { Plus, MoreHorizontal, Search } from "lucide-react"
import {
  ALUNOS,
  type Aluno,
  type Disciplina,
} from "@/app/templates/_mock-kumon-data"
import { MatriculaModal } from "@/components/matricula-modal"

const DISCIPLINAS: Disciplina[] = ["Matemática", "Português", "Inglês"]
const PAGE_SIZE = 10

const STATUS_VARIANT: Record<
  Aluno["status"],
  "success" | "primary" | "ink" | "warning"
> = {
  ativo: "success",
  novo: "primary",
  concluido: "ink",
  trancado: "warning",
}

export default function AlunosTemplate() {
  const [matriculaOpen, setMatriculaOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filtroDisciplina, setFiltroDisciplina] = useState<Disciplina | null>(
    null
  )
  const [page, setPage] = useState(1)

  const filtrados = useMemo(() => {
    const term = search.trim().toLowerCase()
    return ALUNOS.filter((a) => {
      if (term && !a.nome.toLowerCase().includes(term)) return false
      if (
        filtroDisciplina &&
        !a.disciplinas.some((d) => d.disciplina === filtroDisciplina)
      )
        return false
      return true
    })
  }, [search, filtroDisciplina])

  const safePage = Math.min(
    Math.max(1, page),
    Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE))
  )
  const paged = filtrados.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  const columns: Column<Aluno>[] = [
    {
      key: "aluno",
      header: "Aluno",
      cell: (a) => (
        <div className="flex items-center gap-3 min-w-0">
          <Avatar fallback={a.nome} />
          <div className="min-w-0">
            <div className="font-medium truncate">{a.nome}</div>
            <div className="text-xs text-[var(--color-text-muted)] truncate">
              {a.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "levels",
      header: "Levels",
      cell: (a) => (
        <div className="flex flex-wrap gap-1">
          {a.disciplinas.map((d) => (
            <Badge key={d.disciplina} variant="primary" size="sm">
              {d.disciplina[0]}: {d.levelAtual}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "ultimaSessao",
      header: "Última sessão",
      cell: (a) => new Date(a.ultimaSessao).toLocaleDateString("pt-BR"),
    },
    {
      key: "status",
      header: "Status",
      cell: (a) => (
        <Badge variant={STATUS_VARIANT[a.status]} size="sm">
          {a.status}
        </Badge>
      ),
    },
    {
      key: "acoes",
      header: "",
      align: "right",
      width: "64px",
      cell: () => (
        <IconButton
          aria-label="Ações do aluno"
          size="sm"
          variant="ghost"
          icon={<MoreHorizontal />}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <HeroBanner
        eyebrow="GESTÃO"
        title="Alunos"
        description={`${ALUNOS.length} alunos cadastrados em Kumon Camargos. Acompanhe levels, status e última sessão de cada um.`}
      />

      <div className="p-4 md:p-8 space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle>Lista de alunos</CardTitle>
            <Button
              variant="primary"
              onClick={() => setMatriculaOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo aluno
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                placeholder="Buscar aluno por nome..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                leadingIcon={<Search />}
                containerClassName="md:flex-1"
              />
              <div className="flex flex-wrap gap-2">
                {DISCIPLINAS.map((d) => (
                  <Chip
                    key={d}
                    label={d}
                    active={filtroDisciplina === d}
                    onClick={() => {
                      setFiltroDisciplina(filtroDisciplina === d ? null : d)
                      setPage(1)
                    }}
                  />
                ))}
              </div>
            </div>

            <DataTable
              columns={columns}
              data={paged}
              emptyState={
                <div className="space-y-1">
                  <div className="font-medium text-[var(--color-text)]">
                    Nenhum aluno encontrado
                  </div>
                  <div className="text-sm">
                    Ajuste a busca ou os filtros para ver mais resultados.
                  </div>
                </div>
              }
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-[var(--color-text-muted)]">
                Mostrando {paged.length} de {filtrados.length} aluno
                {filtrados.length === 1 ? "" : "s"}
              </div>
              <Pagination
                total={filtrados.length}
                pageSize={PAGE_SIZE}
                value={safePage}
                onChange={setPage}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <MatriculaModal
        open={matriculaOpen}
        onClose={() => setMatriculaOpen(false)}
      />
    </div>
  )
}
