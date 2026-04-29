"use client"

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"

// ─── Toaster ────────────────────────────────────────────────────────────────
// Adicionar <Toaster /> ao app/layout.tsx (fora de qualquer Suspense):
//   import { Toaster } from "./toast"
//   <Toaster />

function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      duration={4000}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: [
            "flex items-start gap-3 w-full min-w-[320px] max-w-[400px]",
            "rounded-[8px] px-4 py-3",
            "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
            "border-l-[4px]",
            "font-[var(--font-sans)] text-[14px] text-[var(--color-secondary-fg)]",
          ].join(" "),
          title: "font-medium text-[var(--color-secondary-fg)] text-[14px] leading-snug",
          description: "text-[13px] text-[var(--color-text-muted)] mt-0.5",
          closeButton: [
            "absolute top-2 right-2",
            "text-[var(--color-secondary-fg-disabled)] hover:text-[var(--color-secondary-fg)]",
            "bg-transparent border-none cursor-pointer",
          ].join(" "),
          success:
            "bg-[var(--color-toast-success-bg)] border-l-[var(--color-toast-success)]",
          error:
            "bg-[var(--color-toast-error-bg)] border-l-[var(--color-danger-primary)]",
          warning:
            "bg-[var(--color-toast-warning-bg)] border-l-[var(--color-toast-warning)]",
          info: "bg-[var(--color-toast-info-bg)] border-l-[var(--color-primary)]",
        },
      }}
    />
  )
}

// ─── toast() imperativo ─────────────────────────────────────────────────────
const toast = {
  success: (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast.success(message, options),
  error: (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast.error(message, options),
  info: (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast.info(message, options),
  warning: (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast.warning(message, options),
}

export { Toaster, toast }
