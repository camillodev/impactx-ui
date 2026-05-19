# Pattern: Formulário Simples

> **Trigger:** "criar [entidade]", "editar [entidade]", "formulário de cadastro", "novo aluno/fatura", "página de criação", "form curto".

## Decisão em 30 segundos

| Cenário | Pattern | Por quê |
|---|---|---|
| Form ≤10 campos, 1 página | **form-simple** (este) | FormPageTemplate básico, seções opcionais |
| Form com 3+ etapas (wizard) | `patterns/form-multistep.md` | State entre steps |
| Form em modal (1-2 fields) | Modal.Content direto | Sem template overhead |

## Receita (16 linhas)

```tsx
"use client"
import { FormPageTemplate, Stack, Input, Button } from "@impactxlab/design-system"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  nome: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
})

export default function NovoAluno() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <FormPageTemplate
      breadcrumbs={[{ label: "Alunos", href: "/alunos" }, { label: "Novo" }]}
      title="Novo aluno"
      description="Cadastre um novo aluno"
      backHref="/alunos"
      onSubmit={handleSubmit(async (data) => {
        await fetch("/api/alunos", { method: "POST", body: JSON.stringify(data) })
      })}
      primaryAction={<Button type="submit" variant="primary">Salvar</Button>}
      secondaryAction={<Button type="button" variant="ghost">Cancelar</Button>}
    >
      <Stack gap="lg">
        <Input label="Nome completo" {...register("nome")} error={errors.nome?.message} />
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
      </Stack>
    </FormPageTemplate>
  )
}
```

## Variações

- **Edit**: mude `title` + `breadcrumbs` + pre-popule `defaultValue` nos `register()`
- **Sticky footer**: `stickyFooter={true}` se form > 600px
- **Seções**: agrupe campos em `FormSection` se tiver ≥3 grupos temáticos

## Anti-patterns ❌

- ❌ **NUNCA** use `maxWidth="lg"` — form é estreito (`md` default)
- ❌ **NUNCA** coloque botões em `children` — use `primaryAction`/`secondaryAction`
- ❌ **NUNCA** esqueça Label com `htmlFor` — use a prop `label` do Input
- ❌ **NUNCA** faça Grid 2-col — Stack é single-column e mais legível
- ❌ Se ≥3 etapas, use `form-multistep.md` em vez

## Links

- Template: `.impactx/rules/templates/form-page.md`
- Input: `.impactx/rules/components/input.md`
- Multi-step: `.impactx/rules/patterns/form-multistep.md`
