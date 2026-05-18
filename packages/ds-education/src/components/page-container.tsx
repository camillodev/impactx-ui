import * as React from "react"
import { cn } from "../utils"
import {
  resolveResponsive,
  type ResponsiveValue,
  type BreakpointClassMap,
} from "./_responsive"

/**
 * PageContainer — wrapper de página com max-width e padding responsivo.
 *
 * Props aceitam valor único OU objeto responsivo `{ base, sm, md, lg, xl }`.
 *
 * Decision tree:
 * - Página de lista/dashboard padrão? → maxWidth="lg" (1280px)
 * - Página de form ou settings (conteúdo estreito)? → maxWidth="md" (768px)
 * - Hero/landing full-bleed? → maxWidth="full"
 * - Conteúdo de leitura (artigo, doc)? → maxWidth="prose" (~65ch)
 */

export type PageContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "full" | "prose"
export type PageContainerPadding = "none" | "sm" | "md" | "lg"

const maxWidthMap: BreakpointClassMap<PageContainerMaxWidth> = {
  base: { sm: "max-w-2xl", md: "max-w-4xl", lg: "max-w-7xl", xl: "max-w-[1440px]", full: "max-w-none", prose: "max-w-prose" },
  sm:   { sm: "sm:max-w-2xl", md: "sm:max-w-4xl", lg: "sm:max-w-7xl", xl: "sm:max-w-[1440px]", full: "sm:max-w-none", prose: "sm:max-w-prose" },
  md:   { sm: "md:max-w-2xl", md: "md:max-w-4xl", lg: "md:max-w-7xl", xl: "md:max-w-[1440px]", full: "md:max-w-none", prose: "md:max-w-prose" },
  lg:   { sm: "lg:max-w-2xl", md: "lg:max-w-4xl", lg: "lg:max-w-7xl", xl: "lg:max-w-[1440px]", full: "lg:max-w-none", prose: "lg:max-w-prose" },
  xl:   { sm: "xl:max-w-2xl", md: "xl:max-w-4xl", lg: "xl:max-w-7xl", xl: "xl:max-w-[1440px]", full: "xl:max-w-none", prose: "xl:max-w-prose" },
}

// Padding já é "responsivo embutido" (mobile-first dentro de cada size).
// Pra responsive prop, cada size mantém seu par px/py.
const paddingMap: BreakpointClassMap<PageContainerPadding> = {
  base: { none: "px-0 py-0", sm: "px-4 py-4", md: "px-4 py-6", lg: "px-4 py-8" },
  sm:   { none: "sm:px-0 sm:py-0", sm: "sm:px-4 sm:py-4", md: "sm:px-6 sm:py-6", lg: "sm:px-8 sm:py-8" },
  md:   { none: "md:px-0 md:py-0", sm: "md:px-6 md:py-6", md: "md:px-8 md:py-8", lg: "md:px-12 md:py-12" },
  lg:   { none: "lg:px-0 lg:py-0", sm: "lg:px-6 lg:py-6", md: "lg:px-10 lg:py-10", lg: "lg:px-16 lg:py-16" },
  xl:   { none: "xl:px-0 xl:py-0", sm: "xl:px-8 xl:py-8", md: "xl:px-12 xl:py-12", lg: "xl:px-20 xl:py-20" },
}

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width do container. Default: "lg" (1280px). Aceita objeto responsivo. */
  maxWidth?: ResponsiveValue<PageContainerMaxWidth>
  /** Padding. Default: "md". Aceita objeto responsivo. */
  padding?: ResponsiveValue<PageContainerPadding>
  /** Renderiza como outro elemento. Default: "div". Pra <main>, passar as="main". */
  as?: React.ElementType
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    {
      className,
      maxWidth = "lg",
      padding = { base: "sm", md: "md" },
      as: Comp = "div",
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "mx-auto w-full",
        resolveResponsive(maxWidth, maxWidthMap),
        resolveResponsive(padding, paddingMap),
        className
      )}
      {...props}
    />
  )
)
PageContainer.displayName = "PageContainer"
