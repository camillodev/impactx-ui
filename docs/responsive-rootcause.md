# Responsive Root Cause Analysis

Read-only diagnóstico estrutural da responsividade do DS `@impactxlab/design-system` e dos showcases em `apps/web`.

## TL;DR

Quatro causas estruturais identificadas:

1. **Showcases usam grids hardcoded sem breakpoint prefix** — `grid-cols-3`/`grid-cols-4` aplicados sem `sm:`/`md:`, derretem em mobile (overflow horizontal ou colunas espremidas). 11 ocorrências em 6 arquivos.
2. **DS components são majoritariamente layout-passive** — 17 dos 22 components não têm responsividade própria (delegam ao consumidor), e o consumidor (showcases/templates) está aplicando layout não-responsivo (causa #1).
3. **DataTable não tem fallback mobile** — usa `overflow-hidden` no wrapper (`data-table.tsx:81`), que corta colunas em viewport estreito sem oferecer scroll horizontal nem stack vertical.
4. **Tipografia sem escala fluida** — 30+ headings (`text-2xl`/`text-3xl`/`text-4xl`) sem responsive variants nem `clamp()`. Zero ocorrências de `clamp()` no projeto.

Plano de fixação concreto em 3 PRs sequenciais ao final.

## 1. Components: responsive coverage (22 total)

Componentes em `packages/ds-education/src/components/`.

### (A) Responsive — usa breakpoints OR min-w-0/truncate explícito (6)
- `banner-cta.tsx` — `flex-col md:flex-row`, `text-center md:text-left`, `lg:px-8 lg:py-8`, `md:order-first/last`, `md:w-auto`, `md:items-start`
- `breadcrumb.tsx` — `flex-wrap`
- `code-block.tsx` — `overflow-x-auto` no `<pre>`
- `command-palette.tsx` — `hidden md:inline-flex` (kbd hint), `min-w-0 flex-1` + `truncate` em items
- `modal.tsx` — `max-md:px-6`, `max-md:flex-col`, `max-md:gap-6`, `min-w-0 flex flex-col` em content, `max-md:w-full` em sidebar
- `tooltip.tsx` — `max-w-[240px]` (constraint OK pra tooltip flutuante)

### (B) Width-fixed / layout sem fallback responsivo (2)
- `data-table.tsx` — wrapper `overflow-hidden rounded-xl` (linha 81). `<table className="w-full text-sm">` sem container scroll. Em mobile, colunas espremem ou o conteúdo é cortado. **Não tem fallback stack**.
- `toast.tsx` — `min-w-[320px] max-w-[400px]`. Em viewports < 320px (raro mas existe) força overflow horizontal.

### (C) Layout-passive — sem layout próprio (responsividade depende do consumidor) (14)
- `assessment-card.tsx`
- `avatar.tsx` (apenas size variants sm/md/lg/xl — não breakpoints)
- `badge.tsx` (apenas size variants)
- `button.tsx` (apenas size variants)
- `card.tsx`
- `chart.tsx` (`w-full` no container — bom, mas grid no consumidor)
- `chip.tsx` (apenas size variants)
- `help-fab.tsx`
- `icon-button.tsx` (apenas size variants)
- `input.tsx`
- `pagination.tsx`
- `progress-bar.tsx` (`w-full` — OK)
- `separator.tsx`
- `stat.tsx`
- `tabs.tsx`

> Nota: `avatar/badge/button/chip/icon-button` usam `sm:`/`md:`/`lg:` como **nomes de variants de tamanho**, não como breakpoints Tailwind. Por isso entram em (C), não em (A).

**Diagnóstico:** A maioria dos componentes do DS é layout-passive (correto pra um DS atômico). O problema NÃO está nos átomos — está em (i) DataTable (organism) sem fallback mobile, (ii) ausência de helpers/primitives responsivos no DS, e (iii) showcases aplicando grids fixos sobre componentes layout-passive.

## 2. Utility classes / tokens

**Existentes** (em `apps/web/src/app/globals.css` + `packages/ds-education/src/styles.css`):
- Apenas import de tokens (cores, fontes, themes — base.css/education.css/kumon.css/impactx.css)
- Policy de text-overflow: seletores `[data-ellipsis]`, `[data-clamp="2"]`, `[data-clamp="3"]` para clamp opt-in
- `box-sizing: border-box` global

**Gaps:**
- ZERO container queries (`@container` / `container-type`) — confirmado por grep em todo `packages/ds-education/src`
- ZERO uso de `clamp()` em todo o repo (typography, spacing, sizes)
- Nenhuma utility class responsiva do tipo `responsive-grid`, `stack-on-mobile`, `safe-flex-min` (`min-w-0` default em flex children)
- Nenhuma media query custom

## 3. Showcases / templates: grids hardcoded

**Arquivos com `grid-cols-N` SEM prefixo de breakpoint (anti-pattern):** 6 arquivos, 11 ocorrências.

- `apps/web/src/app/components/card/page.tsx:18` — `grid grid-cols-3 gap-5`
- `apps/web/src/app/components/card/page.tsx:62` — `grid grid-cols-2 gap-5`
- `apps/web/src/app/components/tooltip/page.tsx:18` — `grid grid-cols-3 gap-6 max-w-3xl`
- `apps/web/src/app/components/donut/page.tsx:38` — `... grid grid-cols-4 gap-6`
- `apps/web/src/app/components/stat/page.tsx:17` — `grid grid-cols-4 gap-4`
- `apps/web/src/app/components/stat/page.tsx:31` — `grid grid-cols-4 gap-4`
- `apps/web/src/app/components/stat/page.tsx:69` — `grid grid-cols-4 gap-4`
- `apps/web/src/app/components/stat/page.tsx:83` — `grid grid-cols-2 gap-4`
- `apps/web/src/app/components/badge/page.tsx:35` — `grid grid-cols-3 gap-6`
- `apps/web/src/app/components/charts/page.tsx:31` — `... grid grid-cols-4 gap-6 items-center`
- `apps/web/src/app/components/charts/page.tsx:64` — `... grid grid-cols-2 gap-6`

**Padrão correto (já aplicado em alguns showcases):** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` — exemplo bom em `apps/web/src/app/templates/education/matricula/page.tsx:134` e `apps/web/src/app/components/category-card/page.tsx`.

**Substituição mecânica recomendada:**
- `grid-cols-2` → `grid-cols-1 sm:grid-cols-2`
- `grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- `grid-cols-4` → `grid-cols-2 sm:grid-cols-2 lg:grid-cols-4` (ou `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)

## 4. Tipografia

**Headings sem responsive scale:** 30+ ocorrências (h1 com `text-2xl`/`text-3xl`/`text-4xl` sem variants). Exemplos:
- `apps/web/src/app/page.tsx:15` — `text-4xl font-bold` (root da home)
- `apps/web/src/app/components/page.tsx:78` — `!text-4xl tracking-tight`
- `apps/web/src/app/components/subject-stat-card/page.tsx:8` — `text-3xl font-semibold` (e mesmo padrão em donut-score, question-row, separator, cta-banner, hero-banner, category-card, assessment-header, campo-card, command-palette, big-card, progress-bar, assessment-list-item)
- 16+ páginas com `text-2xl font-semibold` em h1

**Uso de `clamp()`:** ZERO ocorrências em todo o repo.

**Recomendação concreta:**
- H1 page-level: substituir `text-3xl` / `text-4xl` por `text-2xl md:text-3xl lg:text-4xl`
- OU adicionar utility `[data-fluid-h1]` em `globals.css`:
  ```css
  [data-fluid-h1] { font-size: clamp(1.5rem, 3.5vw, 2.25rem); line-height: 1.15; }
  [data-fluid-h2] { font-size: clamp(1.25rem, 2.8vw, 1.875rem); line-height: 1.2; }
  ```
- Body/prose mantém Tailwind tokens (já fluido suficiente em `text-sm`/`text-base`).

## 5. Charts

`packages/ds-education/src/components/chart.tsx`:
- **Resize handler:** SIM — `new ResizeObserver(() => inst.resize())` observando `containerRef.current` (linha 77-78). Bom.
- **Container width:** `100%` — `className={cn("w-full", className)}` no `EChart` (linha 97). Bom.
- **Problema potencial:** `DonutChart` força `style={{ width: showLegend ? "100%" : size, height: size }}` (linha 222) — quando `size=180` (default) e legend desligada, container fica fixo em 180px. OK pro caso de uso (donut score), mas vira width-fixed quando o consumidor quer responsividade total.

**Recomendação:**
- Manter `ResizeObserver` (já correto).
- Em `DonutChart`, considerar prop `responsive?: boolean` que troca `width: size` por `width: "100%"` mantendo aspect ratio via container parent.
- Charts já são bem responsivos a nível de SDK; problema é o **grid container** dos showcases (causa #1).

---

## Recomendações estruturais (ordem de impacto)

### P0 — DS layer (impacto: imediato, alto)
1. **DataTable: alternativa mobile.** Em `packages/ds-education/src/components/data-table.tsx:81`, trocar wrapper `overflow-hidden` por:
   ```tsx
   "rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-x-auto"
   ```
   E (opcional, melhor UX) adicionar prop `mobileBreakpoint?: "stack" | "scroll"` que renderiza cards stacked em `< md`.
2. **Stat: helper grid responsivo.** Criar export `Stat.Grid` em `packages/ds-education/src/components/stat.tsx` com default `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` — substitui o pattern repetido nos showcases.
3. **Min-w-0 default em flex children críticos** dos atoms que recebem texto truncável: já presente em `command-palette` e `modal`; replicar em `assessment-card`, `card` (CardContent quando flex), e qualquer organism que use `flex-1` com texto.

### P1 — Utility classes (em `apps/web/src/app/globals.css`)
1. Adicionar utilities responsivas reutilizáveis:
   ```css
   .responsive-grid-2-4 { display: grid; gap: 1rem;
     grid-template-columns: repeat(1, minmax(0, 1fr)); }
   @media (min-width: 640px) { .responsive-grid-2-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
   @media (min-width: 1024px) { .responsive-grid-2-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
   .stack-on-mobile { display: flex; flex-direction: column; gap: 1rem; }
   @media (min-width: 768px) { .stack-on-mobile { flex-direction: row; } }
   [data-fluid-h1] { font-size: clamp(1.5rem, 3.5vw, 2.25rem); line-height: 1.15; }
   [data-fluid-h2] { font-size: clamp(1.25rem, 2.8vw, 1.875rem); line-height: 1.2; }
   ```

### P2 — Convention / lint
1. Documentar em `docs/design-principles.md`: regra "todo `grid-cols-N` com N>1 deve ter prefixo de breakpoint OU usar `.responsive-grid-*` utility".
2. (Opcional) ESLint custom rule `no-naked-grid-cols` que falha em `className` containing `grid-cols-[2-9]` sem prefixo `sm:`/`md:`/`lg:`.

---

## Plano de ação proposto

3 PRs sequenciais (próximas waves):

1. **`feat(ds): responsive primitives`**
   - Add utility classes (`.responsive-grid-2-4`, `.stack-on-mobile`, `[data-fluid-h1/h2]`) em `apps/web/src/app/globals.css`
   - Add `Stat.Grid` helper em `packages/ds-education/src/components/stat.tsx`
   - Add `min-w-0` em flex children dos organisms (assessment-card, card, modal headers já OK)
   - Doc em `docs/design-principles.md`

2. **`fix(ds): components responsive`**
   - DataTable: trocar `overflow-hidden` por `overflow-x-auto`; adicionar prop `mobileBreakpoint` opcional com fallback stack
   - Tipografia fluida: substituir `text-3xl`/`text-4xl` em headings de page por `text-2xl md:text-3xl lg:text-4xl`
   - DonutChart: prop `responsive` opcional

3. **`chore: refactor showcases`**
   - Substituir as 11 ocorrências de `grid-cols-N` sem breakpoint pelas variantes responsivas (ou pela utility `.responsive-grid-2-4`)
   - Aplicar utility `[data-fluid-h1]` ou Tailwind responsive variants em todos os h1 das showcase pages
