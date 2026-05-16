import * as React from "react"
import { cn } from "../utils"
import {
  resolveResponsive,
  type ResponsiveValue,
  type BreakpointClassMap,
} from "./_responsive"

/**
 * Cluster — flex horizontal com wrap automático.
 *
 * Pattern Every Layout (Heydon Pickering). Itens flutuam horizontalmente
 * com gap consistente; ao não caber, quebram pra linha de baixo.
 *
 * Props aceitam valor único OU objeto responsivo `{ base, sm, md, lg, xl }`.
 *
 * Decision tree:
 * - Botões em footer de modal → Cluster
 * - Tags/chips em meta de card → Cluster
 * - Filtros lado a lado que podem quebrar → Cluster
 * - Conteúdo vertical → Stack
 */

export type ClusterGap = "none" | "xs" | "sm" | "md" | "lg"
export type ClusterAlign = "start" | "center" | "end" | "baseline"
export type ClusterJustify = "start" | "center" | "end" | "between"

const gapMap: BreakpointClassMap<ClusterGap> = {
  base: { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-3", lg: "gap-4" },
  sm:   { none: "sm:gap-0", xs: "sm:gap-1", sm: "sm:gap-2", md: "sm:gap-3", lg: "sm:gap-4" },
  md:   { none: "md:gap-0", xs: "md:gap-1", sm: "md:gap-2", md: "md:gap-3", lg: "md:gap-4" },
  lg:   { none: "lg:gap-0", xs: "lg:gap-1", sm: "lg:gap-2", md: "lg:gap-3", lg: "lg:gap-4" },
  xl:   { none: "xl:gap-0", xs: "xl:gap-1", sm: "xl:gap-2", md: "xl:gap-3", lg: "xl:gap-4" },
}

const alignMap: BreakpointClassMap<ClusterAlign> = {
  base: { start: "items-start", center: "items-center", end: "items-end", baseline: "items-baseline" },
  sm:   { start: "sm:items-start", center: "sm:items-center", end: "sm:items-end", baseline: "sm:items-baseline" },
  md:   { start: "md:items-start", center: "md:items-center", end: "md:items-end", baseline: "md:items-baseline" },
  lg:   { start: "lg:items-start", center: "lg:items-center", end: "lg:items-end", baseline: "lg:items-baseline" },
  xl:   { start: "xl:items-start", center: "xl:items-center", end: "xl:items-end", baseline: "xl:items-baseline" },
}

const justifyMap: BreakpointClassMap<ClusterJustify> = {
  base: { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" },
  sm:   { start: "sm:justify-start", center: "sm:justify-center", end: "sm:justify-end", between: "sm:justify-between" },
  md:   { start: "md:justify-start", center: "md:justify-center", end: "md:justify-end", between: "md:justify-between" },
  lg:   { start: "lg:justify-start", center: "lg:justify-center", end: "lg:justify-end", between: "lg:justify-between" },
  xl:   { start: "xl:justify-start", center: "xl:justify-center", end: "xl:justify-end", between: "xl:justify-between" },
}

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Espaçamento entre itens. Default: "md" (12px). Aceita objeto responsivo. */
  gap?: ResponsiveValue<ClusterGap>
  /** Alinhamento vertical. Default: "center". Aceita objeto responsivo. */
  align?: ResponsiveValue<ClusterAlign>
  /** Distribuição horizontal. Default: "start". Aceita objeto responsivo. */
  justify?: ResponsiveValue<ClusterJustify>
  /** Renderiza como outro elemento. Default: "div". */
  as?: React.ElementType
}

export const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(
  (
    {
      className,
      gap = "md",
      align = "center",
      justify = "start",
      as: Comp = "div",
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "flex flex-wrap",
        resolveResponsive(gap, gapMap),
        resolveResponsive(align, alignMap),
        resolveResponsive(justify, justifyMap),
        className
      )}
      {...props}
    />
  )
)
Cluster.displayName = "Cluster"
