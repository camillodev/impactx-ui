import * as React from "react"
import { PageContainer, type PageContainerProps } from "../components/page-container"
import { Stack } from "../components/stack"
import { Cluster } from "../components/cluster"
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
 * ListPageTemplate — página de lista padrão (alunos, responsáveis, cobranças).
 *
 * Estrutura fixa:
 *   [Breadcrumb?]
 *   [Header: title + description + primaryAction]
 *   [Filters? — toolbar]
 *   [Children: table, grid de cards, etc]
 *
 * Bot escreve 5-10 linhas, recebe página inteira responsiva, com semântica
 * correta (<main>, h1) e padding consistente.
 *
 * Decision tree:
 * - Lista de items com header + ação principal? → ListPageTemplate
 * - Detalhe de 1 item? → DetailPageTemplate
 * - Form multi-step? → FormPageTemplate
 * - Dashboard com métricas? → DashboardTemplate
 */

export interface ListPageTemplateProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbTrailItem[]
  /** Ação principal (botão direita). Geralmente <Button variant="primary">. */
  primaryAction?: React.ReactNode
  /** Ações secundárias (à esquerda do primary). */
  secondaryActions?: React.ReactNode
  /** Toolbar de filtros. Aparece entre header e conteúdo. */
  filters?: React.ReactNode
  /** Conteúdo principal — geralmente DataTableWithPagination ou Grid de Cards. */
  children: React.ReactNode
  /** Max-width do container. Default: "lg". */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

export function ListPageTemplate({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryActions,
  filters,
  children,
  maxWidth = "lg",
  padding = "md",
  className,
  ...props
}: ListPageTemplateProps) {
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
          {(primaryAction || secondaryActions) && (
            <Cluster gap="sm">
              {secondaryActions}
              {primaryAction}
            </Cluster>
          )}
        </Cluster>

        {filters && <div>{filters}</div>}

        <div>{children}</div>
      </Stack>
    </PageContainer>
  )
}
