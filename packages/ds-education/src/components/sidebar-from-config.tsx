"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../utils"
import {
  Sidebar,
  SidebarProvider,
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
} from "./sidebar"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SidebarConfigItem {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  disabled?: boolean
}

export interface SidebarConfigGroup {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  items: SidebarConfigItem[]
  collapsible?: boolean
  defaultOpen?: boolean
}

export interface SidebarFromConfigProps {
  brand?: {
    logo?: React.ReactNode
    title: string
    subtitle?: string
  }
  groups: SidebarConfigGroup[]
  footer?: React.ReactNode
  linkComponent?: React.ComponentType<{ href: string; className?: string; children: React.ReactNode }>
  activeHref?: string
  className?: string
}

// ─── Internal helpers ────────────────────────────────────────────────────────

function DefaultLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

interface CollapsibleGroupProps {
  group: SidebarConfigGroup
  activeHref?: string
  LinkComponent: React.ComponentType<{ href: string; className?: string; children: React.ReactNode }>
}

function CollapsibleGroup({ group, activeHref, LinkComponent }: CollapsibleGroupProps) {
  const hasActive = group.items.some((it) => it.href === activeHref)
  const [open, setOpen] = React.useState(group.defaultOpen ?? hasActive ?? true)
  const Icon = group.icon

  return (
    <SidebarGroup>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          "text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        )}
      >
        <ChevronRight
          className={cn("size-3.5 shrink-0 transition-transform", open && "rotate-90")}
          aria-hidden
        />
        {Icon && <Icon className="size-4 shrink-0" />}
        <span className="flex-1 truncate text-left">{group.label}</span>
      </button>

      {open ? (
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => {
              const ItemIcon = item.icon
              const isActive = item.href === activeHref
              const content = (
                <>
                  {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
                  <span className="flex-1 truncate text-left">{item.label}</span>
                  {item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </>
              )
              return (
                <SidebarMenuItem key={item.href}>
                  {item.disabled ? (
                    <SidebarMenuButton isActive={isActive} disabled className="w-full">
                      {content}
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive} className="w-full">
                      <LinkComponent href={item.href} className="w-full">
                        {content}
                      </LinkComponent>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      ) : null}
    </SidebarGroup>
  )
}

function FlatGroup({
  group,
  activeHref,
  LinkComponent,
}: CollapsibleGroupProps) {
  const Icon = group.icon
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {Icon && <Icon className="mr-1.5 size-3.5 shrink-0" />}
        {group.label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => {
            const ItemIcon = item.icon
            const isActive = item.href === activeHref
            const content = (
              <>
                {ItemIcon && <ItemIcon className="size-4 shrink-0" />}
                <span className="flex-1 truncate text-left">{item.label}</span>
                {item.badge != null && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </>
            )
            return (
              <SidebarMenuItem key={item.href}>
                {item.disabled ? (
                  <SidebarMenuButton isActive={isActive} disabled className="w-full">
                    {content}
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive} className="w-full">
                    <LinkComponent href={item.href} className="w-full">
                      {content}
                    </LinkComponent>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// ─── SidebarFromConfig ───────────────────────────────────────────────────────

export function SidebarFromConfig({
  brand,
  groups,
  footer,
  linkComponent: LinkComponent = DefaultLink,
  activeHref,
  className,
}: SidebarFromConfigProps) {
  return (
    <Sidebar className={className}>
      {brand && (
        <>
          <SidebarHeader>
            <LinkComponent href="/" className="flex items-center gap-3">
              {brand.logo}
              <div className="min-w-0">
                <div className="truncate text-sm font-bold text-[var(--color-text)]">
                  {brand.title}
                </div>
                {brand.subtitle && (
                  <div className="truncate text-xs text-[var(--color-text-muted)]">
                    {brand.subtitle}
                  </div>
                )}
              </div>
            </LinkComponent>
          </SidebarHeader>
          <SidebarSeparator />
        </>
      )}

      <SidebarContent>
        {groups.map((group, i) =>
          group.collapsible !== false ? (
            <CollapsibleGroup
              key={group.label + i}
              group={group}
              activeHref={activeHref}
              LinkComponent={LinkComponent}
            />
          ) : (
            <FlatGroup
              key={group.label + i}
              group={group}
              activeHref={activeHref}
              LinkComponent={LinkComponent}
            />
          )
        )}
      </SidebarContent>

      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  )
}

// Re-export SidebarProvider so consumers can wrap SidebarFromConfig
export { SidebarProvider }
