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
  deltaTrend?: "up" | "down" | "neutral"
  asCard?: boolean
  icon?: React.ReactNode
}

export function Stat({
  className,
  label,
  value,
  delta,
  deltaTrend = "neutral",
  asCard,
  icon,
  ...props
}: StatProps) {
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
        <span className={cn(deltaVariants({ trend: deltaTrend }))}>
          {deltaTrend === "up" && <ArrowUp size={12} strokeWidth={2.5} />}
          {deltaTrend === "down" && <ArrowDown size={12} strokeWidth={2.5} />}
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
