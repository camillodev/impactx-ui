# DonutScore

Gráfico circular percentual para exibir acertos, performance ou score do aluno.

**Trigger**: donut, score, gráfico circular, progresso, percentual, performance, score do aluno

## Import

```typescript
import { DonutScore } from "@/components-education/donut-score"
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `value` | number | — | Percentual (0–100). Obrigatório. |
| `size` | number | 120 | Diâmetro do SVG em pixels. |
| `strokeWidth` | number | 7 | Espessura do arco em pixels. |
| `warning` | boolean | false | Quando `true`, arco muda para cor warning (laranja). |
| `label` | string | "Acertos da sua Escola" | Texto secundário abaixo do valor. Passe `""` para esconder. |
| `className` | string | — | Classes CSS adicionais (wrapper). |

## Árvore de Decisão

```
Score percentual (0–100%) visual e circular?
├─ SIM → DonutScore ✅
└─ NÃO
   ├─ Progresso linear → ProgressBar
   ├─ Valor numérico simples (sem visualização) → Stat
   └─ Gauge ou progresso customizado → Chart / Radix
```

## Exemplos Corretos

```tsx
// Score padrão
<DonutScore value={85} />

// Score com warning
<DonutScore value={35} warning />

// Score compacto em card
<DonutScore value={92} size={80} strokeWidth={5} />

// Score sem label (puro visual)
<DonutScore value={78} label="" />

// Score com contexto customizado
<DonutScore 
  value={65} 
  size={100} 
  label="Desempenho da Semana"
/>
```

## Anti-patterns

❌ **DonutScore sem unidade/contexto**
```tsx
// Sem label e sem aria-describedby
<DonutScore value={42} label="" />
// Usuário não sabe o que mede
```

❌ **Score > 100% sem cap visual**
```tsx
// Não fazer cálculo manual
<DonutScore value={150} />
// SVG quer 0–100; capeie antes do component
```

❌ **DonutScore em container muito pequeno**
```tsx
// Label fica ilegível em size < 100px
<DonutScore value={88} size={50} />
```

## Acessibilidade

- **Role**: `aria-hidden="true"` no SVG (apenas visualização)
- **Contexto**: sempre acompanhe com `<label>`, `aria-label`, ou `aria-describedby`
- **Contraste**: cores (primary/warning) herdam do tema; verificar `--color-primary` e `--color-warning` contra `--color-text`

## Quando NÃO usar

- **Progresso linear** → ProgressBar é mais apropriado
- **Múltiplas métricas ao mesmo tempo** → Chart/Recharts
- **Valor sem percentual** → Stat, Badge ou KPI card
- **Comparação entre períodos** → Mini-chart ou tabela

## Implementação Técnica

- **SVG com strokeDasharray**: renderiza arco via `stroke-dasharray` + rotação 90° para começar no topo
- **Dimensionamento dinâmico**: `radius = (size - strokeWidth) / 2`, cálculo via `circumference = 2πr`
- **Cores via CSS vars**: `--color-primary` (azul), `--color-warning` (laranja), `--color-border-muted` (trilho)
- **Layout**: div flexível com SVG rotacionado + overlay de texto centralizado (absoluto)
- **Font escalável**: tamanho ajusta com `size * 0.22` (valor) e `size * 0.09` (label)
