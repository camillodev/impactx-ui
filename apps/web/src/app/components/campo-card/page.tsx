import { Card, CardContent, Badge, Separator, CampoCard } from "@impactx/ds-education"

export default function CampoCardShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">CampoCard</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Card de Campo de Atuação — donut de acertos da escola e comparativo nacional. Variante <code>isFragilidade</code> alerta sobre desempenho abaixo da média.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Padrão</h2>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <CampoCard
                title="Leitura e Interpretação de Texto"
                questoes={12}
                acertosEscola={78}
                acertosNacional={65}
              />
              <CampoCard
                title="Análise Linguística"
                questoes={8}
                acertosEscola={62}
                acertosNacional={58}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Variante fragilidade</h2>
        <Card>
          <CardContent>
            <div className="py-4">
              <CampoCard
                title="Produção de Texto"
                questoes={6}
                acertosEscola={32}
                acertosNacional={55}
                isFragilidade
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
