"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

export interface BigCardProps {
  title: string
  description: string
  icon: LucideIcon
  onClick?: () => void
}

export function BigCard({ title, description, icon: Icon, onClick }: BigCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: "var(--color-bg)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
        minHeight: "260px",
      }}
    >
      {/* Texto — topo */}
      <div className="p-8 flex flex-col gap-2">
        <h3
          className="text-xl font-bold leading-tight"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {description}
        </p>
      </div>

      {/* Ilustração — rodapé alinhado à direita */}
      <div className="self-end px-7 pb-7 pt-0">
        <div
          className="flex items-center justify-center w-24 h-24 rounded-2xl"
          style={{ backgroundColor: "var(--color-primary-soft)" }}
        >
          <Icon
            size={48}
            style={{ color: "var(--color-primary)" }}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </button>
  )
}
