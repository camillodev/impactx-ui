import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

/**
 * Button — atomic, theme-driven.
 *
 * Zero hex hardcoded. Todas as cores via CSS vars do theme ativo
 * (ver src/lib/tokens/themes/<theme>.css).
 *
 * Trocar `.theme-education` por `.theme-kumon` no <html> = trocar
 * o esquema de cores sem tocar neste arquivo.
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",

        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-bd)] border-2 border-[var(--color-secondary-bd)] shadow-sm hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] active:border-[var(--color-secondary-bd-active)] active:text-[var(--color-secondary-bd-active)]",

        tertiary:
          "bg-[var(--color-tertiary)] text-[var(--color-tertiary-fg)] hover:bg-[var(--color-tertiary-hover)] hover:text-[var(--color-tertiary-fg-hover)] active:bg-[var(--color-tertiary-active)] active:text-[var(--color-tertiary-fg-active)]",
        ghost:
          "bg-[var(--color-tertiary)] text-[var(--color-tertiary-fg)] hover:bg-[var(--color-tertiary-hover)] hover:text-[var(--color-tertiary-fg-hover)] active:bg-[var(--color-tertiary-active)] active:text-[var(--color-tertiary-fg-active)]",

        "tertiary-dark":
          "bg-[var(--color-tertiary-dark)] text-[var(--color-tertiary-dark-fg)] hover:bg-[var(--color-tertiary-dark-hover)] hover:text-[var(--color-tertiary-dark-fg-hover)] active:bg-[var(--color-tertiary-dark-active)] active:text-[var(--color-tertiary-dark-fg-active)]",

        "danger-primary":
          "bg-[var(--color-danger-primary)] text-[var(--color-danger-primary-fg)] hover:bg-[var(--color-danger-primary-hover)] active:bg-[var(--color-danger-primary-active)]",

        "danger-secondary":
          "bg-[var(--color-danger-secondary)] text-[var(--color-danger-secondary-bd)] border-2 border-[var(--color-danger-secondary-bd)] shadow-sm hover:bg-[var(--color-danger-secondary-hover)] active:bg-[var(--color-danger-secondary-active)] active:border-[var(--color-danger-secondary-bd-active)] active:text-[var(--color-danger-secondary-bd-active)]",

        danger:
          "bg-[var(--color-danger-primary)] text-[var(--color-danger-primary-fg)] hover:bg-[var(--color-danger-primary-hover)] active:bg-[var(--color-danger-primary-active)]",

        "danger-tertiary":
          "bg-[var(--color-danger-tertiary)] text-[var(--color-danger-tertiary-fg)] hover:bg-[var(--color-danger-tertiary-hover)] hover:text-[var(--color-danger-tertiary-fg-hover)] active:bg-[var(--color-danger-tertiary-active)] active:text-[var(--color-danger-tertiary-fg-active)]",
      },
      size: {
        sm: "h-7 px-3 text-sm [&_svg]:size-4",
        md: "h-9 px-3.5 text-sm [&_svg]:size-4",
        lg: "h-11 px-4 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { buttonVariants }
