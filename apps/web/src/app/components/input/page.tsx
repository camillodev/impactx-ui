"use client"

import * as React from "react"
import { Input } from "@impactx/ds-education"
import { Search, Mail, Lock, Eye } from "lucide-react"

export default function InputPage() {
  const [value, setValue] = React.useState("")

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Input</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Input de texto com label, helper, error e ícones leading/trailing.
      </p>

      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Estados
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-5">
          <Input
            label="Default"
            placeholder="Digite seu nome"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            label="Com helper"
            placeholder="email@empresa.com"
            helperText="Usaremos pra notificar atualizações"
            type="email"
          />
          <Input
            label="Com erro"
            placeholder="senha"
            type="password"
            error="Senha precisa ter pelo menos 8 caracteres"
            defaultValue="123"
          />
          <Input label="Disabled" placeholder="Não editável" disabled defaultValue="readonly" />
        </div>
      </section>

      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com ícones
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-5">
          <Input
            label="Search"
            placeholder="Buscar relatórios…"
            leadingIcon={<Search />}
          />
          <Input
            label="E-mail"
            placeholder="email@empresa.com"
            type="email"
            leadingIcon={<Mail />}
          />
          <Input
            label="Senha"
            placeholder="••••••••"
            type="password"
            leadingIcon={<Lock />}
            trailingIcon={<Eye />}
          />
        </div>
      </section>

      <section className="max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem label (inline em forms)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Input placeholder="Buscar…" leadingIcon={<Search />} />
        </div>
      </section>
    </main>
  )
}
