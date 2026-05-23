export const STATUS_MAPS = {
  enrollment: {
    ACTIVE:    { label: "Ativa",     tone: "success" },
    PENDING:   { label: "Pendente",  tone: "warning" },
    CANCELLED: { label: "Cancelada", tone: "neutral" },
    COMPLETED: { label: "Concluída", tone: "info" },
  },
  invoice: {
    DRAFT:     { label: "Rascunho",  tone: "neutral" },
    INVOICED:  { label: "Em aberto", tone: "info" },
    PAID:      { label: "Pago",      tone: "success" },
    OVERDUE:   { label: "Vencido",   tone: "danger" },
    CANCELLED: { label: "Cancelado", tone: "neutral" },
  },
  role: {
    ORIENTADORA:    { label: "Orientadora",   tone: "info" },
    COORDENADORA:   { label: "Coordenadora",  tone: "info" },
    ATENDENTE:      { label: "Atendente",     tone: "neutral" },
    ADMIN_PLATFORM: { label: "Admin IX",      tone: "warning" },
  },
} as const

export type StatusDomain = keyof typeof STATUS_MAPS
export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info"
