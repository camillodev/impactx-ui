"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, Badge, Separator, Button, CommandPalette, useCommandPalette } from "@impactx/ds-education"
import { Search } from "lucide-react"

export default function CommandPaletteShowcase() {
  const router = useRouter()
  const { open, setOpen } = useCommandPalette()

  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Molecule</Badge>
        <h1 className="text-3xl font-semibold">CommandPalette</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Paleta de comandos global — pesquisa rápida por componentes, exemplos e páginas. Atalho <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-xs font-mono">⌘K</kbd>.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Trigger</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Clique no botão abaixo ou pressione <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-xs font-mono">⌘K</kbd> para abrir.
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
        <h2 className="text-xl font-medium mb-4">Estado</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-2 py-4 text-sm">
              <span className="font-mono text-xs text-[var(--color-text-muted)]">open: <span className="text-[var(--color-text)]">{String(open)}</span></span>
              <span className="text-[var(--color-text-muted)]">A paleta é montada globalmente via <code>useCommandPalette()</code>; este showcase apenas dispara abertura.</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <CommandPalette open={open} onOpenChange={setOpen} onNavigate={(href) => router.push(href)} />
    </div>
  )
}
