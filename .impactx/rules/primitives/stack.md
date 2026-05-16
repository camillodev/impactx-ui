# Stack — Primitivo de layout flexível com gap uniforme

**Carrega quando bot mencionar:** stack, flex column, flex row, vertical layout, horizontal layout, espaçamento entre filhos, gap, distribuição de conteúdo, responsivo.

## Import

```tsx
import { Stack } from "@impactx-ui/ds-education"
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `gap` | `ResponsiveValue<"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` | Espaçamento entre filhos. Aceita valor único ou objeto responsivo `{ base, sm, md, lg, xl }` |
| `direction` | `ResponsiveValue<"vertical" \| "horizontal">` | `"vertical"` | Fluxo: coluna ou linha. Responsivo. |
| `align` | `ResponsiveValue<"start" \| "center" \| "end" \| "stretch">` | auto | Cross-axis. Default: `"stretch"` (vertical), `"center"` (horizontal). Responsivo. |
| `justify` | `ResponsiveValue<"start" \| "center" \| "end" \| "between" \| "around">` | — | Main-axis distribution. Responsivo. |
| `as` | `ElementType` | `"div"` | Tag HTML ou componente React |
| `...` | `HTMLAttributes<HTMLDivElement>` | — | className, id, data-*, etc. |

## Responsive API

Todas as props (`gap`, `direction`, `align`, `justify`) aceitam:
- **Valor único** (mobile-first): `gap="md"` → aplicado em todas as breakpoints
- **Objeto responsivo**: `gap={{ base: "sm", md: "md", lg: "lg" }}` → ajusta por breakpoint

Breakpoints Tailwind v4: `base` (mobile), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

## Exemplos corretos ✅

```tsx
// 1. Lista de campos (padrão vertical, gap estático)
<Stack gap="md">
  <Input placeholder="Nome" />
  <Input placeholder="Email" />
  <Checkbox label="Aceito termos" />
</Stack>

// 2. Header responsivo: vertical mobile, horizontal desktop
<Stack direction={{ base: "vertical", md: "horizontal" }} gap="md">
  <Heading level={2}>Título</Heading>
  <Text>Descrição</Text>
</Stack>

// 3. Footer de modal: botões alinhados à direita
<Stack direction="horizontal" justify="end" gap="sm">
  <Button variant="outline">Cancelar</Button>
  <Button>Confirmar</Button>
</Stack>

// 4. Card com gaps crescentes por breakpoint
<Stack gap={{ base: "sm", md: "md", lg: "lg" }}>
  <Badge>Premium</Badge>
  <Heading level={3}>Produto</Heading>
  <Text>Descrição expandida em desktop</Text>
</Stack>

// 5. Grid-like com direction responsivo (wrap → row em md)
<Stack 
  direction={{ base: "vertical", md: "horizontal" }} 
  align="start"
  gap={{ base: "xs", md: "md" }}
>
  <Icon />
  <Stack gap="xs">
    <Text weight="bold">Label</Text>
    <Text size="sm" color="muted">Helper</Text>
  </Stack>
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

// ❌ Classe Tailwind pra responsividade (hard to maintain)
<div className="flex flex-col md:flex-row">
  {children}
</div>
// ✅ Correto (use responsive object)
<Stack direction={{ base: "vertical", md: "horizontal" }}>
  {children}
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
```

## Quando NÃO usar Stack

- **Wrap horizontal:** use `Cluster`
- **Grid 2D:** use `Grid`
- **Position absolute / floating:** não é primitivo de layout
- **Layout muito complexo:** considere Grid ou Custom Layout

## Implementação técnica

**Arquivo:** `packages/ds-education/src/components/stack.tsx`

Stack renderiza como `<div className="flex min-w-0 ...">`:
- `min-w-0` previne overflow de flex children (fix overflow em textos longos)
- Responsividade resolvida via `resolveResponsive()` em `_responsive.ts`
- Suporta `as` prop para renderizar como outro elemento
