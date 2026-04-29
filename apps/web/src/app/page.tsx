import Link from "next/link"

const templates = [
  { href: "/templates/education/avaliacoes", title: "Hub Avaliações", desc: "Hero azul + 2 big cards + banner CTA" },
  { href: "/templates/education/catalogo", title: "Catálogo Relatórios", desc: "Grid 4-col de cards azuis" },
  { href: "/templates/education/lista-diagnostica", title: "Lista Diagnóstica", desc: "Filtro Ano + cards com ações" },
  { href: "/templates/education/diagnostica-ano", title: "Diagnóstica · ano", desc: "Stat cards + banner CTA roxo" },
  { href: "/templates/education/relatorio-visao-geral", title: "Relatório · Visão Geral", desc: "Tabs + donuts + tabela" },
  { href: "/templates/education/relatorio-questoes", title: "Relatório · Questões", desc: "Tabela 12 questões" },
]

export default function Home() {
  return (
    <div className="p-10 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">ds-impactx</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          Education DS · 6 templates SAS clonados como base do design system multi-vertical.
        </p>
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-4">
        Templates Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md)] transition-all"
          >
            <div className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] mb-1">
              {t.title}
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
