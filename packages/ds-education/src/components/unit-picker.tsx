"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../utils"
import { Button } from "./button"
import { Skeleton } from "./skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export interface Unit {
  id: string
  name: string
  role: string
  isActive?: boolean
}

export interface UnitPickerProps {
  units: Unit[]
  activeUnitId: string
  onSelect: (unitId: string) => void | Promise<void>
  isAdmin?: boolean
  loading?: boolean
  ariaLabel?: string
  className?: string
}

export function UnitPicker({
  units,
  activeUnitId,
  onSelect,
  isAdmin = false,
  loading = false,
  ariaLabel = "Selecionar unidade ativa",
  className,
}: UnitPickerProps) {
  const [query, setQuery] = React.useState("")

  if (loading) {
    return <Skeleton className={cn("h-10 w-40", className)} />
  }

  if (units.length === 0) return null
  if (units.length === 1 && !isAdmin) return null

  const filtered = isAdmin
    ? units.filter((u) =>
        u.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : units

  const activeUnit = units.find((u) => u.id === activeUnitId)
  const triggerLabel = activeUnit?.name ?? "Selecionar unidade"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          aria-label={ariaLabel}
          className={className}
        >
          {triggerLabel}
          <ChevronDown aria-hidden="true" className="ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[240px]">
        {isAdmin && (
          <div className="px-2 py-1.5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar unidade…"
              aria-label="Buscar unidade"
              className="w-full h-8 px-2 rounded-md border border-[var(--color-border-input)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onSelect={() => onSelect("all")}
            aria-current={activeUnitId === "all" ? true : undefined}
            className={cn(
              activeUnitId === "all" &&
                "bg-[var(--color-primary-soft)]"
            )}
          >
            Todas as unidades
          </DropdownMenuItem>
        )}
        {filtered.length === 0 ? (
          <div
            className="px-3 py-2 text-sm text-[var(--color-text-muted)]"
            role="status"
          >
            Nenhuma unidade encontrada
          </div>
        ) : (
          filtered.map((unit) => {
            const isActive = unit.id === activeUnitId
            return (
              <DropdownMenuItem
                key={unit.id}
                onSelect={() => onSelect(unit.id)}
                aria-current={isActive ? true : undefined}
                className={cn(
                  isActive && "bg-[var(--color-primary-soft)]"
                )}
              >
                <span className="flex-1">{unit.name}</span>
                {isActive && (
                  <Check aria-hidden="true" className="ml-2 size-4" />
                )}
              </DropdownMenuItem>
            )
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
