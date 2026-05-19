/** @type {import("eslint").Rule.RuleModule} */
// Lista de componentes que vivem em @impactxlab/design-system.
// Atualizar manualmente quando registry crescer.
// (Idealmente lê de @impactxlab/design-system/registry — fica como TODO pra próxima iteração.)
const DS_COMPONENTS = new Set([
  "AlertDialog", "Avatar", "Badge", "Breadcrumb", "Button", "Card",
  "Checkbox", "Chip", "Cluster", "CodeBlock", "CommandPalette",
  "DataTable", "DataTableWithPagination", "DropdownMenu", "Grid",
  "HelpFab", "IconButton", "Input", "Label", "Modal", "PageContainer",
  "Pagination", "ProgressBar", "Select", "Separator", "Sheet",
  "Sidebar", "SidebarFromConfig", "Skeleton", "Stack", "Stat",
  "Switch", "Tabs", "Textarea", "Toast", "Tooltip",
  "AssessmentCard", "BannerCta", "Chart",
])

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Forbid defining a component with the same name as one in @impactxlab/design-system.",
    },
    messages: {
      duplicate: "Componente '{{name}}' já existe em @impactxlab/design-system. Importe em vez de criar.",
    },
    schema: [],
  },
  create(context) {
    function check(node, name) {
      if (typeof name !== "string") return
      if (DS_COMPONENTS.has(name)) {
        context.report({ node, messageId: "duplicate", data: { name } })
      }
    }
    return {
      // export function FooBar() {}
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === "FunctionDeclaration") {
          check(node, node.declaration.id?.name)
        }
        if (node.declaration?.type === "VariableDeclaration") {
          node.declaration.declarations.forEach(d => {
            if (d.id?.type === "Identifier") check(node, d.id.name)
          })
        }
      },
      // export const FooBar = ...
      // export default function FooBar() {}
      ExportDefaultDeclaration(node) {
        if (node.declaration?.type === "FunctionDeclaration") {
          check(node, node.declaration.id?.name)
        }
      },
    }
  },
}
