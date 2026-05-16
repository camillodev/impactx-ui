import { Card, CardContent, Badge, Separator, QuestionRow } from "@impactxlab/ds-education"

export default function QuestionRowShowcase() {
  return (
    <div className="p-8 space-y-8">
      <header className="space-y-3">
        <Badge variant="ink">Organism</Badge>
        <h1 className="text-3xl font-semibold">QuestionRow</h1>
        <p className="text-base text-[var(--color-text-muted)]">
          Linha de tabela para questão de avaliação. Suporta marcação de fragilidade quando o desempenho está abaixo do nacional.
        </p>
      </header>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Tabela de questões</h2>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Questão</th>
                    <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Campo de Atuação</th>
                    <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Acertos Escola</th>
                    <th className="py-3 px-5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Acertos Nacional</th>
                    <th className="py-3 px-5"></th>
                  </tr>
                </thead>
                <tbody>
                  <QuestionRow numero="01" campoAtuacao="Leitura e Interpretação" acertosEscola="82%" acertosNacional="68%" />
                  <QuestionRow numero="02" campoAtuacao="Análise Linguística" acertosEscola="74%" acertosNacional="70%" />
                  <QuestionRow numero="03" campoAtuacao="Produção de Texto" acertosEscola="38%" acertosNacional="55%" isFragilidade />
                  <QuestionRow numero="04" campoAtuacao="Leitura e Interpretação" acertosEscola="91%" acertosNacional="72%" />
                  <QuestionRow numero="05" campoAtuacao="Coerência Textual" acertosEscola="42%" acertosNacional="60%" isFragilidade />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
