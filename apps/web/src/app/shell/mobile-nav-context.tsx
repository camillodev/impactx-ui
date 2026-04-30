"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Ctx = {
  open: boolean
  toggle: () => void
  close: () => void
  openNav: () => void
}

const MobileNavContext = createContext<Ctx | null>(null)

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  // ESC fecha o drawer
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Body scroll lock enquanto aberto
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [open])

  return (
    <MobileNavContext.Provider
      value={{
        open,
        toggle: () => setOpen((v) => !v),
        close: () => setOpen(false),
        openNav: () => setOpen(true),
      }}
    >
      {children}
    </MobileNavContext.Provider>
  )
}

export function useMobileNav() {
  const ctx = useContext(MobileNavContext)
  if (!ctx) throw new Error("useMobileNav fora do provider")
  return ctx
}
