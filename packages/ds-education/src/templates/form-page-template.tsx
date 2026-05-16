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
 * FormPageTemplate — página de form (criar/editar entidade).
 *
 * Estrutura fixa:
 *   [Breadcrumb?]
 *   [Header: backLink + title + description]
 *   [Sections (children) — geralmente Stack de FormSection ou inputs direto]
 *   [Sticky/non-sticky footer: secondaryAction (cancel) + primaryAction (submit)]
 *
 * Conteúdo estreito (max-width "md" = 896px) para focar atenção do usuário em formulários.
 *
 * Bot consumidor passa:
 *   - title, description, breadcrumbs opcionais
 *   - primaryAction (<Button type="submit">Salvar</Button>)
 *   - secondaryAction opcional (<Button variant="ghost">Cancelar</Button>)
 *   - children = Stack gap="lg" com FormSection ou inputs direto
 *   - onSubmit handler da form
 *
 * Decision tree:
 * - Form de criação/edição de entidade → FormPageTemplate
 * - Form multi-step com wizard → FormPageTemplate com children sendo wizard custom
 * - Settings page (form focado) → FormPageTemplate
 * - Confirmação rápida (1 pergunta) → AlertDialog, NÃO FormPageTemplate
 */

export interface FormPageTemplateProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Descrição abaixo do título. Opcional. */
  description?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbTrailItem[]
  /** Link "Voltar". Se passado, renderiza ChevronLeft + link. Opcional. */
  backHref?: string
  /** Ação primária (submit). Geralmente <Button type="submit" variant="primary">Salvar</Button>. */
  primaryAction: React.ReactNode
  /** Ação secundária (cancelar). Geralmente <Button variant="ghost">Cancelar</Button>. Opcional. */
  secondaryAction?: React.ReactNode
  /** Children — geralmente Stack gap="lg" com FormSection ou inputs direto. */
  children: React.ReactNode
  /** Form submit handler. Se passado, envolve children em <form onSubmit>. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  /** Sticky footer? Default false. Se true, footer fica fixo no bottom. */
  stickyFooter?: boolean
  /** Max-width do container. Default: "md" (896px — formulários são estreitos). */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

export function FormPageTemplate({
  title,
  description,
  breadcrumbs,
  backHref,
  primaryAction,
  secondaryAction,
  children,
  onSubmit,
  stickyFooter = false,
  maxWidth = "md",
  padding = "md",
  className,
  ...props
}: FormPageTemplateProps) {
  const formClassName = cn("flex flex-col min-w-0", stickyFooter && "pb-20")
  const footerClassName = cn(
    stickyFooter && [
      "fixed bottom-0 left-0 right-0 bg-[var(--color-bg)] border-t border-[var(--color-border)]",
      "px-4 py-4 md:px-8",
    ],
    !stickyFooter && "pt-6 border-t border-[var(--color-border)] mt-6"
  )
  const formBody = (
    <>
      <div className={cn("flex-1")}>{children}</div>
      <Cluster gap="sm" justify="end" className={footerClassName}>
        {secondaryAction}
        {primaryAction}
      </Cluster>
    </>
  )

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

        <Stack gap="xs">
          <Cluster gap="sm" align="center">
            {backHref && (
              <a
                href={backHref}
                className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
                aria-label="Voltar"
              >
                <ChevronLeft className="size-4" />
                <span>Voltar</span>
              </a>
            )}
            <h1 className="text-2xl font-bold text-[var(--color-text)] leading-tight">
              {title}
            </h1>
          </Cluster>
          {description && (
            <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
          )}
        </Stack>

        {onSubmit ? (
          <form onSubmit={onSubmit} className={formClassName}>
            {formBody}
          </form>
        ) : (
          <div className={formClassName}>{formBody}</div>
        )}
      </Stack>
    </PageContainer>
  )
}
