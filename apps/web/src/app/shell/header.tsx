"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, Moon, Sun, Menu, Component, FileBox, LayoutGrid, BarChart3, Layers, Box } from "lucide-react"
import { useTheme } from "@/app/theme-provider"
import { IconButton, CommandPalette, useCommandPalette, allItems, type RegistryItem, type CommandPaletteGroup } from "@impactx/ds-education"
import { useMobileNav } from "@/app/shell/mobile-nav-context"

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

const CATEGORY_ORDER: RegistryItem["category"][] = [
  "page",
  "example",
  "atom",
  "molecule",
  "chart",
  "organism",
]

function buildGroups(): CommandPaletteGroup[] {
  const map = new Map<RegistryItem["category"], RegistryItem[]>()
  for (const item of allItems) {
    const list = map.get(item.category) ?? []
    list.push(item)
    map.set(item.category, list)
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
    heading: CATEGORY_LABEL[c],
    items: map.get(c)!.map((item) => ({
      label: item.label,
      description: item.description,
      href: item.href,
      icon: CATEGORY_ICON[c],
      keywords: item.keywords,
    })),
  }))
}

const PALETTE_GROUPS = buildGroups()

function ModeToggle() {
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("ds-mode") as "light" | "dark" | null
    return stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  React.useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark"
    setMode(next)
    document.documentElement.dataset.mode = next
    localStorage.setItem("ds-mode", next)
  }

  return (
    <IconButton
      aria-label={`Trocar para modo ${mode === "dark" ? "claro" : "escuro"}`}
      onClick={toggle}
      variant="outline"
      shape="circle"
      icon={mode === "dark" ? <Sun /> : <Moon />}
    />
  )
}

function SearchTrigger({ onClick }: { onClick: () => void }) {
  const [shortcut] = React.useState(() =>
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform) ? "⌘ K" : "Ctrl K"
  )

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 w-full max-w-md h-10 pl-3 pr-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">Buscar componentes, telas…</span>
      <kbd className="inline-flex items-center h-6 px-1.5 rounded text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg)]">
        {shortcut}
      </kbd>
    </button>
  )
}

export function Header() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { open, setOpen } = useCommandPalette()
  const { openNav } = useMobileNav()

  return (
    <>
      <header className="h-16 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg)] z-10 flex items-center px-4 md:px-6 gap-3 md:gap-4">
        <IconButton
          aria-label="Abrir menu"
          onClick={openNav}
          variant="ghost"
          shape="square"
          icon={<Menu />}
          className="md:hidden"
        />
        <div className="flex-1 flex items-center">
          <SearchTrigger onClick={() => setOpen(true)} />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="theme-switcher" className="text-xs text-[var(--color-text-muted)]">Tema</label>
          <select
            id="theme-switcher"
            aria-label="Trocar tema"
            value={theme}
            onChange={(e) => setTheme(e.target.value as "education" | "impactx" | "kumon")}
            className="h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm font-medium text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="education">Education</option>
            <option value="impactx">Impact X</option>
            <option value="kumon">Kumon</option>
          </select>
          <ModeToggle />
        </div>
      </header>

      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={PALETTE_GROUPS}
        placeholder="Buscar componentes, telas ou páginas..."
        title="Buscar componentes e telas"
        onNavigate={(href) => router.push(href)}
      />
    </>
  )
}
