"use client"

import { Card, CardContent, Badge, Separator, BigCard } from "@impactx/ds-education"
import { BookOpen, Target } from "lucide-react"

export default function BigCardShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">BigCard</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Card destaque grande com título, descrição e ícone — usado em hubs de produto.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Exemplos</h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <BigCard
                icon={BookOpen}
                title="Plano de Estudos"
                description="Acompanhe a evolução dos seus alunos com trilhas personalizadas por habilidade."
              />
              <BigCard
                icon={Target}
                title="Avaliações SAS"
                description="Aplique simulados e avaliações diagnósticas alinhadas à BNCC e ao ENEM."
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
