import * as React from "react"
import { cn } from "../utils"

interface ProgressBarProps {
  /** 0–100 */
  value: number
  className?: string
  /** Altura em px (default 8) */
  height?: number
}

/**
 * Barra de progresso simples.
 * Cor = var(--color-primary) (segue brand do theme ativo).
 * Trilho = var(--color-border).
 */
export function ProgressBar({ value, className, height = 8 }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div
      className={cn("w-full rounded-[var(--radius-full)] overflow-hidden", className)}
      style={{
        height,
        backgroundColor: "var(--color-border)",
      }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          backgroundColor: pct === 0 ? "var(--color-border)" : "var(--color-primary)",
          borderRadius: "var(--radius-full)",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  )
}
