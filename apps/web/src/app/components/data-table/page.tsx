"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Badge } from "@impactxlab/design-system"
import { IconButton } from "@impactxlab/design-system"
import { Pagination } from "@impactxlab/design-system"
import { DataTable, type Column } from "@impactxlab/design-system"

type Question = {
  id: number
  number: string
  field: "Reading" | "Math" | "Writing" | "Science"
  difficulty: "Easy" | "Medium" | "Hard"
  successRate: number
  attempts: number
}

const QUESTIONS: Question[] = [
  { id: 1, number: "Q1", field: "Reading", difficulty: "Easy", successRate: 92, attempts: 1248 },
  { id: 2, number: "Q2", field: "Math", difficulty: "Hard", successRate: 34, attempts: 892 },
  { id: 3, number: "Q3", field: "Writing", difficulty: "Medium", successRate: 67, attempts: 1502 },
  { id: 4, number: "Q4", field: "Science", difficulty: "Hard", successRate: 41, attempts: 734 },
  { id: 5, number: "Q5", field: "Math", difficulty: "Easy", successRate: 88, attempts: 2103 },
  { id: 6, number: "Q6", field: "Reading", difficulty: "Medium", successRate: 71, attempts: 1387 },
  { id: 7, number: "Q7", field: "Science", difficulty: "Easy", successRate: 81, attempts: 998 },
  { id: 8, number: "Q8", field: "Writing", difficulty: "Hard", successRate: 28, attempts: 612 },
  { id: 9, number: "Q9", field: "Math", difficulty: "Medium", successRate: 59, attempts: 1721 },
  { id: 10, number: "Q10", field: "Reading", difficulty: "Hard", successRate: 45, attempts: 854 },
  { id: 11, number: "Q11", field: "Science", difficulty: "Medium", successRate: 63, attempts: 1109 },
  { id: 12, number: "Q12", field: "Writing", difficulty: "Easy", successRate: 86, attempts: 1934 },
]

const difficultyVariant: Record<
  Question["difficulty"],
  "success" | "warning" | "danger"
> = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
}

const columns: Column<Question>[] = [
  {
    key: "number",
    header: "#",
    cell: (row) => (
      <span className="font-mono text-[var(--color-text-muted)]">{row.number}</span>
    ),
    width: "80px",
    sortable: true,
    sortAccessor: (row) => row.id,
  },
  {
    key: "field",
    header: "Field",
    cell: (row) => (
      <Badge variant="ink" size="sm">
        {row.field}
      </Badge>
    ),
    sortable: true,
    sortAccessor: (row) => row.field,
  },
  {
    key: "difficulty",
    header: "Difficulty",
    cell: (row) => (
      <Badge variant={difficultyVariant[row.difficulty]} size="sm">
        {row.difficulty}
      </Badge>
    ),
    sortable: true,
    sortAccessor: (row) => row.difficulty,
  },
  {
    key: "successRate",
    header: "Success rate",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-32 bg-[var(--color-surface-muted)] rounded-full h-1.5">
          <div
            className="bg-[var(--color-primary)] h-full rounded-full"
            style={{ width: `${row.successRate}%` }}
          />
        </div>
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {row.successRate}%
        </span>
      </div>
    ),
    sortable: true,
    sortAccessor: (row) => row.successRate,
  },
  {
    key: "attempts",
    header: "Attempts",
    align: "right",
    cell: (row) => (
      <span className="font-mono tabular-nums">{row.attempts.toLocaleString()}</span>
    ),
    sortable: true,
    sortAccessor: (row) => row.attempts,
  },
  {
    key: "action",
    header: "",
    align: "right",
    width: "60px",
    cell: () => (
      <IconButton
        aria-label="Open question"
        size="sm"
        variant="ghost"
        icon={<ChevronRight />}
      />
    ),
  },
]

export default function DataTablePage() {
  const [page, setPage] = React.useState(1)
  const pageSize = 5
  const paged = QUESTIONS.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">
        DataTable
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Headless table organism. Sort interno opcional, density, loading, empty state.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          DataTable + Pagination + sort
        </h2>
        <DataTable
          columns={columns}
          data={paged}
          defaultSort={{ key: "number", direction: "asc" }}
        />
        <div className="mt-4 flex justify-end">
          <Pagination
            total={QUESTIONS.length}
            pageSize={pageSize}
            value={page}
            onChange={setPage}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Compact (density)
        </h2>
        <DataTable
          columns={columns}
          data={QUESTIONS.slice(0, 5)}
          density="compact"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Empty state
        </h2>
        <DataTable
          columns={columns}
          data={[]}
          emptyState="Sem questões para exibir"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Loading
        </h2>
        <DataTable columns={columns} data={[]} loading loadingRows={4} />
      </section>
    </main>
  )
}
