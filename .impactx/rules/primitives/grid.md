# Grid — Layout Responsivo 2D

**Carrega quando bot mencionar:** grid, grid responsivo, layout em colunas, grid-cols, dashboard de cards, lista em grid, matriz de elementos.

## Import

```ts
import { Grid } from "@impactxlab/design-system"
```

## Props

```ts
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de colunas: 1 | 2 | 3 | 4 | 5 | 6 | 12.
   * - Número simples → mesma quantidade em todos breakpoints.
   * - Objeto {base?, sm?, md?, lg?, xl?} → responsivo (mobile-first).
   * Default: {base: 1, md: 2, lg: 3}
   */
  cols?: number | Partial<Record<"base" | "sm" | "md" | "lg" | "xl", number>>

  /**
   * Gap entre células: "none" | "xs" | "sm" | "md" | "lg" | "xl".
   * - "none" = 0px
   * - "xs" = 4px, "sm" = 8px, "md" = 16px (default)
   * - "lg" = 24px, "xl" = 32px
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl"

  /**
   * Renderiza como outro elemento. Default: "div".
   */
  as?: React.ElementType
}
```

## Árvore de Decisão

| Caso | Primitiva | Motivo |
|------|-----------|--------|
| 2D: linhas × colunas (cards, dashboards) | **Grid** | Alinhamento perfeto em ambas dimensões |
| 1D vertical com espaçamento | Stack | Flex column, sem grid |
| 1D horizontal com wrap automático | Cluster | Flex row wrap, chips/tags |
| Layout assimétrico (col-span variado) | grid-cols-12 + col-span manual | TODO: não temos primitive ainda |

## Exemplos ✅

### Grid básico: 3 colunas
```tsx
<Grid cols={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### Responsivo: mobile-first
```tsx
<Grid 
  cols={{ base: 1, md: 2, lg: 3 }} 
  gap="lg"
>
  {/* 1 col em mobile, 2 em tablet, 3 em desktop */}
</Grid>
```

### Dashboard de stats: 4 cards (2×2)
```tsx
<Grid 
  cols={{ base: 1, sm: 2, lg: 4 }} 
  gap="md"
>
  <StatCard label="Revenue" value="R$ 42.5k" />
  <StatCard label="Users" value="1,203" />
  <StatCard label="Conversion" value="3.2%" />
  <StatCard label="Bounce" value="24.5%" />
</Grid>
```

### Lista de alunos em cards
```tsx
<Grid 
  cols={{ base: 1, md: 2, xl: 3 }} 
  gap="md"
>
  {students.map(s => <StudentCard key={s.id} {...s} />)}
</Grid>
```

## Anti-patterns ❌

### ❌ Tailwind grid-cols cru sem responsividade
```tsx
// ERRADO: quebra em mobile
<div className="grid grid-cols-3 gap-4">
```

### ❌ grid-cols hardcoded em className
```tsx
// ERRADO: ignora prop cols
<Grid cols={3} className="grid-cols-3">
```

### ❌ Muitas colunas em mobile (espremido)
```tsx
// ERRADO: 5 cols em mobile é ilegível
<Grid cols={{ base: 5, md: 3 }}>
```

### ❌ Usar Grid pra layout 1D
```tsx
// ERRADO: use Stack
<Grid cols={1} gap="md">
  <div>Item</div>
</Grid>

// CORRETO:
<Stack gap="md">
  <div>Item</div>
</Stack>
```

## Quando NÃO usar Grid

| Caso | Use | Motivo |
|------|-----|--------|
| Lista vertical simples | Stack | Flex column é suficiente |
| Chips/tags que precisam wrap | Cluster | Flex row wrap + gap |
| Layout assimétrico (col-spans variados) | `grid-cols-12` + `col-span-N` manual | Primitive TODO (usar direto no className) |

## Implementação Técnica

**Localização:** `packages/ds-education/src/components/grid.tsx`

**Classes Tailwind:** explicitamente listadas no source (`baseColMap`, `breakpointColMap`) para que Tailwind v4's content-aware build as detecte:
- `grid-cols-1` até `grid-cols-12`
- `sm:grid-cols-*`, `md:grid-cols-*`, `lg:grid-cols-*`, `xl:grid-cols-*`
- `gap-0`, `gap-1`, `gap-2`, `gap-4`, `gap-6`, `gap-8`

Não interpola strings dinamicamente — classes são constantes, garantindo detecção em build-time.
