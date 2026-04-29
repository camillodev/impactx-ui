import * as React from "react"
import { MoreVertical, BarChart3, ChevronRight } from "lucide-react"
import { cn } from "../utils"
import { Card } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import { IconButton } from "./icon-button"

export type AssessmentStatus = "completed" | "in-progress" | "scheduled" | "draft" | "not-started"

export interface AssessmentCardProps {
  title: string
  subject: string
  grade: string
  description?: string
  status: AssessmentStatus
  actionLabel?: string
  onAction?: () => void
  onMenuClick?: () => void
  onChartClick?: () => void
  className?: string
}

const statusMap: Record<
  AssessmentStatus,
  { variant: "success" | "primary" | "warning" | "ink"; label: string }
> = {
  completed: { variant: "success", label: "Completed" },
  "in-progress": { variant: "primary", label: "In progress" },
  scheduled: { variant: "warning", label: "Scheduled" },
  draft: { variant: "ink", label: "Draft" },
  "not-started": { variant: "ink", label: "Not started" },
}

export function AssessmentCard({
  title,
  subject,
  grade,
  description,
  status,
  actionLabel = "View Results",
  onAction,
  onMenuClick,
  onChartClick,
  className,
}: AssessmentCardProps) {
  const { variant, label } = statusMap[status]

  return (
    <Card className={cn("p-5 hover:shadow-lg transition-shadow", className)}>
      <div className="flex items-start gap-2">
        <h3 className="text-base font-semibold text-[var(--color-text)] flex-1">{title}</h3>
        <IconButton
          size="sm"
          variant="ghost"
          icon={<MoreVertical />}
          aria-label="Open menu"
          onClick={onMenuClick}
        />
      </div>

      <span className="text-xs text-[var(--color-text-muted)]">
        {subject} · {grade}
      </span>

      {description && (
        <p className="text-sm text-[var(--color-text)] line-clamp-2 mt-2">{description}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Badge variant={variant} size="sm">
          {label}
        </Badge>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={onAction}>
            {actionLabel}
            <ChevronRight />
          </Button>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<BarChart3 />}
            aria-label="View chart"
            onClick={onChartClick}
          />
        </div>
      </div>
    </Card>
  )
}

export type { AssessmentStatus as Status }
