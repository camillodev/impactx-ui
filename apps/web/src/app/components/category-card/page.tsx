"use client"

import { Card, CardContent, Badge, Separator, CategoryCard } from "@impactx/ds-education"
import { GraduationCap, BookOpen, Trophy } from "lucide-react"

export default function CategoryCardShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">CategoryCard</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Card categoria com gradient, ícone e textos. Suporta estado <code>active</code>.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Variantes</h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 max-w-3xl">
              <CategoryCard
                icon={GraduationCap}
                title="Avaliações"
                subtitle="Diagnóstico e simulados"
              />
              <CategoryCard
                icon={BookOpen}
                title="Plano de Estudos"
                subtitle="Trilhas por habilidade"
                active
              />
              <CategoryCard
                icon={Trophy}
                title="Olimpíadas"
                subtitle="Competições nacionais"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
