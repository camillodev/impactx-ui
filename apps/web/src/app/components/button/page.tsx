import { Button } from "@impactx/ds-education"
import { ArrowRight, Plus } from "lucide-react"

const variants = [
  { key: "primary",        label: "Primary",         dark: false },
  { key: "secondary",      label: "Secondary",       dark: false },
  { key: "tertiary",       label: "Tertiary",        dark: false },
  { key: "tertiary-dark",  label: "Tertiary Dark",   dark: true  },
  { key: "danger-primary", label: "Danger Primary",  dark: false },
  { key: "danger-secondary", label: "Danger Secondary", dark: false },
  { key: "danger-tertiary",  label: "Danger Tertiary",  dark: false },
] as const

const sizes = [
  { key: "sm", label: "sm — 28px" },
  { key: "md", label: "md — 36px" },
  { key: "lg", label: "lg — 44px" },
] as const

export default function ButtonPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[#1e2124] mb-1">Button</h1>
      <p className="text-sm text-[#999ea3] mb-10">
        Tokens Figma SAS/Alfabeto — radius 8px, Metropolis SemiBold, sem shadow.
      </p>

      {variants.map(({ key, label, dark }) => (
        <section key={key} className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#999ea3] mb-4">
            {label}
          </h2>

          {/* Sizes × States */}
          <div
            className={`rounded-xl p-6 flex flex-col gap-6 ${dark ? "bg-[#1e2124]" : "bg-white border border-[#e5e7eb]"}`}
          >
            {/* Header row */}
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-4 items-center">
              <span className="text-xs text-[#999ea3]">Size</span>
              <span className="text-xs text-[#999ea3]">Default</span>
              <span className="text-xs text-[#999ea3]">Icon Left</span>
              <span className="text-xs text-[#999ea3]">Icon Right</span>
              <span className="text-xs text-[#999ea3]">Disabled</span>
            </div>

            {sizes.map(({ key: sizeKey, label: sizeLabel }) => (
              <div
                key={sizeKey}
                className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-4 items-center"
              >
                <span className={`text-xs font-mono ${dark ? "text-[#999ea3]" : "text-[#999ea3]"}`}>
                  {sizeLabel}
                </span>

                {/* Default */}
                <Button variant={key} size={sizeKey}>
                  Button
                </Button>

                {/* Icon left */}
                <Button variant={key} size={sizeKey}>
                  <Plus />
                  Button
                </Button>

                {/* Icon right */}
                <Button variant={key} size={sizeKey}>
                  Button
                  <ArrowRight />
                </Button>

                {/* Disabled */}
                <Button variant={key} size={sizeKey} disabled>
                  Button
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Aliases legados */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#999ea3] mb-4">
          Aliases legados (compatibilidade)
        </h2>
        <div className="rounded-xl p-6 bg-white border border-[#e5e7eb] flex flex-col gap-6">
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
            <span className="text-xs text-[#999ea3]">Alias</span>
            <span className="text-xs text-[#999ea3]">Mapa para</span>
            <span className="text-xs text-[#999ea3]">Exemplo</span>
          </div>
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
            <span className="text-xs font-mono text-[#999ea3]">outline</span>
            <span className="text-xs text-[#1e2124]">secondary</span>
            <Button variant="outline" size="md">outline alias</Button>
          </div>
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
            <span className="text-xs font-mono text-[#999ea3]">ghost</span>
            <span className="text-xs text-[#1e2124]">tertiary</span>
            <Button variant="ghost" size="md">ghost alias</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
