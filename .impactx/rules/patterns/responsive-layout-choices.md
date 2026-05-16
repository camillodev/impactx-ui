# Pattern: Escolha de layout responsivo

> **Trigger:** "como faço grid responsivo", "Grid vs Stack vs Cluster", "responsive em mobile/desktop", "quebra de linha", "quando usar cada primitive".

## A regra de ouro

**NUNCA escreva `grid-cols-N` ou `flex-col md:flex-row` direto em className.** Use o primitive certo + objeto responsivo `{ base, sm, md, lg, xl }`.

## Árvore de decisão

```
Layout 2D (linhas × colunas) com células de tamanho similar?
└─ SIM → Grid (cols={{ base: 1, md: 2, lg: 3 }})

Empilhar items 1D com gap consistente, direção fixa ou semi-fixa?
└─ SIM → Stack
   ├─ Sempre vertical → direction="vertical"
   ├─ Sempre horizontal → direction="horizontal"
   └─ Mobile vertical + desktop horizontal → direction={{ base: "vertical", md: "horizontal" }}

Linha horizontal que pode quebrar pra próxima automaticamente (tags, chips, botões)?
└─ SIM → Cluster (flex-wrap built-in)

Container de página com max-width + padding?
└─ SIM → PageContainer
```

## Sintaxe responsiva (igual em todos os primitives)

```tsx
// Valor único = mobile-first, mesmo em todos breakpoints
<Grid cols={3} />
<Stack direction="vertical" />
<Cluster gap="md" />
<PageContainer maxWidth="lg" />

// Objeto responsivo = mobile-first, declarativo
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: "sm", md: "md" }} />
<Stack direction={{ base: "vertical", md: "horizontal" }} gap={{ base: "sm", md: "md" }} />
<Cluster gap={{ base: "sm", md: "md" }} justify={{ base: "start", md: "between" }} />
<PageContainer maxWidth={{ base: "md", md: "lg" }} padding={{ base: "sm", md: "md" }} />
```

## Breakpoints (Tailwind v4 defaults)

| Token | Largura mínima | Uso típico |
|---|---|---|
| `base` | 0px (mobile) | Default mobile-first |
| `sm` | 640px | Phablet / portrait tablet |
| `md` | 768px | Tablet landscape |
| `lg` | 1024px | Desktop padrão |
| `xl` | 1280px+ | Desktop wide |

## Exemplos comuns

### Form com layout móvel vertical → desktop horizontal
```tsx
<Stack direction={{ base: "vertical", md: "horizontal" }} gap="md">
  <Input placeholder="Nome" />
  <Input placeholder="Email" />
</Stack>
```

### Grid de cards mobile-friendly
```tsx
<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
  {cards.map(c => <Card key={c.id} {...c} />)}
</Grid>
```

### Toolbar que muda alinhamento em desktop
```tsx
<Cluster justify={{ base: "start", md: "between" }} gap="md">
  <SearchInput />
  <ActionsCluster />
</Cluster>
```

## API Props por Primitive

| Prop | Grid | Stack | Cluster | PageContainer |
|---|---|---|---|---|
| `cols` / `direction` / `maxWidth` | `ResponsiveValue<GridCols>` | `ResponsiveValue<StackDirection>` | — | `ResponsiveValue<PageContainerMaxWidth>` |
| `gap` | `ResponsiveValue<GridGap>` | `ResponsiveValue<StackGap>` | `ResponsiveValue<ClusterGap>` | — |
| `align` | — | `ResponsiveValue<StackAlign>` | `ResponsiveValue<ClusterAlign>` | — |
| `justify` | — | `ResponsiveValue<StackJustify>` | `ResponsiveValue<ClusterJustify>` | — |
| `padding` | — | — | — | `ResponsiveValue<PageContainerPadding>` |

## Anti-patterns ❌

- ❌ `<div className="grid grid-cols-1 md:grid-cols-3">` → use `<Grid cols={{ base: 1, md: 3 }}>`
- ❌ `<div className="flex flex-col md:flex-row">` → use `<Stack direction={{ base: "vertical", md: "horizontal" }}>`
- ❌ `<div className="max-w-7xl mx-auto px-4">` → use `<PageContainer maxWidth="lg" />`
- ❌ Misturar valores simples + objetos responsivos na mesma tela sem motivo claro
- ❌ Declarar 5 breakpoints quando 2 bastam (ex: `base/sm/md/lg/xl` vs `base/md`)

## Links

- `.impactx/rules/primitives/grid.md`
- `.impactx/rules/primitives/stack.md`
- `.impactx/rules/primitives/cluster.md`
- `.impactx/rules/primitives/page-container.md`
