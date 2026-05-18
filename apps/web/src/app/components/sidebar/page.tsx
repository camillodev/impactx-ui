"use client"

import * as React from "react"
import {
  BookOpen,
  BarChart2,
  Users,
  Settings,
  Home,
  FileText,
  Bell,
} from "lucide-react"
import {
  // Primitives (API composta)
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  // Config-driven wrapper
  SidebarFromConfig,
  type SidebarConfigGroup,
} from "@impactxlabs/ui"

// ─── Exemplo 1: API composta (primitives) ────────────────────────────────────

function ComposedSidebarExample() {
  const [active, setActive] = React.useState("/dashboard")
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-[420px] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
        <Sidebar collapsible="none" className="relative">
          <SidebarHeader>
            <div className="flex items-center gap-3 px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold shrink-0">
                IX
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--color-text)]">Impact X</div>
                <div className="text-xs text-[var(--color-text-muted)]">Plataforma</div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            {/* Flat group */}
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { href: "/dashboard", label: "Dashboard", icon: Home },
                    { href: "/notificacoes", label: "Notificações", icon: Bell, badge: 3 },
                  ].map(({ href, label, icon: Icon, badge }) => (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        isActive={active === href}
                        onClick={() => setActive(href)}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 truncate">{label}</span>
                        {badge != null && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Group with sub-items */}
            <SidebarGroup>
              <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={active.startsWith("/cursos")}
                      onClick={() => setActive("/cursos")}
                    >
                      <BookOpen className="size-4 shrink-0" />
                      <span className="flex-1">Cursos</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {[
                        { href: "/cursos/ativos", label: "Ativos" },
                        { href: "/cursos/rascunhos", label: "Rascunhos" },
                      ].map(({ href, label }) => (
                        <SidebarMenuSubItem key={href}>
                          <SidebarMenuSubButton
                            href={href}
                            isActive={active === href}
                            onClick={(e) => { e.preventDefault(); setActive(href) }}
                          >
                            {label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={active === "/relatorios"}
                      onClick={() => setActive("/relatorios")}
                    >
                      <FileText className="size-4 shrink-0" />
                      <span className="flex-1">Relatórios</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-3 text-[11px] text-[var(--color-text-muted)]">v0.1.0</div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <div className="flex h-12 items-center gap-3 border-b border-[var(--color-border)] px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium text-[var(--color-text)]">
              Rota ativa: <code className="text-[var(--color-primary)]">{active}</code>
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center text-[var(--color-text-muted)] text-sm">
            Conteúdo da página
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

// ─── Exemplo 2: SidebarFromConfig (config-driven) ───────────────────────────

const CONFIG_GROUPS: SidebarConfigGroup[] = [
  {
    label: "Geral",
    collapsible: false,
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/notificacoes", label: "Notificações", icon: Bell, badge: 5 },
    ],
  },
  {
    label: "Educação",
    items: [
      { href: "/cursos", label: "Cursos", icon: BookOpen },
      { href: "/relatorios", label: "Relatórios", icon: BarChart2 },
      { href: "/alunos", label: "Alunos", icon: Users },
    ],
  },
  {
    label: "Admin",
    defaultOpen: false,
    items: [
      { href: "/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
]

function ConfigSidebarExample() {
  const [active, setActive] = React.useState("/dashboard")

  const LinkComponent = React.useCallback(
    ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => (
      <a
        href={href}
        className={className}
        onClick={(e) => { e.preventDefault(); setActive(href) }}
      >
        {children}
      </a>
    ),
    []
  )

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-[420px] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
        <SidebarFromConfig
          brand={{
            logo: (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold shrink-0">
                IX
              </div>
            ),
            title: "Impact X",
            subtitle: "Config-driven",
          }}
          groups={CONFIG_GROUPS}
          activeHref={active}
          linkComponent={LinkComponent}
          footer={
            <div className="px-3 text-[11px] text-[var(--color-text-muted)]">v0.1.0</div>
          }
        />

        <div className="flex flex-1 items-center justify-center flex-col gap-2 text-sm text-[var(--color-text-muted)]">
          <span>
            Rota ativa: <code className="text-[var(--color-primary)]">{active}</code>
          </span>
          <span className="text-xs">Clique nos links da sidebar para navegar</span>
        </div>
      </div>
    </SidebarProvider>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SidebarPlayground() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-2 text-[28px] font-bold text-[var(--color-text)]">Sidebar</h1>
      <p className="mb-8 text-[var(--color-text-muted)]">
        Dois modos de uso: <strong>API composta</strong> (shadcn-style, máximo controle) e{" "}
        <strong>SidebarFromConfig</strong> (declarativo, zero boilerplate).
      </p>

      {/* Exemplo 1 */}
      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-text)]">
          1. API composta (primitives)
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Use os primitivos diretamente para controle total da estrutura e renderização.
        </p>
        <ComposedSidebarExample />
      </section>

      {/* Exemplo 2 */}
      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-text)]">
          2. SidebarFromConfig (config-driven)
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Passe um array de grupos e receba uma sidebar completa. Ideal para apps com navegação
          definida em config ou CMS.
        </p>
        <ConfigSidebarExample />
      </section>

      {/* Exemplo 3: com Next.js Link */}
      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-text)]">
          3. Integração com Next.js Link
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Passe <code className="text-[var(--color-primary)]">linkComponent</code> para usar
          qualquer componente de link do seu framework.
        </p>
        <pre className="rounded-lg bg-[var(--color-surface-muted)] p-4 text-xs text-[var(--color-text)] overflow-x-auto">
{`import Link from "next/link"
import { usePathname } from "next/navigation"

function NextLink({ href, className, children }) {
  return <Link href={href} className={className}>{children}</Link>
}

// No componente:
const pathname = usePathname()

<SidebarProvider>
  <SidebarFromConfig
    brand={{ title: "Meu App" }}
    groups={groups}
    activeHref={pathname}
    linkComponent={NextLink}
  />
</SidebarProvider>`}
        </pre>
      </section>
    </div>
  )
}
