import * as React from "react"
import { cn } from "../utils"

/**
 * Card — multi-direction container com Media/Content/Meta slots opcionais.
 *
 * Reference: Figma Alfabeto Card system (4156:291).
 * API legada (Card/CardHeader/CardTitle/CardContent) preservada — aditivo.
 *
 * Eixos de variação:
 *   direction:  "vertical" (default) | "horizontal"
 *   media:      passar <CardMedia> como filho (image, icon, or nothing)
 *   footer:     passar <CardMeta> como filho
 *   state:      hover/focus via CSS pseudo-classes;
 *               loading + disabled como props no <Card>
 *
 * Token semantics — visual muda via tokens, NÃO via override no className.
 *   --radius-card                     (default 12px)
 *   --shadow-card-default / -hover    (subtle)
 *   --color-border-card               (gray w/ presence — fallback border-input)
 *   --color-border-card-active        (primary do tema, 2px)
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction. Default "vertical". */
  direction?: "vertical" | "horizontal"
  /** Visual state. "default" | "active" (primary border) | "disabled". */
  state?: "default" | "active" | "disabled"
  /** Render skeleton placeholders instead of children. */
  loading?: boolean
  /** Make whole card clickable (renders semantic button-style focus ring). */
  interactive?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      direction = "vertical",
      state = "default",
      loading = false,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      data-state={state}
      data-loading={loading || undefined}
      data-direction={direction}
      className={cn(
        // Layout
        "flex overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]",
        direction === "vertical" ? "flex-col" : "flex-row items-stretch",
        // Surface — radius + subtle shadow + border (peso variável por state)
        "rounded-[var(--radius-card)]",
        "border-[length:var(--color-border-card-width)] border-[var(--color-border-card)]",
        "shadow-[var(--shadow-card-default)]",
        "transition-[border-color,box-shadow,transform] duration-150",
        // Active state — primary border 2px
        state === "active" &&
          "border-[length:var(--color-border-card-width-active)] border-[var(--color-border-card-active)]",
        // Disabled — esmaece tudo, sem hover
        state === "disabled" && "opacity-50 pointer-events-none",
        // Interactive — hover/focus elevation + cursor
        interactive &&
          state !== "disabled" &&
          "cursor-pointer hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-primary)] focus-visible:outline-none focus-visible:border-[length:var(--color-border-card-width-active)] focus-visible:border-[var(--color-border-card-active)]",
        // Loading — bloqueia interação
        loading && "pointer-events-none",
        className
      )}
      {...props}
    >
      {loading ? <CardSkeleton direction={direction} /> : children}
    </div>
  )
)
Card.displayName = "Card"

// ─── Media ──────────────────────────────────────────────────────────────────

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source da imagem. Se omitido, renderiza só o slot de children (ex: ícone). */
  src?: string
  /** Alt da imagem (a11y). Obrigatório quando src é passado. */
  alt?: string
  /** Aspect ratio. Default "16/9" pra vertical, "1/1" pra horizontal thumb. */
  aspectRatio?: string
  /** Variant — "image" (full bleed) | "icon" (centered, smaller) */
  variant?: "image" | "icon"
}

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      className,
      src,
      alt,
      aspectRatio,
      variant = "image",
      children,
      ...props
    },
    ref
  ) => {
    if (variant === "icon") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center shrink-0",
            "bg-[var(--color-surface-muted)] text-[var(--color-primary)]",
            "[&_svg]:size-6",
            // Vertical: card-top, full-width 64px tall. Horizontal: square 64px aside.
            "h-16 w-full group-data-[direction=horizontal]/card:h-auto group-data-[direction=horizontal]/card:w-16 group-data-[direction=horizontal]/card:self-stretch",
            className
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative shrink-0 overflow-hidden bg-[var(--color-surface-muted)]",
          // Vertical: card-top, aspect-ratio. Horizontal: square thumb aside.
          "w-full group-data-[direction=horizontal]/card:w-20 group-data-[direction=horizontal]/card:h-auto group-data-[direction=horizontal]/card:self-stretch",
          className
        )}
        style={aspectRatio ? { aspectRatio } : { aspectRatio: "16/9" }}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          children
        )}
      </div>
    )
  }
)
CardMedia.displayName = "CardMedia"

// ─── Body slots (legados — preservados) ─────────────────────────────────────

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 p-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-semibold leading-tight text-[var(--color-text)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

export const CardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-[var(--color-text-muted)] leading-snug",
      className
    )}
    {...props}
  />
))
CardSubtitle.displayName = "CardSubtitle"

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 p-4 pt-0 flex-1 min-w-0", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

// ─── Meta (footer row — avatar + date + actions) ────────────────────────────

export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar slot (render <Avatar /> or similar). */
  avatar?: React.ReactNode
  /** Texto pequeno (data, autor, status). */
  caption?: React.ReactNode
  /** Slot direito — ellipsis/actions. */
  actions?: React.ReactNode
}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>(
  ({ className, avatar, caption, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 px-4 py-3 border-t border-[var(--color-border-card)]",
        className
      )}
      {...props}
    >
      {avatar && <div className="shrink-0">{avatar}</div>}
      {caption && (
        <span className="text-xs text-[var(--color-text-muted)] flex-1 min-w-0 truncate">
          {caption}
        </span>
      )}
      {children}
      {actions && <div className="shrink-0 ml-auto">{actions}</div>}
    </div>
  )
)
CardMeta.displayName = "CardMeta"

// ─── Skeleton interno (loading state) ───────────────────────────────────────

function CardSkeleton({
  direction,
}: {
  direction: "vertical" | "horizontal"
}) {
  if (direction === "horizontal") {
    return (
      <div className="flex w-full items-center gap-3 p-4">
        <div className="size-12 shrink-0 rounded-md bg-[var(--color-surface-muted)] animate-pulse" />
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="h-3 w-1/2 rounded bg-[var(--color-surface-muted)] animate-pulse" />
          <div className="h-2.5 w-1/3 rounded bg-[var(--color-surface-muted)] animate-pulse" />
        </div>
      </div>
    )
  }
  return (
    <>
      <div
        className="w-full bg-[var(--color-surface-muted)] animate-pulse"
        style={{ aspectRatio: "16/9" }}
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-2/3 rounded bg-[var(--color-surface-muted)] animate-pulse" />
        <div className="h-2.5 w-1/3 rounded bg-[var(--color-surface-muted)] animate-pulse" />
      </div>
    </>
  )
}
