# Button — `@camillodev/ui`

> Carrega quando bot mencionar: button, botão, CTA, ação, primary action, submit, salvar, cancelar.

## Import

```tsx
import { Button } from "@camillodev/ui"
```

## Props (reais, do código)

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"          // default — fill com cor primária
    | "secondary"        // outline com border-2 da primary
    | "tertiary"         // ghost (transparent + hover background)
    | "ghost"            // alias de tertiary
    | "tertiary-dark"    // ghost com cores invertidas pra fundos escuros
    | "danger"           // alias de danger-primary
    | "danger-primary"   // fill destructive
    | "danger-secondary" // outline destructive
    | "danger-tertiary"  // ghost destructive
  size?: "sm" | "md" | "lg"  // default "md" (h-9)
  asChild?: boolean              // delega ao filho (Slot do Radix) — pra links
}
```

Atributos HTML de `<button>` passam direto (`type`, `disabled`, `onClick`, `aria-*`).

Defaults: `variant="primary"`, `size="md"`.

## Decision tree

- **É a ação principal da tela?** → `variant="primary"`. **Máximo 1 por viewport.**
- **É ação alternativa, mas importante?** → `variant="secondary"` (outline).
- **É opcional, cancelar, voltar?** → `variant="tertiary"` (ou `ghost`).
- **É destructive principal (delete, cancelar permanente)?** → `variant="danger"` (ou `danger-primary`).
- **Cancelar em modal de delete?** → `variant="tertiary"` ou `<Modal.Cancel>`.
- **Botão sobre fundo escuro?** → `variant="tertiary-dark"`.
- **Só ícone, sem texto?** → não use `<Button>`, use `<IconButton>`.
- **Link interno (`<Link>` do Next)?** → `<Button asChild><Link href="...">Texto</Link></Button>`.

## Sizes

| size | altura | quando |
|---|---|---|
| `sm` | 28px (h-7) | tabela, lista compacta, toolbar |
| `md` (default) | 36px (h-9) | uso geral em forms e páginas |
| `lg` | 44px (h-11) | hero CTA, ação principal proeminente |

## Exemplos corretos ✅

### Página de lista — ação principal

```tsx
import { Button } from "@camillodev/ui"

<Button onClick={handleNew}>Novo aluno</Button>
```

### Form — submit + cancelar

```tsx
<div className="flex items-center gap-3">
  <Button variant="primary" type="submit">Salvar</Button>
  <Button variant="tertiary" type="button" onClick={onCancel}>Cancelar</Button>
</div>
```

### Modal de delete — destructive

```tsx
<Modal.Footer>
  <Modal.Cancel>Manter</Modal.Cancel>
  <Button variant="danger" onClick={handleDelete}>Excluir permanentemente</Button>
</Modal.Footer>
```

### Loading state

```tsx
<Button variant="primary" disabled={isSubmitting}>
  {isSubmitting ? "Salvando…" : "Salvar"}
</Button>
```

### Tamanho compacto em tabela

```tsx
<Button variant="tertiary" size="sm" onClick={() => onEdit(row.id)}>
  Editar
</Button>
```

### Como link (asChild)

```tsx
import Link from "next/link"

<Button asChild>
  <Link href="/alunos/novo">Novo aluno</Link>
</Button>
```

### Com ícone (children direto)

```tsx
import { Plus } from "lucide-react"

<Button>
  <Plus /> Novo aluno
</Button>
```

O CSS do Button cuida do gap, do tamanho do svg, e do shrink — só passa o ícone como filho.

## Anti-patterns ❌

### Cor hardcoded

```tsx
// ❌
<Button className="bg-blue-500 hover:bg-blue-600">Salvar</Button>

// ✅ — variant resolve cor via tema
<Button variant="primary">Salvar</Button>
```

### Múltiplos primary

```tsx
// ❌ — 3 primary competindo
<Button variant="primary">Salvar</Button>
<Button variant="primary">Cancelar</Button>
<Button variant="primary">Voltar</Button>

// ✅ — hierarquia clara
<Button variant="primary">Salvar</Button>
<Button variant="tertiary">Cancelar</Button>
<Button variant="tertiary">Voltar</Button>
```

### Tertiary com bg colorido

```tsx
// ❌ — tertiary é ghost, não fill
<Button variant="tertiary" className="bg-yellow-200">Editar</Button>

// ✅ — se precisa fill, é primary ou secondary
<Button variant="secondary">Editar</Button>
```

### Button nativo

```tsx
// ❌ — reinventou o Button do DS
<button type="submit" className="px-4 py-2 bg-blue-500 rounded text-white">
  Novo aluno
</button>

// ✅
<Button type="submit">Novo aluno</Button>
```

### Só ícone com Button

```tsx
// ❌ — não tem aria-label, não tem padding certo
<Button><Search /></Button>

// ✅ — IconButton resolve a11y e tamanho square
<IconButton aria-label="Buscar"><Search /></IconButton>
```

## Acessibilidade

- Foco visível: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`. **Não remover.**
- Disabled: opacidade 50% + `pointer-events-none` automático.
- `asChild` preserva semântica do filho (`<a>` continua sendo `<a>` pra screen readers).
- Botão só com ícone exige `aria-label` ou conteúdo invisível — prefira `<IconButton>`.
- `loading`: não tem prop, mas `disabled` + texto "Salvando…" resolve. Se precisar de spinner, passa como children.

## Quando NÃO usar Button

| Caso | Use isto |
|---|---|
| Só ícone | `<IconButton>` |
| Toggle on/off | `<Switch>` |
| Seleção mutuamente exclusiva (Tab-like) | `<SegmentedControl>` ou `<Tabs>` |
| Ação dentro de Modal footer cancelar | `<Modal.Cancel>` (alias semântico) |
| Ação dentro de Modal footer confirmar | `<Modal.Action>` ou `<Button>` |
| Link de navegação puro (sem CTA) | `<a>` ou `<Link>` estilizado, ou `<Button asChild>` |
| Item de DropdownMenu | `<DropdownMenuItem>` |

## Implementação técnica

Código: `packages/ds-education/src/components/button.tsx`

CSS vars consumidas (mudança visual → editar tokens, **não** Button.tsx):

- `--color-primary` / `-hover` / `-active` / `-fg`
- `--color-secondary` / `-hover` / `-active` / `-bd` / `-bd-active` / `-fg`
- `--color-tertiary` / `-hover` / `-active` / `-fg` / `-fg-hover` / `-fg-active`
- `--color-tertiary-dark` / `-hover` / `-active` / `-fg` / `-fg-hover` / `-fg-active`
- `--color-danger-primary` / `-hover` / `-active` / `-fg`
- `--color-danger-secondary` / `-hover` / `-active` / `-bd` / `-bd-active`
- `--color-danger-tertiary` / `-hover` / `-active` / `-fg` / `-fg-hover` / `-fg-active`

Tokens vivem em `packages/ds-education/src/tokens/themes/{education,kumon,impactx}.css`.

Quer borda mais arredondada nos botões globalmente? **Não toca em button.tsx.** Edita o Tailwind class `rounded-lg` no `buttonVariants` — ou melhor, espera tokens 3-tier (Semana 3 do plano) e edita `--radius-button`.
