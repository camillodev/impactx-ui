"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cn } from "../utils"
import { Button, type ButtonProps } from "./button"

// ─── Root ───────────────────────────────────────────────────────────────────

const AlertDialog = AlertDialogPrimitive.Root
AlertDialog.displayName = "AlertDialog"

// ─── Trigger ────────────────────────────────────────────────────────────────

const AlertDialogTrigger = AlertDialogPrimitive.Trigger
AlertDialogTrigger.displayName = "AlertDialogTrigger"

// ─── Portal ─────────────────────────────────────────────────────────────────

const AlertDialogPortal = AlertDialogPrimitive.Portal
AlertDialogPortal.displayName = "AlertDialogPortal"

// ─── Overlay ────────────────────────────────────────────────────────────────

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
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
AlertDialogOverlay.displayName = "AlertDialogOverlay"

// ─── Content ────────────────────────────────────────────────────────────────

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-[calc(100vw-2rem)] max-w-md",
        "bg-[var(--color-bg)] text-[var(--color-text)]",
        "rounded-2xl border border-[var(--color-border)]",
        "shadow-[0_20px_50px_rgba(0,0,0,0.18)]",
        "flex flex-col gap-5 p-6 outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
))
AlertDialogContent.displayName = "AlertDialogContent"

// ─── Header ─────────────────────────────────────────────────────────────────

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
))
AlertDialogHeader.displayName = "AlertDialogHeader"

// ─── Footer ──────────────────────────────────────────────────────────────────

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
    {...props}
  />
))
AlertDialogFooter.displayName = "AlertDialogFooter"

// ─── Title ──────────────────────────────────────────────────────────────────

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-bold leading-snug text-[var(--color-secondary-fg)]",
      className
    )}
    {...props}
  />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

// ─── Description ─────────────────────────────────────────────────────────────

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-[var(--color-text-muted)]",
      className
    )}
    {...props}
  />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

// ─── Action ──────────────────────────────────────────────────────────────────

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    Pick<ButtonProps, "variant" | "size"> {}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = "primary", size = "md", children, ...props }, ref) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Action ref={ref} className={cn(className)} {...props}>
      {children}
    </AlertDialogPrimitive.Action>
  </Button>
))
AlertDialogAction.displayName = "AlertDialogAction"

// ─── Cancel ──────────────────────────────────────────────────────────────────

export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>,
    Pick<ButtonProps, "variant" | "size"> {}

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, variant = "secondary", size = "md", children, ...props }, ref) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Cancel ref={ref} className={cn(className)} {...props}>
      {children}
    </AlertDialogPrimitive.Cancel>
  </Button>
))
AlertDialogCancel.displayName = "AlertDialogCancel"

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
