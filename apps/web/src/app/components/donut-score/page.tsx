import { Card, CardContent, Badge, Separator, DonutScore } from "@camillodev/ui"

export default function DonutScoreShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">DonutScore</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Donut SVG para % de acertos. Cor do arco usa <code>--color-primary</code> (ou <code>--color-warning</code> via prop <code>warning</code>).
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Valores</h2>
        <Card>
          <CardContent>
            <div className="flex items-center gap-12 py-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={30} />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">value=30</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={65} />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">value=65</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={90} />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">value=90</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Warning + tamanhos</h2>
        <Card>
          <CardContent>
            <div className="flex items-end gap-12 py-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={42} warning />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={75} size={80} strokeWidth={6} label="" />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">size=80</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={88} size={160} strokeWidth={14} />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">size=160</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
