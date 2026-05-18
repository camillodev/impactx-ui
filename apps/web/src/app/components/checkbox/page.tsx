"use client"

import { useState } from "react"
import { Checkbox } from "@impactxlabs/ui"

type CheckedState = boolean | "indeterminate"

export default function CheckboxPlayground() {
  const [checked, setChecked] = useState<CheckedState>(true)
  const [indeterminate, setIndeterminate] = useState<CheckedState>("indeterminate")

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Checkbox
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 32 }}>
        Componente de seleção binária com estados: default, checked, disabled e
        indeterminate.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {/* Default */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Default
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox id="default" />
            <label
              htmlFor="default"
              style={{
                fontSize: 14,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Opção padrão
            </label>
          </div>
        </div>

        {/* Checked */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Checked
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox
              id="checked"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <label
              htmlFor="checked"
              style={{
                fontSize: 14,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Opção selecionada
            </label>
          </div>
        </div>

        {/* Disabled */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Disabled
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox id="disabled" disabled />
            <label
              htmlFor="disabled"
              style={{
                fontSize: 14,
                cursor: "not-allowed",
                opacity: 0.5,
                userSelect: "none",
              }}
            >
              Opção desabilitada
            </label>
          </div>
        </div>

        {/* Indeterminate */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Indeterminate
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox
              id="indeterminate"
              checked={indeterminate}
              onCheckedChange={(value: CheckedState) => {
                setIndeterminate(value)
              }}
            />
            <label
              htmlFor="indeterminate"
              style={{
                fontSize: 14,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Opção indeterminada (tri-state)
            </label>
          </div>
        </div>

        {/* Group */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Group
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Opção 1", "Opção 2", "Opção 3"].map((label, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox id={`group-${idx}`} />
                <label
                  htmlFor={`group-${idx}`}
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
