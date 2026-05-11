import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CommandPalette, type CommandPaletteGroup } from "../command-palette"

const GROUPS: CommandPaletteGroup[] = [
  {
    heading: "Atoms",
    items: [
      { label: "Button", description: "Ação principal", href: "/components/button", keywords: ["cta"] },
      { label: "Badge", description: "Tag de status", href: "/components/badge" },
    ],
  },
  {
    heading: "Molecules",
    items: [
      { label: "Modal", description: "Dialog overlay", href: "/components/modal" },
    ],
  },
]

function renderPalette(props: Partial<React.ComponentProps<typeof CommandPalette>> = {}) {
  const onOpenChange = vi.fn()
  const onNavigate = vi.fn()
  render(
    <CommandPalette
      open={props.open ?? true}
      onOpenChange={props.onOpenChange ?? onOpenChange}
      groups={props.groups ?? GROUPS}
      onNavigate={props.onNavigate ?? onNavigate}
      {...props}
    />
  )
  return { onOpenChange, onNavigate }
}

describe("CommandPalette", () => {
  it("não renderiza nada quando open=false", () => {
    renderPalette({ open: false })
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("renderiza dialog quando open=true", () => {
    renderPalette({ open: true })
    expect(screen.getByRole("dialog")).toBeTruthy()
  })

  it("renderiza título oculto para a11y (sem warning Radix)", () => {
    renderPalette({ open: true, title: "Meu título" })
    expect(screen.getByText("Meu título")).toBeTruthy()
  })

  it("renderiza descrição oculta quando fornecida", () => {
    renderPalette({ open: true, description: "Descrição acessível" })
    expect(screen.getByText("Descrição acessível")).toBeTruthy()
  })

  it("exibe todos os grupos e itens", () => {
    renderPalette({ open: true })
    expect(screen.getByText("Button")).toBeTruthy()
    expect(screen.getByText("Badge")).toBeTruthy()
    expect(screen.getByText("Modal")).toBeTruthy()
  })

  it("filtra itens ao digitar na busca", async () => {
    const user = userEvent.setup()
    renderPalette({ open: true })
    const input = screen.getByRole("combobox")
    await user.type(input, "button")
    expect(screen.getByText("Button")).toBeTruthy()
    expect(screen.queryByText("Modal")).toBeNull()
  })

  it("chama onNavigate com href ao selecionar item com href", async () => {
    const onNavigate = vi.fn()
    renderPalette({ open: true, onNavigate })
    fireEvent.click(screen.getByText("Button"))
    expect(onNavigate).toHaveBeenCalledWith("/components/button")
  })

  it("chama onSelect do item quando fornecido (sem onNavigate)", async () => {
    const onSelect = vi.fn()
    const groups: CommandPaletteGroup[] = [
      {
        heading: "Custom",
        items: [{ label: "Ação", onSelect }],
      },
    ]
    renderPalette({ open: true, groups })
    fireEvent.click(screen.getByText("Ação"))
    expect(onSelect).toHaveBeenCalled()
  })

  it("chama onOpenChange(false) ao fechar", () => {
    const onOpenChange = vi.fn()
    renderPalette({ open: true, onOpenChange })
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("usa placeholder customizado", () => {
    renderPalette({ open: true, placeholder: "Busque algo..." })
    expect(screen.getByPlaceholderText("Busque algo...")).toBeTruthy()
  })
})
