import { Card, CardContent, Badge, Separator, AssessmentHeader } from "@impactxlabs/ui"
import { GraduationCap } from "lucide-react"

export default function AssessmentHeaderShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">AssessmentHeader</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Header reutilizável para telas de relatório de avaliação — breadcrumb, título com ícone e tabs.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Exemplo</h2>
        <Card>
          <CardContent>
            <div className="-mx-6 -my-4">
              <AssessmentHeader
                breadcrumbs={[
                  { label: "Avaliações" },
                  { label: "SAS" },
                  { label: "Visão Geral" },
                ]}
                subtitle="Avaliação Diagnóstica"
                title="Língua Portuguesa — 5º Ano"
                icon={<GraduationCap size={24} style={{ color: "var(--color-primary)" }} />}
                tabs={[
                  { value: "visao-geral", label: "Visão Geral" },
                  { value: "por-questao", label: "Por Questão" },
                  { value: "por-aluno", label: "Por Aluno" },
                ]}
                activeTab="visao-geral"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
