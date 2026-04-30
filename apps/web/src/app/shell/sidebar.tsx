"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Component } from "lucide-react"
import { Avatar, Separator, cn, components } from "@impactx/ds-education"
import type { RegistryItem } from "@impactx/ds-education"

type TopLevelItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const topLevel: TopLevelItem[] = [
  { href: "/", label: "Início", icon: LayoutGrid },
]

type CategoryKey = "atom" | "molecule" | "chart" | "organism"

const CATEGORY_ORDER: { key: CategoryKey; label: string }[] = [
  { key: "atom", label: "Atoms" },
  { key: "molecule", label: "Molecules" },
  { key: "chart", label: "Charts" },
  { key: "organism", label: "Organisms" },
]

function groupByCategory(items: RegistryItem[]) {
  const map = new Map<CategoryKey, RegistryItem[]>()
  for (const it of items) {
    const k = it.category as CategoryKey
    if (!CATEGORY_ORDER.find((c) => c.key === k)) continue
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(it)
  }
  return map
}

// TODO: extrair como molecule SidebarSection se padrão se repetir em outras shells

export function Sidebar() {
  const pathname = usePathname()
  const grouped = groupByCategory(components)
  const totalComponents = components.length

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/")

  const componentsActive = pathname.startsWith("/components")

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col h-screen sticky top-0">
      {/* Brand (sticky header) */}
      <div className="p-5 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <Avatar
            size="md"
            shape="rounded"
            fallback="DS"
            className="bg-[var(--color-primary)]"
          />
          <div className="min-w-0">
            <div className="text-sm font-bold text-[var(--color-text)] leading-tight">
              ds-impactx
            </div>
            <div className="text-xs text-[var(--color-text-muted)] leading-tight">
              Design system
            </div>
          </div>
        </Link>
      </div>

      <Separator className="!h-px shrink-0" />

      {/* Nav (scrollable) */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="space-y-0.5">
          {topLevel.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}

          {/* Components header */}
          <li>
            <Link
              href="/components"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors mt-1",
                componentsActive && pathname === "/components"
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
              )}
            >
              <Component className="size-4 shrink-0" />
              <span className="truncate">Components</span>
            </Link>
          </li>
        </ul>

        {/* Categorias */}
        <div className="mt-2">
          {CATEGORY_ORDER.map(({ key, label }) => {
            const items = grouped.get(key) ?? []
            if (items.length === 0) return null
            return (
              <div key={key} className="mt-6">
                <div className="px-3 mb-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                  {label}
                </div>
                <ul className="space-y-0.5">
                  {items.map((it) => {
                    const active = isActive(it.href)
                    return (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors",
                            active
                              ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                              : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]"
                          )}
                        >
                          <span className="truncate">{it.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Footer (sticky bottom) */}
      <div className="p-3 border-t border-[var(--color-border)] shrink-0">
        <div className="text-[11px] text-[var(--color-text-muted)] px-3 py-1">
          v0.1.0 · {totalComponents} components
        </div>
      </div>
    </aside>
  )
}
