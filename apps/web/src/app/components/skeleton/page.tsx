import { Skeleton, CodeBlock, Grid } from "@impactxlab/ds-education"

export default function SkeletonPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] p-10">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-8">Skeleton</h1>

      {/* Full-width line */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Full-width Line
        </h2>
        <div className="max-w-2xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </section>

      {/* Multi-line stack */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Multi-line Stack
        </h2>
        <div className="max-w-2xl space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>

      {/* Avatar circle */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Avatar Circle
        </h2>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      </section>

      {/* Card skeleton */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Card Skeleton
        </h2>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" className="max-w-4xl">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border border-[var(--color-border)] rounded-lg space-y-3"
            >
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </Grid>
      </section>

      {/* Text skeleton variations */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Text Variations
        </h2>
        <div className="max-w-2xl space-y-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Heading</p>
            <Skeleton className="h-8 w-64" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Subheading</p>
            <Skeleton className="h-6 w-96" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Body text</p>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </section>

      {/* Code examples */}
      <section className="mb-10 max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Skeleton } from "@impactxlab/ds-education"

<Skeleton className="h-4 w-full" />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Múltiplas linhas</p>
            <CodeBlock language="tsx">{`<div className="space-y-2">
  <Skeleton className="h-6 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Avatar redondo</p>
            <CodeBlock language="tsx">{`<Skeleton className="h-10 w-10 rounded-full" />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Card completo</p>
            <CodeBlock language="tsx">{`<div className="p-4 border border-[var(--color-border)] rounded-lg space-y-3">
  <Skeleton className="h-40 w-full rounded-md" />
  <Skeleton className="h-6 w-24" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
  <Skeleton className="h-10 w-full rounded-md" />
</div>`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
