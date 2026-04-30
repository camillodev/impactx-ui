import { Card, CardContent, Badge, Separator, HeroBanner } from "@impactx/ds-education"

export default function HeroBannerShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">HeroBanner</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Banner topo de página com gradient, eyebrow, título e descrição.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Padrão</h2>
        <Card>
          <CardContent>
            <div className="-mx-6 -my-4">
              <HeroBanner />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Custom</h2>
        <Card>
          <CardContent>
            <div className="-mx-6 -my-4">
              <HeroBanner
                eyebrow="PLANO DE ESTUDOS"
                title="Trilhas Personalizadas"
                description="Acompanhe a evolução dos seus alunos por habilidade — com sequências didáticas alinhadas à BNCC."
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
