import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../utils"

interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string
  active?: boolean
  size?: "sm" | "md"
  icon?: React.ReactNode
  onRemove?: () => void
  inSegmented?: boolean
}

const sizeStyles = {
  sm: "h-7 px-3 text-sm",
  md: "h-8 px-3.5 text-sm",
} as const

function Chip({
  label,
  active = false,
  size = "md",
  icon,
  onRemove,
  inSegmented = false,
  className,
  type = "button",
  ...props
}: ChipProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"

  const palette = active
    ? inSegmented
      ? "bg-[var(--color-primary)] text-[var(--color-primary-fg)] border border-transparent"
      : "bg-[var(--color-primary)] text-[var(--color-primary-fg)] border border-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
    : inSegmented
      ? "bg-transparent text-[var(--color-text-muted)] border border-transparent hover:text-[var(--color-text)]"
      : "bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"

  return (
    <button
      type={type}
      className={cn(base, sizeStyles[size], palette, className)}
      aria-pressed={active}
      {...props}
    >
      {icon ? (
        <span className="flex items-center [&>svg]:w-3.5 [&>svg]:h-3.5">
          {icon}
        </span>
      ) : null}
      <span>{label}</span>
      {onRemove ? (
        <span
          role="button"
          tabIndex={0}
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              e.stopPropagation()
              onRemove()
            }
          }}
          className="flex items-center justify-center -mr-1 ml-0.5 h-4 w-4 rounded-full hover:bg-black/10 cursor-pointer [&>svg]:w-3 [&>svg]:h-3"
        >
          <X />
        </span>
      ) : null}
    </button>
  )
}

interface SegmentedControlOption<T extends string = string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface SegmentedControlProps<T extends string = string> {
  value: T
  onValueChange: (value: T) => void
  options: SegmentedControlOption<T>[]
  size?: "sm" | "md"
  className?: string
}

function SegmentedControl<T extends string = string>({
  value,
  onValueChange,
  options,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1.5 p-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]",
        className
      )}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <Chip
            key={option.value}
            role="tab"
            aria-selected={active}
            label={option.label}
            icon={option.icon}
            active={active}
            size={size}
            inSegmented
            onClick={() => onValueChange(option.value)}
          />
        )
      })}
    </div>
  )
}

export { Chip, SegmentedControl }
export type { ChipProps, SegmentedControlOption, SegmentedControlProps }
