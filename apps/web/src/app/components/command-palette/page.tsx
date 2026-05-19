"use client"

import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  Badge,
  Separator,
  Button,
  CommandPalette,
  useCommandPalette,
  type CommandPaletteGroup,
} from "@impactxlab/design-system"
import { Search, Box, Layers } from "lucide-react"

const DEMO_GROUPS: CommandPaletteGroup[] = [
  {
    heading: "Components · Atoms",
    items: [
      { label: "Button", description: "7 variants × 3 sizes", href: "/components/button", icon: Box, keywords: ["cta", "action"] },
      { label: "Badge", description: "5 variants pastel", href: "/components/badge", icon: Box, keywords: ["tag", "label"] },
      { label: "Input", description: "Label, error, leading icon", href: "/components/input", icon: Box, keywords: ["form", "field"] },
    ],
  },
  {
    heading: "Components · Molecules",
    items: [
      { label: "Modal", description: "Default / Welcome / Split", href: "/components/modal", icon: Layers, keywords: ["dialog", "overlay"] },
      { label: "Toast", description: "Success / Info / Warn / Error", href: "/components/toast", icon: Layers, keywords: ["notification"] },
    ],
  },
]

export default function CommandPaletteShowcase() {
  const router = useRouter()
  const { open, setOpen } = useCommandPalette()

  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Molecule</Badge>
        <h1 className="text-3xl font-semibold">CommandPalette</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Paleta de comandos genérica — aceita <code>groups</code> por prop, reutilizável em qualquer app.
          Atalho <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-xs font-mono">⌘K</kbd>.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Trigger</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Clique no botão ou pressione{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-xs font-mono">⌘K</kbd>{" "}
                para abrir. O showcase usa grupos de demonstração (não o registry completo).
              </p>
              <Button variant="secondary" size="md" onClick={() => setOpen(true)} className="self-start">
                <Search size={16} />
                Pesquisar (⌘K)
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">API</h2>
        <Card>
          <CardContent>
            <div className="py-4 space-y-2 text-sm font-mono">
              <div><span className="text-[var(--color-text-muted)]">open</span>: boolean</div>
              <div><span className="text-[var(--color-text-muted)]">onOpenChange</span>: (open: boolean) =&gt; void</div>
              <div><span className="text-[var(--color-text-muted)]">groups</span>: CommandPaletteGroup[]</div>
              <div><span className="text-[var(--color-text-muted)]">placeholder?</span>: string</div>
              <div><span className="text-[var(--color-text-muted)]">title?</span>: string <span className="text-[var(--color-text-muted)] font-sans text-xs">— a11y, visually hidden</span></div>
              <div><span className="text-[var(--color-text-muted)]">description?</span>: string <span className="text-[var(--color-text-muted)] font-sans text-xs">— a11y, visually hidden</span></div>
              <div><span className="text-[var(--color-text-muted)]">onNavigate?</span>: (href: string) =&gt; void</div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Estado</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-2 py-4 text-sm">
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                open: <span className="text-[var(--color-text)]">{String(open)}</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={DEMO_GROUPS}
        placeholder="Buscar componentes..."
        title="Buscar componentes"
        description="Navegue pelos componentes do design system"
        onNavigate={(href) => router.push(href)}
      />
    </div>
  )
}
