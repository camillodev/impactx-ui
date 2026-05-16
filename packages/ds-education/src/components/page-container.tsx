import * as React from "react"
import { cn } from "../utils"

/**
 * PageContainer — wrapper de página com max-width e padding responsivo.
 *
 * Substitui composições manuais de `<div className="max-w-7xl mx-auto px-4 py-6">`.
 * Garante padding mobile-first consistente e max-width tipado.
 *
 * Decision tree:
 * - Página de lista/dashboard padrão? → maxWidth="lg" (1280px)
 * - Página de form ou settings (conteúdo estreito)? → maxWidth="md" (768px)
 * - Hero/landing full-bleed? → maxWidth="full"
 * - Conteúdo de leitura (artigo, doc)? → maxWidth="prose" (~65ch)
 */

export type PageContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "full" | "prose"
export type PageContainerPadding = "none" | "sm" | "md" | "lg"

const maxWidthMap: Record<PageContainerMaxWidth, string> = {
  sm: "max-w-2xl",      // 672px
  md: "max-w-4xl",      // 896px
  lg: "max-w-7xl",      // 1280px (default)
  xl: "max-w-[1440px]", // 1440px
  full: "max-w-none",
  prose: "max-w-prose", // ~65ch
}

const paddingMap: Record<PageContainerPadding, string> = {
  none: "px-0 py-0",
  sm: "px-4 py-4 md:px-6 md:py-6",
  md: "px-4 py-6 md:px-8 md:py-8",   // default
  lg: "px-4 py-8 md:px-12 md:py-12",
}

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width do container. Default: "lg" (1280px). */
  maxWidth?: PageContainerMaxWidth
  /** Padding responsivo. Default: "md". */
  padding?: PageContainerPadding
  /** Renderiza como outro elemento. Default: "div". Pra <main>, passar `as="main"`. */
  as?: React.ElementType
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    {
      className,
      maxWidth = "lg",
      padding = "md",
      as: Comp = "div",
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "mx-auto w-full",
        maxWidthMap[maxWidth],
        paddingMap[padding],
        className
      )}
      {...props}
    />
  )
)
PageContainer.displayName = "PageContainer"
