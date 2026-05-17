import { Stat, Grid } from "@impactxlab/ds-education"
import { TrendingUp, Users } from "lucide-react"

export default function StatPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Stat</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Métrica numérica — label muted, valor grande, delta opcional com trend.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Valores básicos
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <Stat asCard label="Total Students" value="1.247" />
            <Stat asCard label="Completion Rate" value="87%" />
            <Stat asCard label="Average Score" value="78.4" />
            <Stat asCard label="Tests Taken" value="3.421" />
          </Grid>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com delta
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <Stat
              asCard
              label="Conversion"
              value="12,4%"
              delta="+12% vs last test"
              deltaTrend="up"
            />
            <Stat
              asCard
              label="Bounce Rate"
              value="34%"
              delta="-5% vs last week"
              deltaTrend="down"
            />
            <Stat
              asCard
              label="Active Users"
              value="2.108"
              delta="0% vs last month"
              deltaTrend="neutral"
            />
            <Stat
              asCard
              label="Avg Session"
              value="4m 12s"
              delta="+8% vs last week"
              deltaTrend="up"
            />
          </Grid>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Auto-detect de sinal (sem prop deltaTrend)
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Quando <code>deltaTrend</code> não é passado, o sinal do delta string é
          detectado automaticamente: <code>+N</code> → success, <code>-N</code> → danger,
          sem sinal → neutral.
        </p>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, sm: 3 }} gap="md">
            <Stat asCard label="Pré-matrículas" value="142" delta="+12%" />
            <Stat asCard label="Cancelamentos" value="8" delta="-3%" />
            <Stat asCard label="Pendentes" value="24" delta="5%" />
          </Grid>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem card (inline)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <Stat label="Total Students" value="1.247" />
            <Stat label="Completion Rate" value="87%" />
            <Stat label="Average Score" value="78.4" />
            <Stat label="Tests Taken" value="3.421" />
          </Grid>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com ícone
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Grid cols={{ base: 1, md: 2 }} gap="md">
            <Stat
              asCard
              label="Growth"
              value="+24,3%"
              delta="+4,1% vs last month"
              deltaTrend="up"
              icon={<TrendingUp size={16} />}
            />
            <Stat
              asCard
              label="Active Users"
              value="2.108"
              icon={<Users size={16} />}
            />
          </Grid>
        </div>
      </section>
    </main>
  )
}
