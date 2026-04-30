import { Card, CardHeader, CardTitle, CardContent } from "@impactx/ds-education"
import { Button } from "@impactx/ds-education"
import { Badge } from "@impactx/ds-education"
import { Separator } from "@impactx/ds-education"

export default function CardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">Card</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Container primitivo. Compõe com CardHeader / CardTitle / CardContent.
      </p>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Estrutura padrão
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Título do card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-muted)]">
                Conteúdo do card. Texto descritivo, ações ou qualquer composição.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Com badge</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success" size="sm">
                Ativo
              </Badge>
              <p className="text-sm text-[var(--color-text-muted)] mt-3">
                Header + content com diferentes elementos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Com ação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Card como container clicável.
              </p>
              <Button size="sm">Abrir</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem header (só CardContent)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardContent>
              <p className="text-sm text-[var(--color-text)]">
                Conteúdo direto, sem header. Usar quando não há título destacado.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text)]">
                    Total students
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-text)] mt-1">1,247</div>
                </div>
                <Badge variant="primary">+8%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Composição com Separator
        </h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Tema</span>
                <span className="text-[var(--color-text)] font-medium">Education</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Modo</span>
                <span className="text-[var(--color-text)] font-medium">Light</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Idioma</span>
                <span className="text-[var(--color-text)] font-medium">PT-BR</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
