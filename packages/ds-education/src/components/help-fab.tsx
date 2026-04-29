import * as React from "react"
import { HelpCircle } from "lucide-react"

export interface HelpFabProps {
  onClick?: () => void
}

export function HelpFab({ onClick }: HelpFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] shadow-[var(--shadow-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: "var(--color-text-muted-strong)",
        color: "var(--color-bg)",
        zIndex: 50,
      }}
    >
      <HelpCircle size={16} />
      <span className="text-sm font-medium">Ajuda</span>
    </button>
  )
}
