import { Label, CodeBlock } from "@impactxlab/design-system"

export default function LabelPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Label</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Label acessível para associar com inputs, checkboxes e outros form controls.
      </p>

      {/* Label sozinho */}
      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Básico
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Nome completo</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Endereço de e-mail</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Mensagem</Label>
          </div>
        </div>
      </section>

      {/* Label + Input */}
      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com Input
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <input
              id="email"
              type="email"
              placeholder="email@empresa.com"
              className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <textarea
              id="message"
              placeholder="Sua mensagem aqui…"
              className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows={3}
            />
          </div>
        </div>
      </section>

      {/* Label + Checkbox */}
      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com Checkbox
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              id="agree"
              type="checkbox"
              className="rounded border border-[var(--color-border)]"
            />
            <Label htmlFor="agree">Concordo com os termos de serviço</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="newsletter"
              type="checkbox"
              className="rounded border border-[var(--color-border)]"
            />
            <Label htmlFor="newsletter">Receber novidades por e-mail</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="disabled-check"
              type="checkbox"
              disabled
              defaultChecked
              className="rounded border border-[var(--color-border)]"
            />
            <Label htmlFor="disabled-check">Desabilitado</Label>
          </div>
        </div>
      </section>

      {/* Label + Radio */}
      <section className="mb-10 max-w-md">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Com Radio
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              id="option1"
              type="radio"
              name="options"
              value="option1"
              className="rounded-full border border-[var(--color-border)]"
            />
            <Label htmlFor="option1">Opção 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="option2"
              type="radio"
              name="options"
              value="option2"
              className="rounded-full border border-[var(--color-border)]"
            />
            <Label htmlFor="option2">Opção 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="option3"
              type="radio"
              name="options"
              value="option3"
              disabled
              className="rounded-full border border-[var(--color-border)]"
            />
            <Label htmlFor="option3">Opção 3 (desabilitada)</Label>
          </div>
        </div>
      </section>

      {/* Documentação */}
      <section className="max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Label } from "@impactxlab/design-system"

<Label>Nome completo</Label>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Com htmlFor (recomendado)</p>
            <CodeBlock language="tsx">{`<Label htmlFor="email">E-mail</Label>
<input id="email" type="email" />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Com Checkbox</p>
            <CodeBlock language="tsx">{`<div className="flex items-center gap-2">
  <input id="agree" type="checkbox" />
  <Label htmlFor="agree">Concordo com os termos</Label>
</div>`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Estados (peer-disabled)</p>
            <CodeBlock language="tsx">{`<input id="disabled" type="text" disabled />
<Label htmlFor="disabled">Campo desabilitado</Label>
{/* Quando input tem disabled, label fica com opacity-70 e cursor-not-allowed */}`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
