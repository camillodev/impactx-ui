# Card — `@camillodev/ui`

> Carrega quando bot mencionar: card, container, painel, box, grupo, surface elevada, cartão.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardMedia,
  CardMeta,
} from "@camillodev/ui"
```

## Props (reais, do código)

```ts
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction. Default "vertical". */
  direction?: "vertical" | "horizontal"
  /** Visual state. "default" | "active" (primary border) | "disabled". */
  state?: "default" | "active" | "disabled"
  /** Render skeleton placeholders instead of children. */
  loading?: boolean
  /** Make whole card clickable (renders semantic button-style focus ring). */
  interactive?: boolean
}

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source da imagem. Se omitido, renderiza só o slot de children (ex: ícone). */
  src?: string
  /** Alt da imagem (a11y). Obrigatório quando src é passado. */
  alt?: string
  /** Aspect ratio. Default "16/9" pra vertical, "1/1" pra horizontal thumb. */
  aspectRatio?: string
  /** Variant — "image" (full bleed) | "icon" (centered, smaller) */
  variant?: "image" | "icon"
}

interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar slot (render <Avatar /> or similar). */
  avatar?: React.ReactNode
  /** Texto pequeno (data, autor, status). */
  caption?: React.ReactNode
  /** Slot direito — ellipsis/actions. */
  actions?: React.ReactNode
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Padrão: forwardRef de div com p-4 gap-1
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  // Padrão: forwardRef de <h3> com text-base font-semibold
}

interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Padrão: forwardRef de <p> com text-sm text-muted
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Padrão: forwardRef de div com p-4 pt-0 flex-1
}
```

**Card** renderiza `<div>` com:
- `flex flex-col` (vertical default) ou `flex-row` (horizontal)
- `bg-[var(--color-bg)]` — fundo tema
- `rounded-[var(--radius-card)]` — border radius (padrão 12px)
- `border-[var(--color-border-card)]` — borda 1px
- `shadow-[var(--shadow-card-default)]` — sombra sutil
- `data-direction` / `data-state` / `data-loading` — semântica em atributos

**CardHeader**: `p-4 gap-1` (flex flex-col)  
**CardTitle**: `<h3>` com `text-base font-semibold` (h3 semantic)  
**CardSubtitle**: `<p>` com `text-sm text-[var(--color-text-muted)]`  
**CardContent**: `p-4 pt-0 flex-1` (flex flex-col, cresce em vertical)  
**CardMedia**: renderiza imagem full-bleed ou ícone centralizado  
**CardMeta**: row no footer com `border-t` e gap-2 (avatar + caption + actions)

## Decision tree

- **Container simples só com texto** → `<Card><CardHeader><CardTitle>...</CardTitle><CardSubtitle>...</CardSubtitle></CardHeader><CardContent>...</CardContent></Card>`.

- **Card com imagem topo (vertical)** → `<Card direction="vertical"><CardMedia src="..." alt="..." /><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>`.

- **Card com ícone** → `<Card><CardMedia variant="icon"><Icon /></CardMedia><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>`.

- **Card horizontal (lista/thumbnail)** → `<Card direction="horizontal"><CardMedia src="..." alt="..." /></Card><CardContent>...</CardContent></Card>`.

- **Card com footer (data, autor, actions)** → adicionar `<CardMeta avatar={<Avatar />} caption="Atualizado 3h atrás" actions={<DropdownMenu />} />` no fim.

- **Card selecionável (lista filtrável, escolha)** → usar `state="active"` pra item selecionado, passar `interactive` prop pra hover/focus visível.

- **Loading async** → passar `loading` prop renderiza skeleton automaticamente, bloqueia interação.

- **Modal/Dialog?** → `<Modal>` (namespace).

- **Drawer/Sidebar?** → `<Sheet>`.

- **Abas?** → `<Tabs>`.

## Exemplos corretos ✅

### Vertical com imagem + título + subtítulo

```tsx
import { Card, CardHeader, CardTitle, CardSubtitle, CardContent, CardMedia } from "@camillodev/ui"

<Card direction="vertical">
  <CardMedia src="/student.jpg" alt="João Silva" variant="image" />
  <CardHeader>
    <CardTitle>João Silva</CardTitle>
    <CardSubtitle>Série 5 — Matemática</CardSubtitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Progresso: 75%</p>
  </CardContent>
</Card>
```

### Horizontal com thumbnail (lista de alunos)

```tsx
<Card direction="horizontal" interactive>
  <CardMedia src="/student-thumb.jpg" alt="Maria" variant="image" />
  <CardContent>
    <CardTitle>Maria Oliveira</CardTitle>
    <CardSubtitle>Série 6 — Português</CardSubtitle>
    <span className="text-xs text-[var(--color-text-muted)] mt-1">Ativo há 2 dias</span>
  </CardContent>
</Card>
```

### Card com footer (avatar + data atualização + DropdownMenu)

```tsx
import { DropdownMenu } from "@camillodev/ui"

<Card>
  <CardHeader>
    <CardTitle>Relatório mensal</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Análise completa de progresso...</p>
  </CardContent>
  <CardMeta
    avatar={<Avatar user={user} />}
    caption="Atualizado 3h atrás por Admin"
    actions={<DropdownMenu items={[{ label: "Editar" }, { label: "Deletar" }]} />}
  />
</Card>
```

### Estado active (item selecionado em lista filtrável)

```tsx
const [selected, setSelected] = useState<string | null>(null)

{students.map((student) => (
  <Card
    key={student.id}
    direction="horizontal"
    state={selected === student.id ? "active" : "default"}
    interactive
    onClick={() => setSelected(student.id)}
  >
    <CardMedia src={student.avatar} alt={student.name} variant="image" />
    <CardContent>
      <CardTitle>{student.name}</CardTitle>
      <CardSubtitle>{student.series}</CardSubtitle>
    </CardContent>
  </Card>
))}
```

### Loading state (async fetch)

```tsx
const [loading, setLoading] = useState(true)

<Card loading={loading}>
  {/* Skeleton automático renderiza enquanto loading=true */}
</Card>

// Após fetch:
.then(() => setLoading(false))
```

## Anti-patterns ❌

### Múltiplos items com state="active" na mesma lista

```tsx
// ❌ — perde semântica de selecionado único
{items.map(item => (
  <Card key={item.id} state="active">
    {item.name}
  </Card>
))}

// ✅ — apenas o selecionado recebe state="active"
{items.map(item => (
  <Card key={item.id} state={selected === item.id ? "active" : "default"}>
    {item.name}
  </Card>
))}
```

### Shadow hardcoded na Card

```tsx
// ❌ — hardcoded, não segue tema
<Card className="shadow-lg">
  Conteúdo
</Card>

// ✅ — Card já consome --shadow-card-default; hover lift automático
<Card interactive>
  Conteúdo
</Card>
```

### Border cor hardcoded

```tsx
// ❌ — não usa CSS vars
<Card className="border-gray-300">
  Conteúdo
</Card>

// ✅ — Card consome --color-border-card
<Card>
  Conteúdo
</Card>
```

### CardMedia sem alt obrigatório

```tsx
// ❌ — a11y quebrada
<CardMedia src="/image.jpg" />

// ✅
<CardMedia src="/image.jpg" alt="Descrição da imagem" />
```

### CardTitle fora de CardHeader

```tsx
// ❌ — semântica e hierarquia quebradas
<Card>
  <CardTitle>Título solto</CardTitle>
  <CardContent>Conteúdo</CardContent>
</Card>

// ✅
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

### Loading + children simultaneamente

```tsx
// ❌ — loading sobrescreve children, não passar ambos
<Card loading={true}>
  <CardContent>Conteúdo aqui</CardContent>
</Card>

// ✅ — skeleton mostra automaticamente, remova children ou use condicional
<Card loading={isLoading}>
  {!isLoading && <CardContent>Conteúdo</CardContent>}
</Card>
```

### CardMeta sem border-top intencional

```tsx
// ❌ — CardMeta renderiza border-t por padrão, se não quer:
<Card>
  <CardContent>...</CardContent>
  <CardMeta className="border-0" />
</Card>

// ✅ — use CardMeta pra footer com separação visual clara
<Card>
  <CardContent>...</CardContent>
  <CardMeta avatar={user} caption="Atualizado" />
</Card>
```

### Direction hardcoded em props em vez de CSS

```tsx
// ❌ — logic em props sem layout semântico
<Card direction={isMobile ? "vertical" : "horizontal"}>
  ...
</Card>

// ✅ — deixe responsive design ao Tailwind via group-data-[direction=]
<Card direction="vertical">
  ... (use Tailwind responsive: sm:flex-row, md:flex-col conforme necessário)
</Card>
```

## Acessibilidade

- **CardTitle** renderiza `<h3>` — respeita hierarquia heading da página. Não quebrar ordem `<h1>` → `<h2>` → `<h3>`.
- **Role e tabIndex** — se Card é clicável, adicione `role="button"` e `tabIndex={0}` (e keyboard handler).
- **Color contrast** — `--color-text` e `--color-bg` devem passar WCAG AA; não sobrescrever textColor com cor hardcoded.
- **Focus visible** — Card clicável deve mostrar `:focus-visible` (adicione outline customizado se necessário).

## Quando NÃO usar Card

| Caso | Use isto |
|---|---|
| Modal/Dialog com overlay | `<Modal>` |
| Drawer/Sidebar deslizante | `<Sheet>` |
| Abas com painel | `<Tabs>` + `<TabsContent>` |
| Conteúdo principal de página (full width) | Sem Card, estrutura semântica pura |
| Stat isolado com muita hierarquia | `<Stat>` (futuro) ou Card simples sem header |
| Popover/Tooltip | `<Popover>` |

## Implementação técnica

Código: `packages/ds-education/src/components/card.tsx`

CSS vars consumidas (mudança visual → editar tokens, **não** card.tsx):

- `--color-bg` — fundo principal do Card
- `--color-border-input` — borda Card
- `--shadow-md` — sombra do Card
- `--radius-lg` — border radius Card
- `--color-text` — cor texto CardTitle

Tokens vivem em `packages/ds-education/src/tokens/themes/{education,kumon,impactx}.css`.

Quer Card mais arredondado globalmente? **Não toca em card.tsx.** Edita `--radius-lg` no token ou Tailwind `rounded-lg` → ou espera tokens 3-tier e configura central.
