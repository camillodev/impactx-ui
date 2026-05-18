# Pattern: Formulário multi-step (wizard)

> **Trigger:** "wizard", "matrícula em etapas", "onboarding multi-tela", "stepper", "fluxo de cadastro em 3 passos", "form longo dividido em steps".

## Status do pattern

**🚧 Aguardando organism oficial.** Hoje você compõe manualmente (receita abaixo). Quando `Stepper` + `WizardTemplate` chegarem (PR futura, ver `docs/ds-implementation-plan.md`), este pattern aponta pra eles.

## Decisão em 30 segundos

| Cenário | Pattern |
|---|---|
| Form ≤10 campos, 1 página | `patterns/form-simple.md` |
| Form longo mas 1 página (não-linear) | `patterns/form-simple.md` + Tabs |
| Fluxo linear ≥3 etapas com progresso | **form-multistep** (este) |
| Onboarding de produto com explicação | `patterns/form-multistep.md` + tela de boas-vindas |

## Receita (composição manual, ~25 linhas)

```tsx
"use client"

import { useState } from "react"
import { FormPageTemplate, Stack, ProgressBar, Button, Cluster } from "@camillodev/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const STEPS = ["Dados pessoais", "Endereço", "Confirmação"]

// Schemas por step (ou 1 schema global com refinement)
const step1Schema = z.object({
  nome: z.string().min(3),
  cpf: z.string().regex(/^\d{11}$/),
})

export default function MatriculaWizard() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(step === 0 ? step1Schema : z.object({})),
  })

  const onNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  const onSubmit = async (data) => {
    const final = { ...formData, ...data }
    await fetch("/api/matriculas", { method: "POST", body: JSON.stringify(final) })
  }

  return (
    <FormPageTemplate
      title="Matrícula"
      description={`Etapa ${step + 1} de ${STEPS.length}: ${STEPS[step]}`}
      onSubmit={handleSubmit(step === STEPS.length - 1 ? onSubmit : onNext)}
      primaryAction={
        <Cluster gap="sm">
          {step > 0 && (
            <Button variant="outline" type="button" onClick={() => setStep(step - 1)}>
              Voltar
            </Button>
          )}
          <Button variant="primary" type="submit">
            {step === STEPS.length - 1 ? "Concluir" : "Próximo"}
          </Button>
        </Cluster>
      }
    >
      <Stack gap="lg">
        <ProgressBar value={((step + 1) / STEPS.length) * 100} label={`${step + 1} de ${STEPS.length}`} />
        
        {step === 0 && (
          <Stack gap="md">
            <Input label="Nome" placeholder="João da Silva" {...register("nome")} error={errors.nome?.message} />
            <Input label="CPF" placeholder="12345678900" {...register("cpf")} error={errors.cpf?.message} />
          </Stack>
        )}
        
        {step === 1 && (
          <Stack gap="md">
            <Input label="Rua" placeholder="Av. Paulista" {...register("endereco")} />
            <Input label="Número" placeholder="1000" {...register("numero")} />
          </Stack>
        )}
        
        {step === 2 && (
          <Stack gap="md">
            <Text size="sm" color="muted">Revise seus dados antes de confirmar.</Text>
            <ConfirmationSummary data={formData} />
          </Stack>
        )}
      </Stack>
    </FormPageTemplate>
  )
}
```

## Variações

### Salvar rascunho (localStorage)
```tsx
const onNext = (data) => {
  const final = { ...formData, ...data }
  setFormData(final)
  localStorage.setItem("matricula-draft", JSON.stringify(final))
  if (step < STEPS.length - 1) setStep(step + 1)
}
```

### Validação backend por step
```tsx
const onNext = async (data) => {
  const res = await fetch(`/api/matriculas/validate-step-${step}`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (!res.ok) return // renderiza errors no form
  setFormData((prev) => ({ ...prev, ...data }))
  setStep(step + 1)
}
```

### Cancelar com confirmação
```tsx
secondaryAction={
  <Button
    variant="ghost"
    type="button"
    onClick={() => {
      if (confirm("Descartar progresso?")) router.back()
    }}
  >
    Cancelar
  </Button>
}
```

## Anti-patterns ❌

- ❌ **NUNCA** mostre todos os steps ao mesmo tempo em accordion — o ponto é navegação linear clara
- ❌ **NUNCA** esconda a posição atual — sempre mostre `Etapa N de M` (ou ProgressBar com label)
- ❌ **NUNCA** force usuário a refazer step anterior se validação backend falhar — mantenha state e deixe editar
- ❌ **NUNCA** use isso pra form com ≤2 steps — use form-simple com section colapsável
- ❌ **NUNCA** desabilite botão "Voltar" nos steps intermediários (causa frustração)
- ❌ Não validar todos os steps no final — validar cada um conforme passa (fail-fast)

## Links

- Form simples: `.impactx/rules/patterns/form-simple.md`
- FormPageTemplate: `.impactx/rules/templates/form-page.md`
- Roadmap Stepper: `docs/ds-implementation-plan.md` (PR futura)
