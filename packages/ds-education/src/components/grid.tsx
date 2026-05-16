import * as React from "react"
import { cn } from "../utils"

/**
 * Grid — grid responsivo declarativo.
 *
 * Substitui `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`
 * por API tipada. Bot não decide breakpoint em string — passa objeto.
 *
 * Responsive prop semantics:
 *   cols={3}                                 → grid-cols-3 em todos breakpoints
 *   cols={{ base: 1, md: 2, lg: 3 }}         → 1 col mobile, 2 a partir de md, 3 a partir de lg
 *
 * Decision tree:
 * - 2D layout (linhas × colunas) → Grid
 * - 1D vertical com gap → Stack
 * - 1D horizontal com wrap → Cluster
 */

export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"
export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl"

type ColsValue = 1 | 2 | 3 | 4 | 5 | 6 | 12
type ResponsiveCols = ColsValue | Partial<Record<GridBreakpoint, ColsValue>>

const gapMap: Record<GridGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",   // default
  lg: "gap-6",
  xl: "gap-8",
}

// Maps responsive col values to Tailwind utility classes. Listed explicitly
// (not interpolated) so Tailwind v4's content-aware build picks them up.
const baseColMap: Record<ColsValue, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
}

const breakpointColMap: Record<Exclude<GridBreakpoint, "base">, Record<ColsValue, string>> = {
  sm: {
    1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3",
    4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6",
    12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3",
    4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6",
    12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3",
    4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6",
    12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3",
    4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6",
    12: "xl:grid-cols-12",
  },
}

function resolveCols(cols: ResponsiveCols): string {
  if (typeof cols === "number") {
    return baseColMap[cols]
  }
  const classes: string[] = []
  if (cols.base) classes.push(baseColMap[cols.base])
  if (cols.sm) classes.push(breakpointColMap.sm[cols.sm])
  if (cols.md) classes.push(breakpointColMap.md[cols.md])
  if (cols.lg) classes.push(breakpointColMap.lg[cols.lg])
  if (cols.xl) classes.push(breakpointColMap.xl[cols.xl])
  return classes.join(" ")
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de colunas. Número simples = mesma quantidade em todos breakpoints.
   * Objeto = responsivo (mobile-first, valores omitidos herdam do breakpoint anterior).
   * Valores aceitos: 1, 2, 3, 4, 5, 6, 12.
   */
  cols?: ResponsiveCols
  /** Espaçamento entre células. Default: "md" (16px). */
  gap?: GridGap
  /** Renderiza como outro elemento. Default: "div". */
  as?: React.ElementType
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = { base: 1, md: 2, lg: 3 },
      gap = "md",
      as: Comp = "div",
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "grid",
        resolveCols(cols),
        gapMap[gap],
        className
      )}
      {...props}
    />
  )
)
Grid.displayName = "Grid"
