"use client"

import * as React from "react"
import { CheckSquare, Target } from "lucide-react"

export interface CtaBannerProps {
  heading?: string
  description?: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export function CtaBanner({
  heading = "Melhore o desempenho de seus alunos",
  description = "Saiba as habilidades que seus alunos precisam melhorar e tenha acesso à questões inéditas para praticar e desenvolvê-las.",
  buttonLabel = "Acesse o Plano de Estudos",
  onButtonClick,
}: CtaBannerProps) {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="grid grid-cols-2 items-center">
        {/* Esquerda — texto + botão */}
        <div className="px-8 py-7 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2
              className="text-xl font-bold leading-snug"
              style={{ color: "var(--color-secondary-fg)" }}
            >
              {heading}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-secondary-fg)", opacity: 0.85 }}
            >
              {description}
            </p>
          </div>

          {/* Botão branco */}
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold transition-colors hover:opacity-90"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
              border: "1px solid var(--color-overlay-md)",
            }}
          >
            <CheckSquare size={16} style={{ color: "var(--color-text-muted)" }} />
            {buttonLabel}
          </button>
        </div>

        {/* Direita — ilustração placeholder */}
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div
            className="flex items-center justify-center w-24 h-24 rounded-full"
            style={{ backgroundColor: "var(--color-overlay-sm)" }}
          >
            <Target
              size={48}
              style={{ color: "var(--color-secondary-fg)" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
