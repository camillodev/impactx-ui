import { BannerCTA } from "@impactxlab/ds-education"

const title = "Improve student performance with personalized learning paths"
const description =
  "Adapt content automatically to each student and unlock measurable progress in weeks."
const actionLabel = "Get started"

const Illustration = () => (
  <div className="bg-[var(--color-primary)]/20 rounded-lg w-32 h-32" />
)

export default function BannerCTAPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">BannerCTA</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Molecule de chamada para acao em destaque, full-width.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Soft (default)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BannerCTA
            title={title}
            description={description}
            actionLabel={actionLabel}
            illustration={<Illustration />}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Gradient
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BannerCTA
            title={title}
            description={description}
            actionLabel={actionLabel}
            variant="gradient"
            illustration={<Illustration />}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Filled
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BannerCTA
            title={title}
            description={description}
            actionLabel={actionLabel}
            variant="filled"
            illustration={<Illustration />}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem illustration
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BannerCTA
            title={title}
            description={description}
            actionLabel={actionLabel}
            variant="soft"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Illustration a esquerda
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <BannerCTA
            title={title}
            description={description}
            actionLabel={actionLabel}
            variant="soft"
            illustrationPosition="left"
            illustration={<Illustration />}
          />
        </div>
      </section>
    </main>
  )
}
