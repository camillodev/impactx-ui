import { DonutScore, Grid, Stack } from "@camillodev/ui"

const sizes = [
  { value: 64, size: 80,  caption: "sm — 80px",  label: "" },
  { value: 78, size: 120, caption: "md — 120px", label: "Acertos da sua Escola" },
  { value: 92, size: 160, caption: "lg — 160px", label: "Acertos da sua Escola" },
] as const

export default function DonutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Donut</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-2">
        SVG nativo, theme-driven. Versão atual via DonutScore (Education).
      </p>
      <p className="text-xs text-[var(--color-text-muted)] mb-10">
        Próxima fase: extrair para <code className="font-mono text-[var(--color-primary)]">DonutChart</code> genérico em <code className="font-mono">@impactx/ds</code>.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sizes
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-10">
          {sizes.map(({ value, size, caption, label }) => (
            <div key={size} className="flex flex-col items-center gap-3">
              <DonutScore value={value} size={size} label={label} />
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{caption}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Estados de valor (sem label)
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg">
            {[0, 25, 75, 100].map((v) => (
              <Stack key={v} gap="sm" className="flex flex-col items-center">
                <DonutScore value={v} size={120} label="" />
                <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{v}%</span>
              </Stack>
            ))}
          </Grid>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Variant warning (alerta)
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-10">
          <DonutScore value={42} size={120} warning />
          <DonutScore value={58} size={120} warning />
        </div>
      </section>
    </main>
  )
}
