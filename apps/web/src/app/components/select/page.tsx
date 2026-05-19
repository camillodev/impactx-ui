"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@impactxlab/design-system"
import { Label } from "@impactxlab/design-system"

export default function SelectPlayground() {
  const [controlled, setControlled] = React.useState("")

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Select</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 40 }}>
        Compound component baseado em Radix Select. Suporte a grupos, labels, separadores e estado controlado.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {/* Simples */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Simples
          </h2>
          <div style={{ width: 280 }}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opcao-1">Opção 1</SelectItem>
                <SelectItem value="opcao-2">Opção 2</SelectItem>
                <SelectItem value="opcao-3">Opção 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Com grupos */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Com grupos
          </h2>
          <div style={{ width: 280 }}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma matéria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Exatas</SelectLabel>
                  <SelectItem value="matematica">Matemática</SelectItem>
                  <SelectItem value="fisica">Física</SelectItem>
                  <SelectItem value="quimica">Química</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Humanas</SelectLabel>
                  <SelectItem value="historia">História</SelectItem>
                  <SelectItem value="geografia">Geografia</SelectItem>
                  <SelectItem value="filosofia">Filosofia</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Com label externa */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Com label externa
          </h2>
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 6 }}>
            <Label htmlFor="turma-select">Turma</Label>
            <Select>
              <SelectTrigger id="turma-select">
                <SelectValue placeholder="Escolha a turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1a">1º Ano A</SelectItem>
                <SelectItem value="1b">1º Ano B</SelectItem>
                <SelectItem value="2a">2º Ano A</SelectItem>
                <SelectItem value="2b">2º Ano B</SelectItem>
                <SelectItem value="3a">3º Ano A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Disabled */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Disabled
          </h2>
          <div style={{ width: 280 }}>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Indisponível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="x">Opção</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Controlado */}
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Controlado
          </h2>
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12 }}>
            <Select value={controlled} onValueChange={setControlled}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bimestre-1">1º Bimestre</SelectItem>
                <SelectItem value="bimestre-2">2º Bimestre</SelectItem>
                <SelectItem value="bimestre-3">3º Bimestre</SelectItem>
                <SelectItem value="bimestre-4">4º Bimestre</SelectItem>
              </SelectContent>
            </Select>
            {controlled && (
              <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                Selecionado: <strong>{controlled}</strong>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
