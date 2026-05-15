"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "../utils"

// ─── Context ─────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  open: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>")
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────

export interface SidebarProviderProps {
  defaultOpen?: boolean
  children: React.ReactNode
}

export function SidebarProvider({ defaultOpen = true, children }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const toggle = React.useCallback(() => setOpen((v) => !v), [])
  const close = React.useCallback(() => setOpen(false), [])
  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { toggle } = useSidebar()
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => { toggle(); onClick?.(e) }}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 transition-colors",
          "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          className
        )}
        {...props}
      >
        {children ?? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="4" width="14" height="1.5" rx=".75" fill="currentColor" />
            <rect x="2" y="8.25" width="10" height="1.5" rx=".75" fill="currentColor" />
            <rect x="2" y="12.5" width="14" height="1.5" rx=".75" fill="currentColor" />
          </svg>
        )}
      </button>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

// ─── Rail ────────────────────────────────────────────────────────────────────

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarRail = React.forwardRef<HTMLDivElement, SidebarRailProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute right-0 top-0 h-full w-px bg-[var(--color-border)]", className)}
      {...props}
    />
  )
)
SidebarRail.displayName = "SidebarRail"

// ─── Inset ───────────────────────────────────────────────────────────────────

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-1 flex-col overflow-hidden", className)} {...props} />
  )
)
SidebarInset.displayName = "SidebarInset"

// ─── Root ────────────────────────────────────────────────────────────────────

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right"
  collapsible?: "offcanvas" | "icon" | "none"
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, side = "left", collapsible = "offcanvas", children, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <>
        {/* Mobile backdrop */}
        {!open && collapsible === "offcanvas" ? null : null}
        <aside
          ref={ref as React.Ref<HTMLElement>}
          data-state={open ? "expanded" : "collapsed"}
          data-side={side}
          data-collapsible={collapsible}
          className={cn(
            "relative flex h-full w-64 shrink-0 flex-col",
            "bg-[var(--color-bg)] border-r border-[var(--color-border)]",
            collapsible === "offcanvas" && [
              "fixed inset-y-0 z-50 transform transition-transform duration-300",
              side === "left"
                ? open ? "translate-x-0" : "-translate-x-full"
                : open ? "translate-x-0" : "translate-x-full",
              "md:relative md:translate-x-0 md:transition-none md:sticky md:top-0",
            ],
            collapsible === "icon" && !open && "w-14",
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </>
    )
  }
)
Sidebar.displayName = "Sidebar"

// ─── Header ──────────────────────────────────────────────────────────────────

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 flex-col gap-2 p-4", className)} {...props} />
  )
)
SidebarHeader.displayName = "SidebarHeader"

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 flex-col gap-2 p-3 border-t border-[var(--color-border)]",
        className
      )}
      {...props}
    />
  )
)
SidebarFooter.displayName = "SidebarFooter"

// ─── Content ─────────────────────────────────────────────────────────────────

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-3 py-2", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

// ─── Separator ───────────────────────────────────────────────────────────────

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

export const SidebarSeparator = React.forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn("mx-3 my-1 border-t border-[var(--color-border)]", className)}
      {...props}
    />
  )
)
SidebarSeparator.displayName = "SidebarSeparator"

// ─── Group ───────────────────────────────────────────────────────────────────

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex w-full min-w-0 flex-col py-1", className)} {...props} />
  )
)
SidebarGroup.displayName = "SidebarGroup"

// ─── GroupLabel ──────────────────────────────────────────────────────────────

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 items-center rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider",
        "text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    />
  )
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// ─── GroupAction ─────────────────────────────────────────────────────────────

export interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute right-3 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md",
        "text-[var(--color-text-muted)] outline-none",
        "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        className
      )}
      {...props}
    />
  )
)
SidebarGroupAction.displayName = "SidebarGroupAction"

// ─── GroupContent ────────────────────────────────────────────────────────────

export interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full text-sm", className)} {...props} />
  )
)
SidebarGroupContent.displayName = "SidebarGroupContent"

// ─── Menu ────────────────────────────────────────────────────────────────────

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex w-full min-w-0 flex-col gap-0.5", className)} {...props} />
  )
)
SidebarMenu.displayName = "SidebarMenu"

// ─── MenuItem ────────────────────────────────────────────────────────────────

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("group/menu-item relative", className)} {...props} />
  )
)
SidebarMenuItem.displayName = "SidebarMenuItem"

// ─── MenuButton ──────────────────────────────────────────────────────────────

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        ref={ref}
        {...(!asChild ? { type: "button" } : {})}
        data-active={isActive}
        className={cn(
          "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-md px-3 py-1.5 text-sm font-medium",
          "transition-colors outline-none",
          "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          isActive && "bg-[var(--color-primary-soft)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// ─── MenuAction ──────────────────────────────────────────────────────────────

export interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showOnHover?: boolean
}

export const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ className, showOnHover, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute right-1 top-1 flex aspect-square w-5 items-center justify-center rounded-md",
        "text-[var(--color-text-muted)] outline-none",
        "hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        showOnHover && "opacity-0 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:opacity-100",
        className
      )}
      {...props}
    />
  )
)
SidebarMenuAction.displayName = "SidebarMenuAction"

// ─── MenuBadge ───────────────────────────────────────────────────────────────

export interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenuBadge = React.forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums",
        "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
        className
      )}
      {...props}
    />
  )
)
SidebarMenuBadge.displayName = "SidebarMenuBadge"

// ─── MenuSkeleton ────────────────────────────────────────────────────────────

export interface SidebarMenuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean
}

export function SidebarMenuSkeleton({ className, showIcon = false, ...props }: SidebarMenuSkeletonProps) {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])
  return (
    <div
      className={cn("flex h-8 items-center gap-2 rounded-md px-3", className)}
      {...props}
    >
      {showIcon && (
        <div className="h-4 w-4 shrink-0 rounded-md bg-[var(--color-surface-muted)] animate-pulse" />
      )}
      <div
        className="h-4 flex-1 rounded-md bg-[var(--color-surface-muted)] animate-pulse"
        style={{ maxWidth: width }}
      />
    </div>
  )
}

// ─── MenuSub ─────────────────────────────────────────────────────────────────

export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLUListElement> {}

export const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("ml-4 flex min-w-0 flex-col gap-0.5 border-l border-[var(--color-border)] pl-3 py-0.5", className)}
      {...props}
    />
  )
)
SidebarMenuSub.displayName = "SidebarMenuSub"

// ─── MenuSubItem ─────────────────────────────────────────────────────────────

export interface SidebarMenuSubItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ ...props }, ref) => <li ref={ref} {...props} />
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

// ─── MenuSubButton ───────────────────────────────────────────────────────────

export interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

export const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium",
        "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        isActive && "text-[var(--color-primary)]",
        className
      )}
      {...props}
    />
  )
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

// ─── Input ───────────────────────────────────────────────────────────────────

export interface SidebarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-8 w-full rounded-md bg-[var(--color-surface-muted)] px-3 text-sm",
        "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
        "border border-transparent focus:border-[var(--color-primary)] focus:outline-none",
        "transition-colors",
        className
      )}
      {...props}
    />
  )
)
SidebarInput.displayName = "SidebarInput"
