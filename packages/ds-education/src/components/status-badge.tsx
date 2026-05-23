import * as React from "react"
import { Badge } from "./badge"
import {
  STATUS_MAPS,
  type StatusDomain,
  type StatusTone,
} from "./status-badge-maps"

type DomainProps = {
  [D in StatusDomain]: {
    domain: D
    value: keyof (typeof STATUS_MAPS)[D]
    label?: never
    tone?: never
  }
}[StatusDomain]

type CustomProps = {
  domain?: never
  value?: never
  label: string
  tone: StatusTone
}

export type StatusBadgeProps = (DomainProps | CustomProps) & {
  icon?: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

function resolve(
  domain: StatusDomain | undefined,
  value: string | undefined,
  label: string | undefined,
  tone: StatusTone | undefined
): { label: string; tone: StatusTone; ariaLabel: string } {
  if (!domain) {
    return {
      label: label as string,
      tone: tone as StatusTone,
      ariaLabel: label as string,
    }
  }

  const domainMap = STATUS_MAPS[domain] as Record<
    string,
    { label: string; tone: StatusTone }
  >
  const entry = domainMap?.[value as string]

  if (!entry) {
    if (process.env.NODE_ENV === "development") {
      // warn instead of throw — never crash SSR/CSR over a bad enum value.
      // eslint-disable-next-line no-console
      console.warn(
        `[StatusBadge] invalid value "${value}" for domain "${domain}" — falling back to neutral`
      )
    }
    return {
      label: String(value),
      tone: "neutral",
      ariaLabel: `${String(value)} — ${domain}`,
    }
  }

  return {
    label: entry.label,
    tone: entry.tone,
    ariaLabel: `${entry.label} — ${domain}`,
  }
}

export function StatusBadge(props: StatusBadgeProps) {
  const { icon, size, className, domain, value, label, tone } = props
  const resolved = resolve(domain, value as string | undefined, label, tone)

  return (
    <Badge
      variant={resolved.tone}
      size={size}
      icon={icon}
      aria-label={resolved.ariaLabel}
      role="status"
      className={className}
    >
      {resolved.label}
    </Badge>
  )
}
