/** @type {import("eslint").Rule.RuleModule} */
const COLOR_RE = /\b(bg|text|border|ring|fill|stroke|outline|placeholder|caret|accent|decoration|divide|from|to|via)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{1,3}\b/

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Forbid raw Tailwind color utilities (e.g. bg-blue-500). Use design tokens via var(--color-X).",
    },
    messages: {
      rawColor: "Cor Tailwind crua '{{match}}' não permitida. Use bg-[var(--color-X)] do Impact X DS.",
    },
    schema: [],
  },
  create(context) {
    function check(node, value) {
      if (typeof value !== "string") return
      const m = value.match(COLOR_RE)
      if (m) {
        context.report({ node, messageId: "rawColor", data: { match: m[0] } })
      }
    }
    return {
      JSXAttribute(node) {
        if (node.name.name !== "className" && node.name.name !== "class") return
        if (node.value?.type === "Literal") check(node, node.value.value)
        if (node.value?.type === "JSXExpressionContainer" && node.value.expression.type === "Literal") {
          check(node, node.value.expression.value)
        }
        if (node.value?.type === "JSXExpressionContainer" && node.value.expression.type === "TemplateLiteral") {
          node.value.expression.quasis.forEach(q => check(node, q.value.raw))
        }
      },
    }
  },
}
