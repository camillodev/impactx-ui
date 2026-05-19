# @impactx/eslint-plugin-ui

ESLint plugin pro Impact X UI design system. Bloqueia Tailwind cru e duplicação de componentes em apps consumidores.

## Install

```bash
pnpm add -D @impactx/eslint-plugin-ui --workspace
```

## Uso (ESLint 9 flat config)

```js
// eslint.config.mjs
import impactxUI from "@impactx/eslint-plugin-ui"

export default [
  {
    plugins: { "@impactx/ui": impactxUI },
    rules: {
      "@impactx/ui/no-raw-tailwind-colors": "error",
      "@impactx/ui/no-raw-tailwind-layout": "error",
      "@impactx/ui/no-duplicate-component": "error",
    },
  },
]
```

Ou use o config recommended:

```js
import impactxUI from "@impactx/eslint-plugin-ui"

export default [
  { plugins: { "@impactx/ui": impactxUI } },
  impactxUI.configs.recommended,
]
```

## Rules

| Rule | O que bloqueia | Exemplo |
|---|---|---|
| `no-raw-tailwind-colors` | `bg-blue-500`, `text-gray-700` etc. | Use `bg-[var(--color-primary)]` |
| `no-raw-tailwind-layout` | `grid-cols-3`, `flex-col md:flex-row` | Use `<Grid cols={3}>` ou `<Stack direction={{base:"vertical",md:"horizontal"}}>` |
| `no-duplicate-component` | `export function Button()` quando Button já existe no DS | Importe de `@impactxlab/design-system` |
