import * as React from "react"
import { cn } from "../utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string
  helperText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  containerClassName?: string
}

let inputIdCounter = 0

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      helperText,
      leadingIcon,
      trailingIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId()
    const inputId = id ?? `ix-input-${reactId}`
    const describedById = error
      ? `${inputId}-error`
      : helperText
      ? `${inputId}-helper`
      : undefined

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center gap-2 h-10 px-3.5 rounded-md border bg-[var(--color-bg)] transition-colors",
            "border-[var(--color-border)]",
            "focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20",
            error &&
              "border-[var(--color-danger-primary)] focus-within:border-[var(--color-danger-primary)] focus-within:ring-[var(--color-danger-primary)]/20",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          {leadingIcon && (
            <span className="text-[var(--color-text-muted)] [&>svg]:size-4 shrink-0">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedById}
            className={cn(
              "flex-1 bg-transparent outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {trailingIcon && (
            <span className="text-[var(--color-text-muted)] [&>svg]:size-4 shrink-0">
              {trailingIcon}
            </span>
          )}
        </div>
        {error ? (
          <span
            id={`${inputId}-error`}
            className="text-xs text-[var(--color-danger-primary)]"
          >
            {error}
          </span>
        ) : helperText ? (
          <span
            id={`${inputId}-helper`}
            className="text-xs text-[var(--color-primary)]"
          >
            {helperText}
          </span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"
