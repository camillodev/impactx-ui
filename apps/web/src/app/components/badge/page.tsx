import { Badge, CodeBlock } from "@impactx/ds-education"
import { Check, AlertTriangle, X, Info, Star } from "lucide-react"

const variants = [
  { key: "primary", label: "Primary",  icon: <Info size={12} /> },
  { key: "success", label: "Success",  icon: <Check size={12} /> },
  { key: "ink",     label: "Ink",      icon: <Star size={12} /> },
  { key: "warning", label: "Warning",  icon: <AlertTriangle size={12} /> },
  { key: "danger",  label: "Danger",   icon: <X size={12} /> },
] as const

const sizes = [
  { key: "sm", label: "Small"  },
  { key: "md", label: "Medium" },
  { key: "lg", label: "Large"  },
] as const

const modifiers = [
  { key: "text",      label: "Text only"  },
  { key: "icon-left", label: "Icon left"  },
  { key: "icon-only", label: "Icon only"  },
] as const

export default function BadgePage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] p-10">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-8">Badge</h1>

      {variants.map(({ key: variant, label: variantLabel, icon }) => (
        <section key={variant} className="mb-10">
          <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
            {variantLabel}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizes.map(({ key: size, label: sizeLabel }) => (
              <div key={size} className="flex flex-col gap-3">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">{sizeLabel}</p>

                {modifiers.map(({ key: modifier, label: modLabel }) => (
                  <div key={modifier} className="flex flex-col gap-1">
                    <span className="text-[10px] text-[var(--color-text-subtle)]">{modLabel}</span>
                    <Badge
                      variant={variant}
                      size={size}
                      icon={modifier !== "text" ? icon : undefined}
                      iconOnly={modifier === "icon-only"}
                    >
                      {modifier !== "icon-only"
                        ? `${variantLabel} ${sizeLabel}`
                        : null}
                    </Badge>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-10 max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Badge } from "@impactx/ds-education"

<Badge variant="primary">Novo</Badge>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Com variant + size</p>
            <CodeBlock language="tsx">{`<Badge variant="success" size="lg">Ativo</Badge>
<Badge variant="danger" size="sm">Erro</Badge>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Com ícone</p>
            <CodeBlock language="tsx">{`import { Check } from "lucide-react"

<Badge variant="success" icon={<Check size={12} />}>
  Concluído
</Badge>

<Badge variant="primary" icon={<Check size={12} />} iconOnly />`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
