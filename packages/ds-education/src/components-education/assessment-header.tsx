"use client"

import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "../components/tabs"

export type AssessmentBreadcrumbItem = { label: string; href?: string }

export type AssessmentTab = {
  value: string
  label: string
}

export interface AssessmentHeaderProps {
  breadcrumbs: AssessmentBreadcrumbItem[]
  subtitle: string
  title: string
  icon: React.ReactNode
  tabs: AssessmentTab[]
  activeTab: string
  children?: React.ReactNode
}

/**
 * Header branco reutilizável para telas de relatório de avaliação.
 * Contém: breadcrumb + seta voltar, bloco título (ícone + nome), e tabs.
 *
 * `children` é renderizado dentro do TabsContent da aba ativa — use quando
 * o conteúdo da aba vive FORA desta área (i.e., não use children; apenas
 * passe activeTab e coloque o body cinza abaixo do header).
 *
 * Para navegação real, envolva com Router do Next.js no nível da página.
 */
export function AssessmentHeader({
  breadcrumbs,
  subtitle,
  title,
  icon,
  tabs,
  activeTab,
}: AssessmentHeaderProps) {
  return (
    <div
      className="border-b"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-5 pb-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-4">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span style={{ color: "var(--color-text-muted)" }} className="text-sm">
                  /
                </span>
              )}
              {i === 0 ? (
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm hover:underline"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <ArrowLeft size={14} />
                  {crumb.label}
                </button>
              ) : (
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Título */}
        <div className="flex items-start gap-3 mb-5">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-[var(--radius-lg)] flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {icon}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {subtitle}
            </span>
            <h1
              className="text-2xl font-bold leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Tabs — sem conteúdo aqui; body fica abaixo no layout da página */}
        <Tabs value={activeTab}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
