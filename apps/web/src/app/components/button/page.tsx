import { Button, CodeBlock } from "@impactxlabs/ui"
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
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Button</h1>
      <p className="text-sm text-[var(--color-text-subtle)] mb-10">
        Tokens Figma SAS/Alfabeto — radius 8px, Metropolis SemiBold, sem shadow.
      </p>

      {variants.map(({ key, label, dark }) => (
        <section key={key} className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)] mb-4">
            {label}
          </h2>

          {/* Sizes × States */}
          <div
            className={`rounded-xl p-6 flex flex-col gap-6 ${dark ? "bg-[var(--color-text)]" : "bg-white border border-[var(--color-border)]"}`}
          >
            {/* Header row */}
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-4 items-center">
              <span className="text-xs text-[var(--color-text-subtle)]">Size</span>
              <span className="text-xs text-[var(--color-text-subtle)]">Default</span>
              <span className="text-xs text-[var(--color-text-subtle)]">Icon Left</span>
              <span className="text-xs text-[var(--color-text-subtle)]">Icon Right</span>
              <span className="text-xs text-[var(--color-text-subtle)]">Disabled</span>
            </div>

            {sizes.map(({ key: sizeKey, label: sizeLabel }) => (
              <div
                key={sizeKey}
                className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-4 items-center"
              >
                <span className={`text-xs font-mono ${dark ? "text-[var(--color-text-subtle)]" : "text-[var(--color-text-subtle)]"}`}>
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-subtle)] mb-4">
          Aliases legados (compatibilidade)
        </h2>
        <div className="rounded-xl p-6 bg-white border border-[var(--color-border)] flex flex-col gap-6">
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
            <span className="text-xs text-[var(--color-text-subtle)]">Alias</span>
            <span className="text-xs text-[var(--color-text-subtle)]">Mapa para</span>
            <span className="text-xs text-[var(--color-text-subtle)]">Exemplo</span>
          </div>
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
            <span className="text-xs font-mono text-[var(--color-text-subtle)]">ghost</span>
            <span className="text-xs text-[var(--color-text)]">tertiary</span>
            <Button variant="ghost" size="md">ghost alias</Button>
          </div>
        </div>
      </section>

      <section className="mb-12 max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Button } from "@impactxlabs/ui"

<Button variant="primary" size="md">Click me</Button>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Com variant + size</p>
            <CodeBlock language="tsx">{`<Button variant="secondary" size="lg">Salvar</Button>
<Button variant="danger-primary" size="sm">Excluir</Button>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Com ícone + onClick</p>
            <CodeBlock language="tsx">{`import { ArrowRight } from "lucide-react"

<Button variant="primary" size="md" onClick={() => console.log("ok")}>
  Avançar
  <ArrowRight />
</Button>`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
