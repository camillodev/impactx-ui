"use client"

import { toast, Toaster } from "@camillodev/ui"
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react"

const toastTypes = [
  {
    label: "Success",
    color: "var(--color-toast-success)",
    icon: <CheckCircle size={16} />,
    action: () => toast.success("Salvo com sucesso"),
  },
  {
    label: "Info",
    color: "var(--color-primary)",
    icon: <Info size={16} />,
    action: () => toast.info("Aviso importante"),
  },
  {
    label: "Warning",
    color: "var(--color-toast-warning)",
    icon: <AlertTriangle size={16} />,
    action: () => toast.warning("Atenção necessária"),
  },
  {
    label: "Danger",
    color: "var(--color-danger)",
    icon: <XCircle size={16} />,
    action: () => toast.error("Erro ao salvar"),
  },
] as const

export default function ToastPage() {
  return (
    <>
      {/*
        Em produção, <Toaster /> fica no app/layout.tsx.
        Aqui está local só para o showcase funcionar isolado.
      */}
      <Toaster />

      <main className="min-h-screen bg-[var(--color-surface)] p-10">
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">Toast</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-10">
          Auto-dismiss em 4s. Clique nos botões para disparar cada tipo.
        </p>

        <section>
          <h2 className="text-xs font-medium text-[var(--color-text-subtle)] uppercase tracking-wide mb-6">
            Tipos
          </h2>
          <div className="flex flex-wrap gap-4">
            {toastTypes.map(({ label, color, icon, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)] shadow-sm hover:bg-[var(--color-surface)] transition-colors"
                style={{ borderLeftColor: color, borderLeftWidth: 4 }}
              >
                <span style={{ color }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-medium text-[var(--color-text-subtle)] uppercase tracking-wide mb-4">
            Com descrição
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                toast.success("Projeto publicado", {
                  description: "Disponível em produção a partir de agora.",
                })
              }
              className="rounded-lg border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            >
              Success + descrição
            </button>
            <button
              onClick={() =>
                toast.error("Falha na conexão", {
                  description: "Verifique sua rede e tente novamente.",
                })
              }
              className="rounded-lg border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            >
              Danger + descrição
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
