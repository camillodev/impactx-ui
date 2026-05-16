/**
 * Responsive prop helper — shared entre Grid/Stack/Cluster/PageContainer.
 *
 * Pattern:
 *   prop={"value"}                              → classe única (mobile-first)
 *   prop={{ base: "x", md: "y", lg: "z" }}      → classes responsivas
 *
 * Cada primitive passa um `valueMap` por breakpoint. Helper resolve
 * o valor (escalar ou objeto) em string de classes Tailwind v4.
 *
 * Por que mapeamento estático em vez de interpolar:
 *   Tailwind v4 detecta classes via content-aware build. Strings como
 *   `md:${cls}` ficam invisíveis e Tailwind purge derruba o estilo em prod.
 */

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl"

export type ResponsiveValue<T extends string | number> =
  | T
  | Partial<Record<Breakpoint, T>>

export type BreakpointClassMap<T extends string | number> = Record<
  Breakpoint,
  Record<T, string>
>

/**
 * Resolve responsive value into space-joined Tailwind classes.
 *
 * @example
 * const colsMap: BreakpointClassMap<1 | 2 | 3> = {
 *   base: { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" },
 *   sm:   { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" },
 *   md:   { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" },
 *   lg:   { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3" },
 *   xl:   { 1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3" },
 * }
 *
 * resolveResponsive(3, colsMap)                       // "grid-cols-3"
 * resolveResponsive({ base: 1, md: 2, lg: 3 }, colsMap) // "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
 */
export function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T>,
  classMap: BreakpointClassMap<T>
): string {
  if (typeof value === "string" || typeof value === "number") {
    return classMap.base[value]
  }
  const out: string[] = []
  if (value.base != null) out.push(classMap.base[value.base])
  if (value.sm != null) out.push(classMap.sm[value.sm])
  if (value.md != null) out.push(classMap.md[value.md])
  if (value.lg != null) out.push(classMap.lg[value.lg])
  if (value.xl != null) out.push(classMap.xl[value.xl])
  return out.join(" ")
}
