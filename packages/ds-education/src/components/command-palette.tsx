"use client"

import * as React from "react"
import { Command } from "cmdk"
import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "radix-ui"
import { Search, ArrowRight } from "lucide-react"
import { cn } from "../utils"

export interface CommandPaletteItem {
  label: string
  description?: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  keywords?: string[]
  onSelect?: () => void
}

export interface CommandPaletteGroup {
  heading: string
  items: CommandPaletteItem[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandPaletteGroup[]
  placeholder?: string
  /** Título visível apenas para leitores de tela (a11y) */
  title?: string
  /** Descrição visível apenas para leitores de tela (a11y) */
  description?: string
  onNavigate?: (href: string) => void
}

export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = "Buscar...",
  title = "Buscar",
  description,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 150)
      return () => clearTimeout(t)
    }
  }, [open])

  const totalItems = groups.reduce((acc, g) => acc + g.items.length, 0)

  const handleSelect = (item: CommandPaletteItem) => {
    onOpenChange(false)
    if (item.onSelect) {
      item.onSelect()
    } else if (item.href) {
      onNavigate?.(item.href)
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label={title}
      shouldFilter
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]",
        "[&[data-state=open]]:animate-in [&[data-state=closed]]:animate-out"
      )}
    >
      <VisuallyHidden.Root>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
      </VisuallyHidden.Root>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      {/* Dialog panel */}
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
            placeholder={placeholder}
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

          {groups.map((group) => (
            <Command.Group
              key={group.heading}
              heading={group.heading}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[var(--color-text-muted)]"
            >
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <Command.Item
                    key={item.href ?? item.label}
                    value={`${item.label} ${item.description ?? ""} ${(item.keywords ?? []).join(" ")}`}
                    onSelect={() => handleSelect(item)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm",
                      "data-[selected=true]:bg-[var(--color-primary-soft)] data-[selected=true]:text-[var(--color-primary)]"
                    )}
                  >
                    {Icon && (
                      <Icon className="size-4 text-[var(--color-text-muted)] shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[var(--color-text)]">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-xs text-[var(--color-text-muted)] truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="size-3.5 text-[var(--color-text-muted)] shrink-0 opacity-0 group-data-[selected=true]:opacity-100" />
                  </Command.Item>
                )
              })}
            </Command.Group>
          ))}
        </Command.List>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center h-5 px-1.5 rounded font-mono text-[10px] border border-[var(--color-border)] bg-[var(--color-bg)]">↑↓</kbd>
              navegar
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center h-5 px-1.5 rounded font-mono text-[10px] border border-[var(--color-border)] bg-[var(--color-bg)]">↵</kbd>
              selecionar
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center h-5 px-1.5 rounded font-mono text-[10px] border border-[var(--color-border)] bg-[var(--color-bg)]">esc</kbd>
              fechar
            </span>
          </div>
          <span>{totalItems} resultados</span>
        </div>
      </div>
    </Command.Dialog>
  )
}

/** Hook que escuta Cmd+K / Ctrl+K e expõe estado da palette. */
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true
      if (target.isContentEditable) return true
      return false
    }

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isEditableTarget(e.target)
      ) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return { open, setOpen }
}
