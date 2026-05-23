"use client"

import * as React from "react"
import { IMaskInput } from "react-imask"
import { cn } from "../utils"

export type MaskType = "cpf" | "cnpj" | "phone" | "cep" | "currency-brl"

export interface MaskedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value" | "size"
  > {
  mask: MaskType
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRawChange?: (raw: string | number) => void
  label?: string
  error?: string
  helperText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  containerClassName?: string
}

type MaskConfig = Record<string, unknown>

const MASK_CONFIGS: Record<MaskType, MaskConfig> = {
  cpf: { mask: "000.000.000-00" },
  cnpj: { mask: "00.000.000/0000-00" },
  cep: { mask: "00000-000" },
  phone: {
    mask: [{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: (appended: string, dynamicMasked: any) => {
      const digits = (dynamicMasked.value + appended).replace(/\D/g, "")
      return dynamicMasked.compiledMasks[digits.length > 10 ? 1 : 0]
    },
  },
  "currency-brl": {
    mask: "R$ num",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ".",
        radix: ",",
        scale: 2,
        padFractionalZeros: true,
        normalizeZeros: true,
      },
    },
  },
}

export const MaskedInput = React.forwardRef<
  HTMLInputElement,
  MaskedInputProps
>(
  (
    {
      mask,
      value,
      onChange,
      onRawChange,
      className,
      containerClassName,
      label,
      error,
      helperText,
      leadingIcon,
      trailingIcon,
      id,
      disabled,
      ...rest
    },
    ref
  ) => {
    const reactId = React.useId()
    const inputId = id ?? `ix-masked-${reactId}`
    const describedById = error
      ? `${inputId}-error`
      : helperText
      ? `${inputId}-helper`
      : undefined
    const config = MASK_CONFIGS[mask]

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
            "flex items-center gap-2 h-10 px-3.5 rounded-md border-2 bg-[var(--color-bg)] transition-all duration-150",
            "border-[var(--color-border-input)]",
            "hover:border-[var(--color-text-subtle)]",
            "focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary-ring)] focus-within:hover:border-[var(--color-primary)]",
            error &&
              "border-[var(--color-danger-primary)] focus-within:border-[var(--color-danger-primary)] focus-within:ring-[var(--color-danger-primary)]/25",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          {leadingIcon && (
            <span className="text-[var(--color-text-muted)] [&>svg]:size-4 shrink-0">
              {leadingIcon}
            </span>
          )}
          <IMaskInput
            {...(config as object)}
            value={value}
            unmask={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onAccept={(_val: unknown, maskRef: any) => {
              const masked = String(maskRef?.value ?? "")
              const event = {
                target: { value: masked },
                currentTarget: { value: masked },
              } as unknown as React.ChangeEvent<HTMLInputElement>
              onChange(event)
              if (onRawChange) {
                if (mask === "currency-brl") {
                  const typed = (maskRef?.typedValue as number) ?? 0
                  onRawChange(
                    Number.isFinite(typed) ? Math.round(typed * 100) : 0
                  )
                } else {
                  onRawChange(String(maskRef?.unmaskedValue ?? ""))
                }
              }
            }}
            inputRef={(el: HTMLInputElement | null) => {
              if (typeof ref === "function") ref(el)
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = el
            }}
            id={inputId}
            disabled={disabled}
            inputMode={mask === "currency-brl" ? "decimal" : "numeric"}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedById}
            className={cn(
              "flex-1 bg-transparent outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed",
              className
            )}
            {...rest}
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

MaskedInput.displayName = "MaskedInput"
