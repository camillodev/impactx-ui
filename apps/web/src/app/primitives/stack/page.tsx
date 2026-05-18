import { Stack, Input, Button, Badge, CodeBlock } from "@camillodev/ui"

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-3 text-sm text-[var(--color-text)]">
      {children}
    </div>
  )
}

export default function StackShowcase() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">Stack</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Flex container com gap consistente. Direção única (vertical default ou horizontal).
        Substitui <code className="font-mono">flex-col gap-X</code> cru.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Vertical (default) — gap="md"`}
        </h2>
        <Stack gap="md">
          <DemoBox>Linha 1</DemoBox>
          <DemoBox>Linha 2</DemoBox>
          <DemoBox>Linha 3</DemoBox>
        </Stack>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Form fields verticais
        </h2>
        <Stack gap="md" className="max-w-md">
          <Input label="Nome" placeholder="Maria Silva" />
          <Input label="CPF" placeholder="000.000.000-00" />
          <Input label="Email" placeholder="maria@email.com" type="email" />
          <Button variant="primary">Salvar</Button>
        </Stack>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Horizontal — direction="horizontal" gap="sm" justify="end"`}
        </h2>
        <Stack direction="horizontal" gap="sm" justify="end">
          <Button variant="tertiary">Cancelar</Button>
          <Button variant="primary">Salvar</Button>
        </Stack>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Stat — gap="xs" align="start"`}
        </h2>
        <Stack gap="xs" align="start">
          <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            Alunos ativos
          </span>
          <span className="text-4xl font-bold text-[var(--color-text)]">124</span>
          <Badge variant="success" size="sm">+12% vs mês passado</Badge>
        </Stack>
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">Uso</h2>
        <CodeBlock language="tsx">{`import { Stack } from "@camillodev/ui"

// Vertical (default)
<Stack gap="md">{children}</Stack>

// Horizontal alinhado à direita
<Stack direction="horizontal" gap="sm" justify="end">
  <Button variant="tertiary">Cancelar</Button>
  <Button variant="primary">Salvar</Button>
</Stack>`}</CodeBlock>
      </section>
    </main>
  )
}
