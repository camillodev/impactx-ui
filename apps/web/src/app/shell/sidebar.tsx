"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Component, Sparkles } from "lucide-react"
import { Avatar } from "@impactx/ds-education"
import { Separator } from "@impactx/ds-education"
import { cn } from "@impactx/ds-education"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Início",
    icon: LayoutGrid,
    description: "Visão geral do DS",
  },
  {
    href: "/components",
    label: "Components",
    icon: Component,
    description: "Atoms, molecules, organisms",
  },
  {
    href: "/playground",
    label: "Playground",
    icon: Sparkles,
    description: "Tudo + theme switcher",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] overflow-y-auto flex flex-col">
      {/* Brand */}
      <div className="p-5">
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

      <Separator className="!h-px" />

      {/* Nav */}
      <nav className="p-3 flex-1">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <div className="text-[11px] text-[var(--color-text-muted)] px-3 py-1">
          v0.1.0 · 18 components
        </div>
      </div>
    </aside>
  )
}
