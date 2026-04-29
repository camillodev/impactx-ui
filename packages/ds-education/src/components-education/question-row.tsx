import * as React from "react"
import { AlertTriangle, ArrowRight } from "lucide-react"

export interface QuestionRowProps {
  numero: string
  campoAtuacao: string
  acertosEscola: string
  acertosNacional: string
  isFragilidade?: boolean
  isEven?: boolean
}

export function QuestionRow({
  numero,
  campoAtuacao,
  acertosEscola,
  acertosNacional,
  isFragilidade = false,
}: QuestionRowProps) {
  return (
    <tr
      style={{
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Questão */}
      <td
        className="py-5 px-5 text-sm font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        {numero}
      </td>

      {/* Campo de atuação */}
      <td className="py-5 px-5">
        <div className="flex items-center gap-2">
          {isFragilidade && (
            <AlertTriangle
              size={16}
              style={{ color: "var(--color-warning)", flexShrink: 0 }}
            />
          )}
          <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {campoAtuacao}
          </span>
        </div>
      </td>

      {/* Acertos Escola */}
      <td
        className="py-5 px-5 text-sm font-bold"
        style={{ color: "var(--color-text)" }}
      >
        {acertosEscola}
      </td>

      {/* Acertos Nacional */}
      <td
        className="py-5 px-5 text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        {acertosNacional}
      </td>

      {/* Seta */}
      <td className="py-5 px-5 text-right">
        <ArrowRight size={16} style={{ color: "var(--color-text-subtle)" }} />
      </td>
    </tr>
  )
}
