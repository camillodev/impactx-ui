import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusBadge } from "../status-badge"

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("StatusBadge — enrollment domain", () => {
  it("renders ACTIVE as 'Ativa' with success tone", () => {
    render(<StatusBadge domain="enrollment" value="ACTIVE" />)
    expect(screen.getByText("Ativa")).toBeTruthy()
  })

  it("renders PENDING as 'Pendente'", () => {
    render(<StatusBadge domain="enrollment" value="PENDING" />)
    expect(screen.getByText("Pendente")).toBeTruthy()
  })

  it("renders CANCELLED as 'Cancelada'", () => {
    render(<StatusBadge domain="enrollment" value="CANCELLED" />)
    expect(screen.getByText("Cancelada")).toBeTruthy()
  })

  it("renders COMPLETED as 'Concluída'", () => {
    render(<StatusBadge domain="enrollment" value="COMPLETED" />)
    expect(screen.getByText("Concluída")).toBeTruthy()
  })
})

describe("StatusBadge — invoice domain", () => {
  it("renders OVERDUE as 'Vencido'", () => {
    render(<StatusBadge domain="invoice" value="OVERDUE" />)
    expect(screen.getByText("Vencido")).toBeTruthy()
  })

  it("renders PAID as 'Pago'", () => {
    render(<StatusBadge domain="invoice" value="PAID" />)
    expect(screen.getByText("Pago")).toBeTruthy()
  })

  it("renders INVOICED as 'Em aberto'", () => {
    render(<StatusBadge domain="invoice" value="INVOICED" />)
    expect(screen.getByText("Em aberto")).toBeTruthy()
  })

  it("renders DRAFT as 'Rascunho'", () => {
    render(<StatusBadge domain="invoice" value="DRAFT" />)
    expect(screen.getByText("Rascunho")).toBeTruthy()
  })
})

describe("StatusBadge — role domain", () => {
  it("renders ORIENTADORA as 'Orientadora'", () => {
    render(<StatusBadge domain="role" value="ORIENTADORA" />)
    expect(screen.getByText("Orientadora")).toBeTruthy()
  })

  it("renders ADMIN_PLATFORM as 'Admin IX'", () => {
    render(<StatusBadge domain="role" value="ADMIN_PLATFORM" />)
    expect(screen.getByText("Admin IX")).toBeTruthy()
  })

  it("renders ATENDENTE as 'Atendente'", () => {
    render(<StatusBadge domain="role" value="ATENDENTE" />)
    expect(screen.getByText("Atendente")).toBeTruthy()
  })
})

describe("StatusBadge — custom override", () => {
  it("renders label/tone when domain not provided", () => {
    render(<StatusBadge label="Em revisão" tone="warning" />)
    expect(screen.getByText("Em revisão")).toBeTruthy()
  })

  it("aria-label is just label when no domain", () => {
    render(<StatusBadge label="Custom" tone="info" />)
    expect(screen.getByText("Custom").getAttribute("aria-label")).toBe("Custom")
  })
})

describe("StatusBadge — a11y", () => {
  it("aria-label has 'label — domain' format when domain provided", () => {
    render(<StatusBadge domain="enrollment" value="ACTIVE" />)
    const badge = screen.getByText("Ativa")
    expect(badge.getAttribute("aria-label")).toBe("Ativa — enrollment")
  })
})

describe("StatusBadge — invalid value handling", () => {
  it("renders fallback neutral with String(value) in production", () => {
    vi.stubEnv("NODE_ENV", "production")
    // @ts-expect-error — intentionally invalid value
    render(<StatusBadge domain="enrollment" value="BOGUS" />)
    expect(screen.getByText("BOGUS")).toBeTruthy()
  })

  it("throws in development", () => {
    vi.stubEnv("NODE_ENV", "development")
    expect(() =>
      // @ts-expect-error — intentionally invalid value
      render(<StatusBadge domain="enrollment" value="BOGUS" />)
    ).toThrow(/\[StatusBadge\] invalid value/)
  })
})

describe("StatusBadge — props forwarding", () => {
  it("renders icon when passed", () => {
    render(
      <StatusBadge
        domain="enrollment"
        value="ACTIVE"
        icon={<svg data-testid="status-icon" />}
      />
    )
    expect(screen.getByTestId("status-icon")).toBeTruthy()
  })

  it("applies size prop", () => {
    render(<StatusBadge label="X" tone="info" size="sm" />)
    const badge = screen.getByText("X")
    expect(badge.className).toMatch(/text-\[12px\]/)
  })
})
