---
"@impactx/ds-education": minor
---

Add `.impactx/` declarative AI contract, layout primitives, and page templates.

**Layout primitives** (new):
- `<Grid>` — responsive declarative grid (cols={3} or {base:1, md:2, lg:3})
- `<Stack>` — flex container with consistent gap, vertical or horizontal
- `<Cluster>` — flex with automatic wrap (Every Layout pattern)
- `<PageContainer>` — page wrapper with typed max-width and responsive padding

**Composite components** (new):
- `<DataTableWithPagination>` — DataTable + Pagination + internal state

**Page templates** (new):
- `<ListPageTemplate>` — header + filters + primaryAction + body
- `<DetailPageTemplate>` — back link + title + sidebar (optional) + main
- `<FormPageTemplate>` — header + form (with onSubmit) + actions footer
- `<DashboardTemplate>` — metrics row + controls + actions + charts area

**Declarative AI contract** (`.impactx/`):
- Pattern inspired by Lovable's `.lovable/` + Vercel AI-Native DS
- `system.md` always-loaded base context
- `rules/{components,primitives,templates,styling}/*.md` loaded on-demand
- Bot consumers read rules before generating UI
