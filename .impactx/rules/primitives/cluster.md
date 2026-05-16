# Cluster — Layout Horizontal com Wrap

**Carrega quando:** cluster, flex wrap, itens horizontais, tags, chips, botões em linha, toolbar, breadcrumb-ish, filtros lado a lado.

## Import

```tsx
import { Cluster } from "@education/components"
```

## Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `gap` | `"none" \| "xs" \| "sm" \| "md" \| "lg"` <br/> `\| { base?, sm?, md?, lg?, xl? }` | `"md"` | Espaçamento entre itens. Aceita valor único ou objeto responsivo. |
| `align` | `"start" \| "center" \| "end" \| "baseline"` <br/> `\| { base?, sm?, md?, lg?, xl? }` | `"center"` | Alinhamento vertical. Aceita valor único ou objeto responsivo. |
| `justify` | `"start" \| "center" \| "end" \| "between"` <br/> `\| { base?, sm?, md?, lg?, xl? }` | `"start"` | Distribuição horizontal. Aceita valor único ou objeto responsivo. |
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

**Footer de modal: Cancel + Action (valor único)**
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
  <Input placeholder="Buscar..." />
  <Button>Filtrar</Button>
</Cluster>
```

**Toolbar de tabela com responsivo: ações distribuem diferente em mobile**
```tsx
<Cluster 
  gap={{ base: "sm", md: "md" }}
  justify={{ base: "start", md: "between" }}
>
  <span>{selectedCount} selecionados</span>
  <Cluster gap="xs">
    <Button size="sm" variant="ghost">Editar</Button>
    <Button size="sm" variant="destructive">Deletar</Button>
  </Cluster>
</Cluster>
```

## Responsive

Props `gap`, `align` e `justify` aceitam **objeto responsivo** com breakpoints `base` (mobile-first), `sm`, `md`, `lg`, `xl`.

**Padrão:**
```tsx
// Valor único → aplica em todos breakpoints
<Cluster justify="start">

// Objeto responsivo → override por breakpoint
<Cluster justify={{ base: "start", md: "between" }}>
// mobile: justify-start; ≥768px: justify-between
```

**Exemplo real: Navbar com ações responsivas**
```tsx
<Cluster
  gap={{ base: "xs", md: "md" }}
  align="center"
  justify={{ base: "between", lg: "end" }}
>
  <Logo />
  <nav>{links}</nav>
  <Button>CTA</Button>
</Cluster>
```

## Anti-patterns ❌

**Cru flex com Tailwind (nunca fazer)**
```tsx
<div className="flex flex-wrap gap-3 justify-start md:justify-between">
  {items}
</div>
```
→ Use `<Cluster justify={{ base: "start", md: "between" }}>`.

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
<Cluster gap="md">  {/* ❌ Overflow se flex-shrink-0 */}
  <div style={{ width: "500px" }}>Item 1</div>
  <div style={{ width: "500px" }}>Item 2</div>
</Cluster>
```
→ Garantir que itens sejam shrinkable ou caibam.

## Quando NÃO usar Cluster

| Caso | Use em vez |
|------|-----------|
| Itens horizontais sem wrap (devem ficar em linha sempre) | Stack horizontal (sem `flex-wrap`) |
| Conteúdo vertical | Stack vertical |
| Grid 2D com colunas fixas | Grid |
| Alinhamento baseline com texto de tamanhos diferentes | Cluster com `align="baseline"` |

## Implementação técnica

**Source:** `/packages/ds-education/src/components/cluster.tsx`

**Pattern:** Every Layout (Heydon Pickering) — `display: flex`, `flex-wrap: wrap`, gap automático.

**Responsive resolution:** `resolveResponsive()` mapeia valores escalares ou objetos `{ base, sm, md, lg, xl }` em classes Tailwind v4 (e.g. `gap-3 md:gap-4 lg:gap-5`).

**Por debaixo:**
- `flex flex-wrap` — layout horizontal com quebra automática
- `gapMap` → Tailwind classes por breakpoint
- `alignMap` → items-* por breakpoint
- `justifyMap` → justify-* por breakpoint
- `as` prop → renderiza como `<Comp ref={ref} ...>` (div, nav, button, etc.)
