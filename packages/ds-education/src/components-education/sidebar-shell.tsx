"use client"

import * as React from "react"
import { Moon, Sun, Menu, Search } from "lucide-react"
import { cn } from "../utils"
import { CommandPalette, useCommandPalette, type CommandPaletteGroup } from "../components/command-palette"
import { IconButton } from "../components/icon-button"

// ─── Dark mode hook ───────────────────────────────────────────────────────────

export function useDarkMode() {
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("ds-mode") as "light" | "dark" | null
    return stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  React.useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  const toggle = () => {
    const next: "light" | "dark" = mode === "dark" ? "light" : "dark"
    setMode(next)
    document.documentElement.dataset.mode = next
    localStorage.setItem("ds-mode", next)
  }

  return { mode, toggle }
}

// ─── Shell context (mobile nav state accessible to sidebar slot content) ──────

interface SidebarShellContextValue {
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarShellContext = React.createContext<SidebarShellContextValue | null>(null)

export function useSidebarShell(): SidebarShellContextValue {
  const ctx = React.useContext(SidebarShellContext)
  if (!ctx) throw new Error("useSidebarShell must be used inside <SidebarShell>")
  return ctx
}

// ─── SidebarShell ─────────────────────────────────────────────────────────────

export interface SidebarShellCommandPaletteConfig {
  /** Groups of items to display in the palette */
  groups: CommandPaletteGroup[]
  /** Search input placeholder */
  placeholder?: string
  /** Called when the user selects an item with a href */
  onNavigate?: (href: string) => void
}

export interface SidebarShellProps {
  /** The sidebar panel content — has access to useSidebarShell() for close state */
  sidebar: React.ReactNode
  /** Pass to enable Cmd+K / search trigger in the top bar */
  commandPalette?: SidebarShellCommandPaletteConfig
  /** Render the dark mode toggle button in the top bar */
  darkModeToggle?: boolean
  /** Slot for right-side top bar content (theme picker, user avatar, etc.) */
  userMenu?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SidebarShell({
  sidebar,
  commandPalette,
  darkModeToggle = false,
  userMenu,
  children,
  className,
}: SidebarShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { mode, toggle } = useDarkMode()
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette()

  React.useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sidebarOpen])

  React.useEffect(() => {
    if (!sidebarOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [sidebarOpen])

  const shortcut =
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform) ? "⌘K" : "Ctrl K"

  return (
    <SidebarShellContext.Provider
      value={{
        sidebarOpen,
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
      }}
    >
      <div className={cn("flex h-screen overflow-hidden", className)}>
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            aria-hidden
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* Sidebar slot — wrapper handles mobile drawer behaviour */}
        <div
          className={cn(
            "shrink-0 h-screen",
            "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:relative md:translate-x-0 md:transition-none md:sticky md:top-0"
          )}
        >
          {sidebar}
        </div>

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className="h-16 shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg)] z-10 flex items-center px-4 md:px-6 gap-3">
            <IconButton
              aria-label="Abrir menu lateral"
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              shape="square"
              icon={<Menu />}
              className="md:hidden"
            />

            {commandPalette ? (
              <div className="flex-1 flex items-center">
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="flex items-center gap-3 w-full max-w-md h-10 pl-3 pr-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                >
                  <Search className="size-4 shrink-0" />
                  <span className="flex-1 text-left">
                    {commandPalette.placeholder ?? "Buscar…"}
                  </span>
                  <kbd className="hidden md:inline-flex items-center h-6 px-1.5 rounded text-[11px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-bg)]">
                    {shortcut}
                  </kbd>
                </button>
              </div>
            ) : (
              <div className="flex-1" />
            )}

            <div className="flex items-center gap-2">
              {darkModeToggle && (
                <IconButton
                  aria-label={`Trocar para modo ${mode === "dark" ? "claro" : "escuro"}`}
                  onClick={toggle}
                  variant="outline"
                  shape="circle"
                  icon={mode === "dark" ? <Sun /> : <Moon />}
                />
              )}
              {userMenu}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-[var(--color-surface)]">
            {children}
          </main>
        </div>

        {commandPalette && (
          <CommandPalette
            open={paletteOpen}
            onOpenChange={setPaletteOpen}
            groups={commandPalette.groups}
            placeholder={commandPalette.placeholder}
            onNavigate={commandPalette.onNavigate}
          />
        )}
      </div>
    </SidebarShellContext.Provider>
  )
}
