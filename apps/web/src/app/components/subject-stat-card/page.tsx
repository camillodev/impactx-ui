import { Card, CardContent, Badge, Separator, SubjectStatCard } from "@impactx/ds-education"

export default function SubjectStatCardShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">SubjectStatCard</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Card de disciplina com média da série, média nacional e CTA para relatório.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Disciplinas</h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <SubjectStatCard
                subject="Língua Portuguesa"
                mediaSerie="7.4"
                mediaNacional="6.2"
              />
              <SubjectStatCard
                subject="Matemática"
                mediaSerie="6.8"
                mediaNacional="5.9"
              />
              <SubjectStatCard
                subject="Ciências"
                mediaSerie="8.1"
                mediaNacional="6.7"
              />
              <SubjectStatCard
                subject="História"
                mediaSerie="7.0"
                mediaNacional="6.4"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
