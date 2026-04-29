import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"
import { Button } from "./button"

const bannerVariants = cva(
  "flex flex-col md:flex-row items-center text-center md:text-left gap-6 px-6 py-6 lg:px-8 lg:py-8 rounded-xl shadow-[var(--shadow-md)]",
  {
    variants: {
      variant: {
        soft: "bg-[var(--color-primary-soft)] text-[var(--color-text)]",
        gradient:
          "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-hover))] text-[var(--color-primary-fg)]",
        filled: "bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
      },
    },
    defaultVariants: {
      variant: "soft",
    },
  }
)

type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>

export interface BannerCTAProps {
  title: string
  description?: string
  actionLabel: string
  onAction?: () => void
  variant?: BannerVariant
  illustration?: React.ReactNode
  illustrationPosition?: "left" | "right"
  className?: string
}

export const BannerCTA = React.forwardRef<HTMLDivElement, BannerCTAProps>(
  (
    {
      title,
      description,
      actionLabel,
      onAction,
      variant = "soft",
      illustration,
      illustrationPosition = "right",
      className,
    },
    ref
  ) => {
    const buttonVariant = variant === "soft" ? "primary" : "secondary"
    const descriptionClass =
      variant === "soft"
        ? "text-[var(--color-text-muted)]"
        : "opacity-90"

    const illo = illustration ? (
      <div className="shrink-0 max-w-[160px] w-full md:w-auto flex items-center justify-center">
        {illustration}
      </div>
    ) : null

    const orderClass =
      illustrationPosition === "left" ? "md:order-first" : "md:order-last"

    return (
      <div ref={ref} className={cn(bannerVariants({ variant }), className)}>
        {illo && <div className={cn(orderClass)}>{illo}</div>}
        <div className="flex-1 flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          {description && (
            <p className={cn("text-sm", descriptionClass)}>{description}</p>
          )}
          <Button variant={buttonVariant} onClick={onAction} className="mt-1">
            {actionLabel}
          </Button>
        </div>
      </div>
    )
  }
)
BannerCTA.displayName = "BannerCTA"
