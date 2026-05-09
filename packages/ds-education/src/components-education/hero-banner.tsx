"use client"

import * as React from "react"

export interface HeroBannerProps {
  eyebrow?: string
  title?: string
  description?: string
}

export function HeroBanner({
  eyebrow = "AVALIAÇÕES",
  title = "Avaliações SAS",
  description = "Visualize relatórios de desempenho das suas turmas e baixe cadernos de prova ou gabaritos das avaliações e simulados do SAS.",
}: HeroBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to right, var(--color-hero-from) 0%, var(--color-hero-to) 100%)",
        minHeight: "280px",
      }}
    >
      {/* Formas decorativas — curvas brancas semi-transparentes */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="1100"
          cy="60"
          rx="320"
          ry="220"
          fill="var(--color-overlay-xs)"
        />
        <ellipse
          cx="950"
          cy="240"
          rx="280"
          ry="160"
          fill="var(--color-overlay-xxs)"
        />
        <ellipse
          cx="1180"
          cy="180"
          rx="180"
          ry="120"
          fill="var(--color-overlay-xs)"
        />
      </svg>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-20 flex flex-col">
        {/* Eyebrow */}
        <span
          className="text-xs font-bold uppercase"
          style={{ color: "var(--color-warning)", letterSpacing: "0.2em" }}
        >
          {eyebrow}
        </span>

        {/* Título */}
        <h1
          className="text-5xl font-bold leading-tight mt-2 mb-3"
          style={{ color: "var(--color-text-on-primary)" }}
        >
          {title}
        </h1>

        {/* Subtítulo */}
        <p
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "var(--color-overlay-text)" }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
