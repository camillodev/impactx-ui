import { PageContainer, Stack, CodeBlock } from "@impactxlab/design-system"

export default function PageContainerShowcase() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">PageContainer</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Wrapper de página com max-width tipado e padding responsivo. Mobile-first.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`maxWidth="md" (896px) — pra forms / settings`}
        </h2>
        <div className="rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-bg)]">
          <PageContainer maxWidth="md">
            <div className="rounded bg-[var(--color-primary-soft)] p-4 text-center text-sm text-[var(--color-text)]">
              Conteúdo (max-width 896px)
            </div>
          </PageContainer>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`maxWidth="lg" (1280px) — default, pra listas / dashboards`}
        </h2>
        <div className="rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-bg)]">
          <PageContainer maxWidth="lg">
            <div className="rounded bg-[var(--color-primary-soft)] p-4 text-center text-sm text-[var(--color-text)]">
              Conteúdo (max-width 1280px)
            </div>
          </PageContainer>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          {`maxWidth="prose" (~65ch) — pra texto longo`}
        </h2>
        <div className="rounded-xl border border-dashed border-[var(--color-primary)] bg-[var(--color-bg)]">
          <PageContainer maxWidth="prose">
            <Stack gap="md">
              <p className="text-base text-[var(--color-text)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <p className="text-base text-[var(--color-text)]">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Stack>
          </PageContainer>
        </div>
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">Uso</h2>
        <CodeBlock language="tsx">{`import { PageContainer } from "@impactxlab/design-system"

// Página de lista padrão (default maxWidth="lg")
export default function AlunosPage() {
  return (
    <PageContainer as="main">
      <Stack gap="lg">
        <PageHeader title="Alunos" />
        <DataTableWithPagination columns={cols} data={alunos} />
      </Stack>
    </PageContainer>
  )
}

// Form estreito
<PageContainer maxWidth="md" as="main">
  <FormPageTemplate ... />
</PageContainer>`}</CodeBlock>
      </section>
    </main>
  )
}
