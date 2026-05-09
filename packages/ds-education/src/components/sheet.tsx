"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../utils"

// ─── Root ───────────────────────────────────────────────────────────────────

const Sheet = Dialog.Root
Sheet.displayName = "Sheet"

// ─── Trigger ────────────────────────────────────────────────────────────────

const SheetTrigger = Dialog.Trigger
SheetTrigger.displayName = "Sheet.Trigger"

// ─── Close ──────────────────────────────────────────────────────────────────

const SheetClose = Dialog.Close
SheetClose.displayName = "Sheet.Close"

// ─── Portal ─────────────────────────────────────────────────────────────────

const SheetPortal = Dialog.Portal

// ─── Overlay ────────────────────────────────────────────────────────────────

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = "Sheet.Overlay"

// ─── Content ────────────────────────────────────────────────────────────────

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col",
    "bg-[var(--color-bg)] text-[var(--color-text)]",
    "shadow-lg",
    "transition-transform duration-300 ease-in-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
  ],
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 h-auto max-h-[85vh] border-b border-[var(--color-border)]",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        ],
        bottom: [
          "inset-x-0 bottom-0 h-auto max-h-[85vh] border-t border-[var(--color-border)]",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        ],
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-[var(--color-border)]",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-[var(--color-border)]",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof sheetContentVariants> {
  /** Show internal X close button (default true) */
  showCloseButton?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, children, side = "right", showCloseButton = true, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <Dialog.Close
          className={cn(
            "absolute top-4 right-4",
            "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
            "text-[var(--color-text-muted)] hover:bg-[var(--color-secondary-hover)]",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
            "[&_svg]:stroke-2"
          )}
          aria-label="Close"
        >
          <X size={18} />
        </Dialog.Close>
      )}
    </Dialog.Content>
  </SheetPortal>
))
SheetContent.displayName = "Sheet.Content"

// ─── Header ─────────────────────────────────────────────────────────────────

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 px-6 pt-6 pb-4 pr-14", className)}
    {...props}
  />
))
SheetHeader.displayName = "Sheet.Header"

// ─── Footer ─────────────────────────────────────────────────────────────────

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto flex flex-col gap-2 px-6 py-5",
      "border-t border-[var(--color-border)]",
      className
    )}
    {...props}
  />
))
SheetFooter.displayName = "Sheet.Footer"

// ─── Title ──────────────────────────────────────────────────────────────────

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-lg font-bold leading-snug text-[var(--color-text)]",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = "Sheet.Title"

// ─── Description ────────────────────────────────────────────────────────────

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-[var(--color-text-muted)]", className)}
    {...props}
  />
))
SheetDescription.displayName = "Sheet.Description"

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
