import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/app/theme-provider"
import { ShowcaseShell } from "@/app/shell/showcase-shell"

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
          <ShowcaseShell>
            {children}
          </ShowcaseShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
