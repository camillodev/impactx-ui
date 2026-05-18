# Pattern: Lista em grid de cards

**Carrega quando bot mencionar:** lista de cursos/produtos/escolas em cards, grid de cards, catálogo visual, galeria de items, lista visual em vez de tabela.

## Quando usar

| Caso | Use | Por quê |
|------|-----|---------|
| Lista de entidades com visual (thumb, icon, meta) | **Grid + Card** | Cards permitem avatar, imagem, footer; Grid faz responsivo automático |
| Lista paginada de nomes simples (só texto) | DataTableWithPagination | Tabela é mais compacta e scannable |
| Lista vertical simples sem grid 2D | Stack | Flex column é suficiente |

## Receita

```tsx
<ListPageTemplate
  title="Cursos"
  primaryAction={<Button variant="primary">+ Novo Curso</Button>}
>
  <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
    {cursos.map(curso => (
      <Card key={curso.id} direction="vertical" interactive>
        <CardMedia src={curso.imagem} alt={curso.nome} />
        <CardHeader><CardTitle>{curso.nome}</CardTitle></CardHeader>
        <CardContent><p>{curso.descricao}</p></CardContent>
      </Card>
    ))}
  </Grid>
</ListPageTemplate>
```

## Variações responsivas

- **Mobile-first:** `cols={{ base: 1 }}` — 1 coluna até 640px
- **Tablet:** `cols={{ base: 1, sm: 2 }}` — 2 colunas a partir de 640px
- **Desktop:** `cols={{ base: 1, md: 2, lg: 3 }}` — 3+ colunas a partir de 768px
- **Dashboard denso:** `cols={{ base: 1, sm: 2, lg: 4 }}` — até 4 colunas
- **Gap:** `gap="sm"` (8px) pra cards compactos; `gap="lg"` (24px) pra visual respirado

## Anti-patterns ❌

### ❌ Hardcodar grid-cols-3 sem responsivo
```tsx
// ERRADO: quebra em mobile
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <Card>{item.name}</Card>)}
</div>

// CORRETO:
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
  {items.map(item => <Card>{item.name}</Card>)}
</Grid>
```

### ❌ Muitas colunas em mobile
```tsx
// ERRADO: 4 cols em mobile fica apertado
<Grid cols={{ base: 4, md: 3 }}>

// CORRETO: comece com 1, scale pra cima
<Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
```

### ❌ Cards sem CardMedia (visual flat)
Cards devem ter imagem, ícone ou algo visual. Se só texto, use tabela.

### ❌ Usar Card horizontal pra lista de cards
Card horizontal é pra thumbnail + info (lista de alunos). Pra grid visual, use `direction="vertical"`.

## Links

- Grid: `.impactx/rules/primitives/grid.md`
- Card: `.impactx/rules/components/card.md`
- ListPageTemplate: `.impactx/rules/templates/list-page.md`
