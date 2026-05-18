# Chart Contract — @camillodev/ui

> Status: estável. Engine: **ECharts 6** (não Recharts).
> Componentes: `EChart`, `DonutChart`, `BarChart`, `LineChart`, `AreaChart`.

## Tone System

Charts derivam cor de **CSS custom properties** do theme ativo via runtime lookup
(`getComputedStyle(document.documentElement).getPropertyValue(...)`).

```ts
type ChartTone = "primary" | "success" | "warning" | "danger" | "muted"
```

| Tone | CSS var | Fallback |
|---|---|---|
| `primary` | `--color-primary` | `#11C76F` |
| `success` | `--color-toast-success-fg` | `#11C76F` |
| `warning` | `--color-warning` | `#11C76F` |
| `danger` | `--color-danger-primary` | `#11C76F` |
| `muted` | `--color-text-muted` | `#11C76F` |

Texto/eixos/grids usam `--color-text`, `--color-text-muted`, `--color-border`,
`--color-border-muted`, `--color-surface`.

## Re-render em theme/mode switch

Passe `themeKey` (string ou número) que mude quando o theme/mode mudar,
para forçar re-leitura das CSS vars:

```tsx
const themeKey = `${theme}-${mode}` // ex: "kumon-dark"

<DonutChart value={72} tone="primary" themeKey={themeKey} />
```

Sem `themeKey`, o chart fica "preso" nas cores do mount inicial.

## APIs

### `<DonutChart>`
```tsx
// modo simples (0-100)
<DonutChart value={72} tone="primary" centerText="72%" size={180} />

// modo segmentado
<DonutChart
  series={[
    { name: "Pago", value: 60, tone: "success" },
    { name: "Pendente", value: 30, tone: "warning" },
    { name: "Vencido", value: 10, tone: "danger" },
  ]}
  showLegend
/>
```

### `<BarChart>`
```tsx
<BarChart
  categories={["Jan", "Fev", "Mar"]}
  series={[
    { name: "Receita", data: [12000, 14500, 13200], tone: "primary" },
    { name: "Custo", data: [4000, 4200, 4100], tone: "muted" },
  ]}
  horizontal={false}
  showLegend
/>
```

### `<LineChart>` / `<AreaChart>`
```tsx
<LineChart
  categories={["Sem 1","Sem 2","Sem 3","Sem 4"]}
  series={[{ name: "MRR", data: [10,12,14,18], tone: "primary" }]}
  smooth
/>

<AreaChart {...mesmosProps} /> {/* alias de LineChart com area=true */}
```

### `<EChart>` (escape hatch)
Passa `EChartsOption` cru para casos não cobertos pelos wrappers.
Use `resolveTone(tone)` e `resolveTextColors()` para herdar tema corretamente.

## SSR

Todos os charts são **client-only** (`"use client"` + lazy import de echarts).
Bundle do echarts não vai pro server bundle.

## Migração de Recharts

`Recharts 3.x` → `EChart` wrapper. Mapeamento típico:

| Recharts | ECharts wrapper |
|---|---|
| `<PieChart>` + `<Pie>` | `<DonutChart series={...}>` |
| `<BarChart>` + `<Bar>` | `<BarChart categories series>` |
| `<LineChart>` + `<Line>` | `<LineChart categories series>` |
| `<AreaChart>` + `<Area>` | `<AreaChart categories series>` |
| `<Tooltip>` | built-in (controlado via option) |
| `<Legend>` | `showLegend` prop |

Para configs avançadas (eixos duplos, candlestick, gauge), use `<EChart>` direto.

## Tokens necessários no theme

Se um theme novo for adicionado, garanta as 5 vars de tone + 5 vars de texto:

```css
.theme-novo {
  --color-primary: ...;
  --color-toast-success-fg: ...;
  --color-warning: ...;
  --color-danger-primary: ...;
  --color-text-muted: ...;
  --color-text: ...;
  --color-border: ...;
  --color-border-muted: ...;
  --color-surface: ...;
}
```

Sem essas vars, charts caem no fallback `#11C76F` (verde Impact X).
