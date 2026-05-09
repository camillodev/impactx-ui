"use client"

import * as React from "react"
import { Textarea, Label, CodeBlock } from "@impactx/ds-education"

export default function TextareaPage() {
  const [value, setValue] = React.useState("")

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Textarea</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Campo multiline com label, helper, error e resize.
      </p>

      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Estados
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-5">
          <Textarea
            label="Default"
            placeholder="Digite uma mensagem…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Textarea
            label="Com helper"
            placeholder="Descreva o problema…"
            helperText="Quanto mais detalhes, melhor."
          />
          <Textarea
            label="Com erro"
            placeholder="Seu feedback…"
            error="Mínimo de 20 caracteres."
            defaultValue="ok"
          />
          <Textarea
            label="Disabled"
            placeholder="Não editável"
            disabled
            defaultValue="Conteúdo somente leitura"
          />
        </div>
      </section>

      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com Label externo
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-2">
          <Label htmlFor="obs">Observações</Label>
          <Textarea
            id="obs"
            placeholder="Adicione observações adicionais…"
            rows={4}
          />
        </div>
      </section>

      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Rows controlado
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-5">
          <Textarea
            label="Compacto (rows=2)"
            placeholder="Resposta curta…"
            rows={2}
          />
          <Textarea
            label="Expandido (rows=6)"
            placeholder="Descrição longa…"
            rows={6}
          />
        </div>
      </section>

      <section className="max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Textarea } from "@impactx/ds-education"

<Textarea label="Mensagem" placeholder="Digite uma mensagem…" />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Com helper + erro</p>
            <CodeBlock language="tsx">{`<Textarea
  label="Feedback"
  placeholder="Descreva o problema…"
  helperText="Quanto mais detalhes, melhor."
/>

<Textarea
  label="Comentário"
  error="Mínimo de 20 caracteres."
/>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Com Label externo + rows</p>
            <CodeBlock language="tsx">{`import { Label, Textarea } from "@impactx/ds-education"

<Label htmlFor="obs">Observações</Label>
<Textarea id="obs" rows={4} placeholder="Adicione observações…" />`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
