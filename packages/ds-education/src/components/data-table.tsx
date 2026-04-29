"use client"

import * as React from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "../utils"

export type SortDirection = "asc" | "desc" | null

export interface Column<T> {
  key: string
  header: React.ReactNode
  cell: (row: T, rowIndex: number) => React.ReactNode
  align?: "left" | "right" | "center"
  width?: string
  sortable?: boolean
  sortAccessor?: (row: T) => string | number
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  defaultSort?: { key: string; direction: "asc" | "desc" }
  onRowClick?: (row: T, rowIndex: number) => void
  emptyState?: React.ReactNode
  className?: string
  loading?: boolean
  loadingRows?: number
  density?: "comfortable" | "compact"
}

type SortState = { key: string; direction: "asc" | "desc" } | null

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const

export function DataTable<T>({
  columns,
  data,
  defaultSort,
  onRowClick,
  emptyState,
  className,
  loading = false,
  loadingRows = 5,
  density = "comfortable",
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(defaultSort ?? null)

  const sortedData = React.useMemo(() => {
    if (!sort) return data
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortAccessor) return data
    const accessor = col.sortAccessor
    const dir = sort.direction === "asc" ? 1 : -1
    return [...data].sort((a, b) => {
      const va = accessor(a)
      const vb = accessor(b)
      if (va < vb) return -1 * dir
      if (va > vb) return 1 * dir
      return 0
    })
  }, [data, sort, columns])

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, direction: "asc" }
      if (prev.direction === "asc") return { key: col.key, direction: "desc" }
      return null
    })
  }

  const cellPadding = density === "compact" ? "px-4 py-2" : "px-4 py-3"

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]",
        className
      )}
    >
      <table className="w-full text-sm">
        <thead className="bg-[var(--color-surface)] text-[var(--color-text-muted)]">
          <tr>
            {columns.map((col) => {
              const isSorted = sort?.key === col.key
              const dir = isSorted ? sort?.direction : null
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(
                    "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider",
                    alignClass[col.align ?? "left"],
                    col.sortable &&
                      "cursor-pointer select-none hover:bg-[var(--color-surface-muted)]"
                  )}
                  onClick={col.sortable ? () => handleSort(col) : undefined}
                  aria-sort={
                    isSorted
                      ? dir === "asc"
                        ? "ascending"
                        : "descending"
                      : col.sortable
                        ? "none"
                        : undefined
                  }
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5",
                      col.align === "right" && "flex-row-reverse"
                    )}
                  >
                    {col.header}
                    {col.sortable && (
                      <span className="inline-flex items-center [&_svg]:size-3.5">
                        {dir === "asc" ? (
                          <ChevronUp />
                        ) : dir === "desc" ? (
                          <ChevronDown />
                        ) : (
                          <ChevronsUpDown className="opacity-60" />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading && data.length === 0 ? (
            Array.from({ length: loadingRows }).map((_, i) => (
              <tr
                key={`skeleton-${i}`}
                className="border-t border-[var(--color-border-muted)]"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cellPadding}>
                    <div className="h-4 bg-[var(--color-surface-muted)] rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr className="border-t border-[var(--color-border-muted)]">
              <td
                colSpan={columns.length}
                className="p-12 text-center text-[var(--color-text-muted)]"
              >
                {emptyState ?? "No data"}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={
                  onRowClick ? () => onRowClick(row, rowIndex) : undefined
                }
                className={cn(
                  "border-t border-[var(--color-border-muted)] hover:bg-[var(--color-surface)]",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      cellPadding,
                      "text-[var(--color-text)]",
                      alignClass[col.align ?? "left"]
                    )}
                  >
                    {col.cell(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
