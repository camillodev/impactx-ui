import * as React from "react"
import { cn } from "../utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  containerClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      helperText,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId()
    const textareaId = id ?? `ix-textarea-${reactId}`
    const describedById = error
      ? `${textareaId}-error`
      : helperText
      ? `${textareaId}-helper`
      : undefined

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedById}
          className={cn(
            "w-full min-h-[80px] resize-y rounded-md border-2 px-3.5 py-2.5 font-sans text-sm bg-[var(--color-bg)] transition-all duration-150",
            "border-[var(--color-border-input)]",
            "text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]",
            "hover:border-[var(--color-text-subtle)]",
            "outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-ring)] focus:hover:border-[var(--color-primary)]",
            error &&
              "border-[var(--color-danger-primary)] focus:border-[var(--color-danger-primary)] focus:ring-[var(--color-danger-primary)]/25",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error ? (
          <span
            id={`${textareaId}-error`}
            className="text-xs text-[var(--color-danger-primary)]"
          >
            {error}
          </span>
        ) : helperText ? (
          <span
            id={`${textareaId}-helper`}
            className="text-xs text-[var(--color-primary)]"
          >
            {helperText}
          </span>
        ) : null}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
