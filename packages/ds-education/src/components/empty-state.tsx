import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

const wrapperVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "p-12 gap-3",
        compact: "p-6 gap-2",
        card: "p-10 gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const iconSize = {
  default: "w-12 h-12",
  compact: "w-8 h-8",
  card: "w-12 h-12",
} as const

const titleSize = {
  default: "text-lg",
  compact: "text-base",
  card: "text-lg",
} as const

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof wrapperVariants> {
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  ariaLabel?: string
}

export function EmptyState({
  className,
  variant,
  title,
  description,
  icon,
  action,
  ariaLabel,
  ...props
}: EmptyStateProps) {
  const v = variant ?? "default"
  // When title is JSX (not string), aria-label must be passed explicitly via
  // ariaLabel — otherwise screen readers announce only "status" with no context.
  const computedAriaLabel =
    ariaLabel ?? (typeof title === "string" ? title : "Estado vazio")

  return (
    <div
      role="status"
      aria-label={computedAriaLabel}
      className={cn(wrapperVariants({ variant: v }), className)}
      {...props}
    >
      {icon && (
        <div
          aria-hidden="true"
          className={cn(
            "flex items-center justify-center text-[var(--color-text-muted)] [&>svg]:w-full [&>svg]:h-full",
            iconSize[v]
          )}
        >
          {icon}
        </div>
      )}
      <h3
        className={cn(
          "font-semibold text-[var(--color-text)]",
          titleSize[v]
        )}
      >
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--color-text-muted)] max-w-md">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
