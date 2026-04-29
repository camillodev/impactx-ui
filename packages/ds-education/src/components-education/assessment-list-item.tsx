import * as React from "react"
import { Calendar } from "lucide-react"
import { Badge } from "../components/badge"
import { Button } from "../components/button"

export interface AssessmentListItemProps {
  title: string
  applicationPeriod: string
  status?: "concluded" | "in-progress" | "pending"
  onViewDetails?: () => void
  onFinalResult?: () => void
}

export function AssessmentListItem({
  title,
  applicationPeriod,
  status = "concluded",
  onViewDetails,
  onFinalResult,
}: AssessmentListItemProps) {
  return (
    <div
      className="flex items-center justify-between gap-6 px-6 py-4 rounded-[var(--radius-lg)]"
      style={{
        backgroundColor: "var(--color-bg)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Esquerda: título + datas */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span
          className="text-base font-bold leading-snug"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          <Calendar
            size={13}
            style={{ color: "var(--color-text-subtle)", flexShrink: 0 }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--color-text-subtle)" }}
          >
            {applicationPeriod}
          </span>
        </div>
      </div>

      {/* Centro-direita: badge status */}
      <div className="flex-shrink-0">
        {status === "concluded" && (
          <Badge variant="success">Concluída</Badge>
        )}
        {status === "in-progress" && (
          <Badge variant="warning">Em andamento</Badge>
        )}
        {status === "pending" && (
          <Badge variant="ink">Pendente</Badge>
        )}
      </div>

      {/* Direita: botões */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          Ver detalhes
        </Button>
        <Button variant="primary" size="sm" onClick={onFinalResult}>
          Resultado final
        </Button>
      </div>
    </div>
  )
}
