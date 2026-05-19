import { Card, CardContent, Badge, Separator } from "@impactxlab/design-system"

export default function SeparatorShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Atom</Badge>
        <h1 className="text-3xl font-semibold">Separator</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Divisor visual horizontal ou vertical, usando <code>--color-border-strong</code>.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Horizontal</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6 py-4">
              <div>
                <p className="text-sm mb-3">Conteúdo acima</p>
                <Separator />
                <p className="text-sm mt-3">Conteúdo abaixo</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm">Item 1</p>
                <Separator />
                <p className="text-sm">Item 2</p>
                <Separator />
                <p className="text-sm">Item 3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Vertical</h2>
        <Card>
          <CardContent>
            <div className="flex items-center gap-4 py-4 h-12">
              <span className="text-sm">Início</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Meio</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Fim</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
