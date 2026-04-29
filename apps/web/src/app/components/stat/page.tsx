import { Stat } from "@impactx/ds-education"
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
          <div className="grid grid-cols-4 gap-4">
            <Stat asCard label="Total Students" value="1.247" />
            <Stat asCard label="Completion Rate" value="87%" />
            <Stat asCard label="Average Score" value="78.4" />
            <Stat asCard label="Tests Taken" value="3.421" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com delta
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-4 gap-4">
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
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem card (inline)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-4 gap-4">
            <Stat label="Total Students" value="1.247" />
            <Stat label="Completion Rate" value="87%" />
            <Stat label="Average Score" value="78.4" />
            <Stat label="Tests Taken" value="3.421" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com ícone
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
      </section>
    </main>
  )
}
