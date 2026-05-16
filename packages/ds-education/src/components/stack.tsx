import * as React from "react"
import { cn } from "../utils"

/**
 * Stack — flex container com gap consistente, direção única.
 *
 * Substitui composições manuais de `<div className="flex flex-col gap-X">`.
 * Bot consumidor não decide gap nem direção crua — passa props tipadas.
 *
 * Decision tree:
 * - Conteúdo vertical com espaço uniforme entre? → Stack
 * - Conteúdo horizontal que pode quebrar linha? → Cluster
 * - Grid 2D (linhas × colunas)? → Grid
 */

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"
export type StackDirection = "vertical" | "horizontal"
export type StackAlign = "start" | "center" | "end" | "stretch"
export type StackJustify = "start" | "center" | "end" | "between" | "around"

const gapMap: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",   // 4px
  sm: "gap-2",   // 8px
  md: "gap-4",   // 16px (default)
  lg: "gap-6",   // 24px
  xl: "gap-8",   // 32px
}

const alignMap: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const justifyMap: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Espaçamento entre filhos. Default: "md" (16px). */
  gap?: StackGap
  /** Direção do stack. Default: "vertical". */
  direction?: StackDirection
  /** Alinhamento no eixo cruzado. Default: "stretch" no vertical, "center" no horizontal. */
  align?: StackAlign
  /** Distribuição no eixo principal. */
  justify?: StackJustify
  /** Renderiza como outro elemento. Default: "div". */
  as?: React.ElementType
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      gap = "md",
      direction = "vertical",
      align,
      justify,
      as: Comp = "div",
      ...props
    },
    ref
  ) => {
    const defaultAlign: StackAlign =
      align ?? (direction === "vertical" ? "stretch" : "center")
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex min-w-0",
          direction === "vertical" ? "flex-col" : "flex-row",
          gapMap[gap],
          alignMap[defaultAlign],
          justify && justifyMap[justify],
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
