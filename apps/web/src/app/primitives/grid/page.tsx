import { Grid, Card, CardContent, CodeBlock } from "@impactxlabs/ui"

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-4 text-center text-sm text-[var(--color-text)]">
      {children}
    </div>
  )
}

export default function GridShowcase() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">Grid</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Grid responsivo. Prop <code className="font-mono">cols</code> aceita número simples
        ou objeto responsivo mobile-first.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Cols=3 (fixo)
        </h2>
        <Grid cols={3} gap="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <DemoBox key={i}>Item {i + 1}</DemoBox>
          ))}
        </Grid>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`cols={{ base: 1, md: 2, lg: 3 }} — responsive mobile-first`}
        </h2>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <DemoBox key={i}>Item {i + 1}</DemoBox>
          ))}
        </Grid>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Dashboard stats — cols={{ base: 1, sm: 2, lg: 4 }} gap="lg"`}
        </h2>
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg">
          {["Alunos ativos", "Matrículas mês", "Inadimplência", "Receita"].map((label, i) => (
            <Card key={i}>
              <CardContent>
                <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {label}
                </p>
                <p className="text-3xl font-bold text-[var(--color-text)]">
                  {[124, 18, "3.2%", "R$ 47k"][i]}
                </p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">Uso</h2>
        <CodeBlock language="tsx">{`import { Grid } from "@impactxlabs/ui"

// Fixo
<Grid cols={3} gap="md">{children}</Grid>

// Responsivo mobile-first
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">{children}</Grid>

// Dashboard
<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg">
  <MetricCard />
  <MetricCard />
  <MetricCard />
  <MetricCard />
</Grid>`}</CodeBlock>
      </section>
    </main>
  )
}
