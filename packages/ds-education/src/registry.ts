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
  { href: "/components/avatar",      label: "Avatar",      description: "Image + fallback iniciais",     category: "atom", keywords: ["user", "profile", "image"] },
  { href: "/components/breadcrumb",  label: "Breadcrumb",  description: "Hierarquia de navegação",       category: "atom", keywords: ["nav", "path"] },
  { href: "/components/input",       label: "Input",       description: "Label, error, leading icon",    category: "atom", keywords: ["text", "field", "form"] },
  { href: "/components/pagination",  label: "Pagination",  description: "Numérica + prev/next",          category: "atom", keywords: ["pages", "nav"] },
  { href: "/components/tabs",        label: "Tabs",        description: "Navegação horizontal",          category: "atom" },
  { href: "/components/tooltip",     label: "Tooltip",     description: "Top / Right / Bottom / Left",   category: "atom", keywords: ["hint", "popup"] },

  // Molecules
  { href: "/components/stat",        label: "Stat",        description: "Label + valor + delta",         category: "molecule", keywords: ["kpi", "metric", "number"] },
  { href: "/components/chip",        label: "Chip",        description: "Chip + SegmentedControl",       category: "molecule", keywords: ["filter", "segmented", "tag"] },
  { href: "/components/banner-cta",  label: "BannerCTA",   description: "Banner full-width com CTA",     category: "molecule", keywords: ["promo", "hero", "callout"] },
  { href: "/components/modal",       label: "Modal",       description: "Default / Welcome / Split",     category: "molecule", keywords: ["dialog", "popup", "overlay"] },
  { href: "/components/toast",       label: "Toast",       description: "Success / Info / Warn / Error", category: "molecule", keywords: ["notification", "snackbar"] },

  // Charts
  { href: "/components/charts",      label: "Charts",      description: "Donut / Bar / Line / Area",     category: "chart", keywords: ["echarts", "graph", "viz"] },
  { href: "/components/donut",       label: "Donut score", description: "Educacional (legacy)",          category: "chart", keywords: ["pie", "score"] },

  // Organisms
  { href: "/components/data-table",      label: "DataTable",      description: "Sort, density, loading, empty", category: "organism", keywords: ["table", "grid", "list"] },
  { href: "/components/assessment-card", label: "AssessmentCard", description: "Card com 5 status",             category: "organism", keywords: ["card", "course", "test"] },
  { href: "/components/card",            label: "Card",           description: "Container com Header/Title/Content", category: "atom", keywords: ["container", "panel"] },
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
