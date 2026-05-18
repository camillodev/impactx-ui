import * as React from "react"
import { PageContainer, type PageContainerProps } from "../components/page-container"
import { Stack } from "../components/stack"
import { Cluster } from "../components/cluster"
import { Grid } from "../components/grid"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as BCItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/breadcrumb"
import type { BreadcrumbTrailItem } from "./types"
import { cn } from "../utils"

/**
 * DashboardTemplate — página com header + métricas + conteúdo (charts, seções).
 *
 * Estrutura fixa:
 *   [Breadcrumb?]
 *   [Header: title + description | controls + actions]
 *   [Metrics row: Grid responsivo de cards simples]
 *   [Children: charts, tabelas, seções customizadas]
 *
 * Bot escreve 5-10 linhas, recebe página inteira responsiva, com semântica
 * correta (<main>, h1) e padding consistente.
 *
 * Decision tree:
 * - Dashboard com métricas top + charts? → DashboardTemplate
 * - Lista de items com header + ação principal? → ListPageTemplate
 * - Detalhe de 1 item? → DetailPageTemplate
 * - Form multi-step? → FormPageTemplate
 */

export interface DashboardMetric {
  /** Label da métrica (ex: "Alunos ativos"). */
  label: React.ReactNode
  /** Valor principal (ex: "124" ou "R$ 47.300"). */
  value: React.ReactNode
  /** Trend badge ou indicador (ex: <Badge variant="success">+12%</Badge>). Opcional. */
  trend?: React.ReactNode
  /** Texto pequeno de contexto (ex: "vs mês passado"). Opcional. */
  hint?: React.ReactNode
}

export interface DashboardTemplateProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbTrailItem[]
  /** Slot pra controles (selectores de período, filtros globais). Opcional. */
  controls?: React.ReactNode
  /** Ações no topo direito (export, settings, etc). Opcional. */
  actions?: React.ReactNode
  /** Array de métricas top. Renderiza em Grid responsivo. Opcional. */
  metrics?: DashboardMetric[]
  /** Conteúdo principal — geralmente Stack de seções com charts/tabelas. */
  children?: React.ReactNode
  /** Max-width do container. Default: "xl" (dashboards são wider). */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

export function DashboardTemplate({
  title,
  description,
  breadcrumbs,
  controls,
  actions,
  metrics,
  children,
  maxWidth = "xl",
  padding = "md",
  className,
  ...props
}: DashboardTemplateProps) {
  return (
    <PageContainer
      as="main"
      maxWidth={maxWidth}
      padding={padding}
      className={cn(className)}
      {...props}
    >
      <Stack gap="lg">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((b, i) => {
                const isLast = i === breadcrumbs.length - 1
                return (
                  <React.Fragment key={`${b.label}-${i}`}>
                    <BCItem>
                      {b.href && !isLast ? (
                        <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{b.label}</BreadcrumbPage>
                      )}
                    </BCItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        <Cluster gap="md" justify="between" align="start">
          <Stack gap="xs">
            <h1 className="text-2xl font-bold text-[var(--color-text)] leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
            )}
          </Stack>
          {(controls || actions) && (
            <Cluster gap="sm">
              {controls}
              {actions}
            </Cluster>
          )}
        </Cluster>

        {metrics && metrics.length > 0 && (
          <Grid
            cols={{
              base: 1,
              sm: 2,
              lg: metrics.length === 4 ? 4 : 3,
            }}
            gap="md"
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
              >
                <Stack gap="xs" align="start">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                    {m.label}
                  </span>
                  <span className="text-3xl font-bold text-[var(--color-text)]">
                    {m.value}
                  </span>
                  {m.trend && <div>{m.trend}</div>}
                  {m.hint && (
                    <span className="text-xs text-[var(--color-text-muted)]">{m.hint}</span>
                  )}
                </Stack>
              </div>
            ))}
          </Grid>
        )}

        <div>{children}</div>
      </Stack>
    </PageContainer>
  )
}
