import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MaskedInput } from "../masked-input"

describe("MaskedInput — rendering", () => {
  it("renders with cpf mask", () => {
    render(<MaskedInput mask="cpf" value="" onChange={() => undefined} />)
    expect(screen.getByRole("textbox")).toBeTruthy()
  })

  it.each(["cpf", "cnpj", "phone", "cep", "currency-brl"] as const)(
    "renders mask=%s",
    (mask) => {
      render(<MaskedInput mask={mask} value="" onChange={() => undefined} />)
      expect(screen.getByRole("textbox")).toBeTruthy()
    }
  )

  it("renders with placeholder", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        placeholder="000.000.000-00"
      />
    )
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeTruthy()
  })

  it("renders with label", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        label="CPF"
      />
    )
    expect(screen.getByText("CPF")).toBeTruthy()
  })

  it("renders error message", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        error="CPF inválido"
      />
    )
    expect(screen.getByText("CPF inválido")).toBeTruthy()
  })

  it("renders helper text when no error", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        helperText="Apenas números"
      />
    )
    expect(screen.getByText("Apenas números")).toBeTruthy()
  })
})

describe("MaskedInput — a11y", () => {
  it("input has inputMode=numeric", () => {
    render(<MaskedInput mask="cpf" value="" onChange={() => undefined} />)
    expect(screen.getByRole("textbox").getAttribute("inputmode")).toBe("numeric")
  })

  it("aria-invalid=true when error provided", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        error="inválido"
      />
    )
    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe("true")
  })

  it("aria-describedby linked to error id when error", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        id="cpf-x"
        error="inválido"
      />
    )
    expect(screen.getByRole("textbox").getAttribute("aria-describedby")).toBe(
      "cpf-x-error"
    )
  })

  it("label is linked to input via htmlFor/id", () => {
    render(
      <MaskedInput
        mask="cpf"
        value=""
        onChange={() => undefined}
        id="cpf-id"
        label="CPF"
      />
    )
    const label = screen.getByText("CPF").closest("label")
    expect(label?.getAttribute("for")).toBe("cpf-id")
  })
})

describe("MaskedInput — display value", () => {
  it("displays already-masked value in input", () => {
    render(
      <MaskedInput
        mask="cpf"
        value="123.456.789-01"
        onChange={() => undefined}
      />
    )
    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("123.456.789-01")
  })

  it("accepts onRawChange as optional (no crash without it)", () => {
    expect(() =>
      render(<MaskedInput mask="cpf" value="" onChange={() => undefined} />)
    ).not.toThrow()
  })

  it("onChange callback type-checks", () => {
    const handler = vi.fn()
    render(<MaskedInput mask="cep" value="" onChange={handler} />)
    expect(screen.getByRole("textbox")).toBeTruthy()
  })
})
