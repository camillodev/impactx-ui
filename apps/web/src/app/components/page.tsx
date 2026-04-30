import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  components as registryComponents,
  type RegistryItem,
} from "@impactx/ds-education"

// TODO: showcase routes para os 10 organisms de components-education ainda
// não existem em apps/web/src/app/components/<slug>/page.tsx — escopo de PR
// separada (audit em docs/atomic-design-audit.md). Cards de education renderizam
// mas vão 404 no click até as rotas serem criadas.

// TODO: extrair como molecule `PageHeader` quando padrão se repetir em mais
// páginas de showcase (audit já mapeou).

type CategoryKey = "atom" | "molecule" | "chart" | "organism"

const categoryMeta: Record<
  CategoryKey,
  { title: string; subtitle: string; badgeVariant: "primary" | "ink" | "success" | "warning" }
> = {
  atom: {
    title: "Atoms",
    subtitle: "Elementos base do DS — UI primitives",
    badgeVariant: "primary",
  },
  molecule: {
    title: "Molecules",
    subtitle: "Composições de atoms — building blocks",
    badgeVariant: "ink",
  },
  chart: {
    title: "Charts",
    subtitle: "Wrappers Apache ECharts — lazy-loaded",
    badgeVariant: "success",
  },
  organism: {
    title: "Organisms",
    subtitle: "Estruturas complexas com lógica interna",
    badgeVariant: "warning",
  },
}

const categoryOrder: CategoryKey[] = ["atom", "molecule", "chart", "organism"]

function groupByCategory(items: RegistryItem[]) {
  const groups: Record<CategoryKey, RegistryItem[]> = {
    atom: [],
    molecule: [],
    chart: [],
    organism: [],
  }
  for (const item of items) {
    if (item.category in groups) {
      groups[item.category as CategoryKey].push(item)
    }
  }
  return groups
}

export default function ComponentsIndex() {
  const groups = groupByCategory(registryComponents)
  const totalCount = registryComponents.length

  return (
    <div className="px-10 py-12 max-w-[1200px] mx-auto">
      {/* Header — usa Card do DS pra evitar HTML cru estrutural */}
      <Card className="mb-10 !shadow-none !border-0 !bg-transparent">
        <CardHeader className="!p-0">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">
            Impact X DS
          </div>
          <CardTitle className="!text-4xl tracking-tight mb-2">
            Components
          </CardTitle>
        </CardHeader>
        <CardContent className="!p-0">
          <p className="text-base text-[var(--color-text-muted)]">
            {totalCount} componentes organizados por papel — atoms são primitivas,
            molecules combinam atoms, organisms compõem features inteiras.
          </p>
        </CardContent>
      </Card>

      {categoryOrder.map((key) => {
        const items = groups[key]
        if (items.length === 0) return null
        const meta = categoryMeta[key]

        return (
          <section key={key} className="mb-12">
            <div className="flex items-baseline gap-3 mb-1">
              <CardTitle className="!text-2xl">
                {meta.title}
              </CardTitle>
              <Badge variant={meta.badgeVariant} size="sm">
                {items.length}
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              {meta.subtitle}
            </p>
            <Separator className="!h-px mb-5" />

            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-lg)]"
                >
                  <Card className="h-full transition-shadow duration-200 group-hover:shadow-[var(--shadow-lg)]">
                    <CardHeader className="!pb-3 flex flex-row items-start justify-between gap-3">
                      <CardTitle className="!text-lg leading-tight">
                        {item.label}
                      </CardTitle>
                      <Badge variant={meta.badgeVariant} size="sm">
                        {item.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="!pt-0">
                      <p className="text-sm text-[var(--color-text-muted)] leading-snug">
                        {item.description}
                      </p>
                      {item.exampleType === "education" && (
                        <div className="mt-3">
                          <Badge variant="ink" size="sm">
                            education
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
