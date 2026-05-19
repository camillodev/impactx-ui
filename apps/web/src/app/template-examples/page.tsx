import Link from "next/link"
import { Grid } from "@impactxlab/design-system"

const TEMPLATES = [
  {
    slug: "list-page",
    name: "ListPageTemplate",
    desc: "Página de lista com header, filtros e ação principal. Para alunos, responsáveis, cobranças.",
  },
  {
    slug: "detail-page",
    name: "DetailPageTemplate",
    desc: "Detalhe de 1 entidade com layout main + sidebar opcional de informações.",
  },
  {
    slug: "form-page",
    name: "FormPageTemplate",
    desc: "Form de criação/edição com header + body + footer de actions.",
  },
  {
    slug: "dashboard",
    name: "DashboardTemplate",
    desc: "Dashboard com métricas top + área de charts/seções.",
  },
] as const

export default function TemplateExamplesIndex() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Page Templates</h1>
      <p className="text-base text-[var(--color-text-muted)] mb-10 max-w-2xl">
        Templates de página inteira compostos sobre primitives + componentes. Bot consumidor
        escreve poucas linhas, recebe página completa com semântica (<code>{`<main>`}</code>, h1),
        padding responsivo e estrutura consistente.
      </p>

      <Grid cols={{ base: 1, md: 2 }} gap="md">
        {TEMPLATES.map(({ slug, name, desc }) => (
          <Link
            key={slug}
            href={`/template-examples/${slug}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">{name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
          </Link>
        ))}
      </Grid>
    </main>
  )
}
