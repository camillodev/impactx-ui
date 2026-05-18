"use client"

import * as React from "react"
import { DonutChart, BarChart, LineChart, AreaChart, Grid } from "@impactxlabs/ui"

export default function ChartsPage() {
  const [tick, setTick] = React.useState(0)

  // Re-render on theme/mode change (listen to <html class>/<html data-mode>)
  React.useEffect(() => {
    const obs = new MutationObserver(() => setTick((t) => t + 1))
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-mode"],
    })
    return () => obs.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Charts</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Wrappers de Apache ECharts (lazy-loaded). Cores resolvidas via CSS vars do tema ativo.
      </p>

      {/* Donut */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          DonutChart — single value
        </h2>
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="lg" className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] items-center">
          <DonutChart value={64} size={140} themeKey={tick} centerSubtext="Reading" />
          <DonutChart value={78} size={140} themeKey={tick} centerSubtext="Math" tone="success" />
          <DonutChart value={42} size={140} themeKey={tick} centerSubtext="Writing" tone="warning" />
          <DonutChart value={29} size={140} themeKey={tick} centerSubtext="History" tone="danger" />
        </Grid>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          DonutChart — multi-series com legenda
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] flex justify-center">
          <DonutChart
            size={240}
            thickness={28}
            showLegend
            themeKey={tick}
            series={[
              { name: "Math", value: 42, tone: "primary" },
              { name: "Reading", value: 28, tone: "success" },
              { name: "Writing", value: 18, tone: "warning" },
              { name: "Science", value: 12, tone: "danger" },
            ]}
          />
        </div>
      </section>

      {/* Bar */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          BarChart — single & multi-series
        </h2>
        <Grid cols={{ base: 1, md: 2 }} gap="lg" className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BarChart
            categories={["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"]}
            series={[{ name: "Success rate", data: [78, 65, 82, 58, 91, 73], tone: "primary" }]}
            themeKey={tick}
          />
          <BarChart
            categories={["6th", "7th", "8th", "9th", "10th"]}
            series={[
              { name: "Reading", data: [78, 82, 75, 70, 68], tone: "primary" },
              { name: "Math", data: [65, 71, 80, 84, 88], tone: "success" },
            ]}
            themeKey={tick}
          />
        </Grid>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          BarChart — horizontal
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BarChart
            horizontal
            height={240}
            categories={["Class A", "Class B", "Class C", "Class D", "Class E"]}
            series={[{ name: "Participation", data: [92, 78, 64, 88, 71], tone: "primary" }]}
            showLegend={false}
            themeKey={tick}
          />
        </div>
      </section>

      {/* Line */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          LineChart
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <LineChart
            categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            series={[
              { name: "Reading", data: [64, 68, 72, 75, 78, 82, 85], tone: "primary" },
              { name: "Math", data: [58, 62, 65, 70, 74, 77, 80], tone: "success" },
              { name: "Writing", data: [45, 48, 52, 56, 60, 64, 68], tone: "warning" },
            ]}
            themeKey={tick}
          />
        </div>
      </section>

      {/* Area */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          AreaChart
        </h2>
        <div className="rounded-xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <AreaChart
            categories={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]}
            series={[
              { name: "Active students", data: [120, 180, 250, 310, 420, 580], tone: "primary" },
            ]}
            showLegend={false}
            themeKey={tick}
          />
        </div>
      </section>
    </main>
  )
}
