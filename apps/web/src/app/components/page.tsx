import Link from "next/link"
import {
  Square,
  Circle,
  Layers,
  MessageSquare,
  Bell,
  PanelTop,
  PieChart,
  User,
  MousePointerClick,
  ChevronsRight,
  TextCursorInput,
  ListOrdered,
  TrendingUp,
  Tag,
  Megaphone,
  BarChart3,
  Table,
  FileText,
  SquareStack,
} from "lucide-react"

type Item = {
  slug: string
  label: string
  desc: string
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>
}

const groups: { title: string; subtitle: string; items: Item[] }[] = [
  {
    title: "Atoms",
    subtitle: "Elementos base do DS — UI primitives",
    items: [
      { slug: "button",      label: "Button",      desc: "7 variants × 3 sizes",          Icon: Square },
      { slug: "icon-button", label: "IconButton",  desc: "Square / circle, ghost/filled", Icon: MousePointerClick },
      { slug: "badge",       label: "Badge",       desc: "5 variants pastel",             Icon: Circle },
      { slug: "avatar",      label: "Avatar",      desc: "Image + fallback iniciais",     Icon: User },
      { slug: "breadcrumb",  label: "Breadcrumb",  desc: "Hierarquia de navegação",       Icon: ChevronsRight },
      { slug: "input",       label: "Input",       desc: "Label, error, leading icon",    Icon: TextCursorInput },
      { slug: "pagination",  label: "Pagination",  desc: "Numérica + prev/next",          Icon: ListOrdered },
      { slug: "tabs",        label: "Tabs",        desc: "Navegação horizontal",          Icon: PanelTop },
      { slug: "tooltip",     label: "Tooltip",     desc: "Top / Right / Bottom / Left",   Icon: MessageSquare },
      { slug: "card",        label: "Card",        desc: "Container com Header/Title/Content", Icon: SquareStack },
    ],
  },
  {
    title: "Molecules",
    subtitle: "Composições de atoms — building blocks",
    items: [
      { slug: "stat",        label: "Stat",        desc: "Label + valor + delta",         Icon: TrendingUp },
      { slug: "chip",        label: "Chip",        desc: "Chip + SegmentedControl",       Icon: Tag },
      { slug: "banner-cta",  label: "BannerCTA",   desc: "Banner full-width com CTA",     Icon: Megaphone },
      { slug: "modal",       label: "Modal",       desc: "Default / Welcome / Split",     Icon: Layers },
      { slug: "toast",       label: "Toast",       desc: "Success / Info / Warn / Error", Icon: Bell },
    ],
  },
  {
    title: "Charts",
    subtitle: "Wrappers Apache ECharts — lazy-loaded",
    items: [
      { slug: "charts",      label: "Charts",      desc: "Donut / Bar / Line / Area",     Icon: BarChart3 },
      { slug: "donut",       label: "Donut score", desc: "Educacional (legacy)",          Icon: PieChart },
    ],
  },
  {
    title: "Organisms",
    subtitle: "Estruturas complexas com lógica interna",
    items: [
      { slug: "data-table",      label: "DataTable",      desc: "Sort, density, loading, empty", Icon: Table },
      { slug: "assessment-card", label: "AssessmentCard", desc: "Card com 5 status",             Icon: FileText },
    ],
  },
]

const totalCount = groups.reduce((acc, g) => acc + g.items.length, 0)

export default function ComponentsIndex() {
  return (
    <div className="px-10 py-12 max-w-[1200px] mx-auto">
      <div className="text-sm text-[var(--color-text-muted)] mb-2">Impact X DS</div>
      <h1 className="text-4xl font-bold text-[var(--color-text)] tracking-tight mb-2">
        Components
      </h1>
      <p className="text-base text-[var(--color-text-muted)] mb-10">
        {totalCount} componentes organizados por papel —{" "}
        atoms são primitivas, molecules combinam atoms, organisms compõem features inteiras.
      </p>

      {groups.map((group) => (
        <section key={group.title} className="mb-12">
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">{group.title}</h2>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              {group.items.length}
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">{group.subtitle}</p>

          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
            {group.items.map(({ slug, label, desc, Icon }) => (
              <Link
                key={slug}
                href={`/components/${slug}`}
                className="group relative aspect-square rounded-2xl p-6 overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] text-[var(--color-primary-fg)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)",
                }}
              >
                <svg
                  aria-hidden
                  className="absolute -right-12 -bottom-12 opacity-15 transition-transform duration-300 group-hover:scale-110"
                  width={220}
                  height={220}
                  viewBox="0 0 200 200"
                >
                  <circle cx={100} cy={100} r={90} fill="none" stroke="white" strokeWidth={1.5} />
                  <circle cx={100} cy={100} r={60} fill="none" stroke="white" strokeWidth={1.5} />
                </svg>

                <Icon size={40} strokeWidth={1.5} style={{ position: "relative" }} />

                <div className="relative min-w-0">
                  <div data-card-title className="text-xl font-bold leading-tight">{label}</div>
                  <div data-card-desc className="text-[13px] opacity-85 mt-1">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

    </div>
  )
}
