# FormPageTemplate — Página de Formulário

**Carrega quando bot mencionar:** form, formulário, criar, editar, novo aluno, nova matrícula, settings, configuração, form page, react-hook-form, zod, página de form.

## Import

```ts
import { FormPageTemplate, Stack, Input, Button } from "@camillodev/ui"
// Opcional:
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
```

## Props

```ts
interface FormPageTemplateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbItem[]
  /** Link "Voltar" (ChevronLeft + link). Opcional. */
  backHref?: string
  /** Ação primária (submit). OBRIGATÓRIO: <Button type="submit">Salvar</Button>. */
  primaryAction: React.ReactNode
  /** Ação secundária (cancelar). Geralmente <Button variant="ghost">Cancelar</Button>. Opcional. */
  secondaryAction?: React.ReactNode
  /** Children — Stack gap="lg" com FormSection ou inputs direto. */
  children: React.ReactNode
  /** Form submit handler. Se passado, envolve children em <form onSubmit>. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  /** Sticky footer? Default false. Se true, footer fica fixo no bottom. */
  stickyFooter?: boolean
  /** Max-width. Default: "md" (896px — formulários são estreitos). */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  /** Padding. Default: "md". */
  padding?: "xs" | "sm" | "md" | "lg" | "xl"
}

interface BreadcrumbItem {
  label: string
  href?: string
}
```

## Árvore de Decisão

| Caso | Componente | Motivo |
|------|-----------|--------|
| Form criar/editar entidade (página inteira) | **FormPageTemplate** | Layout padrão, header + breadcrumb + footer sticky |
| Form multi-step (wizard) | FormPageTemplate com children custom | Mesmo layout, children = wizard internal |
| Settings page focado em form | **FormPageTemplate** | Mesmo padrão |
| Modal com form rápido (1-2 fields) | Modal.Content direto | Sem template overhead |
| Confirmação rápida (sim/não) | AlertDialog | Não é form |
| Tabela/lista | DataTableWithPagination ou DataTable | Não é form |

## Exemplos ✅

### Form criar aluno com react-hook-form + Zod
```tsx
"use client"

import { FormPageTemplate, Stack, Input, Button } from "@camillodev/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

const alunoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido"),
  email: z.string().email("Email inválido"),
})

type AlunoForm = z.infer<typeof alunoSchema>

export default function NovoAluno() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<AlunoForm>({
    resolver: zodResolver(alunoSchema),
  })

  const onSave = async (data: AlunoForm) => {
    await fetch("/api/alunos", { method: "POST", body: JSON.stringify(data) })
    router.push("/alunos")
  }

  return (
    <FormPageTemplate
      title="Novo Aluno"
      description="Preencha os dados para cadastrar um novo aluno."
      breadcrumbs={[
        { label: "Alunos", href: "/alunos" },
        { label: "Novo" },
      ]}
      backHref="/alunos"
      onSubmit={handleSubmit(onSave)}
      primaryAction={<Button type="submit" variant="primary">Salvar</Button>}
      secondaryAction={<Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>}
    >
      <Stack gap="lg">
        <Input
          label="Nome Completo"
          placeholder="João da Silva"
          {...register("nome")}
          error={errors.nome?.message}
        />
        <Input
          label="CPF"
          placeholder="12345678900"
          {...register("cpf")}
          error={errors.cpf?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="joao@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </Stack>
    </FormPageTemplate>
  )
}
```

### Form settings com seções (FormSection)
```tsx
import { FormPageTemplate, FormSection, Stack, Select, Toggle, Button } from "@camillodev/ui"
import { useForm } from "react-hook-form"

export default function ConfiguraçõesPerfil() {
  const { register, handleSubmit } = useForm()

  const onSave = async (data) => {
    await fetch("/api/config", { method: "PUT", body: JSON.stringify(data) })
  }

  return (
    <FormPageTemplate
      title="Configurações"
      description="Ajuste suas preferências de conta."
      onSubmit={handleSubmit(onSave)}
      primaryAction={<Button type="submit" variant="primary">Salvar Mudanças</Button>}
      secondaryAction={<Button type="button" variant="ghost">Descartar</Button>}
      stickyFooter
    >
      <Stack gap="lg">
        <FormSection title="Tema" description="Escolha o tema da aplicação">
          <Select label="Tema" {...register("theme")} options={[
            { value: "light", label: "Claro" },
            { value: "dark", label: "Escuro" },
            { value: "auto", label: "Automático" },
          ]} />
        </FormSection>

        <FormSection title="Notificações" description="Gerencie suas notificações">
          <Toggle label="Notificações por email" {...register("emailNotifications")} />
          <Toggle label="Notificações de SMS" {...register("smsNotifications")} />
        </FormSection>
      </Stack>
    </FormPageTemplate>
  )
}
```

### Form editar com sticky footer (form longo)
```tsx
<FormPageTemplate
  title="Editar Matrícula"
  description="Atualize os dados da matrícula."
  backHref="/matriculas"
  onSubmit={handleSubmit(onUpdate)}
  primaryAction={<Button type="submit" variant="primary">Atualizar</Button>}
  secondaryAction={<Button type="button" variant="ghost">Cancelar</Button>}
  stickyFooter={true}
  maxWidth="md"
>
  <Stack gap="lg">
    {/* muitos campos... */}
    <Input label="Field 1" {...register("field1")} />
    <Input label="Field 2" {...register("field2")} />
    {/* ... */}
  </Stack>
</FormPageTemplate>
```

## Anti-patterns ❌

### ❌ Form sem onSubmit
```tsx
// ERRADO: template sem handler = form não submete
<FormPageTemplate title="Novo" primaryAction={<Button>Salvar</Button>}>
  <Input />
</FormPageTemplate>

// CORRETO:
<FormPageTemplate
  title="Novo"
  onSubmit={handleSubmit(onSave)}
  primaryAction={<Button type="submit">Salvar</Button>}
>
  <Input {...register("field")} />
</FormPageTemplate>
```

### ❌ primaryAction sem type="submit"
```tsx
// ERRADO: onClick desacoplado do form
<Button variant="primary" onClick={onSave}>Salvar</Button>

// CORRETO: type="submit" integra com form.onSubmit
<Button type="submit" variant="primary">Salvar</Button>
```

### ❌ Inputs sem react-hook-form + Zod
```tsx
// ERRADO: state + onChange manual = sem validação
const [nome, setNome] = useState("")
<Input value={nome} onChange={(e) => setNome(e.target.value)} />

// CORRETO: Zod schema + react-hook-form + register
const schema = z.object({ nome: z.string().min(3) })
const { register } = useForm({ resolver: zodResolver(schema) })
<Input {...register("nome")} error={errors.nome?.message} />
```

### ❌ Submit pelo onClick do botão
```tsx
// ERRADO: fetch no onClick (fora do form)
<Button onClick={() => fetch("/api", { body: ... })}>Salvar</Button>

// CORRETO: handleSubmit da form
<FormPageTemplate onSubmit={handleSubmit(onSave)}>
  <Input {...register("field")} />
</FormPageTemplate>
```

### ❌ Layout 2-col cru
```tsx
// ERRADO: formulário em 2 colunas (forms são single-col estreitos)
<div className="grid grid-cols-2 gap-4">
  <Input />
  <Input />
</div>

// CORRETO: Stack single-column
<Stack gap="lg">
  <Input />
  <Input />
</Stack>
```

### ❌ Esquecer "use client"
```tsx
// ERRADO: form interativo sem "use client"
// TypeError: useForm is not a function
export default function Form() {
  const { register } = useForm()
}

// CORRETO:
"use client"
import { useForm } from "react-hook-form"
export default function Form() {
  const { register } = useForm()
}
```

### ❌ Muitos campos em uma seção
```tsx
// ERRADO: 20 inputs sem seções = scroll infinito
<Stack gap="lg">
  <Input label="Field 1" />
  <Input label="Field 2" />
  {/* ... 18 mais ... */}
</Stack>

// CORRETO: agrupar em FormSection
<Stack gap="lg">
  <FormSection title="Dados Pessoais">
    <Stack gap="md">
      <Input label="Nome" />
      <Input label="CPF" />
    </Stack>
  </FormSection>
  <FormSection title="Contato">
    <Stack gap="md">
      <Input label="Email" />
      <Input label="Telefone" />
    </Stack>
  </FormSection>
</Stack>
```

## Quando NÃO usar FormPageTemplate

| Caso | Use | Motivo |
|------|-----|--------|
| Modal com form rápido (1-2 fields) | Modal.Content direto | Overhead desnecessário, modal não precisa de breadcrumb |
| Tabela/listagem | DataTableWithPagination | Isso não é form |
| Detalhe read-only (inspeção) | DetailPageTemplate | Não é edição |
| Confirmação sim/não | AlertDialog | Não é form |
| Wizard multi-step customizado | Custom (FormPageTemplate + state) | Se precisar logic zwischen steps |

## Implementação Técnica

**Localização:** `packages/ds-education/src/templates/form-page-template.tsx`

**Estrutura renderizada:**
1. Breadcrumb (opcional, auto-hidden se não passado)
2. Header: ChevronLeft + back link (opcional) + h1 title + description
3. `<form onSubmit>` ou `<div>` (depende de onSubmit passado)
4. `children` — geralmente Stack com inputs
5. Footer: secondaryAction + primaryAction em Cluster align="end"

**Sticky footer:** quando `stickyFooter={true}`, footer fica em `position: fixed; bottom: 0`, e a form ganha `pb-20` pra não ficar coberta. Ideal pra forms ≥ 600px height.

**Max-width padrão:** "md" (896px) — formulários são focados e estreitos. Não use "full" a menos que necessário (form tipo wizard com wizard UI customizado).

**Padding padrão:** "md" — mantém espaçamento visual consistente.

**Breadcrumbs:** se `breadcrumbs` está vazio ou ausente, não renderiza nada. Último item não é link.

**Back link:** renderiza só se `backHref` é passado; combina com breadcrumbs ou fica na header.

**Form wrapper:** se `onSubmit` é passado, wraps children em `<form>`. Se não, renderiza `<div>` puro (template sem handler).
