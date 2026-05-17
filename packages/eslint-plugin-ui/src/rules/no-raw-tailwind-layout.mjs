/** @type {import("eslint").Rule.RuleModule} */
const LAYOUT_RE = /\b(grid-cols-\d+|flex-col\s+(sm|md|lg|xl):flex-row|flex-row\s+(sm|md|lg|xl):flex-col)\b/

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Forbid raw Tailwind layout utilities (grid-cols-N, flex-col md:flex-row). Use Grid/Stack/Cluster primitives.",
    },
    messages: {
      rawLayout: "Layout Tailwind cru '{{match}}' não permitido. Use <Grid cols={...}> ou <Stack direction={...}> do Impact X DS.",
    },
    schema: [],
  },
  create(context) {
    function check(node, value) {
      if (typeof value !== "string") return
      const m = value.match(LAYOUT_RE)
      if (m) {
        context.report({ node, messageId: "rawLayout", data: { match: m[0] } })
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
