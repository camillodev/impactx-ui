# Cluster — Layout Horizontal com Wrap

**Carrega quando:** cluster, flex wrap, itens horizontais, tags, chips, botões em linha, toolbar, breadcrumb-ish, filtros lado a lado.

## Import

```tsx
import { Cluster } from "@education/components"
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `gap` | `"none" \| "xs" \| "sm" \| "md" \| "lg"` | `"md"` | Espaçamento entre itens (none=0, xs=4px, sm=8px, md=12px, lg=16px) |
| `align` | `"start" \| "center" \| "end" \| "baseline"` | `"center"` | Alinhamento vertical |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | Distribuição horizontal |
| `as` | `ElementType` | `"div"` | Renderiza como outro elemento (button, nav, etc.) |
| Spread | `HTMLAttributes<HTMLDivElement>` | — | className, id, data-*, event handlers, etc. |

## Árvore de decisão

```
Itens horizontais que podem quebrar de linha?
├─ SIM → Cluster ✅
│   └─ Default: gap="md", align="center", justify="start"
├─ NÃO, devem ficar em linha sempre
│   └─ Stack horizontal (sem flex-wrap) ❌
Vertical?
├─ SIM → Stack vertical ❌
Grid 2D?
├─ SIM → Grid ❌
```

## Exemplos ✅

**Footer de modal: Cancel + Action**
```tsx
<Cluster gap="sm" justify="end">
  <Button variant="ghost">Cancelar</Button>
  <Button>Salvar</Button>
</Cluster>
```

**Tags de aluno em meta-info de card**
```tsx
<Cluster gap="xs">
  {enrollmentTags.map(tag => (
    <Badge key={tag.id} variant="neutral">{tag.name}</Badge>
  ))}
</Cluster>
```

**Filtros em página de lista: Select + Input + Button**
```tsx
<Cluster gap="md" align="end">
  <Select value={status} onChange={setStatus}>
    <option>Todos</option>
    <option>Ativos</option>
  </Select>
  <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} />
  <Button onClick={handleFilter}>Filtrar</Button>
</Cluster>
```

**Toolbar de tabela: ações lado a lado**
```tsx
<Cluster gap="sm" justify="between">
  <span>{selectedCount} selecionados</span>
  <Cluster gap="xs">
    <Button size="sm" variant="ghost">Editar</Button>
    <Button size="sm" variant="destructive">Deletar</Button>
  </Cluster>
</Cluster>
```

## Anti-patterns ❌

**Cru flex com Tailwind (nunca fazer)**
```tsx
<div className="flex flex-wrap gap-3">
  {items}
</div>
```
→ Use `<Cluster gap="md">` em vez.

**Cluster vertical**
```tsx
<Cluster gap="md">  {/* ❌ */}
  <div>Linha 1</div>
  <div>Linha 2</div>
</Cluster>
```
→ Use `<Stack gap="md">` (vertical).

**Esquecer que wrap acontece — não testar mobile**
```tsx
<Cluster gap="sm">  {/* Cabe em desktop, quebra em mobile */}
  <LongButton>Ação 1</LongButton>
  <LongButton>Ação 2</LongButton>
  <LongButton>Ação 3</LongButton>
</Cluster>
```
→ Sempre validar em 375px; Cluster quebra automaticamente OK.

**Cluster com children fixed-width que somam mais que parent**
```tsx
<Cluster gap="md">  {/* ❌ Overflow horizontal se flex-shrink-0 */}
  <div style={{ width: "500px" }}>Item 1</div>
  <div style={{ width: "500px" }}>Item 2</div>
</Cluster>
```
→ Garantir que itens sejam shrinkable ou caber no container.

## Quando NÃO usar Cluster

| Caso | Use em vez |
|------|-----------|
| Itens horizontais sem wrap (devem ficar em linha sempre) | Stack horizontal (sem `flex-wrap`) |
| Conteúdo vertical | Stack vertical |
| Grid 2D com colunas fixas | Grid |
| Alinhamento baseline com texto de tamanhos diferentes | Cluster com `align="baseline"` (ainda correto) |

## Implementação técnica

**Source:** `/Users/rafae/projetos/impactx-ui/packages/ds-education/src/components/cluster.tsx`

**Pattern:** Every Layout (Heydon Pickering) — `display: flex`, `flex-wrap: wrap`, gap automático.

**Por debaixo:**
- `flex flex-wrap` — layout horizontal com quebra automática
- `gapMap` → Tailwind classes (gap-0, gap-1, gap-2, gap-3, gap-4)
- `alignMap` → items-start, items-center, items-end, items-baseline
- `justifyMap` → justify-start, justify-center, justify-end, justify-between
- `as` prop → renderiza como `<Comp ref={ref} ...>` (div, nav, button, etc.)
