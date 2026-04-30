import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "../utils"
import { Card, CardContent } from "./card"

const deltaVariants = cva(
  "inline-flex items-center gap-1 text-[12px] font-medium",
  {
    variants: {
      trend: {
        up: "text-[var(--color-toast-success-fg)]",
        down: "text-[var(--color-danger-primary)]",
        neutral: "text-[var(--color-text-muted)]",
      },
    },
    defaultVariants: {
      trend: "neutral",
    },
  }
)

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof deltaVariants> {
  label: string
  value: string | number
  delta?: string
  /**
   * Override automatic delta sign detection.
   * Auto-detect: starts with "+" → up, starts with "-" → down, else → neutral.
   */
  deltaTrend?: "up" | "down" | "neutral"
  asCard?: boolean
  icon?: React.ReactNode
}

function detectDeltaTrend(delta?: string): "up" | "down" | "neutral" {
  if (!delta) return "neutral"
  const str = String(delta).trim()
  if (str.startsWith("+")) return "up"
  if (str.startsWith("-") || str.startsWith("−")) return "down"
  return "neutral"
}

export function Stat({
  className,
  label,
  value,
  delta,
  deltaTrend,
  asCard,
  icon,
  ...props
}: StatProps) {
  const resolvedTrend = deltaTrend ?? detectDeltaTrend(delta)
  const body = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
          {label}
        </span>
        {icon && (
          <span className="flex items-center justify-center text-[var(--color-text-muted)]">
            {icon}
          </span>
        )}
      </div>
      <span className="text-[30px] font-bold leading-none text-[var(--color-text)]">
        {value}
      </span>
      {delta && (
        <span className={cn(deltaVariants({ trend: resolvedTrend }))}>
          {resolvedTrend === "up" && <ArrowUp size={12} strokeWidth={2.5} />}
          {resolvedTrend === "down" && <ArrowDown size={12} strokeWidth={2.5} />}
          {delta}
        </span>
      )}
    </div>
  )

  if (asCard) {
    return (
      <Card className={className} {...props}>
        <CardContent className="p-6">{body}</CardContent>
      </Card>
    )
  }

  return (
    <div className={className} {...props}>
      {body}
    </div>
  )
}

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns at the largest breakpoint (lg).
   * Smaller breakpoints automatically degrade: 1 col mobile, 2 cols sm.
   * @default 4
   */
  cols?: 2 | 3 | 4
}

const colsClass: Record<NonNullable<StatGridProps["cols"]>, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

/**
 * Responsive grid wrapper for `Stat` components.
 * Default: 1 col mobile, 2 cols tablet (sm), 4 cols desktop (lg).
 *
 * @example
 * <StatGrid>
 *   <Stat asCard label="Alunos" value="1.2k" />
 *   <Stat asCard label="Turmas" value="32" />
 * </StatGrid>
 */
export function StatGrid({
  className,
  cols = 4,
  ...props
}: StatGridProps) {
  return (
    <div
      className={cn("grid gap-4", colsClass[cols], className)}
      {...props}
    />
  )
}
