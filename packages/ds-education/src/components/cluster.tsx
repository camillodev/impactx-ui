import * as React from "react"
import { cn } from "../utils"

/**
 * Cluster — flex horizontal com wrap automático.
 *
 * Pattern de Every Layout (Heydon Pickering). Itens flutuam horizontalmente
 * com gap consistente; ao não caber, quebram pra linha de baixo.
 *
 * Decision tree:
 * - Botões de ação em footer de modal → Cluster
 * - Tags/chips em meta de card → Cluster
 * - Filtros lado a lado que podem quebrar → Cluster
 * - Conteúdo vertical → Stack
 */

export type ClusterGap = "none" | "xs" | "sm" | "md" | "lg"
export type ClusterAlign = "start" | "center" | "end" | "baseline"
export type ClusterJustify = "start" | "center" | "end" | "between"

const gapMap: Record<ClusterGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
}

const alignMap: Record<ClusterAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
}

const justifyMap: Record<ClusterJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Espaçamento entre itens. Default: "md" (12px). */
  gap?: ClusterGap
  /** Alinhamento vertical. Default: "center". */
  align?: ClusterAlign
  /** Distribuição horizontal. Default: "start". */
  justify?: ClusterJustify
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
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...props}
    />
  )
)
Cluster.displayName = "Cluster"
