"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@impactxlab/design-system"

export default function TabsPlayground() {
  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Tabs</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: 32 }}>
        Tab navigation horizontal com active underline.
      </p>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p style={{ padding: 24, color: "var(--color-text-muted)" }}>
            Conteúdo da aba Overview. Visão geral dos dados.
          </p>
        </TabsContent>
        <TabsContent value="details">
          <p style={{ padding: 24, color: "var(--color-text-muted)" }}>
            Conteúdo da aba Details. Detalhes específicos.
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p style={{ padding: 24, color: "var(--color-text-muted)" }}>
            Conteúdo da aba Settings. Preferências.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
