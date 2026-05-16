"use client"

import * as React from "react"
import {
  DetailPageTemplate,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Stack,
  Cluster,
} from "@impactxlab/ds-education"
import { Edit2, Trash2, Mail, Phone, Calendar, Clock } from "lucide-react"

export default function DetailPageExample() {
  const sidebar = (
    <Stack gap="md">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Responsável</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="sm">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Nome</p>
              <p className="text-sm font-medium">Silva Santos</p>
            </div>
            <Cluster gap="xs" align="center">
              <Phone className="size-4 text-[var(--color-text-muted)]" />
              <a href="tel:+5531988888888" className="text-sm hover:underline">
                (31) 98888-8888
              </a>
            </Cluster>
            <Cluster gap="xs" align="center">
              <Mail className="size-4 text-[var(--color-text-muted)]" />
              <a href="mailto:silva@example.com" className="text-sm hover:underline">
                silva@example.com
              </a>
            </Cluster>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Status financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <div>
              <Badge variant="success">Em dia</Badge>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Total de aulas</p>
              <p className="text-lg font-semibold">48</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Próximo vencimento</p>
              <p className="text-sm font-medium">15 de junho de 2026</p>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )

  return (
    <DetailPageTemplate
      title="Maria Silva"
      subtitle="Matrícula #12345 · Turma Matemática A"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Alunos", href: "/alunos" },
        { label: "Maria Silva" },
      ]}
      backHref="/alunos"
      primaryAction={
        <Button variant="primary">
          <Edit2 className="size-4" />
          Editar
        </Button>
      }
      secondaryActions={
        <Button variant="danger-tertiary">
          <Trash2 className="size-4" />
          Excluir
        </Button>
      }
      sidebar={sidebar}
    >
      <Stack gap="lg">
        <div>
          <h2 className="text-lg font-semibold mb-4">Histórico recente</h2>
          <Stack gap="sm">
            <div className="border-l-2 border-[var(--color-border)] pl-4 py-2">
              <p className="text-sm font-medium">Pagamento recebido</p>
              <p className="text-xs text-[var(--color-text-muted)]">12 de junho de 2026</p>
            </div>
            <div className="border-l-2 border-[var(--color-border)] pl-4 py-2">
              <p className="text-sm font-medium">Aula realizada</p>
              <p className="text-xs text-[var(--color-text-muted)]">05 de junho de 2026</p>
            </div>
            <div className="border-l-2 border-[var(--color-border)] pl-4 py-2">
              <p className="text-sm font-medium">Matrícula criada</p>
              <p className="text-xs text-[var(--color-text-muted)]">01 de março de 2026</p>
            </div>
            <div className="border-l-2 border-[var(--color-border)] pl-4 py-2">
              <p className="text-sm font-medium">Primeira aula</p>
              <p className="text-xs text-[var(--color-text-muted)]">02 de março de 2026</p>
            </div>
          </Stack>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Aulas próximas</h2>
          <Stack gap="sm">
            <Card>
              <CardContent className="pt-4">
                <Cluster gap="md" justify="between" align="start">
                  <div>
                    <p className="font-medium">Aula de Matemática</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Professor João Pedro
                    </p>
                  </div>
                  <div className="text-right">
                    <Cluster gap="xs" align="center" className="justify-end mb-1">
                      <Calendar className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">18 de junho</span>
                    </Cluster>
                    <Cluster gap="xs" align="center" className="justify-end">
                      <Clock className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">14h00</span>
                    </Cluster>
                  </div>
                </Cluster>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Cluster gap="md" justify="between" align="start">
                  <div>
                    <p className="font-medium">Aula de Matemática</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Professor João Pedro
                    </p>
                  </div>
                  <div className="text-right">
                    <Cluster gap="xs" align="center" className="justify-end mb-1">
                      <Calendar className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">25 de junho</span>
                    </Cluster>
                    <Cluster gap="xs" align="center" className="justify-end">
                      <Clock className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">14h00</span>
                    </Cluster>
                  </div>
                </Cluster>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <Cluster gap="md" justify="between" align="start">
                  <div>
                    <p className="font-medium">Aula de Matemática</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Professor João Pedro
                    </p>
                  </div>
                  <div className="text-right">
                    <Cluster gap="xs" align="center" className="justify-end mb-1">
                      <Calendar className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">02 de julho</span>
                    </Cluster>
                    <Cluster gap="xs" align="center" className="justify-end">
                      <Clock className="size-4 text-[var(--color-text-muted)]" />
                      <span className="text-sm">14h00</span>
                    </Cluster>
                  </div>
                </Cluster>
              </CardContent>
            </Card>
          </Stack>
        </div>
      </Stack>
    </DetailPageTemplate>
  )
}
