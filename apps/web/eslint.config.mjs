import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import impactxUI from "@impactx/eslint-plugin-ui";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Impact X UI custom rules — bloqueia Tailwind cru + duplicacao de componente.
  // Aplicado apenas em codigo da app (src/**), nao em testes E2E nem snapshots.
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    plugins: { "@impactx/ui": impactxUI },
    rules: {
      "@impactx/ui/no-raw-tailwind-colors": "error",
      "@impactx/ui/no-raw-tailwind-layout": "error",
      "@impactx/ui/no-duplicate-component": "error",
    },
  },
]);

export default eslintConfig;
