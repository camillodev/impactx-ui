"use client"

import * as React from "react"
import { DataTable, type Column, type DataTableProps } from "./data-table"
import { Pagination } from "./pagination"
import { cn } from "../utils"

/**
 * DataTableWithPagination — composto que junta DataTable + Pagination + state interno.
 *
 * Resolve o caso 90%: tabela paginada client-side. Bot consome com 4 props
 * (columns, data, pageSize, opcionalmente loading) e recebe tabela completa
 * com loading skeleton, empty state, paginação e contador.
 *
 * Decision tree:
 * - Tabela com paginação client-side e poucos KB de dados → DataTableWithPagination
 * - Tabela server-paginated (page como URL state, fetch on change) → DataTable + Pagination controlados
 * - Tabela sem paginação (≤ 20 rows) → DataTable só
 *
 * Anti-pattern: não recompor manualmente DataTable + Pagination quando esse
 * componente resolve. Reservar a composição manual pra casos server-paginated.
 */

export interface DataTableWithPaginationProps<T>
  extends Omit<DataTableProps<T>, "data"> {
  /** Dados completos. Pagina internamente. */
  data: T[]
  /** Itens por página. Default: 10. */
  pageSize?: number
  /** Página inicial (1-indexed). Default: 1. */
  defaultPage?: number
  /** Callback quando a página muda. */
  onPageChange?: (page: number) => void
  /** Mostrar contador "Mostrando X-Y de Z". Default: true. */
  showSummary?: boolean
  /** Label customizado pro contador. Recebe {from, to, total}. */
  summaryLabel?: (info: { from: number; to: number; total: number }) => React.ReactNode
  /** Classe do wrapper externo (table + footer). */
  containerClassName?: string
}

const defaultSummaryLabel = ({
  from,
  to,
  total,
}: {
  from: number
  to: number
  total: number
}) => (
  <>
    Mostrando <strong className="font-semibold text-[var(--color-text)]">{from}</strong>
    {" – "}
    <strong className="font-semibold text-[var(--color-text)]">{to}</strong>
    {" de "}
    <strong className="font-semibold text-[var(--color-text)]">{total}</strong>
  </>
)

export function DataTableWithPagination<T>({
  data,
  pageSize = 10,
  defaultPage = 1,
  onPageChange,
  showSummary = true,
  summaryLabel = defaultSummaryLabel,
  containerClassName,
  className,
  ...tableProps
}: DataTableWithPaginationProps<T>) {
  const [page, setPage] = React.useState(defaultPage)

  // Reset to page 1 when data shrinks below current page (e.g., after filter)
  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
    if (page > totalPages) {
      setPage(1)
      onPageChange?.(1)
    }
  }, [data.length, pageSize, page, onPageChange])

  const handlePageChange = (next: number) => {
    setPage(next)
    onPageChange?.(next)
  }

  const total = data.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const pagedData = data.slice(start, end)

  return (
    <div className={cn("flex flex-col gap-3", containerClassName)}>
      <DataTable {...tableProps} data={pagedData} className={className} />

      {total > pageSize && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {showSummary ? (
            <p className="text-sm text-[var(--color-text-muted)]">
              {summaryLabel({ from: start + 1, to: end, total })}
            </p>
          ) : (
            <span />
          )}
          <Pagination
            total={total}
            pageSize={pageSize}
            value={safePage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export type { Column }
