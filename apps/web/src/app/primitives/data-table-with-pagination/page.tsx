"use client"

import * as React from "react"
import {
  DataTableWithPagination,
  type Column,
  Badge,
  Button,
  CodeBlock,
} from "@impactxlab/ds-education"

interface Aluno {
  id: number
  nome: string
  cpf: string
  turma: string
  status: "ativo" | "inadimplente" | "trancado"
  matriculadoEm: string
}

const STATUS_VARIANT: Record<Aluno["status"], "success" | "danger" | "ink"> = {
  ativo: "success",
  inadimplente: "danger",
  trancado: "ink",
}

const STATUS_LABEL: Record<Aluno["status"], string> = {
  ativo: "Ativo",
  inadimplente: "Inadimplente",
  trancado: "Trancado",
}

const FIRST_NAMES = [
  "Maria", "João", "Ana", "Pedro", "Larissa", "Carlos", "Fernanda",
  "Rafael", "Beatriz", "Lucas", "Camila", "Eduardo", "Sofia", "Henrique",
  "Isabela", "Felipe", "Júlia", "Gabriel", "Mariana", "Diego",
]
const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Lima", "Mendes", "Costa",
  "Pereira", "Almeida", "Rodrigues", "Ferreira", "Carvalho", "Ribeiro",
  "Martins", "Gomes",
]
const TURMAS = ["Matemática A", "Português B", "Inglês C", "Matemática D"]
const STATUSES: Aluno["status"][] = ["ativo", "ativo", "ativo", "inadimplente", "trancado"]

function generateAlunos(count: number): Aluno[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    nome: `${FIRST_NAMES[i % FIRST_NAMES.length]!} ${LAST_NAMES[(i * 7) % LAST_NAMES.length]!}`,
    cpf: `${String((i * 13) % 1000).padStart(3, "0")}.${String((i * 27) % 1000).padStart(3, "0")}.${String((i * 41) % 1000).padStart(3, "0")}-${String((i * 9) % 100).padStart(2, "0")}`,
    turma: TURMAS[i % TURMAS.length]!,
    status: STATUSES[i % STATUSES.length]!,
    matriculadoEm: new Date(2024, (i % 12), 1 + (i % 28)).toLocaleDateString("pt-BR"),
  }))
}

const ALUNOS = generateAlunos(47)

export default function DataTableWithPaginationShowcase() {
  const columns: Column<Aluno>[] = [
    {
      key: "nome",
      header: "Nome",
      cell: (a) => <span className="font-medium">{a.nome}</span>,
      sortable: true,
      sortAccessor: (a) => a.nome,
    },
    {
      key: "cpf",
      header: "CPF",
      cell: (a) => <span className="font-mono text-xs">{a.cpf}</span>,
    },
    {
      key: "turma",
      header: "Turma",
      cell: (a) => a.turma,
      sortable: true,
      sortAccessor: (a) => a.turma,
    },
    {
      key: "status",
      header: "Status",
      cell: (a) => (
        <Badge variant={STATUS_VARIANT[a.status]} size="sm">
          {STATUS_LABEL[a.status]}
        </Badge>
      ),
    },
    {
      key: "matriculadoEm",
      header: "Matriculado em",
      cell: (a) => a.matriculadoEm,
      sortable: true,
      sortAccessor: (a) => a.matriculadoEm,
    },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: () => (
        <Button variant="tertiary" size="sm">
          Editar
        </Button>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">
        DataTableWithPagination
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Composto que junta DataTable + Pagination + state interno. Resolve tabela
        paginada client-side com loading, empty state, ordenação e contador.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          47 alunos, 10 por página (default)
        </h2>
        <DataTableWithPagination columns={columns} data={ALUNOS} />
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          pageSize=5 — paginação mais densa
        </h2>
        <DataTableWithPagination columns={columns} data={ALUNOS} pageSize={5} />
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Empty state
        </h2>
        <DataTableWithPagination
          columns={columns}
          data={[]}
          emptyState="Nenhum aluno encontrado com esses filtros."
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Loading state
        </h2>
        <DataTableWithPagination
          columns={columns}
          data={[]}
          loading
          loadingRows={5}
        />
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">Uso</h2>
        <CodeBlock language="tsx">{`import { DataTableWithPagination, type Column } from "@impactxlab/ds-education"

const columns: Column<Aluno>[] = [
  { key: "nome", header: "Nome", cell: (a) => a.nome, sortable: true, sortAccessor: (a) => a.nome },
  { key: "status", header: "Status", cell: (a) => <Badge>{a.status}</Badge> },
  { key: "actions", header: "", align: "right", cell: (a) => <Button size="sm">Editar</Button> },
]

<DataTableWithPagination
  columns={columns}
  data={alunos}
  pageSize={20}
  onRowClick={(a) => router.push(\`/alunos/\${a.id}\`)}
/>`}</CodeBlock>
      </section>
    </main>
  )
}
