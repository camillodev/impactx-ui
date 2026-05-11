export type RegistryItem = {
  href: string
  label: string
  description: string
  /** Para fuzzy match — palavras-chave extras (sinônimos, tipos) */
  keywords?: string[]
  /** Categoria pra agrupar no command palette */
  category: "atom" | "molecule" | "chart" | "organism" | "example" | "page"
  /** Subcategoria de exemplo */
  exampleType?: string
}

export const components: RegistryItem[] = [
  // Atoms
  { href: "/components/button",      label: "Button",      description: "7 variants × 3 sizes",          category: "atom", keywords: ["cta", "action"] },
  { href: "/components/icon-button", label: "IconButton",  description: "Square / circle, ghost/filled", category: "atom", keywords: ["icon", "action"] },
  { href: "/components/badge",       label: "Badge",       description: "5 variants pastel",             category: "atom", keywords: ["tag", "label", "status"] },
  { href: "/components/checkbox",    label: "Checkbox",    description: "Checked, disabled, indeterminate", category: "atom", keywords: ["input", "form", "selection"] },
  { href: "/components/avatar",      label: "Avatar",      description: "Image + fallback iniciais",     category: "atom", keywords: ["user", "profile", "image"] },
  { href: "/components/breadcrumb",  label: "Breadcrumb",  description: "Hierarquia de navegação",       category: "atom", keywords: ["nav", "path"] },
  { href: "/components/input",       label: "Input",       description: "Label, error, leading icon",    category: "atom", keywords: ["text", "field", "form"] },
  { href: "/components/label",       label: "Label",       description: "Form label + states",           category: "atom", keywords: ["form", "text", "field"] },
  { href: "/components/textarea",    label: "Textarea",    description: "Multiline input com label, error e helper", category: "atom", keywords: ["form", "field", "multiline"] },
  { href: "/components/pagination",  label: "Pagination",  description: "Numérica + prev/next",          category: "atom", keywords: ["pages", "nav"] },
  { href: "/components/skeleton",    label: "Skeleton",    description: "Loading placeholder",          category: "atom", keywords: ["loading", "placeholder", "shimmer"] },
  { href: "/components/tabs",        label: "Tabs",        description: "Navegação horizontal",          category: "atom" },
  { href: "/components/tooltip",     label: "Tooltip",     description: "Top / Right / Bottom / Left",   category: "atom", keywords: ["hint", "popup"] },

  // Molecules
  { href: "/components/dropdown-menu", label: "DropdownMenu", description: "Menu contextual — Item, Checkbox, Radio, SubMenu, Shortcut", category: "molecule", keywords: ["menu", "context", "dropdown", "actions", "submenu"] },
  { href: "/components/select",      label: "Select",      description: "Dropdown compound com grupos, label e estado controlado", category: "molecule", keywords: ["dropdown", "form", "option", "field"] },
  { href: "/components/stat",        label: "Stat",        description: "Label + valor + delta",         category: "molecule", keywords: ["kpi", "metric", "number"] },
  { href: "/components/chip",        label: "Chip",        description: "Chip + SegmentedControl",       category: "molecule", keywords: ["filter", "segmented", "tag"] },
  { href: "/components/banner-cta",  label: "BannerCTA",   description: "Banner full-width com CTA",     category: "molecule", keywords: ["promo", "hero", "callout"] },
  { href: "/components/alert-dialog", label: "AlertDialog", description: "Confirm / Cancel para ações destrutivas", category: "molecule", keywords: ["confirm", "dialog", "destructive", "danger", "overlay"] },
  { href: "/components/modal",       label: "Modal",       description: "Default / Welcome / Split",     category: "molecule", keywords: ["dialog", "popup", "overlay"] },
  { href: "/components/sheet",       label: "Sheet",       description: "Drawer / slide-over — top, right, bottom, left", category: "molecule", keywords: ["drawer", "panel", "slide", "sidebar", "overlay"] },
  { href: "/components/toast",       label: "Toast",       description: "Success / Info / Warn / Error", category: "molecule", keywords: ["notification", "snackbar"] },

  // Charts
  { href: "/components/charts",      label: "Charts",      description: "Donut / Bar / Line / Area",     category: "chart", keywords: ["echarts", "graph", "viz"] },
  { href: "/components/donut",       label: "Donut score", description: "Educacional (legacy)",          category: "chart", keywords: ["pie", "score"] },

  // Organisms
  { href: "/components/data-table",      label: "DataTable",      description: "Sort, density, loading, empty", category: "organism", keywords: ["table", "grid", "list"] },
  { href: "/components/assessment-card", label: "AssessmentCard", description: "Card com 5 status",             category: "organism", keywords: ["card", "course", "test"] },
  { href: "/components/card",            label: "Card",           description: "Container com Header/Title/Content", category: "atom", keywords: ["container", "panel"] },
  { href: "/components/sidebar-shell",   label: "SidebarShell",   description: "Layout shell: sidebar + top bar Cmd+K + dark mode", category: "organism", keywords: ["layout", "shell", "sidebar", "navigation", "dark mode", "command palette"] },

  // Education domain organisms (showcase routes pending — see docs/atomic-design-audit.md)
  { href: "/components/assessment-header",  label: "AssessmentHeader",  description: "Header de avaliação (domain)",          category: "organism", exampleType: "education", keywords: ["header", "assessment", "education"] },
  { href: "/components/assessment-list-item", label: "AssessmentListItem", description: "Item de lista de avaliação",         category: "organism", exampleType: "education", keywords: ["list", "row", "assessment"] },
  { href: "/components/big-card",           label: "BigCard",           description: "Card hero/marketing emphasis",          category: "organism", exampleType: "education", keywords: ["hero", "marketing", "card"] },
  { href: "/components/campo-card",         label: "CampoCard",         description: "Card de campo/área (domain)",           category: "organism", exampleType: "education", keywords: ["campo", "area", "card"] },
  { href: "/components/category-card",      label: "CategoryCard",      description: "Card de categoria (domain)",            category: "organism", exampleType: "education", keywords: ["category", "card"] },
  { href: "/components/cta-banner",         label: "CtaBanner",         description: "Banner CTA (domain education)",         category: "organism", exampleType: "education", keywords: ["cta", "banner", "promo"] },
  { href: "/components/donut-score",        label: "DonutScore",        description: "Donut com score (domain)",              category: "organism", exampleType: "education", keywords: ["donut", "score", "chart"] },
  { href: "/components/hero-banner",        label: "HeroBanner",        description: "Hero de dashboard/escola",              category: "organism", exampleType: "education", keywords: ["hero", "banner", "top"] },
  { href: "/components/question-row",       label: "QuestionRow",       description: "Linha de questão em tabela",            category: "organism", exampleType: "education", keywords: ["question", "row", "table"] },
  { href: "/components/subject-stat-card",  label: "SubjectStatCard",   description: "Stat card por matéria",                 category: "organism", exampleType: "education", keywords: ["stat", "subject", "kpi"] },
]

export const examples: RegistryItem[] = [
  // Dashboards e relatórios
  { href: "/demo/education-x", label: "Dashboard de relatório", description: "Stats + donuts + alerta + tabela de participação", category: "example", exampleType: "Dashboards e relatórios", keywords: ["dashboard", "kpi", "overview", "diagnostic"] },
  { href: "/templates/education/relatorio-visao-geral", label: "Relatório com gráficos", description: "Sumário com donuts grandes por área", category: "example", exampleType: "Dashboards e relatórios", keywords: ["report", "executive", "donut"] },
  { href: "/templates/education/relatorio-questoes", label: "Relatório com tabela densa", description: "Tabela longa com mini-gráficos inline", category: "example", exampleType: "Dashboards e relatórios", keywords: ["report", "table", "questions"] },

  // Listas e catálogos
  { href: "/demo/assessment-catalog", label: "Lista de cards", description: "Header + filters + grid 3 col + BannerCTA", category: "example", exampleType: "Listas e catálogos", keywords: ["catalog", "grid", "cards", "list"] },
  { href: "/templates/education/catalogo", label: "Catálogo agrupado", description: "Cards organizados por categoria", category: "example", exampleType: "Listas e catálogos", keywords: ["catalog", "sections"] },
  { href: "/templates/education/lista-diagnostica", label: "Lista de itens", description: "Listagem em rows densas", category: "example", exampleType: "Listas e catálogos", keywords: ["list", "rows", "diagnostic"] },

  // Tabelas e detalhes
  { href: "/demo/question-performance", label: "Tabela paginada com filtros", description: "Stats + SegmentedControl + DataTable + Pagination", category: "example", exampleType: "Tabelas e detalhes", keywords: ["table", "pagination", "filters", "operational"] },
  { href: "/templates/education/diagnostica-ano", label: "Filtros + grid", description: "Top filters + grid de cards com indicadores", category: "example", exampleType: "Tabelas e detalhes", keywords: ["filters", "grid"] },
  { href: "/templates/education/avaliacoes", label: "Hub de ações", description: "Hero + CTAs grandes + atalhos", category: "example", exampleType: "Tabelas e detalhes", keywords: ["hub", "landing", "home"] },
]

export const pages: RegistryItem[] = [
  { href: "/", label: "Início", description: "Visão geral do DS", category: "page" },
  { href: "/components", label: "Components", description: "Todos os 18 componentes", category: "page" },
  { href: "/exemplos", label: "Exemplos", description: "Páginas-template prontas", category: "page" },
  { href: "/playground", label: "Playground", description: "Tudo + theme switcher", category: "page" },
  { href: "/proof", label: "Theme proof", description: "3 themes lado-a-lado", category: "page" },
]

export const allItems: RegistryItem[] = [...pages, ...components]
