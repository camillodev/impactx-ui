import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ImpactXUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "cjs" ? "index.cjs" : "index.js"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
        },
      },
    },
    sourcemap: true,
  },
})
