import { Card, CardContent, Badge, Separator, CtaBanner } from "@impactxlabs/ui"

export default function CtaBannerShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">CtaBanner</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Banner de chamada à ação — título, descrição e botão. Usa <code>--color-secondary</code> como fundo.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Padrão</h2>
        <Card>
          <CardContent>
            <div className="py-4">
              <CtaBanner />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Custom</h2>
        <Card>
          <CardContent>
            <div className="py-4">
              <CtaBanner
                heading="Pronto para o próximo ciclo de avaliações?"
                description="Agende a aplicação do simulado SAS Bimestral e receba relatórios automáticos por turma e habilidade."
                buttonLabel="Agendar simulado"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
