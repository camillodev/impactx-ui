import { Card, CardContent, Badge, Separator, AssessmentListItem } from "@impactxlabs/ui"

export default function AssessmentListItemShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">AssessmentListItem</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Item de lista de avaliação — título, período, status (concluída/em andamento/pendente) e ações.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Variantes de status</h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-3 py-4">
              <AssessmentListItem
                title="Avaliação Diagnóstica — Língua Portuguesa"
                applicationPeriod="01/03 a 15/03/2026"
                status="concluded"
              />
              <AssessmentListItem
                title="Simulado SAS — Matemática"
                applicationPeriod="20/04 a 30/04/2026"
                status="in-progress"
              />
              <AssessmentListItem
                title="Avaliação Bimestral — Ciências"
                applicationPeriod="10/05 a 20/05/2026"
                status="pending"
              />
              <AssessmentListItem
                title="Avaliação Anual — Geografia"
                applicationPeriod="05/06 a 15/06/2026"
                status="concluded"
              />
              <AssessmentListItem
                title="Olimpíada de História"
                applicationPeriod="01/07 a 10/07/2026"
                status="pending"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
