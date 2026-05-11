"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, BookOpen, BarChart3, Users, Settings, Home } from "lucide-react"
import {
  SidebarShell,
  useSidebarShell,
  Avatar,
  Separator,
  Badge,
  cn,
} from "@impactx/ds-education"

// ─── Demo sidebar content ─────────────────────────────────────────────────────

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const NAV: NavItem[] = [
  { href: "#", label: "Dashboard",    icon: Home },
  { href: "#", label: "Alunos",       icon: Users },
  { href: "#", label: "Avaliações",   icon: BookOpen },
  { href: "#", label: "Relatórios",   icon: BarChart3 },
  { href: "#", label: "Configurações", icon: Settings },
]

function DemoSidebar() {
  const { closeSidebar } = useSidebarShell()
  const [active, setActive] = React.useState("Dashboard")

  return (
    <aside className="w-64 h-full border-r border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col">
      {/* Brand */}
      <div className="p-5 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar size="md" shape="rounded" fallback="DS" className="bg-[var(--color-primary)]" />
          <div>
            <div className="text-sm font-bold text-[var(--color-text)]">Minha Escola</div>
            <div className="text-xs text-[var(--color-text-muted)]">Education Portal</div>
          </div>
        </div>
      </div>

      <Separator className="!h-px shrink-0" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <ul className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  setActive(label)
                  closeSidebar()
                }}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active === label
                    ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--color-border)] shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--color-surface-muted)] cursor-pointer">
          <Avatar size="sm" fallback="RA" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-[var(--color-text)] truncate">Rafael A.</div>
            <div className="text-xs text-[var(--color-text-muted)]">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Demo user menu slot ──────────────────────────────────────────────────────

function DemoUserMenu() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success" size="sm">Pro</Badge>
      <Avatar size="sm" fallback="RA" className="cursor-pointer" />
    </div>
  )
}

// ─── Demo content blocks ──────────────────────────────────────────────────────

function StatCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
      <div className="text-xs text-[var(--color-text-muted)] mb-1">{label}</div>
      <div className="text-2xl font-bold text-[var(--color-text)]">{value}</div>
      {delta && <div className="text-xs text-[var(--color-success-primary)] mt-1">{delta}</div>}
    </div>
  )
}

// ─── Sandbox wrapper (isolated from the showcase shell) ───────────────────────

function SidebarShellSandbox() {
  const router = useRouter()

  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-lg" style={{ height: 520 }}>
      <SidebarShell
        sidebar={<DemoSidebar />}
        commandPalette={{
          placeholder: "Buscar alunos, turmas, relatórios…",
          onNavigate: (href) => router.push(href),
        }}
        darkModeToggle
        userMenu={<DemoUserMenu />}
      >
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Dashboard</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Bem-vindo de volta, Rafael.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Alunos ativos"      value="1.284"  delta="+12 esta semana" />
            <StatCard label="Avaliações abertas" value="38"     delta="+5 este mês" />
            <StatCard label="Taxa de conclusão"  value="91%"    delta="+2pp vs mês ant." />
            <StatCard label="Média geral"        value="7,6"    />
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
            <div className="text-sm font-semibold text-[var(--color-text)] mb-3">Atividade recente</div>
            <div className="space-y-3">
              {["Turma 9A — prova de Matemática corrigida", "Aluno João S. concluiu módulo 4", "Relatório mensal gerado"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                  <div className="size-2 rounded-full bg-[var(--color-primary)] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarShell>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SidebarShellPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-[28px] font-bold text-[var(--color-text)] mb-2">SidebarShell</h1>
        <p className="text-[var(--color-text-muted)] max-w-2xl">
          Layout organism que encapsula sidebar responsiva + top bar com Cmd+K e dark mode toggle.
          Passe <code className="font-mono text-[var(--color-primary)] text-sm">sidebar</code> como slot e
          o shell gerencia drawer mobile, scroll-lock e atalhos de teclado.
        </p>
      </div>

      {/* Props summary */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">API</span>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {[
            { prop: "sidebar",          type: "ReactNode",                          desc: "Conteúdo do painel lateral. Pode usar useSidebarShell() para fechar o drawer." },
            { prop: "commandPalette?",  type: "{ placeholder?, onNavigate? }",      desc: "Ativa busca Cmd+K no top bar. Usa o registry interno do ds-education." },
            { prop: "darkModeToggle?",  type: "boolean",                            desc: "Renderiza botão de dark mode no top bar (persiste em localStorage)." },
            { prop: "userMenu?",        type: "ReactNode",                          desc: "Slot à direita do top bar (avatar, badge de plano, etc.)." },
            { prop: "children",         type: "ReactNode",                          desc: "Conteúdo principal da página." },
          ].map(({ prop, type, desc }) => (
            <div key={prop} className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3 text-sm">
              <div>
                <code className="font-mono text-[var(--color-primary)]">{prop}</code>
                <div className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">{type}</div>
              </div>
              <div className="text-[var(--color-text-muted)]">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live demo */}
      <div>
        <div className="text-sm font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
          <LayoutGrid className="size-4" />
          Demo interativa — Cmd+K abre palette, dark mode toggle funciona, sidebar fecha em mobile
        </div>
        <SidebarShellSandbox />
      </div>

      {/* Code snippet */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Uso básico</span>
        </div>
        <pre className="px-5 py-4 text-xs text-[var(--color-text)] overflow-x-auto leading-relaxed font-mono">{`import { SidebarShell, useSidebarShell } from "@impactx/ds-education"

function MySidebar() {
  const { closeSidebar } = useSidebarShell()
  return <aside>…<button onClick={closeSidebar}>fechar</button></aside>
}

<SidebarShell
  sidebar={<MySidebar />}
  commandPalette={{ placeholder: "Buscar…", onNavigate: router.push }}
  darkModeToggle
  userMenu={<Avatar />}
>
  <main>conteúdo da página</main>
</SidebarShell>`}</pre>
      </div>
    </div>
  )
}
