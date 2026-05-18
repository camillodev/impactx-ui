import { Avatar } from "@impactxlabs/ui"

const sizes = [
  { key: "sm", label: "sm — 24px" },
  { key: "md", label: "md — 32px" },
  { key: "lg", label: "lg — 40px" },
  { key: "xl", label: "xl — 56px" },
] as const

export default function AvatarPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Avatar</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Wrapper Radix Avatar. Fallback com iniciais sobre primary-soft.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sizes — circle (default)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-6">
          {sizes.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <Avatar size={key} fallback="Rafael Camillo" />
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sizes — rounded
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-6">
          {sizes.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <Avatar size={key} shape="rounded" fallback="Maria Silva" />
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          With image
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-6">
          <Avatar
            size="xl"
            src="https://i.pravatar.cc/120?img=12"
            alt="Foto de perfil"
            fallback="JD"
          />
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/80?img=5"
            alt="Foto de perfil"
            fallback="AB"
          />
          <Avatar
            size="md"
            src="https://i.pravatar.cc/64?img=33"
            alt="Foto de perfil"
            fallback="CD"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Fallback only (sem src)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-end gap-6">
          <Avatar size="lg" fallback="Rafael Camillo" />
          <Avatar size="lg" fallback="Ana Beatriz" />
          <Avatar size="lg" fallback="João" />
          <Avatar size="lg" fallback="X" />
        </div>
      </section>
    </main>
  )
}
