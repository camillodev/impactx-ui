import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/app/theme-provider"
import { Sidebar } from "@/app/shell/sidebar"
import { Header } from "@/app/shell/header"

export const metadata: Metadata = {
  title: "ds-impactx · Education DS",
  description: "Impact X Design System factory — Education DS first",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="theme-education">
      <body className="antialiased">
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-y-auto bg-[var(--color-surface)]">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
