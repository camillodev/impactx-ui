import { Card, CardContent, Badge, Separator, ProgressBar } from "@impactxlab/ds-education"

export default function ProgressBarShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Atom</Badge>
        <h1 className="text-3xl font-semibold">ProgressBar</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Barra de progresso simples — usa <code>--color-primary</code> para o preenchimento e <code>--color-border</code> como trilho.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Valores</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">value=25</span>
                <ProgressBar value={25} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">value=50</span>
                <ProgressBar value={50} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">value=100</span>
                <ProgressBar value={100} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Alturas</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">height=4</span>
                <ProgressBar value={70} height={4} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">height=8 (default)</span>
                <ProgressBar value={70} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] font-mono">height=16</span>
                <ProgressBar value={70} height={16} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
