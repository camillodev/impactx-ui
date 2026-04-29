"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import {
  Search,
  Component,
  FileBox,
  LayoutGrid,
  BarChart3,
  Layers,
  Box,
  ArrowRight,
} from "lucide-react"
import { allItems, type RegistryItem } from "../registry"
import { cn } from "../utils"

const CATEGORY_LABEL: Record<RegistryItem["category"], string> = {
  page: "Páginas",
  atom: "Components · Atoms",
  molecule: "Components · Molecules",
  chart: "Components · Charts",
  organism: "Components · Organisms",
  example: "Exemplos",
}

const CATEGORY_ICON: Record<RegistryItem["category"], React.ComponentType<{ className?: string }>> = {
  page: LayoutGrid,
  atom: Box,
  molecule: Layers,
  chart: BarChart3,
  organism: Component,
  example: FileBox,
}

// Ordem de renderização dos grupos
const CATEGORY_ORDER: RegistryItem["category"][] = [
  "page",
  "example",
  "atom",
  "molecule",
  "chart",
  "organism",
]

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  // Reset query ao fechar
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 150)
      return () => clearTimeout(t)
    }
  }, [open])

  // Agrupa items por categoria preservando ordem
  const grouped = React.useMemo(() => {
    const map = new Map<RegistryItem["category"], RegistryItem[]>()
    for (const item of allItems) {
      const list = map.get(item.category) ?? []
      list.push(item)
      map.set(item.category, list)
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      category: c,
      items: map.get(c)!,
    }))
  }, [])

  const handleSelect = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Buscar componentes e telas"
      shouldFilter
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]",
        // overlay
        "[&[data-state=open]]:animate-in [&[data-state=closed]]:animate-out"
      )}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      {/* Dialog */}
      <div
        className="relative w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border)]">
          <Search className="size-4 text-[var(--color-text-muted)] shrink-0" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar componentes, telas ou páginas..."
            className="flex-1 h-12 bg-transparent outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
          />
          <kbd className="hidden md:inline-flex items-center h-6 px-1.5 rounded text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-surface)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-12 text-center text-sm text-[var(--color-text-muted)]">
            Nada encontrado para{" "}
            <span className="font-mono text-[var(--color-text)]">{query}</span>
          </Command.Empty>

          {grouped.map(({ category, items }) => {
            const Icon = CATEGORY_ICON[category]
            return (
              <Command.Group
                key={category}
                heading={CATEGORY_LABEL[category]}
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[var(--color-text-muted)]"
              >
                {items.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.label} ${item.description} ${(item.keywords ?? []).join(" ")} ${item.exampleType ?? ""}`}
                    onSelect={() => handleSelect(item.href)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm",
                      "data-[selected=true]:bg-[var(--color-primary-soft)] data-[selected=true]:text-[var(--color-primary)]"
                    )}
                  >
                    <Icon className="size-4 text-[var(--color-text-muted)] shrink-0 group-data-[selected=true]:text-[var(--color-primary)]" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[var(--color-text)] data-[selected=true]:text-[var(--color-primary)]">
                        {item.label}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] truncate">
                        {item.description}
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-[var(--color-text-muted)] shrink-0 opacity-0 group-data-[selected=true]:opacity-100" />
                  </Command.Item>
                ))}
              </Command.Group>
            )
          })}
        </Command.List>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono">↑↓</kbd> navegar
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> abrir
            </span>
          </div>
          <span>{allItems.length} resultados</span>
        </div>
      </div>
    </Command.Dialog>
  )
}

/** Hook que escuta Cmd+K / Ctrl+K e expõe estado da palette. */
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return { open, setOpen }
}
