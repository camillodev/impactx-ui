import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FieldLabel } from "../field-label"

describe("FieldLabel", () => {
  it("renders children as the label text", () => {
    render(<FieldLabel htmlFor="cpf">CPF</FieldLabel>)
    expect(screen.getByText("CPF")).toBeTruthy()
  })

  it("applies htmlFor to the <label> element", () => {
    render(<FieldLabel htmlFor="cpf">CPF</FieldLabel>)
    const label = screen.getByText("CPF").closest("label")
    expect(label?.getAttribute("for")).toBe("cpf")
  })

  it("renders the required asterisk when required is true", () => {
    render(
      <FieldLabel htmlFor="cpf" required>
        CPF
      </FieldLabel>
    )
    expect(screen.getByText("*")).toBeTruthy()
  })

  it("required asterisk has aria-hidden=true", () => {
    render(
      <FieldLabel htmlFor="cpf" required>
        CPF
      </FieldLabel>
    )
    const asterisk = screen.getByText("*")
    expect(asterisk.getAttribute("aria-hidden")).toBe("true")
  })

  it("required adds sr-only 'obrigatório' for screen readers", () => {
    render(
      <FieldLabel htmlFor="cpf" required>
        CPF
      </FieldLabel>
    )
    expect(screen.getByText("obrigatório", { exact: false })).toBeTruthy()
  })

  it("renders the tag Badge when tag is passed", () => {
    render(
      <FieldLabel htmlFor="cpf" tag="opcional">
        CPF
      </FieldLabel>
    )
    expect(screen.getByText("opcional")).toBeTruthy()
  })

  it("renders the hint with id=`${htmlFor}-hint`", () => {
    render(
      <FieldLabel htmlFor="cpf" hint="Apenas números">
        CPF
      </FieldLabel>
    )
    const hint = screen.getByText("Apenas números")
    expect(hint.getAttribute("id")).toBe("cpf-hint")
  })

  it("plain variant renders only label + children (no asterisk, no badge, no hint)", () => {
    const { container } = render(<FieldLabel htmlFor="cpf">CPF</FieldLabel>)
    expect(container.querySelector("p")).toBeNull()
    expect(screen.queryByText("*")).toBeNull()
  })

  it("union discrimination — required + tag is a TS error", () => {
    // @ts-expect-error — required and tag are mutually exclusive
    const _invalid = <FieldLabel htmlFor="x" required tag="foo">X</FieldLabel>
    expect(_invalid).toBeTruthy()
  })
})
