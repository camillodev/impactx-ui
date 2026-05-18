"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Separator,
  CategoryCard,
  Grid,
  Stack,
} from "@camillodev/ui"
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Calculator,
  Atom,
  Globe2,
  Languages,
  Palette,
  Music,
  FlaskConical,
} from "lucide-react"

export default function CategoryCardShowcase() {
  const [selected, setSelected] = React.useState<string>("matematica")

  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">CategoryCard</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Card quadrado com gradient azul, ícone, título e subtítulo. Usado em
          catálogos e hubs de avaliação. Suporta estado <code>active</code> e{" "}
          <code>onClick</code>.
        </p>
      </header>

      <Separator />

      {/* Section 1 — Estados */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Estados</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid cols={{ base: 1, md: 2 }} gap="lg" className="py-4 max-w-2xl">
              <Stack direction="vertical" gap="sm">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Default
                </span>
                <CategoryCard
                  icon={GraduationCap}
                  title="Avaliações"
                  subtitle="Diagnóstico e simulados"
                />
              </Stack>
              <Stack direction="vertical" gap="sm">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Active
                </span>
                <CategoryCard
                  icon={BookOpen}
                  title="Plano de Estudos"
                  subtitle="Trilhas por habilidade"
                  active
                />
              </Stack>
            </Grid>
          </CardContent>
        </Card>
      </section>

      {/* Section 2 — Variações de conteúdo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Variações de conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid cols={{ base: 1, md: 3 }} gap="lg" className="py-4 max-w-3xl">
              <Stack direction="vertical" gap="sm">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Texto curto
                </span>
                <CategoryCard
                  icon={Trophy}
                  title="Olimpíadas"
                  subtitle="Competições"
                />
              </Stack>
              <Stack direction="vertical" gap="sm">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Texto médio
                </span>
                <CategoryCard
                  icon={FlaskConical}
                  title="Laboratório de Ciências"
                  subtitle="Experimentos guiados"
                />
              </Stack>
              <Stack direction="vertical" gap="sm">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  Texto longo
                </span>
                <CategoryCard
                  icon={Languages}
                  title="Línguas Estrangeiras Modernas"
                  subtitle="Inglês, espanhol e francês com foco em conversação e leitura crítica"
                />
              </Stack>
            </Grid>
          </CardContent>
        </Card>
      </section>

      {/* Section 3 — Interativo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Interativo (selecionável)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Clique para selecionar — o card ativo recebe outline. Selecionado:{" "}
              <strong>{selected}</strong>
            </p>
            <Grid cols={{ base: 2, md: 4 }} gap="md" className="py-4">
              <CategoryCard
                icon={Calculator}
                title="Matemática"
                subtitle="Álgebra e geometria"
                active={selected === "matematica"}
                onClick={() => setSelected("matematica")}
              />
              <CategoryCard
                icon={BookOpen}
                title="Português"
                subtitle="Gramática e literatura"
                active={selected === "portugues"}
                onClick={() => setSelected("portugues")}
              />
              <CategoryCard
                icon={Atom}
                title="Ciências"
                subtitle="Física, química e bio"
                active={selected === "ciencias"}
                onClick={() => setSelected("ciencias")}
              />
              <CategoryCard
                icon={Globe2}
                title="História"
                subtitle="Brasil e geral"
                active={selected === "historia"}
                onClick={() => setSelected("historia")}
              />
            </Grid>
          </CardContent>
        </Card>
      </section>

      {/* Section 4 — Mock realista */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Uso real — Catálogo de Matérias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Grid simulando dashboard do aluno com todas as matérias do
              currículo.
            </p>
            <Grid cols={{ base: 2, md: 4 }} gap="md" className="py-4">
              <CategoryCard
                icon={Calculator}
                title="Matemática"
                subtitle="120 questões"
              />
              <CategoryCard
                icon={BookOpen}
                title="Português"
                subtitle="98 questões"
              />
              <CategoryCard
                icon={Atom}
                title="Ciências"
                subtitle="76 questões"
              />
              <CategoryCard
                icon={Globe2}
                title="História"
                subtitle="64 questões"
              />
              <CategoryCard
                icon={Languages}
                title="Inglês"
                subtitle="52 questões"
              />
              <CategoryCard
                icon={Palette}
                title="Artes"
                subtitle="34 questões"
              />
              <CategoryCard
                icon={Music}
                title="Música"
                subtitle="28 questões"
              />
              <CategoryCard
                icon={Trophy}
                title="Olimpíadas"
                subtitle="Avançado"
                active
              />
            </Grid>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
