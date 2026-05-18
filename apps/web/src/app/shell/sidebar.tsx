"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Component, FileText, ChevronRight } from "lucide-react"
import { Avatar, Separator, cn, components } from "@camillodev/ui"
import type { RegistryItem } from "@camillodev/ui"
import { useMobileNav } from "@/app/shell/mobile-nav-context"

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

type TemplateItem = { href: string; label: string }

// TODO(Wave 2): rotas abaixo serão criadas em PR separada (matricula/relatorios/alunos).
// Até lá, links retornam 404 — placeholder intencional pra preparar sidebar.
const TEMPLATES_EDUCATION: TemplateItem[] = [
  { href: "/templates/education/matricula", label: "Matrícula" },
  { href: "/templates/education/relatorios", label: "Relatórios" },
  { href: "/templates/education/alunos", label: "Alunos" },
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

// TODO(PR visual pass): migrar pra SidebarFromConfig do DS. Manter custom aqui só ate la.
// eslint-disable-next-line @impactx/ui/no-duplicate-component
export function Sidebar() {
  const pathname = usePathname()
  const grouped = groupByCategory(components)
  const totalComponents = components.length
  const { open, close } = useMobileNav()

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/")

  const componentsActive = pathname.startsWith("/components")
  const templatesActive = pathname.startsWith("/templates")

  // Default: ambos abertos. Se rota indica group, garantir aberto.
  const [componentsOpen, setComponentsOpen] = useState<boolean>(true)
  const [templatesOpen, setTemplatesOpen] = useState<boolean>(true)

  const isComponentsOpen = componentsOpen || componentsActive
  const isTemplatesOpen = templatesOpen || templatesActive

  return (
    <>
      {/* Backdrop apenas mobile, quando aberto */}
      {open ? (
        <div
          aria-hidden
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      ) : null}

      <aside
        className={cn(
          "w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col h-screen",
          // Mobile: drawer fixo deslizante
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop: estático no flow
          "md:relative md:translate-x-0 md:transition-none md:sticky md:top-0"
        )}
      >
        {/* Brand (sticky header) */}
        <div className="p-5 shrink-0">
          <Link href="/" onClick={close} className="flex items-center gap-3 group">
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
                    onClick={close}
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
          </ul>

          {/* Components group (colapsável) */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setComponentsOpen((v) => !v)}
              aria-expanded={isComponentsOpen}
              className={cn(
                "w-full flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                componentsActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
              )}
            >
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 transition-transform",
                  isComponentsOpen && "rotate-90"
                )}
              />
              <Component className="size-4 shrink-0" />
              <span className="truncate flex-1 text-left">Components</span>
            </button>

            {isComponentsOpen ? (
              <div className="mt-1">
                {CATEGORY_ORDER.map(({ key, label }) => {
                  const items = grouped.get(key) ?? []
                  if (items.length === 0) return null
                  return (
                    <div key={key} className="mt-3">
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
                                onClick={close}
                                className={cn(
                                  "flex items-center rounded-md pl-6 pr-3 py-1 text-sm font-medium transition-colors",
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
            ) : null}
          </div>

          {/* Templates group (colapsável) */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setTemplatesOpen((v) => !v)}
              aria-expanded={isTemplatesOpen}
              className={cn(
                "w-full flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                templatesActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
              )}
            >
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 transition-transform",
                  isTemplatesOpen && "rotate-90"
                )}
              />
              <FileText className="size-4 shrink-0" />
              <span className="truncate flex-1 text-left">Templates</span>
            </button>

            {isTemplatesOpen ? (
              <div className="mt-1">
                <div className="mt-3">
                  <div className="px-3 mb-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                    Education
                  </div>
                  <ul className="space-y-0.5">
                    {TEMPLATES_EDUCATION.map((it) => {
                      const active = isActive(it.href)
                      return (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            onClick={close}
                            className={cn(
                              "flex items-center rounded-md pl-6 pr-3 py-1 text-sm font-medium transition-colors",
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
              </div>
            ) : null}
          </div>
        </nav>

        {/* Footer (sticky bottom) */}
        <div className="p-3 border-t border-[var(--color-border)] shrink-0">
          <div className="text-[11px] text-[var(--color-text-muted)] px-3 py-1">
            v0.1.0 · {totalComponents} components
          </div>
        </div>
      </aside>
    </>
  )
}
