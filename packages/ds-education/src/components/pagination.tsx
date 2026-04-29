import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { IconButton } from "./icon-button"
import { cn } from "../utils"

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Número total de itens (não páginas) */
  total: number
  /** Quantidade de itens por página */
  pageSize?: number
  /** Página atual (1-indexed) */
  value: number
  onChange: (page: number) => void
  /** Quantas páginas mostrar de cada lado da atual */
  siblingCount?: number
}

const RANGE_DOTS = "..."

function buildRange(
  current: number,
  totalPages: number,
  siblingCount: number
): Array<number | typeof RANGE_DOTS> {
  const totalNumbers = siblingCount * 2 + 5
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, totalPages)
  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPages - 1

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount
    const left = Array.from({ length: leftCount }, (_, i) => i + 1)
    return [...left, RANGE_DOTS, totalPages]
  }
  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount
    const right = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + 1 + i
    )
    return [1, RANGE_DOTS, ...right]
  }
  const middle = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  )
  return [1, RANGE_DOTS, ...middle, RANGE_DOTS, totalPages]
}

export function Pagination({
  total,
  pageSize = 10,
  value,
  onChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safeValue = Math.min(Math.max(1, value), totalPages)
  const items = buildRange(safeValue, totalPages, siblingCount)

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === safeValue) return
    onChange(page)
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <IconButton
        aria-label="Página anterior"
        size="sm"
        variant="ghost"
        icon={<ChevronLeft />}
        disabled={safeValue === 1}
        onClick={() => goTo(safeValue - 1)}
      />
      {items.map((item, idx) =>
        item === RANGE_DOTS ? (
          <span
            key={`dots-${idx}`}
            className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-text-muted)]"
            aria-hidden="true"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === safeValue ? "page" : undefined}
            onClick={() => goTo(item)}
            className={cn(
              "h-8 min-w-8 px-2.5 rounded-lg text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
              item === safeValue
                ? "bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
                : "text-[var(--color-text)] hover:bg-[var(--color-surface)]"
            )}
          >
            {item}
          </button>
        )
      )}
      <IconButton
        aria-label="Próxima página"
        size="sm"
        variant="ghost"
        icon={<ChevronRight />}
        disabled={safeValue === totalPages}
        onClick={() => goTo(safeValue + 1)}
      />
    </nav>
  )
}
