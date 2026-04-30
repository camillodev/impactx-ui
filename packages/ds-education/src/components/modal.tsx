"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "../utils"

// ─── Root ───────────────────────────────────────────────────────────────────

type ModalRoot = typeof Dialog.Root & {
  Trigger: typeof Dialog.Trigger
  Content: typeof ModalContent
  Header: typeof ModalHeader
  Title: typeof ModalTitle
  Close: typeof ModalClose
  Body: typeof ModalBody
  Footer: typeof ModalFooter
  Cancel: typeof ModalCancel
  Action: typeof ModalAction
  Description: typeof ModalDescription
  Banner: typeof ModalBanner
  Carousel: typeof ModalCarousel
  CarouselSlide: typeof ModalCarouselSlide
  CarouselDots: typeof ModalCarouselDots
  CarouselNav: typeof ModalCarouselNav
  Split: typeof ModalSplit
  SplitBody: typeof ModalSplitBody
  SplitMain: typeof ModalSplitMain
  SplitAside: typeof ModalSplitAside
  SplitTitle: typeof ModalSplitTitle
  SplitFooter: typeof ModalSplitFooter
  InfoList: typeof ModalInfoList
  InfoItem: typeof ModalInfoItem
}

const Modal = Dialog.Root as ModalRoot

// ─── Trigger ────────────────────────────────────────────────────────────────

const ModalTrigger = Dialog.Trigger
ModalTrigger.displayName = "Modal.Trigger"

// ─── Overlay ────────────────────────────────────────────────────────────────

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = "Modal.Overlay"

// ─── Content ────────────────────────────────────────────────────────────────

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  /** "default" = 480px | "welcome" = 70vw banner+content+CTAs | "carousel" = 70vw onboarding */
  size?: "default" | "welcome" | "carousel"
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps
>(({ className, size = "default", children, ...props }, ref) => (
  <Dialog.Portal>
    <ModalOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        // posição — fixed na viewport, centralizado, com margem mínima pra não colar nas bordas
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // visual
        "bg-[var(--color-bg)] text-[var(--color-text)] rounded-2xl",
        "shadow-[0_20px_50px_rgba(0,0,0,0.18)]",
        "flex flex-col overflow-hidden",
        // viewport safety — nunca extrapola tela; conteúdo interno scrolla
        "w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
        // animação
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        // tamanho
        size === "welcome" || size === "carousel"
          ? "sm:w-[70vw] sm:max-w-[960px] sm:max-h-[85vh]"
          : "sm:max-w-[480px]",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
))
ModalContent.displayName = "Modal.Content"

// ─── Header ─────────────────────────────────────────────────────────────────

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start justify-between gap-4 px-10 pt-10 pb-4 max-md:px-6 max-md:pt-6",
      className
    )}
    {...props}
  />
))
ModalHeader.displayName = "Modal.Header"

// ─── Title ──────────────────────────────────────────────────────────────────

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-xl font-bold text-[var(--color-secondary-fg)] leading-snug",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = "Modal.Title"

// ─── Close (X button) ───────────────────────────────────────────────────────

const ModalClose = React.forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ className, ...props }, ref) => (
  <Dialog.Close
    ref={ref}
    className={cn(
      "ml-auto flex items-center justify-center w-10 h-10 rounded-full shrink-0",
      "text-[var(--color-primary)] hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-active)]",
      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
      "[&_svg]:stroke-[2.5]",
      className
    )}
    {...props}
  >
    <X size={22} />
    <span className="sr-only">Fechar</span>
  </Dialog.Close>
))
ModalClose.displayName = "Modal.Close"

// ─── Body ────────────────────────────────────────────────────────────────────

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 min-h-0 overflow-y-auto px-10 pb-8 pt-2 text-base leading-relaxed text-[var(--color-text-muted-strong)] max-md:px-6",
      className
    )}
    {...props}
  />
))
ModalBody.displayName = "Modal.Body"

// ─── Footer ──────────────────────────────────────────────────────────────────

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-t border-[var(--color-border)] px-10 py-5 flex items-center justify-end gap-3 max-md:px-6",
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = "Modal.Footer"

// ─── Cancel (alias semântico) ─────────────────────────────────────────────

type ModalCancelProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ModalCancel = React.forwardRef<HTMLButtonElement, ModalCancelProps>(
  ({ className, children = "Cancelar", ...props }, ref) => (
    <Dialog.Close asChild>
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center h-9 px-3.5 rounded-lg",
          "text-sm font-semibold text-[var(--color-secondary-fg)]",
          "bg-white border border-[var(--color-secondary-bd)]",
          "hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-bd)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Dialog.Close>
  )
)
ModalCancel.displayName = "Modal.Cancel"

// ─── Action ──────────────────────────────────────────────────────────────────

export interface ModalActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" (azul, default) | "danger" (vermelho) */
  variant?: "primary" | "danger"
}

const ModalAction = React.forwardRef<HTMLButtonElement, ModalActionProps>(
  ({ className, variant = "primary", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center h-9 px-3.5 rounded-lg",
        "text-sm font-semibold text-white",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transition-colors focus-visible:outline-none focus-visible:ring-2",
        variant === "danger"
          ? "bg-[var(--color-danger-primary)] hover:bg-[var(--color-danger-primary-hover)] active:bg-[var(--color-danger-primary-active)] focus-visible:ring-[var(--color-danger-primary)]"
          : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] focus-visible:ring-[var(--color-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
ModalAction.displayName = "Modal.Action"

// ─── Description (acessibilidade) ───────────────────────────────────────────

const ModalDescription = Dialog.Description
ModalDescription.displayName = "Modal.Description"

// ─── Split (canonical layout — todos os outros variants herdam) ─────────────
//
// Layout base do "Modal Importante" SAS:
// - Body: flex gap-10 px-10 pt-10 pb-8 (aside opcional)
// - Footer: border-t px-10 py-5
// - Light/dark vem dos tokens globais (`[data-mode=dark]` no <html>)
// - Bg/text/border = tokens semânticos — nada hardcoded.

const ModalSplit = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col flex-1 min-h-0",
      "bg-[var(--color-bg)] text-[var(--color-text)]",
      className
    )}
    {...props}
  />
))
ModalSplit.displayName = "Modal.Split"

const ModalSplitBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-10 px-10 pt-10 pb-8 flex-1 min-h-0 overflow-y-auto",
      "max-md:flex-col max-md:gap-6 max-md:px-6 max-md:pt-6",
      className
    )}
    {...props}
  />
))
ModalSplitBody.displayName = "Modal.SplitBody"

const ModalSplitMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 min-w-0 flex flex-col gap-5", className)} {...props} />
))
ModalSplitMain.displayName = "Modal.SplitMain"

const ModalSplitAside = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "shrink-0 w-[320px] max-md:w-full",
      "rounded-2xl p-6",
      "bg-[var(--color-surface)] border border-[var(--color-border-muted)]",
      className
    )}
    {...props}
  />
))
ModalSplitAside.displayName = "Modal.SplitAside"

const ModalSplitTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { hero?: React.ReactNode }
>(({ className, hero, children, ...props }, ref) => (
  <div className="flex items-center gap-4">
    {hero && <div className="shrink-0">{hero}</div>}
    <h2
      ref={ref}
      className={cn(
        "text-[34px] font-bold leading-tight tracking-tight text-[var(--color-text)]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  </div>
))
ModalSplitTitle.displayName = "Modal.SplitTitle"

const ModalSplitFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-3 px-10 py-5",
      "border-t border-[var(--color-border)]",
      "max-md:px-6",
      className
    )}
    {...props}
  />
))
ModalSplitFooter.displayName = "Modal.SplitFooter"

// ─── InfoList (lista key-value usada dentro de Modal.SplitAside) ────────────

const ModalInfoList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col gap-5", className)} {...props} />
))
ModalInfoList.displayName = "Modal.InfoList"

export interface ModalInfoItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "value"> {
  icon?: React.ReactNode
  label: React.ReactNode
  value: React.ReactNode
  /** Highlight cor — útil pra "Restam 2h 30min" laranja */
  emphasis?: "default" | "warning" | "danger" | "success"
}

const ModalInfoItem = React.forwardRef<HTMLLIElement, ModalInfoItemProps>(
  ({ className, icon, label, value, emphasis = "default", ...props }, ref) => {
    const valueColor =
      emphasis === "warning"
        ? "text-[var(--color-toast-warning)]"
        : emphasis === "danger"
        ? "text-[var(--color-danger-primary)]"
        : emphasis === "success"
        ? "text-[var(--color-toast-success)]"
        : "text-[var(--color-text)]"
    return (
      <li ref={ref} className={cn("flex items-start gap-3", className)} {...props}>
        {icon && (
          <span className="shrink-0 mt-0.5 text-[var(--color-text-muted)] [&>svg]:w-5 [&>svg]:h-5">
            {icon}
          </span>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
          <span className={cn("text-base font-semibold leading-snug", valueColor)}>
            {value}
          </span>
        </div>
      </li>
    )
  }
)
ModalInfoItem.displayName = "Modal.InfoItem"

// ─── Banner (welcome modal hero) ────────────────────────────────────────────

export interface ModalBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Imagem de fundo opcional (URL) */
  image?: string
  /** Cor de fundo se não houver imagem (default: gradient brand) */
  bg?: string
  /** Altura em px (default 200) */
  height?: number
}

const ModalBanner = React.forwardRef<HTMLDivElement, ModalBannerProps>(
  ({ className, image, bg, height = 200, children, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full flex items-end justify-start p-7 overflow-hidden",
        "text-white",
        className
      )}
      style={{
        height,
        background:
          image
            ? `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%), url(${image}) center/cover no-repeat`
            : bg ?? "linear-gradient(135deg, var(--color-hero-from), var(--color-hero-to))",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
)
ModalBanner.displayName = "Modal.Banner"

// ─── Carousel ───────────────────────────────────────────────────────────────

interface CarouselContextValue {
  current: number
  total: number
  next: () => void
  prev: () => void
  goTo: (i: number) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error("Modal.CarouselSlide / Modal.CarouselDots devem estar dentro de Modal.Carousel")
  return ctx
}

export interface ModalCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Index inicial (default 0) */
  defaultIndex?: number
  /** Callback quando index muda */
  onIndexChange?: (i: number) => void
}

const ModalCarousel = React.forwardRef<HTMLDivElement, ModalCarouselProps>(
  ({ className, defaultIndex = 0, onIndexChange, children, ...props }, ref) => {
    const slides = React.Children.toArray(children).filter(
      (c) => React.isValidElement(c) && (c.type as { displayName?: string }).displayName === "Modal.CarouselSlide"
    )
    const others = React.Children.toArray(children).filter(
      (c) => !(React.isValidElement(c) && (c.type as { displayName?: string }).displayName === "Modal.CarouselSlide")
    )
    const [current, setCurrent] = React.useState(defaultIndex)
    const total = slides.length

    const next = React.useCallback(() => {
      setCurrent((c) => {
        const n = Math.min(c + 1, total - 1)
        onIndexChange?.(n)
        return n
      })
    }, [total, onIndexChange])

    const prev = React.useCallback(() => {
      setCurrent((c) => {
        const n = Math.max(c - 1, 0)
        onIndexChange?.(n)
        return n
      })
    }, [onIndexChange])

    const goTo = React.useCallback(
      (i: number) => {
        setCurrent(Math.min(Math.max(i, 0), total - 1))
        onIndexChange?.(i)
      },
      [total, onIndexChange]
    )

    return (
      <CarouselContext.Provider value={{ current, total, next, prev, goTo }}>
        <div ref={ref} className={cn("flex flex-col flex-1 min-h-0", className)} {...props}>
          <div className="flex-1 min-h-0 overflow-hidden">{slides[current]}</div>
          {others}
        </div>
      </CarouselContext.Provider>
    )
  }
)
ModalCarousel.displayName = "Modal.Carousel"

const ModalCarouselSlide = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col h-full", className)} {...props} />
))
ModalCarouselSlide.displayName = "Modal.CarouselSlide"

const ModalCarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { current, total, goTo } = useCarousel()
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2 py-4", className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Ir para slide ${i + 1}`}
          className={cn(
            "transition-all rounded-full",
            i === current
              ? "w-6 h-2 bg-[var(--color-primary)]"
              : "w-2 h-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]"
          )}
        />
      ))}
    </div>
  )
})
ModalCarouselDots.displayName = "Modal.CarouselDots"

const ModalCarouselNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    finishLabel?: string
    onFinish?: () => void
    backLabel?: string
    nextLabel?: string
  }
>(({ className, finishLabel = "Começar", onFinish, backLabel = "Voltar", nextLabel = "Próximo", ...props }, ref) => {
  const { current, total, next, prev } = useCarousel()
  const isLast = current === total - 1
  const isFirst = current === 0
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between border-t border-[var(--color-border)] px-7 py-5 gap-3",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={prev}
        disabled={isFirst}
        className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        {backLabel}
      </button>
      <ModalCarouselDots className="py-0" />
      {isLast ? (
        <Dialog.Close asChild>
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center justify-center h-9 px-5 rounded-lg text-sm font-semibold text-[var(--color-primary-fg)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] transition-colors"
          >
            {finishLabel}
          </button>
        </Dialog.Close>
      ) : (
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center justify-center h-9 px-5 rounded-lg text-sm font-semibold text-[var(--color-primary-fg)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] transition-colors"
        >
          {nextLabel}
        </button>
      )}
    </div>
  )
})
ModalCarouselNav.displayName = "Modal.CarouselNav"

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalCancel,
  ModalAction,
  ModalDescription,
  ModalBanner,
  ModalCarousel,
  ModalCarouselSlide,
  ModalCarouselDots,
  ModalCarouselNav,
  ModalSplit,
  ModalSplitBody,
  ModalSplitMain,
  ModalSplitAside,
  ModalSplitTitle,
  ModalSplitFooter,
  ModalInfoList,
  ModalInfoItem,
}

// Namespace API: <Modal.Content />, <Modal.Header />, etc.
Modal.Trigger  = ModalTrigger
Modal.Content  = ModalContent
Modal.Header   = ModalHeader
Modal.Title    = ModalTitle
Modal.Close    = ModalClose
Modal.Body     = ModalBody
Modal.Footer   = ModalFooter
Modal.Cancel   = ModalCancel
Modal.Action   = ModalAction
Modal.Description = ModalDescription
Modal.Banner   = ModalBanner
Modal.Carousel = ModalCarousel
Modal.CarouselSlide = ModalCarouselSlide
Modal.CarouselDots  = ModalCarouselDots
Modal.CarouselNav   = ModalCarouselNav
Modal.Split       = ModalSplit
Modal.SplitBody   = ModalSplitBody
Modal.SplitMain   = ModalSplitMain
Modal.SplitAside  = ModalSplitAside
Modal.SplitTitle  = ModalSplitTitle
Modal.SplitFooter = ModalSplitFooter
Modal.InfoList    = ModalInfoList
Modal.InfoItem    = ModalInfoItem
