import noRawTailwindColors from "./rules/no-raw-tailwind-colors.mjs"
import noRawTailwindLayout from "./rules/no-raw-tailwind-layout.mjs"
import noDuplicateComponent from "./rules/no-duplicate-component.mjs"

export default {
  meta: {
    name: "@impactx/eslint-plugin-ui",
    version: "0.1.0",
  },
  rules: {
    "no-raw-tailwind-colors": noRawTailwindColors,
    "no-raw-tailwind-layout": noRawTailwindLayout,
    "no-duplicate-component": noDuplicateComponent,
  },
  configs: {
    recommended: {
      rules: {
        "@impactx/ui/no-raw-tailwind-colors": "error",
        "@impactx/ui/no-raw-tailwind-layout": "error",
        "@impactx/ui/no-duplicate-component": "error",
      },
    },
  },
}
