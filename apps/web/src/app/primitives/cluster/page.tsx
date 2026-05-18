import { Cluster, Badge, Button, Chip, CodeBlock } from "@camillodev/ui"

export default function ClusterShowcase() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">Cluster</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Flex horizontal com wrap automático. Itens quebram pra linha de baixo quando não
        cabem. Pattern de Every Layout.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Tags de aluno
        </h2>
        <Cluster gap="xs">
          <Badge variant="primary">Matriculado</Badge>
          <Badge variant="success">Em dia</Badge>
          <Badge variant="ink">Matemática</Badge>
          <Badge variant="ink">Português</Badge>
          <Badge variant="warning">Reposição pendente</Badge>
        </Cluster>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Footer de modal — justify="end"`}
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <Cluster gap="sm" justify="end">
            <Button variant="tertiary">Cancelar</Button>
            <Button variant="danger-primary">Excluir</Button>
          </Cluster>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`Toolbar — justify="between"`}
        </h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <Cluster gap="md" justify="between">
            <span className="text-sm font-medium text-[var(--color-text)]">
              124 alunos
            </span>
            <Cluster gap="sm">
              <Button variant="tertiary" size="sm">Exportar</Button>
              <Button variant="primary" size="sm">Novo aluno</Button>
            </Cluster>
          </Cluster>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          Chips wrapping — reduza a janela pra ver quebrar
        </h2>
        <Cluster gap="sm">
          {[
            "Maria Silva", "João Pedro", "Ana Beatriz", "Carlos Eduardo",
            "Fernanda Lima", "Pedro Henrique", "Larissa Costa", "Rafael Mendes",
          ].map((name) => (
            <Chip key={name} label={name} />
          ))}
        </Cluster>
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">Uso</h2>
        <CodeBlock language="tsx">{`import { Cluster } from "@camillodev/ui"

// Tags que podem quebrar
<Cluster gap="xs">
  <Badge variant="primary">Tag 1</Badge>
  <Badge variant="success">Tag 2</Badge>
</Cluster>

// Footer alinhado à direita
<Cluster gap="sm" justify="end">
  <Button variant="tertiary">Cancelar</Button>
  <Button variant="primary">Salvar</Button>
</Cluster>`}</CodeBlock>
      </section>
    </main>
  )
}
