import * as React from "react"
import { cn } from "../utils"
import { Badge } from "./badge"

type Base = {
  htmlFor: string
  hint?: string
  children: React.ReactNode
  className?: string
}

type Required = Base & { required: true; tag?: never }
type Tagged = Base & { required?: false; tag: string }
type Plain = Base & { required?: false; tag?: never }

export type FieldLabelProps = Required | Tagged | Plain

export function FieldLabel(props: FieldLabelProps) {
  const { htmlFor, hint, children, className } = props
  const required = "required" in props && props.required === true
  const tag = "tag" in props ? props.tag : undefined

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-2">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {children}
          {required && (
            <>
              <span
                aria-hidden="true"
                className="ml-0.5 text-[var(--color-danger)]"
              >
                *
              </span>
              <span className="sr-only">{" obrigatório"}</span>
            </>
          )}
        </label>
        {tag && (
          // TODO: switch to variant="neutral" after status-badge merge (info/neutral variants added)
          <Badge variant="ink" size="sm">
            {tag}
          </Badge>
        )}
      </div>
      {hint && (
        <p
          id={`${htmlFor}-hint`}
          className="text-xs text-[var(--color-text-muted)]"
        >
          {hint}
        </p>
      )}
    </div>
  )
}
