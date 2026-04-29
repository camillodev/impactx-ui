import * as React from "react"

interface DonutScoreProps {
  /** 0–100 */
  value: number
  /** Diâmetro do SVG em px (default 120) */
  size?: number
  /** Espessura do arco (default 12) */
  strokeWidth?: number
  /** Quando true, arco usa cor warning (laranja) em vez de primary (azul) */
  warning?: boolean
  /** Texto secundário abaixo do valor. Default: "Acertos da sua Escola". Passe "" para esconder. */
  label?: string
  className?: string
}

/**
 * Donut chart SVG para exibir % de acertos.
 * Cor de preenchimento via var(--color-primary), trilho via var(--color-border).
 */
export function DonutScore({
  value,
  size = 120,
  strokeWidth = 7,
  warning = false,
  label = "Acertos da sua Escola",
  className,
}: DonutScoreProps) {
  // Esconde label quando o donut é pequeno (não cabe)
  const showLabel = label !== "" && size >= 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const filled = (value / 100) * circumference
  const gap = circumference - filled

  const cx = size / 2
  const cy = size / 2

  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative", flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        {/* Trilho */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--color-border-muted)"
          strokeWidth={strokeWidth}
        />
        {/* Arco preenchido */}
        {value > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={warning ? "var(--color-warning)" : "var(--color-primary)"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
            strokeDashoffset={0}
          />
        )}
      </svg>

      {/* Texto central — fora do SVG para usar font-family correta */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        <span
          style={{
            fontSize: size * 0.22,
            fontWeight: 700,
            color: "var(--color-text)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {value}%
        </span>
        {showLabel && (
          <span
            style={{
              fontSize: size * 0.09,
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-sans)",
              marginTop: 2,
              maxWidth: size * 0.6,
              lineHeight: 1.15,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
