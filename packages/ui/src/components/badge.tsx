import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary-soft)] text-[var(--color-primary-hover)]",
        success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-fg)]",
        ink:     "bg-[var(--color-secondary-active)] text-[var(--color-secondary-fg)]",
        warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-fg)]",
        danger:  "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-fg)]",
      },
      size: {
        sm: "py-1 px-2.5 gap-1 text-[12px]",
        md: "py-1.5 px-3 gap-1.5 text-[13px]",
        lg: "py-2 px-3.5 gap-1.5 text-[14px]",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  iconOnly?: boolean
}

const iconOnlySize = {
  sm: "w-6 h-6 p-0 [&>span>svg]:w-3.5 [&>span>svg]:h-3.5",
  md: "w-7 h-7 p-0 [&>span>svg]:w-4 [&>span>svg]:h-4",
  lg: "w-9 h-9 p-0 [&>span>svg]:w-5 [&>span>svg]:h-5",
} as const

export function Badge({
  className,
  variant,
  size,
  icon,
  iconOnly,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        iconOnly && "justify-center aspect-square",
        iconOnly && iconOnlySize[size ?? "md"],
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center [&>svg]:stroke-[2.5]">
          {icon}
        </span>
      )}
      {!iconOnly && children}
    </span>
  )
}
