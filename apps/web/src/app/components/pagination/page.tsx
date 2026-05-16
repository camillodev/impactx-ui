"use client"

import * as React from "react"
import { Pagination } from "@impactxlab/ds-education"

export default function PaginationPage() {
  const [smallPage, setSmallPage] = React.useState(1)
  const [bigPage, setBigPage] = React.useState(7)
  const [hugePage, setHugePage] = React.useState(50)

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Pagination</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Navegação numérica com prev/next. Active = primary bg.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Pequena (5 páginas)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Pagination
            total={50}
            pageSize={10}
            value={smallPage}
            onChange={setSmallPage}
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Página atual: <span className="font-mono">{smallPage}</span>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Média (12 páginas) — com dots
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Pagination
            total={120}
            pageSize={10}
            value={bigPage}
            onChange={setBigPage}
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Página atual: <span className="font-mono">{bigPage}</span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Grande (100 páginas)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Pagination
            total={1000}
            pageSize={10}
            value={hugePage}
            onChange={setHugePage}
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Página atual: <span className="font-mono">{hugePage}</span>
          </p>
        </div>
      </section>
    </main>
  )
}
