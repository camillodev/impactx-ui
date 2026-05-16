# Badge — `@impactx/ds-education`

> Carrega quando bot mencionar: badge, tag, status, label, chip, contador, pill, etiqueta, distintivo, marcador, rótulo.

## Import

```tsx
import { Badge } from "@impactx/ds-education"
```

## Props (reais, do código)

```ts
interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  variant?:
    | "primary"    // azul soft — informativo, destaque suave
    | "success"    // verde — ativo, concluído, aprovado, validado
    | "ink"        // cinza/neutro — default, contagem, status neutro
    | "warning"    // amarelo/laranja — alerta, atenção, vence logo
    | "danger"     // vermelho — erro, inadimplente, crítico
  size?: "sm" | "md" | "lg"  // default "md"
  icon?: React.ReactNode            // ícone opcional antes do texto
  iconOnly?: boolean                 // renderiza só o ícone (circular)
}
```

Atributos HTML de `<span>` passam direto (`className`, `aria-*`, `role`, `data-*`).

Defaults: `variant="ink"`, `size="md"`.

## Decision tree

### 1. É informação de status/categoria do domínio?

- **Aluno ativo, matrículas ativas, aulas concluídas** → `variant="success"`
- **Boleto não pago, inadimplência, erro crítico** → `variant="danger"`
- **Alerta (boleto vence hoje, limite próximo)** → `variant="warning"`
- **Informação neutra/destaque (novo, importante, meta)** → `variant="primary"`
- **Contagem, metadado sem destaque (12 matrículas, 5 avisos)** → `variant="ink"` (default)

### 2. Precisa de ícone?

- **Com ícone + texto** → passa `icon={<Icon/>}`, texto como children, sem `iconOnly`
  ```tsx
  <Badge variant="warning" icon={<AlertTriangle/>}>Vence hoje</Badge>
  ```
- **Só ícone (notificação, badge de contagem circular)** → `iconOnly={true}`, sem children
  ```tsx
  <Badge variant="danger" size="md" iconOnly icon={<Bell/>} aria-label="Notificações"/>
  ```
- **Sem ícone** → omite `icon`, passa text como children

### 3. Tamanho e contexto

| size | altura | quando |
|---|---|---|
| `sm` | ~22px | tabela, lista compacta, inline em texto |
| `md` (default) | ~28px | cards, status inline, uso geral |
| `lg` | ~36px | destaque proeminente, header |

**Dica:** em tabelas e listas densas, prefira `size="sm"`.

### 4. Badge vs alternativas

| Use Badge | Use isto |
|---|---|
| Status/categoria visual | Chip (se removível) ou Tag |
| Contagem (1–99, circular) | Badge (variant="ink") |
| Alerta ou destaque de estado | Badge (variant adequada) |
| Só ícone com a11y | Badge iconOnly + aria-label |
| Ação clicável | Button (variant="tertiary" size="sm") ou IconButton |
| Seleção múltipla | Checkbox |
| Remoção de tag | Chip com botão X |

## Exemplos corretos ✅

### Status de aluno

```tsx
import { Badge } from "@impactx/ds-education"

<Badge variant="success">Ativo</Badge>
```

### Contagem inline em tabela

```tsx
<table>
  <tr>
    <td>João Silva</td>
    <td className="flex items-center gap-2">
      Matrículas
      <Badge variant="ink" size="sm">12</Badge>
    </td>
  </tr>
</table>
```

### Alerta de boleto com ícone

```tsx
import { AlertTriangle } from "lucide-react"

<Badge variant="warning" icon={<AlertTriangle/>}>Vence hoje</Badge>
```

### Inadimplência — erro

```tsx
<Badge variant="danger">Inadimplente</Badge>
```

### Notificação — ícone só (circular)

```tsx
import { Bell } from "lucide-react"

<Badge
  variant="danger"
  size="md"
  iconOnly
  icon={<Bell/>}
  aria-label="Você tem 3 notificações pendentes"
/>
```

### Em linha com texto

```tsx
<p>
  Status do pagamento:{" "}
  <Badge variant="success" size="sm" icon={<CheckCircle/>}>
    Pago
  </Badge>
</p>
```

### Múltiplos status em card

```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="success">Ativo</Badge>
  <Badge variant="ink" size="sm">Nível 3</Badge>
  <Badge variant="warning" size="sm">Boleto próximo</Badge>
</div>
```

## Anti-patterns ❌

### Variant errada por categoria

```tsx
// ❌ — danger pra "novo" não faz sentido
<Badge variant="danger">Novo aluno</Badge>

// ✅ — primary pra destaque positivo
<Badge variant="primary">Novo aluno</Badge>
```

### Cor hardcoded, reinventando Badge

```tsx
// ❌ — span com bg + color customizado
<span className="bg-blue-500 text-white px-3 py-1 rounded-full">
  Ativo
</span>

// ✅ — Badge resolve cor, padding, border-radius
<Badge variant="success">Ativo</Badge>
```

### iconOnly sem aria-label

```tsx
// ❌ — teclado/leitor tela não sabe o que é
<Badge iconOnly icon={<Bell/>}/>

// ✅ — label descreve o significado
<Badge iconOnly icon={<Bell/>} aria-label="Alertas"/>
```

### Badge gigante quando deveria ser pequeno

```tsx
// ❌ — size="lg" comprime tabela
<Badge variant="ink" size="lg">15</Badge>

// ✅ — size="sm" ou "md" em tabela
<Badge variant="ink" size="sm">15</Badge>
```

### 5 Badges competindo visualmente

```tsx
// ❌ — hierarquia confusa, muita cor
<div className="flex gap-1">
  <Badge variant="primary">Meta</Badge>
  <Badge variant="success">Ativo</Badge>
  <Badge variant="warning">Atenção</Badge>
  <Badge variant="danger">Erro</Badge>
  <Badge variant="ink">Info</Badge>
</div>

// ✅ — apenas as relevantes pro contexto
<div className="flex gap-1">
  <Badge variant="success">Ativo</Badge>
  <Badge variant="warning">Boleto próximo</Badge>
</div>
```

### Badge como botão clicável

```tsx
// ❌ — Badge não é interativo
<Badge onClick={handleClick} role="button">
  Editar
</Badge>

// ✅ — Button tem semântica + estados focus/hover
<Button variant="tertiary" size="sm" onClick={handleClick}>
  Editar
</Button>
```

## Acessibilidade

- **iconOnly**: SEMPRE passe `aria-label` ou `title` descrevendo o significado. Badge spreads `...props`, então passa direto.
  ```tsx
  <Badge iconOnly icon={<AlertTriangle/>} aria-label="Alerta crítico"/>
  ```

- **Status semântico**: se o Badge comunica estado que muda dinamicamente (ex.: notificação), considere `role="status"` para alertar screen readers.
  ```tsx
  <Badge variant="danger" role="status" aria-live="polite">
    {notificationCount} novo{notificationCount !== 1 ? "s" : ""}
  </Badge>
  ```

- **Foco**: Badge é `<span>` (não focável por default). Se precisa ser clicável/focável, use `<Button>` ou adicione `tabindex="0"` + listeners (mas `<Button>` é mais simples).

- **Cor não é única**: não comunique estado **só** por cor. Use ícone + texto/label ou `aria-label`.

## Quando NÃO usar Badge

| Caso | Use isto |
|---|---|
| Tag removível com X | `<Chip>` |
| Contagem grande (> 99) | `<Stat>` ou texto simples |
| Ação clicável | `<Button>` ou `<IconButton>` |
| Toggle on/off | `<Switch>` |
| Alerta de página inteira | `<Toast>` ou `<Alert>` |
| Abas/segmentação | `<Tabs>` ou `<SegmentedControl>` |
| Menu dropdown | `<DropdownMenu>` + `<Badge>` como indicador, não item |

## Implementação técnica

Código: `packages/ds-education/src/components/badge.tsx`

CSS vars consumidas (mudança visual → editar tokens, **não** badge.tsx):

- `--color-primary-soft` / `-hover` — variant="primary"
- `--color-secondary-active` / `-fg` — variant="ink"
- `--badge-success-bg` / `-fg` — variant="success"
- `--badge-warning-bg` / `-fg` — variant="warning"
- `--badge-danger-bg` / `-fg` — variant="danger"

Tokens vivem em `packages/ds-education/src/tokens/themes/{education,kumon,impactx}.css`.

O componente cuida de:
- Padding e gap automático por size
- Font size responsivo (12px, 13px, 14px)
- Ícone centralizado em iconOnly (circular)
- Border-radius fixo (rounded-full)
- Stroke width de ícones (2.5px)

Quer ajustar espaçamento globalmente? **Não toca em badge.tsx.** Edita os números de `gap` e `py`/`px` direto na CVA — ou melhor, espera tokens 3-tier e edita `--spacing-badge-sm`, etc.
