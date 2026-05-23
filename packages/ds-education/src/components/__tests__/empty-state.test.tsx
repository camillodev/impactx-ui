import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "../empty-state"

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="Nenhum aluno cadastrado" />)
    expect(screen.getByText("Nenhum aluno cadastrado")).toBeTruthy()
  })

  it("renders the description when passed", () => {
    render(
      <EmptyState
        title="Vazio"
        description="Adicione o primeiro aluno para começar."
      />
    )
    expect(
      screen.getByText("Adicione o primeiro aluno para começar.")
    ).toBeTruthy()
  })

  it("does not render description element when not passed", () => {
    const { container } = render(<EmptyState title="Vazio" />)
    expect(container.querySelector("p")).toBeNull()
  })

  it("renders the action when passed", () => {
    render(
      <EmptyState title="Vazio" action={<button>Cadastrar aluno</button>} />
    )
    expect(screen.getByRole("button", { name: "Cadastrar aluno" })).toBeTruthy()
  })

  it("renders the icon when passed", () => {
    render(
      <EmptyState title="Vazio" icon={<svg data-testid="empty-icon" />} />
    )
    expect(screen.getByTestId("empty-icon")).toBeTruthy()
  })

  it("has role=status on wrapper", () => {
    render(<EmptyState title="Vazio" />)
    expect(screen.getByRole("status")).toBeTruthy()
  })

  it("derives aria-label from title by default", () => {
    render(<EmptyState title="Nenhum aluno cadastrado" />)
    const status = screen.getByRole("status")
    expect(status.getAttribute("aria-label")).toBe("Nenhum aluno cadastrado")
  })

  it("uses ariaLabel prop when provided", () => {
    render(<EmptyState title="Vazio" ariaLabel="Lista vazia de alunos" />)
    const status = screen.getByRole("status")
    expect(status.getAttribute("aria-label")).toBe("Lista vazia de alunos")
  })

  it("applies compact variant padding", () => {
    const { container } = render(
      <EmptyState title="Vazio" variant="compact" />
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toMatch(/\bp-6\b/)
  })

  it("applies card variant with border and surface bg", () => {
    const { container } = render(<EmptyState title="Vazio" variant="card" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toMatch(/\bp-10\b/)
    expect(wrapper.className).toMatch(/border/)
    expect(wrapper.className).toMatch(/var\(--color-surface\)/)
  })

  it("applies default variant padding", () => {
    const { container } = render(<EmptyState title="Vazio" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toMatch(/\bp-12\b/)
  })
})
