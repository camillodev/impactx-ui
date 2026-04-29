"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "../components/button"

export interface SubjectStatCardProps {
  subject: string
  mediaSerie: string
  mediaNacional: string
  onVerRelatorio?: () => void
}

export function SubjectStatCard({
  subject,
  mediaSerie,
  mediaNacional,
  onVerRelatorio,
}: SubjectStatCardProps) {
  return (
    <div
      className="rounded-[var(--radius-lg)] border flex flex-col gap-4 p-6"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border-muted)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Título disciplina */}
      <h2
        className="text-3xl font-extrabold"
        style={{ color: "var(--color-text)" }}
      >
        {subject}
      </h2>

      {/* Médias */}
      <div className="flex items-end gap-6">
        {/* Média da Série — maior */}
        <div className="flex flex-col gap-1">
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Média da Série
          </span>
          <span
            className="text-5xl font-bold leading-none"
            style={{ color: "var(--color-text)" }}
          >
            {mediaSerie}
          </span>
        </div>

        {/* Média Nacional — menor */}
        <div className="flex flex-col gap-1">
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Média Nacional
          </span>
          <span
            className="text-2xl font-semibold leading-none"
            style={{ color: "var(--color-text-muted)" }}
          >
            {mediaNacional}
          </span>
        </div>
      </div>

      {/* Botão */}
      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={onVerRelatorio}
      >
        Ver Relatório da Prova
        <ArrowRight size={16} />
      </Button>
    </div>
  )
}
