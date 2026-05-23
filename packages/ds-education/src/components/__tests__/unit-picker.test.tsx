import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UnitPicker, type Unit } from "../unit-picker"

const UNITS: Unit[] = [
  { id: "u1", name: "Camargos", role: "ORIENTADORA", isActive: true },
  { id: "u2", name: "Pampulha", role: "ORIENTADORA" },
  { id: "u3", name: "Centro", role: "COORDENADORA" },
]

describe("UnitPicker — rendering (no menu open)", () => {
  it("returns null when 0 units", () => {
    const { container } = render(
      <UnitPicker units={[]} activeUnitId="" onSelect={() => undefined} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("returns null when 1 unit and not admin", () => {
    const { container } = render(
      <UnitPicker
        units={[UNITS[0]]}
        activeUnitId="u1"
        onSelect={() => undefined}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders trigger when 1 unit and admin", () => {
    render(
      <UnitPicker
        units={[UNITS[0]]}
        activeUnitId="u1"
        onSelect={() => undefined}
        isAdmin
      />
    )
    expect(screen.getByText("Camargos")).toBeTruthy()
  })

  it("renders trigger with active unit name when N units, not admin", () => {
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u2"
        onSelect={() => undefined}
      />
    )
    expect(screen.getByText("Pampulha")).toBeTruthy()
  })

  it("renders fallback label when activeUnitId does not match", () => {
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="nope"
        onSelect={() => undefined}
      />
    )
    expect(screen.getByText("Selecionar unidade")).toBeTruthy()
  })
})

describe("UnitPicker — loading", () => {
  it("renders Skeleton (no trigger) when loading=true", () => {
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
        loading
      />
    )
    expect(screen.queryByRole("button")).toBeNull()
  })
})

describe("UnitPicker — a11y", () => {
  it("trigger has default aria-label", () => {
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
      />
    )
    expect(
      screen.getByRole("button").getAttribute("aria-label")
    ).toBe("Selecionar unidade ativa")
  })

  it("customizes aria-label via prop", () => {
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
        ariaLabel="Trocar unidade"
      />
    )
    expect(screen.getByRole("button").getAttribute("aria-label")).toBe(
      "Trocar unidade"
    )
  })
})

describe("UnitPicker — menu interaction (Radix portal)", () => {
  it("opens menu and shows units on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
      />
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Pampulha")).toBeTruthy()
    expect(screen.getByText("Centro")).toBeTruthy()
  })

  it("admin shows search input and 'Todas as unidades'", async () => {
    const user = userEvent.setup()
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
        isAdmin
      />
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByPlaceholderText("Buscar unidade…")).toBeTruthy()
    expect(screen.getByText("Todas as unidades")).toBeTruthy()
  })

  it("admin search filters list case-insensitively", async () => {
    const user = userEvent.setup()
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
        isAdmin
      />
    )
    await user.click(screen.getByRole("button"))
    const search = screen.getByPlaceholderText("Buscar unidade…")
    fireEvent.change(search, { target: { value: "pampu" } })
    expect(screen.getByText("Pampulha")).toBeTruthy()
    expect(screen.queryByText("Centro")).toBeNull()
  })

  it("admin search with no match shows fallback message", async () => {
    const user = userEvent.setup()
    render(
      <UnitPicker
        units={UNITS}
        activeUnitId="u1"
        onSelect={() => undefined}
        isAdmin
      />
    )
    await user.click(screen.getByRole("button"))
    const search = screen.getByPlaceholderText("Buscar unidade…")
    fireEvent.change(search, { target: { value: "xyzbogus" } })
    expect(screen.getByText("Nenhuma unidade encontrada")).toBeTruthy()
  })

  it("clicking a unit calls onSelect with the unit id", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<UnitPicker units={UNITS} activeUnitId="u1" onSelect={onSelect} />)
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByText("Pampulha"))
    expect(onSelect).toHaveBeenCalledWith("u2")
  })
})
