import { IconButton } from "@camillodev/ui"
import { Bell, HelpCircle, Trash2, Plus, ChevronRight, Settings } from "lucide-react"

const variants = [
  { key: "ghost",   label: "Ghost (default)" },
  { key: "filled",  label: "Filled" },
  { key: "outline", label: "Outline" },
  { key: "danger",  label: "Danger" },
] as const

const sizes = [
  { key: "sm", label: "sm — 32px" },
  { key: "md", label: "md — 36px" },
  { key: "lg", label: "lg — 40px" },
] as const

const iconFor = {
  ghost:   <Bell />,
  filled:  <Plus />,
  outline: <Settings />,
  danger:  <Trash2 />,
} as const

export default function IconButtonPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">IconButton</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Botão quadrado/circular só com ícone. aria-label obrigatório.
      </p>

      {variants.map(({ key, label }) => (
        <section key={key} className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
            {label}
          </h2>
          <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] grid grid-cols-[120px_1fr_1fr_1fr] gap-4 items-center">
            <span className="text-xs text-[var(--color-text-muted)]">Size</span>
            <span className="text-xs text-[var(--color-text-muted)]">Square</span>
            <span className="text-xs text-[var(--color-text-muted)]">Circle</span>
            <span className="text-xs text-[var(--color-text-muted)]">Disabled</span>

            {sizes.map(({ key: sizeKey, label: sizeLabel }) => (
              <div key={sizeKey} className="contents">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{sizeLabel}</span>
                <IconButton aria-label="Demo" variant={key} size={sizeKey} icon={iconFor[key]} />
                <IconButton aria-label="Demo" variant={key} size={sizeKey} shape="circle" icon={iconFor[key]} />
                <IconButton aria-label="Demo" variant={key} size={sizeKey} disabled icon={iconFor[key]} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Em contexto — header actions
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center gap-2">
          <IconButton aria-label="Notificações" icon={<Bell />} />
          <IconButton aria-label="Ajuda" icon={<HelpCircle />} />
          <IconButton aria-label="Configurações" icon={<Settings />} />
          <span className="ml-auto text-xs text-[var(--color-text-muted)]">→ row de ações típica de header</span>
          <IconButton aria-label="Próximo" variant="filled" shape="circle" icon={<ChevronRight />} />
        </div>
      </section>
    </main>
  )
}
