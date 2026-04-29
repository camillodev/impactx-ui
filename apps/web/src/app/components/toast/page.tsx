"use client"

import { toast, Toaster } from "@impactx/ds-education"
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react"

const toastTypes = [
  {
    label: "Success",
    color: "#00b54a",
    icon: <CheckCircle size={16} />,
    action: () => toast.success("Salvo com sucesso"),
  },
  {
    label: "Info",
    color: "#0467db",
    icon: <Info size={16} />,
    action: () => toast.info("Aviso importante"),
  },
  {
    label: "Warning",
    color: "#f5a623",
    icon: <AlertTriangle size={16} />,
    action: () => toast.warning("Atenção necessária"),
  },
  {
    label: "Danger",
    color: "#eb0000",
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

      <main className="min-h-screen bg-[#f7f7f7] p-10">
        <h1 className="text-2xl font-semibold text-[#1e2124] mb-2">Toast</h1>
        <p className="text-sm text-[#6b7280] mb-10">
          Auto-dismiss em 4s. Clique nos botões para disparar cada tipo.
        </p>

        <section>
          <h2 className="text-xs font-medium text-[#999ea3] uppercase tracking-wide mb-6">
            Tipos
          </h2>
          <div className="flex flex-wrap gap-4">
            {toastTypes.map(({ label, color, icon, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-[#1e2124] shadow-sm hover:bg-[#f7f7f7] transition-colors"
                style={{ borderLeftColor: color, borderLeftWidth: 4 }}
              >
                <span style={{ color }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-medium text-[#999ea3] uppercase tracking-wide mb-4">
            Com descrição
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                toast.success("Projeto publicado", {
                  description: "Disponível em produção a partir de agora.",
                })
              }
              className="rounded-lg border border-[#c9cccf] bg-white px-5 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors"
            >
              Success + descrição
            </button>
            <button
              onClick={() =>
                toast.error("Falha na conexão", {
                  description: "Verifique sua rede e tente novamente.",
                })
              }
              className="rounded-lg border border-[#c9cccf] bg-white px-5 py-3 text-sm font-medium text-[#1e2124] hover:bg-[#f7f7f7] transition-colors"
            >
              Danger + descrição
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
