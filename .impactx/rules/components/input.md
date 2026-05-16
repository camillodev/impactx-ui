# Input — `@impactxlab/ds-education`

> Carrega quando bot mencionar: input, campo, form field, label, helper, validação, campo de texto, field, entrada.

## Import

```tsx
import { Input } from "@impactxlab/ds-education"
```

## Props (reais, do código)

```ts
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string          // texto do label acima do input
  error?: string          // mensagem de erro (exibe em vermelho, muda border pra danger)
  helperText?: string     // dica ou instruções (exibe em azul, só se error vazio)
  leadingIcon?: React.ReactNode   // ícone esquerdo (ex: search, mail)
  trailingIcon?: React.ReactNode  // ícone direito (ex: clear, visibility toggle)
  containerClassName?: string     // classe Tailwind do wrapper <div>
}
```

Atributos HTML de `<input>` passam direto (`type`, `placeholder`, `disabled`, `autoFocus`, `aria-*`, etc.).

Defaults: sem label, sem erro, sem helper, sem ícones.

## Decision tree

- **Input com label visível?** → passe `label="Seu texto"`. **Sempre que houver label.**
- **Precisa validação (Zod + react-hook-form)?** → use `error` da resposta `field.error?.message`; Input muda cor e `aria-invalid` automático.
- **Não é erro, mas instrução?** → `helperText="Máx 100 caracteres"` (exibe em primária, desaparece se error existe).
- **Ícone de busca à esquerda?** → `leadingIcon={<Search size={16} />}`. Tailwind configura gap e tamanho (`[&>svg]:size-4`).
- **Ícone de limpar à direita?** → `trailingIcon={<X size={16} onClick={handleClear} />}` (ícone é `<span>`, clique fica pro input/pai).
- **Input desabilitado?** → `disabled={true}` (opacidade 50% + `pointer-events-none` automático).
- **Type customizado?** → passe direto: `type="email"`, `type="password"`, `type="number"`, `type="date"`, etc.
- **Texto grande, múltiplas linhas?** → **não use Input**, use `<Textarea>`.
- **Seleção de opções fixas?** → **não use Input**, use `<Select>`.

## Exemplos corretos ✅

### Input simples com label

```tsx
import { Input } from "@impactxlab/ds-education"

<Input
  label="Nome completo"
  placeholder="Digite seu nome"
/>
```

### Com validação (Zod + react-hook-form)

```tsx
import { Input } from "@impactxlab/ds-education"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
})

export function MyForm() {
  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Telefone"
        type="tel"
        placeholder="(11) 9999-9999"
        {...register("phone")}
        error={errors.phone?.message}
      />
    </form>
  )
}
```

### Com ícone e helper

```tsx
import { Input } from "@impactxlab/ds-education"
import { Search } from "lucide-react"

<Input
  label="Pesquisar aluno"
  placeholder="Nome ou matrícula"
  leadingIcon={<Search />}
  helperText="Comece a digitar para buscar"
/>
```

### Com ícone trailing (clear button)

```tsx
import { Input } from "@impactxlab/ds-education"
import { X } from "lucide-react"
import { useState } from "react"

export function SearchableInput() {
  const [value, setValue] = useState("")

  return (
    <Input
      label="Filtrar"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Digite para filtrar..."
      trailingIcon={
        value && <X size={16} onClick={() => setValue("")} />
      }
    />
  )
}
```

### Input desabilitado

```tsx
<Input
  label="Código de aluno"
  value="ALN-2025-001"
  disabled
  helperText="Não pode ser editado"
/>
```

## Anti-patterns ❌

### Input nativo (sem DS)

```tsx
// ❌ — sem label, sem validação, sem estilo
<input type="email" placeholder="Email" />

// ✅ — com label, error, helper automático
<Input label="Email" type="email" placeholder="Email" error={errors.email?.message} />
```

### Label como prop solto vs component

```tsx
// ❌ — label fora do Input, difícil manter `htmlFor`
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ — Input cuida de id, label, aria-describedby
<Input label="Email" type="email" />
```

### Color hardcoded

```tsx
// ❌
<Input className="border-blue-500" />

// ✅ — Input usa CSS vars do tema; error muda pra danger automático
<Input error={errors.email?.message} />
```

### Esquecer error em form

```tsx
// ❌ — validação sem feedback visual
<Input {...register("email")} />

// ✅ — erro exibe em vermelho, aria-invalid=true automático
<Input {...register("email")} error={errors.email?.message} />
```

## Acessibilidade

- **ID automático**: Input gera único via `React.useId()` se `id` não passado. Nunca repita IDs.
- **aria-invalid**: automático quando `error` existe. Não precisa setar manualmente.
- **aria-describedby**: automático, aponta pra `error` ou `helperText` span. Screen readers anunciam mensagem.
- **label htmlFor**: automático. Clicar no label foca o input.
- **disabled**: cursor muda, eventos bloqueados, opacidade 50%.
- **Focus visível**: border primária + ring automático no focus-within. Não remover.

## Quando NÃO usar Input

| Caso | Use isto |
|---|---|
| Múltiplas linhas (bio, descrição) | `<Textarea>` |
| Seleção de opções fixas | `<Select>` |
| Toggle on/off | `<Switch>` |
| Checkbox booleano | `<Checkbox>` |
| Busca com autocomplete | `<Combobox>` ou `<SearchCombobox>` |

## Implementação técnica

Código: `packages/ds-education/src/components/input.tsx`

CSS vars consumidas (mudança visual → editar tokens, **não** input.tsx):

- `--color-border-input` — borda padrão
- `--color-text-subtle` — borda on hover
- `--color-primary` — borda e ring no focus
- `--color-primary-ring` — ring color no focus
- `--color-text` — cor do texto do input e label
- `--color-text-muted` — placeholder, ícone cor
- `--color-bg` — background do input
- `--color-danger-primary` — borda e texto quando error

Tokens vivem em `packages/ds-education/src/tokens/themes/{education,kumon,impactx}.css`.

Quer borda mais arredondada nos inputs globalmente? **Não toca em input.tsx.** Edita a classe Tailwind `rounded-md` ou espera tokens 3-tier e edita `--radius-input`.
