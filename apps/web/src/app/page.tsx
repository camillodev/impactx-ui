import Link from "next/link"
import { Grid } from "@impactxlabs/ui"

// TODO(Wave 2): rotas abaixo virão em PR separada — Kumon flows reais.
// Links 404 até lá (placeholder intencional).
const templates = [
  { href: "/templates/education/matricula", title: "Matrícula", desc: "Fluxo de matrícula Kumon (Wave 2)" },
  { href: "/templates/education/relatorios", title: "Relatórios", desc: "Relatórios pedagógicos Kumon (Wave 2)" },
  { href: "/templates/education/alunos", title: "Alunos", desc: "Gestão de alunos Kumon (Wave 2)" },
]

export default function Home() {
  return (
    <div className="p-10 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-2">ds-impactx</h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          Education DS · 6 templates SAS clonados como base do design system multi-vertical.
        </p>
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-4">
        Templates Education
      </h2>
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
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
      </Grid>
    </div>
  )
}
