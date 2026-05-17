import Link from "next/link"
import { Grid } from "@impactxlab/ds-education"

const PRIMITIVES = [
  {
    slug: "grid",
    name: "Grid",
    desc: "Grid responsivo declarativo. Substitui grid-cols-N cru.",
  },
  {
    slug: "stack",
    name: "Stack",
    desc: "Flex container com gap consistente, direção única.",
  },
  {
    slug: "cluster",
    name: "Cluster",
    desc: "Flex horizontal com wrap automático (Every Layout pattern).",
  },
  {
    slug: "page-container",
    name: "PageContainer",
    desc: "Wrapper de página com max-width e padding responsivo.",
  },
  {
    slug: "data-table-with-pagination",
    name: "DataTableWithPagination",
    desc: "Tabela paginada client-side, composta de DataTable + Pagination.",
  },
] as const

export default function PrimitivesIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Layout Primitives</h1>
      <p className="text-base text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Primitivos de layout responsivo que substituem composições manuais de{" "}
        <code className="font-mono text-sm bg-[var(--color-surface-muted)] px-1.5 py-0.5 rounded">
          {`<div className="grid grid-cols-3 gap-4">`}
        </code>
        . Bot consumidor recebe API tipada, não decide breakpoint em string.
      </p>

      <Grid cols={{ base: 1, md: 2 }} gap="md">
        {PRIMITIVES.map(({ slug, name, desc }) => (
          <Link
            key={slug}
            href={`/primitives/${slug}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">{name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
          </Link>
        ))}
      </Grid>
    </main>
  )
}
