"use client"

import { Tooltip, TooltipProvider, Grid } from "@impactxlab/design-system"

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-[var(--color-surface)] p-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">Tooltip</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-10">
          8 posições + delay customizado. Hover nos botões para ativar.
        </p>

        <section className="mb-10">
          <h2 className="text-xs font-medium text-[var(--color-text-subtle)] uppercase tracking-wide mb-6">
            Posições (delay padrão 300ms)
          </h2>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" className="max-w-3xl">
            <Tooltip content="Tooltip — Top Start" side="top" align="start">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Top Start</button>
            </Tooltip>
            <Tooltip content="Tooltip — Top Center" side="top" align="center">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Top Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Top End" side="top" align="end">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Top End</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right Start" side="right" align="start">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Right Start</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right Center" side="right" align="center">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Right Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right End" side="right" align="end">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Right End</button>
            </Tooltip>
            <Tooltip content="Tooltip — Bottom Center" side="bottom" align="center">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Bottom Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Left Center" side="left" align="center">
              <button className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">Left Center</button>
            </Tooltip>
            <Tooltip content="Delay de 800ms neste tooltip" side="top" align="center" delayDuration={800}>
              <button className="w-full rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors">Delay 800ms</button>
            </Tooltip>
          </Grid>
        </section>

        <section>
          <h2 className="text-xs font-medium text-[var(--color-text-subtle)] uppercase tracking-wide mb-4">
            Com conteúdo longo (max-width 240px)
          </h2>
          <Tooltip
            content="Este é um tooltip com texto mais longo para demonstrar o comportamento de quebra de linha com max-width de 240px."
            side="right"
          >
            <button className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">
              Texto longo
            </button>
          </Tooltip>
        </section>
      </main>
    </TooltipProvider>
  )
}
