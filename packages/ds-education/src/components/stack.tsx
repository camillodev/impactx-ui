import * as React from "react"
import { cn } from "../utils"
import {
  resolveResponsive,
  type ResponsiveValue,
  type BreakpointClassMap,
} from "./_responsive"

/**
 * Stack — flex container com gap consistente.
 *
 * Props aceitam valor único OU objeto responsivo `{ base, sm, md, lg, xl }`.
 *
 * Decision tree:
 * - Conteúdo vertical com espaço uniforme? → Stack
 * - Conteúdo horizontal que pode quebrar linha? → Cluster
 * - Grid 2D (linhas × colunas)? → Grid
 */

export type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"
export type StackDirection = "vertical" | "horizontal"
export type StackAlign = "start" | "center" | "end" | "stretch"
export type StackJustify = "start" | "center" | "end" | "between" | "around"

const gapMap: BreakpointClassMap<StackGap> = {
  base: { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" },
  sm:   { none: "sm:gap-0", xs: "sm:gap-1", sm: "sm:gap-2", md: "sm:gap-4", lg: "sm:gap-6", xl: "sm:gap-8" },
  md:   { none: "md:gap-0", xs: "md:gap-1", sm: "md:gap-2", md: "md:gap-4", lg: "md:gap-6", xl: "md:gap-8" },
  lg:   { none: "lg:gap-0", xs: "lg:gap-1", sm: "lg:gap-2", md: "lg:gap-4", lg: "lg:gap-6", xl: "lg:gap-8" },
  xl:   { none: "xl:gap-0", xs: "xl:gap-1", sm: "xl:gap-2", md: "xl:gap-4", lg: "xl:gap-6", xl: "xl:gap-8" },
}

const directionMap: BreakpointClassMap<StackDirection> = {
  base: { vertical: "flex-col", horizontal: "flex-row" },
  sm:   { vertical: "sm:flex-col", horizontal: "sm:flex-row" },
  md:   { vertical: "md:flex-col", horizontal: "md:flex-row" },
  lg:   { vertical: "lg:flex-col", horizontal: "lg:flex-row" },
  xl:   { vertical: "xl:flex-col", horizontal: "xl:flex-row" },
}

const alignMap: BreakpointClassMap<StackAlign> = {
  base: { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" },
  sm:   { start: "sm:items-start", center: "sm:items-center", end: "sm:items-end", stretch: "sm:items-stretch" },
  md:   { start: "md:items-start", center: "md:items-center", end: "md:items-end", stretch: "md:items-stretch" },
  lg:   { start: "lg:items-start", center: "lg:items-center", end: "lg:items-end", stretch: "lg:items-stretch" },
  xl:   { start: "xl:items-start", center: "xl:items-center", end: "xl:items-end", stretch: "xl:items-stretch" },
}

const justifyMap: BreakpointClassMap<StackJustify> = {
  base: { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between", around: "justify-around" },
  sm:   { start: "sm:justify-start", center: "sm:justify-center", end: "sm:justify-end", between: "sm:justify-between", around: "sm:justify-around" },
  md:   { start: "md:justify-start", center: "md:justify-center", end: "md:justify-end", between: "md:justify-between", around: "md:justify-around" },
  lg:   { start: "lg:justify-start", center: "lg:justify-center", end: "lg:justify-end", between: "lg:justify-between", around: "lg:justify-around" },
  xl:   { start: "xl:justify-start", center: "xl:justify-center", end: "xl:justify-end", between: "xl:justify-between", around: "xl:justify-around" },
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Espaçamento entre filhos. Default: "md" (16px). Aceita objeto responsivo. */
  gap?: ResponsiveValue<StackGap>
  /** Direção. Default: "vertical". Aceita objeto responsivo (ex: column→row em md). */
  direction?: ResponsiveValue<StackDirection>
  /** Alinhamento cross-axis. Default: stretch (vertical) / center (horizontal). */
  align?: ResponsiveValue<StackAlign>
  /** Distribuição main-axis. */
  justify?: ResponsiveValue<StackJustify>
  /** Renderiza como outro elemento. Default: "div". */
  as?: React.ElementType
}

function pickDefaultAlign(direction: ResponsiveValue<StackDirection>): StackAlign {
  // Default semântico: vertical → stretch, horizontal → center.
  // Pra responsive, usa o base (mobile-first); usuário pode passar align próprio.
  const base = typeof direction === "string" ? direction : direction.base ?? "vertical"
  return base === "vertical" ? "stretch" : "center"
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
    const resolvedAlign: ResponsiveValue<StackAlign> = align ?? pickDefaultAlign(direction)
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex min-w-0",
          resolveResponsive(direction, directionMap),
          resolveResponsive(gap, gapMap),
          resolveResponsive(resolvedAlign, alignMap),
          justify && resolveResponsive(justify, justifyMap),
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
