# Stack — Primitivo de layout flexível com gap uniforme

**Carrega quando bot mencionar:** stack, flex column, flex row, vertical layout, horizontal layout, espaçamento entre filhos, gap, distribuição de conteúdo.

## Import

```tsx
import { Stack } from "@impactx-ui/ds-education"
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `gap` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Espaçamento entre filhos (4px, 8px, 16px, 24px, 32px respectivamente) |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Fluxo: coluna ou linha |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | varia | Cross-axis: `"stretch"` (vertical), `"center"` (horizontal) |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around"` | — | Main-axis distribution |
| `as` | `ElementType` | `"div"` | Tag HTML ou componente React |
| `...` | `HTMLAttributes<HTMLDivElement>` | — | className, id, data-*, etc. |

## Árvore de decisão

- **Conteúdo vertical com espaçamento uniforme?** → `<Stack gap="md">` (default)
- **Conteúdo horizontal alinhado, sem quebra de linha?** → `<Stack direction="horizontal">`
- **Horizontal que pode quebrar linha automaticamente?** → Use `Cluster` (não Stack)
- **Grid 2D (linhas × colunas)?** → Use `Grid` (não Stack)

## Exemplos corretos ✅

```tsx
// 1. Lista de campos de formulário (padrão vertical)
<Stack gap="md">
  <Input placeholder="Nome" />
  <Input placeholder="Email" />
  <Checkbox label="Aceito termos" />
</Stack>

// 2. Header e body de card (gaps diferentes)
<Stack gap="lg">
  <Heading level={2}>Título</Heading>
  <Text>Descrição do card</Text>
</Stack>

// 3. Footer de modal: botões alinhados à direita, horizontal
<Stack direction="horizontal" justify="end" gap="sm">
  <Button variant="outline">Cancelar</Button>
  <Button>Confirmar</Button>
</Stack>

// 4. Stat: label em cima, valor embaixo, espaçamento mínimo
<Stack gap="xs" align="start">
  <Text size="sm" color="muted">Receita</Text>
  <Heading level={3}>R$ 12.500</Heading>
</Stack>

// 5. Linha de badge com espaçamento compacto
<Stack direction="horizontal" gap="xs" align="center">
  <Badge>Premium</Badge>
  <Badge variant="outline">2024</Badge>
</Stack>
```

## Anti-padrões ❌

```tsx
// ❌ Flex genérico: use Stack
<div className="flex flex-col gap-4">
  <Input />
  <Button />
</div>
// ✅ Correto
<Stack gap="md">
  <Input />
  <Button />
</Stack>

// ❌ Margens manuais em cada filho (quebra spacing system)
<div>
  <Input className="mb-4" />
  <Button className="mb-4" />
</div>
// ✅ Correto
<Stack gap="md">
  <Input />
  <Button />
</Stack>

// ❌ Stack horizontal pra conteúdo que precisa wrap
<Stack direction="horizontal" gap="md">
  {items.map(item => <Tag key={item}>{item}</Tag>)}
</Stack>
// ✅ Correto (use Cluster)
<Cluster gap="md">
  {items.map(item => <Tag key={item}>{item}</Tag>)}
</Cluster>

// ❌ Stack com align="stretch" em horizontal (altura inesperada)
<Stack direction="horizontal" align="stretch" gap="md">
  <SmallIcon />
  <Text>Label</Text>
</Stack>
// ✅ Correto (align="center" ou omitir)
<Stack direction="horizontal" gap="md">
  <SmallIcon />
  <Text>Label</Text>
</Stack>
```

## Quando NÃO usar Stack

- **Wrap horizontal:** use `Cluster`
- **Grid 2D:** use `Grid`
- **Position absolute / floating:** não é primitivo de layout, use wrapper customizado
- **Layout muito complexo:** considere Grid ou Custom Layout

## Implementação técnica

**Arquivo:** `packages/ds-education/src/components/stack.tsx`

Stack renderiza como `<div className="flex min-w-0 ...">`:
- `min-w-0` previne overflow de flex children (fix overflow em textos longos)
- Gap, direção, align/justify aplicados via classList
- Suporta `as` prop para renderizar como outro elemento (section, article, form, etc.)
