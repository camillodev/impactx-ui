import * as React from "react"
import { ChevronLeft } from "lucide-react"
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
 * DetailPageTemplate — página de detalhe de 1 entidade (aluno, fatura, responsável).
 *
 * Estrutura fixa:
 *   [Breadcrumb? — caminho da entidade]
 *   [Header: backLink + title + subtitle + primaryAction + secondaryActions]
 *   [Body: 2 columns desktop (main 2/3, sidebar 1/3) | stack vertical mobile]
 *     main → children (passed in)
 *     sidebar → sidebar prop (passed in, optional)
 *
 * Bot escreve 5-10 linhas, recebe página inteira responsiva, com semântica
 * correta (<main>, h1) e padding consistente.
 *
 * Decision tree:
 * - Detalhe de 1 entidade com main+sidebar (info, ações relacionadas)? → DetailPageTemplate com sidebar
 * - Detalhe sem coluna lateral? → DetailPageTemplate sem sidebar
 * - Lista de entidades? → ListPageTemplate
 * - Form multi-step? → FormPageTemplate
 */

export interface DetailPageTemplateProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Subtítulo abaixo do título. Ex: "Matrícula #12345". Opcional. */
  subtitle?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbTrailItem[]
  /** Link de volta. Se passado, renderiza botão "Voltar" com ícone ChevronLeft. Opcional. */
  backHref?: string
  /** Ação principal (botão direita). Geralmente <Button variant="primary">. */
  primaryAction?: React.ReactNode
  /** Ações secundárias (à esquerda do primary). */
  secondaryActions?: React.ReactNode
  /** Coluna lateral (info, ações relacionadas). Se passado, layout 2-col desktop, stack mobile. Opcional. */
  sidebar?: React.ReactNode
  /** Conteúdo principal — geralmente Form ou Card stack. */
  children: React.ReactNode
  /** Max-width do container. Default: "lg". */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

export function DetailPageTemplate({
  title,
  subtitle,
  breadcrumbs,
  backHref,
  primaryAction,
  secondaryActions,
  sidebar,
  children,
  maxWidth = "lg",
  padding = "md",
  className,
  ...props
}: DetailPageTemplateProps) {
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
          <Stack gap="xs" align="start">
            {backHref && (
              <a
                href={backHref}
                className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <ChevronLeft className="size-4" />
                Voltar
              </a>
            )}
            <h1 className="text-2xl font-bold text-[var(--color-text)] leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[var(--color-text-muted)]">{subtitle}</p>
            )}
          </Stack>
          {(primaryAction || secondaryActions) && (
            <Cluster gap="sm">
              {secondaryActions}
              {primaryAction}
            </Cluster>
          )}
        </Cluster>

        {sidebar ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">{children}</div>
            <aside className="lg:col-span-1">{sidebar}</aside>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </Stack>
    </PageContainer>
  )
}
