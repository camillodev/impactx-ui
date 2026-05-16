"use client"

import * as React from "react"
import { BarChart3, Grid, List } from "lucide-react"
import { Chip, SegmentedControl } from "@impactxlab/ds-education"

const initialRemovable = ["Algebra", "Geometry", "Calculus"]

type AssessmentType = "all" | "diagnostics" | "benchmark" | "interim" | "summative"
type ViewMode = "list" | "grid" | "chart"

const assessmentOptions: { value: AssessmentType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "diagnostics", label: "Diagnostics" },
  { value: "benchmark", label: "Benchmark" },
  { value: "interim", label: "Interim" },
  { value: "summative", label: "Summative" },
]

const viewOptions: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
  { value: "list", label: "List", icon: <List /> },
  { value: "grid", label: "Grid", icon: <Grid /> },
  { value: "chart", label: "Chart", icon: <BarChart3 /> },
]

export default function ChipPage() {
  const [removable, setRemovable] = React.useState(initialRemovable)
  const [assessment, setAssessment] = React.useState<AssessmentType>("all")
  const [view, setView] = React.useState<ViewMode>("list")

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">
        Chip & SegmentedControl
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Pílulas de filtro standalone e agrupadas em controle segmentado.
      </p>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Chip — standalone
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex flex-wrap items-center gap-2">
            <Chip label="Math" />
            <Chip label="Reading" active />
            <Chip label="Writing" />
            <Chip label="Science" active />
            <Chip label="History" />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Chip — com remove
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex flex-wrap items-center gap-2">
            {removable.map((label) => (
              <Chip
                key={label}
                label={label}
                active
                onRemove={() => setRemovable((prev) => prev.filter((l) => l !== label))}
              />
            ))}
            {removable.length === 0 ? (
              <span className="text-sm text-[var(--color-text-muted)]">Todos removidos.</span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Chip — sizes
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <Chip label="Small (28px)" size="sm" />
            <Chip label="Medium (32px)" size="md" />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          SegmentedControl
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <SegmentedControl
            value={assessment}
            onValueChange={setAssessment}
            options={assessmentOptions}
          />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Selecionado: <span className="font-medium text-[var(--color-text)]">{assessment}</span>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          SegmentedControl com ícones
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <SegmentedControl value={view} onValueChange={setView} options={viewOptions} />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Modo: <span className="font-medium text-[var(--color-text)]">{view}</span>
          </p>
        </div>
      </section>
    </main>
  )
}
