"use client"

import { useRouter } from "next/navigation"
import { SidebarShell } from "@impactx/ds-education"
import { Sidebar } from "@/app/shell/sidebar"
import { useTheme } from "@/app/theme-provider"

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
