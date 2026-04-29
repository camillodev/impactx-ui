import * as React from "react"
import { type LucideIcon } from "lucide-react"

export interface CategoryCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  /** Marca o card como selecionado/ativo */
  active?: boolean
  onClick?: () => void
}

/**
 * CategoryCard — card azul gradient com ícone, título e subtítulo.
 * Reutilizável em Catálogo de Avaliações, Hub de Avaliações etc.
 * Usa exclusivamente CSS tokens — troca de tema automática.
 */
export function CategoryCard({
  icon: Icon,
  title,
  subtitle,
  active = false,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col justify-between w-full aspect-square p-6 rounded-[var(--radius-md)] cursor-pointer transition-all duration-150"
      style={{
        background:
          "linear-gradient(160deg, var(--color-hero-from) 0%, var(--color-hero-to) 100%)",
        color: "var(--color-primary-fg)",
        outline: active
          ? "3px solid var(--color-primary-fg)"
          : "3px solid transparent",
        outlineOffset: "-3px",
        boxShadow: active
          ? "0 0 0 2px var(--color-primary)"
          : "var(--shadow-md)",
      }}
    >
      {/* Ícone — topo-esquerdo */}
      <div className="flex items-start">
        <Icon
          size={40}
          strokeWidth={1.25}
          style={{ color: "var(--color-primary-fg)", opacity: 1 }}
        />
      </div>

      {/* Textos — bottom */}
      <div className="flex flex-col gap-1 text-left">
        <span
          className="text-base font-semibold leading-snug"
          style={{ color: "var(--color-primary-fg)" }}
        >
          {title}
        </span>
        <span
          className="text-sm leading-snug"
          style={{ color: "var(--color-primary-fg)", opacity: 0.7 }}
        >
          {subtitle}
        </span>
      </div>
    </button>
  )
}
