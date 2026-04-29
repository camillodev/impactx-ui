"use client"

import * as React from "react"
import { PlusCircle } from "lucide-react"
import { Badge } from "../components/badge"
import { DonutScore } from "./donut-score"
import { cn } from "../utils"

interface CampoCardProps {
  title: string
  questoes: number
  acertosEscola: number
  acertosNacional: number
  /** Quando true: donut laranja + banner lateral de fragilidade + CTA */
  isFragilidade?: boolean
  className?: string
}

/**
 * Card de Campo de Atuação — donut + badge nacional + link "Ver acertos".
 *
 * Variante fragilidade: layout 2 colunas (donut + nacional à esquerda,
 * banner alerta + CTA à direita). Donut fica laranja.
 */
export function CampoCard({
  title,
  questoes,
  acertosEscola,
  acertosNacional,
  isFragilidade = false,
  className,
}: CampoCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-[var(--color-border-muted)] shadow-[var(--shadow-sm)] p-6 flex flex-col gap-4",
        className
      )}
    >
      {/* Header: título + badge questões */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
          {title}
        </h3>
        <Badge variant="ink" className="self-start text-xs border border-[var(--color-border)]">
          {questoes} questões na prova
        </Badge>
      </div>

      {/* Corpo — layout condicional */}
      {isFragilidade ? (
        /* ---------------------------------------------------------------- */
        /* VARIANTE FRAGILIDADE: 2 colunas                                   */
        /* ---------------------------------------------------------------- */
        <div className="flex gap-6">
          {/* Coluna esquerda: donut + nacional */}
          <div className="flex items-center gap-4">
            <DonutScore
              value={acertosEscola}
              size={110}
              strokeWidth={7}
              warning={true}
            />
            <NacionalBadge value={acertosNacional} />
          </div>

          {/* Coluna direita: banner fragilidade */}
          <div className="flex-1">
            <FragilidadeBanner />
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------------------- */
        /* VARIANTE NORMAL: donut + nacional inline                          */
        /* ---------------------------------------------------------------- */
        <div className="flex items-center gap-4">
          <DonutScore value={acertosEscola} size={96} strokeWidth={7} />
          <NacionalBadge value={acertosNacional} />
        </div>
      )}

      {/* Link "Ver acertos" */}
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm hover:underline self-start mt-auto"
        style={{ color: "var(--color-primary)" }}
      >
        <PlusCircle size={16} strokeWidth={1.5} />
        Ver acertos por Prática de Linguagem
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

function NacionalBadge({ value }: { value: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[var(--radius-md)] px-3 py-2 text-center"
      style={{ backgroundColor: "var(--color-surface)", minWidth: 82 }}
    >
      <span
        className="text-xs leading-tight mb-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        Acertos Nacional
      </span>
      <span
        className="text-2xl font-bold"
        style={{ color: "var(--color-text)" }}
      >
        {value}%
      </span>
    </div>
  )
}

function FragilidadeBanner() {
  return (
    <div
      className="flex flex-col gap-3 rounded-[var(--radius-md)] p-4 h-full"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Ícone alerta — alinhado à direita no topo, sem container */}
      <div className="flex justify-end">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-warning)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <p
        className="text-sm font-semibold leading-snug"
        style={{ color: "var(--color-text)" }}
      >
        Esta é a sua principal fragilidade de conteúdo nesta avaliação.
      </p>
      <p
        className="text-sm leading-snug"
        style={{ color: "var(--color-text-muted)" }}
      >
        Melhore o desempenho dos seus alunos com um Plano de Estudos personalizado.
      </p>
      <button
        type="button"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-[var(--radius-md)] transition-colors mt-auto w-full"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-fg)",
        }}
      >
        Ir para o Plano de Estudos
      </button>
    </div>
  )
}
