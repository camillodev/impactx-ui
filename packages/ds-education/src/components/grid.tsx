import * as React from "react"
import { cn } from "../utils"
import {
  resolveResponsive,
  type ResponsiveValue,
  type BreakpointClassMap,
} from "./_responsive"

/**
 * Grid — grid responsivo declarativo.
 *
 * Substitui `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`
 * por API tipada. Bot não decide breakpoint em string — passa objeto.
 *
 *   cols={3}                                 → grid-cols-3 em todos breakpoints
 *   cols={{ base: 1, md: 2, lg: 3 }}         → mobile-first responsivo
 *
 * Decision tree:
 * - 2D layout (linhas × colunas) → Grid
 * - 1D vertical com gap → Stack
 * - 1D horizontal com wrap → Cluster
 */

export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12

const gapMap: BreakpointClassMap<GridGap> = {
  base: { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" },
  sm:   { none: "sm:gap-0", xs: "sm:gap-1", sm: "sm:gap-2", md: "sm:gap-4", lg: "sm:gap-6", xl: "sm:gap-8" },
  md:   { none: "md:gap-0", xs: "md:gap-1", sm: "md:gap-2", md: "md:gap-4", lg: "md:gap-6", xl: "md:gap-8" },
  lg:   { none: "lg:gap-0", xs: "lg:gap-1", sm: "lg:gap-2", md: "lg:gap-4", lg: "lg:gap-6", xl: "lg:gap-8" },
  xl:   { none: "xl:gap-0", xs: "xl:gap-1", sm: "xl:gap-2", md: "xl:gap-4", lg: "xl:gap-6", xl: "xl:gap-8" },
}

const colsMap: BreakpointClassMap<GridCols> = {
  base: { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6", 12: "grid-cols-12" },
  sm:   { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6", 12: "sm:grid-cols-12" },
  md:   { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6", 12: "md:grid-cols-12" },
  lg:   { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6", 12: "lg:grid-cols-12" },
  xl:   { 1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6", 12: "xl:grid-cols-12" },
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Número de colunas. Aceita 1|2|3|4|5|6|12 ou objeto responsivo. */
  cols?: ResponsiveValue<GridCols>
  /** Espaçamento entre células. Default: "md" (16px). Aceita objeto responsivo. */
  gap?: ResponsiveValue<GridGap>
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
        resolveResponsive(cols, colsMap),
        resolveResponsive(gap, gapMap),
        className
      )}
      {...props}
    />
  )
)
Grid.displayName = "Grid"

// Backwards-compat type aliases (Grid já era usado externamente)
export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl"
