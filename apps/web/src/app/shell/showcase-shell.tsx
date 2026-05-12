"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  SidebarShell,
  allItems,
  type RegistryItem,
  type CommandPaletteGroup,
} from "@impactx/ds-education"
import {
  LayoutGrid, Box, Layers, BarChart3, Component, FileBox,
} from "lucide-react"
import { Sidebar } from "@/app/shell/sidebar"
import { useTheme } from "@/app/theme-provider"

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

const CATEGORY_ORDER: RegistryItem["category"][] = ["page", "example", "atom", "molecule", "chart", "organism"]

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

function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-[var(--color-text-muted)] hidden md:inline">Tema</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as "education" | "impactx" | "kumon")}
        className="h-9 px-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm font-medium text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <option value="education">Education</option>
        <option value="impactx">Impact X</option>
        <option value="kumon">Kumon</option>
      </select>
    </div>
  )
}

export function ShowcaseShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <SidebarShell
      sidebar={<Sidebar />}
      commandPalette={{
        groups: PALETTE_GROUPS,
        placeholder: "Buscar componentes, telas ou páginas…",
        onNavigate: (href) => router.push(href),
      }}
      darkModeToggle
      userMenu={<ThemeSelector />}
    >
      {children}
    </SidebarShell>
  )
}
