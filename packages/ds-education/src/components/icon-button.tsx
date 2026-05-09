import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ghost:
          "bg-transparent text-[var(--color-tertiary-fg)] hover:bg-[var(--color-tertiary-hover)] hover:text-[var(--color-tertiary-fg-hover)] active:bg-[var(--color-tertiary-active)] active:text-[var(--color-tertiary-fg-active)]",
        filled:
          "bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
        outline:
          "bg-transparent text-[var(--color-secondary-bd)] border-2 border-[var(--color-secondary-bd)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)] active:border-[var(--color-secondary-bd-active)] active:text-[var(--color-secondary-bd-active)]",
        danger:
          "bg-transparent text-[var(--color-danger-primary)] hover:bg-[var(--color-danger-tertiary-hover)] active:bg-[var(--color-danger-tertiary-active)]",
      },
      size: {
        sm: "h-8 w-8 [&_svg]:size-4",
        md: "h-9 w-9 [&_svg]:size-[18px]",
        lg: "h-10 w-10 [&_svg]:size-5",
      },
      shape: {
        square: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      shape: "square",
    },
  }
)

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  "aria-label": string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={props.type ?? "button"}
        className={cn(iconButtonVariants({ variant, size, shape }), className)}
        {...props}
      >
        {icon}
      </button>
    )
  }
)
IconButton.displayName = "IconButton"

export { iconButtonVariants }
