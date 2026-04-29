"use client"

import { Tooltip, TooltipProvider } from "@impactx/ds-education"

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-[#f7f7f7] p-10">
        <h1 className="text-2xl font-semibold text-[#1e2124] mb-2">Tooltip</h1>
        <p className="text-sm text-[#6b7280] mb-10">
          8 posições + delay customizado. Hover nos botões para ativar.
        </p>

        <section className="mb-10">
          <h2 className="text-xs font-medium text-[#999ea3] uppercase tracking-wide mb-6">
            Posições (delay padrão 300ms)
          </h2>
          <div className="grid grid-cols-3 gap-6 max-w-3xl">
            <Tooltip content="Tooltip — Top Start" side="top" align="start">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Top Start</button>
            </Tooltip>
            <Tooltip content="Tooltip — Top Center" side="top" align="center">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Top Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Top End" side="top" align="end">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Top End</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right Start" side="right" align="start">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Right Start</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right Center" side="right" align="center">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Right Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Right End" side="right" align="end">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Right End</button>
            </Tooltip>
            <Tooltip content="Tooltip — Bottom Center" side="bottom" align="center">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Bottom Center</button>
            </Tooltip>
            <Tooltip content="Tooltip — Left Center" side="left" align="center">
              <button className="w-full rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">Left Center</button>
            </Tooltip>
            <Tooltip content="Delay de 800ms neste tooltip" side="top" align="center" delayDuration={800}>
              <button className="w-full rounded-lg border border-[#0467db] bg-[#0467db] px-4 py-3 text-sm font-medium text-white hover:bg-[#034da4] transition-colors">Delay 800ms</button>
            </Tooltip>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium text-[#999ea3] uppercase tracking-wide mb-4">
            Com conteúdo longo (max-width 240px)
          </h2>
          <Tooltip
            content="Este é um tooltip com texto mais longo para demonstrar o comportamento de quebra de linha com max-width de 240px."
            side="right"
          >
            <button className="rounded-lg border border-[#c9cccf] bg-white px-4 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors">
              Texto longo
            </button>
          </Tooltip>
        </section>
      </main>
    </TooltipProvider>
  )
}
