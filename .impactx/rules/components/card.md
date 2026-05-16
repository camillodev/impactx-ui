# Card — `@impactx/ds-education`

> Carrega quando bot mencionar: card, container, painel, box, grupo, surface elevada, cartão.

## Import

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@impactx/ds-education"
```

## Props (reais, do código)

```ts
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Padrão: forwardRef de div com bg, border, shadow, radius via CSS vars
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Padrão: forwardRef de div com p-6
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  // Padrão: forwardRef de <h3> com text-2xl, font-bold, color via CSS var
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Padrão: forwardRef de div com p-6 pt-0
}
```

Atributos HTML padrão passam direto.

Card renderiza `<div>` com:
- `bg-[var(--color-bg)]` — fundo tema
- `rounded-[var(--radius-lg)]` — border radius grande
- `shadow-[var(--shadow-md)]` — sombra média
- `border border-[var(--color-border-input)]` — borda fina, cor input

CardHeader: `p-6`  
CardTitle: `<h3>` com `text-2xl font-bold text-[var(--color-text)]`  
CardContent: `p-6 pt-0` (sem padding-top pra agrupar com CardHeader)

## Decision tree

- **Preciso de seção/painel com elevação (fundo destacado)?** → `<Card>`.
- **Vai ter título + conteúdo?** → `<Card><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>`.
- **Só conteúdo, sem header/título?** → `<Card><CardContent>...</CardContent></Card>`.
- **Métrica ou stat numérico em card?** → Card + CardContent + children customizado (sem CardHeader se não tem label).
- **Card é linha de lista/tabela com espaçamento regular?** → Card como wrapper, com espaçamento do layout pai.
- **Precisa elevação, mas sem border/sombra (full bleed)?** → Estilo customizado ou componente específico (não Card).
- **Modal/Dialog?** → `<Modal>` (namespace).
- **Drawer/Sidebar?** → `<Sheet>`.
- **Abas?** → `<Tabs>`.

## Exemplos corretos ✅

### Card simples com header + título

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@impactx/ds-education"

<Card>
  <CardHeader>
    <CardTitle>Aluno novo</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Formulário de cadastro aqui</p>
  </CardContent>
</Card>
```

### Card de métrica (sem header)

```tsx
<Card>
  <CardContent>
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-gray-500">Total de alunos</span>
      <span className="text-3xl font-bold">42</span>
    </div>
  </CardContent>
</Card>
```

### Card com children customizado

```tsx
<Card>
  <CardContent className="flex items-center gap-4">
    <img src="..." alt="Aluno" className="w-12 h-12 rounded-full" />
    <div>
      <h4 className="font-semibold">João Silva</h4>
      <p className="text-sm text-gray-600">Série 5</p>
    </div>
  </CardContent>
</Card>
```

### Grid de Cards (sem Grid primitive ainda)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {students.map((student) => (
    <Card key={student.id}>
      <CardHeader>
        <CardTitle className="text-lg">{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{student.series}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Card sem CardHeader (só conteúdo)

```tsx
<Card>
  <CardContent>
    <button className="w-full rounded bg-blue-500 px-4 py-2 text-white">
      Novo aluno
    </button>
  </CardContent>
</Card>
```

### Card clicável (lista item)

```tsx
<Card
  role="button"
  tabIndex={0}
  onClick={() => handleClick(id)}
  className="cursor-pointer hover:shadow-lg transition-shadow"
>
  <CardContent className="flex items-center justify-between">
    <span>Aluno {id}</span>
    <ChevronRight />
  </CardContent>
</Card>
```

## Anti-patterns ❌

### Div nativo com bg + shadow + rounded

```tsx
// ❌ — reinventou o Card
<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
  Conteúdo
</div>

// ✅
<Card>
  <CardContent>Conteúdo</CardContent>
</Card>
```

### Shadow hardcoded

```tsx
// ❌ — hardcoded, não segue tema
<Card className="shadow-lg">
  Conteúdo
</Card>

// ✅ — Card já tem shadow-[var(--shadow-md)] nativo
<Card>
  Conteúdo
</Card>
```

### Border cor hardcoded

```tsx
// ❌
<Card className="border-gray-200">
  Conteúdo
</Card>

// ✅ — Card já consome --color-border-input
<Card>
  Conteúdo
</Card>
```

### CardTitle fora de CardHeader

```tsx
// ❌ — semântica e hierarquia quebradas
<Card>
  <CardTitle>Título</CardTitle>
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

### Múltiplas CardTitle sem CardHeader

```tsx
// ❌
<Card>
  <CardContent>
    <CardTitle>Seção 1</CardTitle>
    <p>Conteúdo</p>
    <CardTitle>Seção 2</CardTitle>
    <p>Mais conteúdo</p>
  </CardContent>
</Card>

// ✅ — se há múltiplas seções, considere Cards separados ou <h4> simples
<Card>
  <CardHeader>
    <CardTitle>Conteúdo</CardTitle>
  </CardHeader>
  <CardContent>
    <h4 className="font-semibold">Seção 1</h4>
    <p>Conteúdo</p>
  </CardContent>
</Card>
```

### Card com padding extra (p-6 em cima de CardHeader/CardContent)

```tsx
// ❌ — CardHeader/CardContent já dão p-6, padding duplo
<Card className="p-6">
  <CardHeader className="p-6">
    <CardTitle>Título</CardTitle>
  </CardHeader>
</Card>

// ✅
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
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
