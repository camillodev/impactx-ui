import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure React loads its dev build (which exports act) rather than the production build
    "process.env.NODE_ENV": JSON.stringify("test"),
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
})
