# Responsive Root Cause Analysis

> Análise read-only sobre por que o DS Impact X quebra em viewports menores.
> Branch: `chore/responsive-rootcause-investigation` · Data: 2026-04-29
> Escopo investigado: `packages/ds-education/src/components/` (22 components),
> `apps/web/src/app/components/<slug>/page.tsx` (33 showcases),
> `apps/web/src/app/templates/education/<slug>/page.tsx` (6 templates),
> `packages/ds-education/src/styles.css`, `apps/web/src/app/globals.css`.

## TL;DR — 4 causas estruturais

1. **Showcases (e a maioria das templates) usam `grid-cols-N` hardcoded sem prefixo de breakpoint.** Em mobile o grid não colapsa para 1-coluna — colunas espremem o conteúdo. **Esta é a causa #1 das "palavras saindo do gráfico" relatadas pelo Rafa**, porque os gráficos vivem dentro desses grids.
2. **Layer de utility/tokens responsive é inexistente.** `packages/ds-education/src/styles.css` tem 5 linhas (só re-imports). `apps/web/src/app/globals.css` tem zero `@media`, zero `@container`, zero `clamp()`, zero classe `.responsive-grid` / `.stack-on-mobile`. Sem primitivas DS, cada showcase reinventa (mal) responsive.
3. **Componentes layout-heavy (`DataTable`, `Stat`, `BannerCTA`) não têm responsive variants próprias** e nem proteção contra overflow (`min-w-0` em flex children, `overflow-x-auto` em tables). DataTable estoura em mobile, Stat com `text-[30px]` fixo + label sem `min-w-0` deixa label vazar.
4. **Tipografia 100% step-based (`text-3xl/4xl/5xl`) sem fluid scaling (`clamp()`) e sem responsive variants.** 13 headings de showcase usam `text-3xl` direto; `subject-stat-card.tsx` usa `text-5xl` hardcoded — esses ficam grandes demais em ≤375px mas não diminuem.

## 1. Components (`packages/ds-education/src/components/`) — responsive coverage

22 components classificados:

### (A) Responsive built-in — 6
Têm breakpoints relevantes ou layout collapse-friendly:
- `banner-cta.tsx` — `flex-col md:flex-row`, gap responsive
- `modal.tsx` — `w-[70vw] max-w-[960px]` + `max-md:w-full` no detail panel (linha 311)
- `command-palette.tsx` — overlay, max-w controlado
- `button.tsx`, `icon-button.tsx`, `chip.tsx` — sizing por variant, ok em qualquer viewport
- `avatar.tsx` — sizes fixos pequenos, ok

### (B) Width-fixed problemáticos — 4
Hardcode width sem proteção apropriada:
- `data-table.tsx` — **zero responsive**, `<table className="w-full">` sem `overflow-x-auto` no wrapper. Em mobile com 6+ colunas estoura container e empurra layout. Linhas 78–85.
- `toast.tsx` — `min-w-[320px] max-w-[400px]` (linha 20). OK pra toast (overlay), mas em viewport <340px corta.
- `tooltip.tsx` — `max-w-[240px]` (linha 37). OK porque é overlay com auto-position, baixo risco.
- `stat.tsx` — `text-[30px]` valor + flex sem `min-w-0` nos children (linhas 45-55). Label longa estoura, valor não escala. Este é o componente que mais aparece em grids de showcase, multiplica o problema.

### (C) Layout-passive — 12
Não tem layout próprio (só estilo); responsividade depende do consumidor:
`badge`, `breadcrumb`, `card`, `code-block`, `help-fab`, `input`, `pagination`, `progress-bar`, `separator`, `tabs`, `assessment-card`, `chart`.

> Nota chart: `chart.tsx` é OK — usa `ResizeObserver` (linha 77) e `w-full` no container (linha 97). O problema do "palavras saindo do gráfico" **NÃO** está no chart em si; está em (a) o grid que espreme o card que contém o chart abaixo do tamanho mínimo de leitura, e (b) labels do ECharts não têm rotate/hide automáticos quando largura é insuficiente. ECharts default trunca/sobrepõe.

**Diagnóstico section 1:** dos 22, só 6 são realmente responsive. Os 4 width-fixed problemáticos são exatamente os que mais aparecem em templates (DataTable, Stat). A camada DS é majoritariamente "passive" — empurra a responsabilidade pro consumidor sem dar primitives.

## 2. Utility classes / tokens

**Estado atual:**

`packages/ds-education/src/styles.css` (5 linhas):
```css
@import "./tokens/base.css";
@import "./tokens/themes/education.css";
/* ... outros 3 imports de theme ... */
```
Nada além de re-imports.

`apps/web/src/app/globals.css` (61 linhas) tem só:
- Tailwind import
- Font imports
- Box-sizing reset
- Política de ellipsis (`[data-clamp]`, `.truncate`)

**Verificações:**
- `@media` → 0 ocorrências
- `@container` → 0 ocorrências
- `clamp(` → 0 ocorrências em todo o repo (`grep -r clamp\\(`)
- `.responsive-grid`, `.stack-on-mobile`, `[data-grid-responsive]` → não existem
- `min-w-0` aplicado por default em flex items → não

**Gap:** **a layer DS não fornece nenhuma primitiva responsive**. Falta:
- `.responsive-grid-2-4` (1 → 2 → 4 cols por breakpoint)
- `.responsive-grid-1-3` (1 → 2 → 3)
- `.stack-on-mobile` (flex-col em <md, flex-row em ≥md)
- `min-w-0` default em flex children via global CSS (`[role="row"] > *, .flex > *` etc.) ou via componente Stack/HStack
- Tipografia fluid via `--font-size-h1: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` em base.css
- Container queries pra cards (importante: stat/card colapsa o layout interno baseado no próprio width, não no viewport)

## 3. Showcases / templates: grids hardcoded

**Anti-pattern:** `grid grid-cols-N` sem prefix de breakpoint força N colunas em qualquer viewport.

Arquivos com pelo menos um grid hardcoded (count = ocorrências):

- `apps/web/src/app/components/card/page.tsx` (2: `grid-cols-3`, `grid-cols-2`)
- `apps/web/src/app/components/badge/page.tsx` (1: `grid-cols-3`)
- `apps/web/src/app/components/tooltip/page.tsx` (1: `grid-cols-3`)
- `apps/web/src/app/components/charts/page.tsx` (2: `grid-cols-4`, `grid-cols-2`) — onde o Rafa viu palavras saindo
- `apps/web/src/app/components/stat/page.tsx` (4: 3× `grid-cols-4`, 1× `grid-cols-2`)
- `apps/web/src/app/components/donut/page.tsx` (1: `grid-cols-4`)

**Total: 6 arquivos, 11 grid-cols hardcoded sem breakpoint.**

Templates estão melhor (`grid-cols-1 md:grid-cols-N`), mas alguns saltam direto pra 4 cols sem passo intermediário em md/lg:
- `relatorio-visao-geral/page.tsx`: `grid-cols-1 gap-4 md:grid-cols-4` — em tablet (md) já vai pra 4 cols, comprime cards.
- `diagnostica-ano/page.tsx`: igual.
- `avaliacoes/page.tsx`: `grid-cols-1 gap-4 md:grid-cols-3` — ok, mas card content pode estourar.

Templates com responsive ok: `relatorio-visao-geral` (linhas 45, 77 com 1→3 e 1→2).

**Diagnóstico section 3:** os showcases servem como referência visual / spec implícita do DS — se eles ensinam grid hardcoded, devs replicam. Esta é a mais alta alavanca pra resolver percepção de "DS quebra em mobile".

## 4. Tipografia

**Headings `text-3xl/4xl/5xl/6xl` sem responsive variants:**

- 13 ocorrências de `text-3xl font-semibold` em `<h1>` de showcases (`progress-bar`, `separator`, `hero-banner`, `category-card`, etc.) — todas iguais, sem `md:text-4xl`
- `apps/web/src/app/page.tsx`: `text-4xl font-bold` no h1 root
- `apps/web/src/app/components/page.tsx:78`: `!text-4xl tracking-tight`
- `packages/ds-education/src/components-education/hero-banner.tsx:68`: `text-5xl font-bold` hardcoded
- `packages/ds-education/src/components-education/subject-stat-card.tsx:31,48`: `text-3xl`/`text-5xl` hardcoded

**Uso de `clamp()`:** **0 (zero) em todo o repo**.

**Recomendação:** introduzir tokens de tipografia fluid em `tokens/base.css`:
```css
--font-size-display: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
--font-size-h1: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
--font-size-h2: clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem);
```
e expor via Tailwind theme: `text-display`, `text-h1`, `text-h2`. Pessoas que usam `text-3xl` direto deveriam migrar pra esses tokens.

## 5. Charts

`packages/ds-education/src/components/chart.tsx` analisado integralmente.

- **Resize handler:** sim, `ResizeObserver` em `EChart` (linha 77-78), `inst.resize()` chamado.
- **Container width:** ok, `cn("w-full", className)` (linha 97).
- **DonutChart:** `style={{ width: showLegend ? "100%" : size, height: size }}` — quando `showLegend=false`, container é fixo em `size` (default 180px). OK pra donut isolado, mas dentro de grid colapsa só se consumidor passa width 100%.
- **BarChart / LineChart:** delegam pra EChart, herdam `w-full` + ResizeObserver.

**Conclusão:** o wrapper EChart está correto. O problema reportado pelo Rafa de "palavras saindo do gráfico" tem 2 origens reais:

a) Container ancestral (grid) é estreito demais → ECharts não tem espaço pro axisLabel → ECharts NÃO rotaciona automaticamente. Solução: configurar `xAxis.axisLabel.rotate: 30` ou `interval: 'auto'` + `hideOverlap: true` nos opts default do `BarChart`/`LineChart`. Isso é fix de DS, não de showcase.

b) Em `BarChart` e `LineChart` o `grid` do echarts usa `left: 8, right: 8/16`. Em containers ≤320px, label do yAxis pode sumir/cortar. `containLabel: true` (linha 272/323) ajuda, mas com `left:8` ainda é apertado em mobile. Recomendação: `left: 0, right: 0` + `containLabel: true`.

## Recomendações estruturais (por impacto)

### P0 — DS layer fixes

1. **DataTable: wrap em `<div className="overflow-x-auto">`** (`packages/ds-education/src/components/data-table.tsx` linha 78-85). Adicionar `min-w-[640px]` na `<table>` pra garantir tabela legível scrollando lateralmente em mobile. Custo: 2 linhas.
2. **Stat: adicionar `min-w-0` no flex parent + `truncate` no label, e trocar `text-[30px]` por `text-2xl md:text-[30px]` (ou token fluid)** (`stat.tsx` linhas 45-58). Custo: 4 linhas.
3. **Charts (BarChart/LineChart) defaults:** `axisLabel: { rotate: 0, hideOverlap: true, interval: 'auto' }` em `xAxis`; `grid.left: 0, right: 4` (`chart.tsx` linhas 254-273, 324-338). Custo: 6 linhas.
4. **HeroBanner / SubjectStatCard: trocar `text-5xl` hardcoded por token fluid** (`packages/ds-education/src/components-education/hero-banner.tsx:68`, `subject-stat-card.tsx:31,48`).

### P1 — Utility primitives (novo arquivo `packages/ds-education/src/responsive.css` importado em base)

1. Adicionar classes utility no DS:
   - `.ds-grid-1-2-4` → `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
   - `.ds-grid-1-3` → `grid grid-cols-1 md:grid-cols-3 gap-4`
   - `.ds-grid-1-2` → `grid grid-cols-1 md:grid-cols-2 gap-4`
   - `.ds-stack` → `flex flex-col md:flex-row gap-4`
2. Tokens fluid em `packages/ds-education/src/tokens/base.css`:
   - `--font-size-display`, `--font-size-h1`, `--font-size-h2`, `--font-size-h3` via `clamp()`
   - Expor em Tailwind theme via tailwind preset
3. Global rule: `[data-flex] > *, .flex > * { min-width: 0; }` (controverso — discutir antes de aplicar global).

### P2 — Convention + lint

1. Atualizar `docs/design-principles.md`: seção "Responsive" obrigatória — showcases SEMPRE usam `.ds-grid-*` ou breakpoint prefix.
2. ESLint custom rule (ou regex grep no CI) banindo `\bgrid-cols-[2-9]\b(?!.*\b(sm|md|lg|xl):)` em `apps/web/**/*.tsx`.
3. Adicionar viewport snapshots no Storybook/showcase: 320, 640, 1024, 1440. Quebra de qualquer um falha CI.

## Plano de ação proposto — 3 PRs sequenciais

1. **`feat(ds): responsive primitives`** (P1)
   - Novo `packages/ds-education/src/responsive.css` com `.ds-grid-*`, `.ds-stack`
   - Tokens fluid em `tokens/base.css`
   - Tailwind preset expõe `text-display`, `text-h1`...
   - Doc em `design-principles.md` Responsive section
2. **`fix(ds): componentes ganham responsive defaults`** (P0)
   - DataTable wrap `overflow-x-auto`
   - Stat `min-w-0` + truncate + tipografia fluid
   - Charts default rotate label + grid edges
   - HeroBanner / SubjectStatCard trocam hardcoded → token
3. **`chore(showcase): replace hardcoded grids + lint guard`** (P2)
   - 6 showcases com `grid-cols-N` viram `ds-grid-*`
   - CI grep guard contra anti-pattern
   - Snapshot tests viewport 320/640/1024

Cada PR é review-friendly (≤15 arquivos), e a ordem garante que (1) cria primitivas, (2) componentes consumem, (3) showcases adotam. Reverter um PR não quebra os anteriores.

## Apêndice — comandos verificados

```bash
# Showcases com grid-cols-N hardcoded
grep -rn 'grid-cols-[0-9]' apps/web/src/app/components apps/web/src/app/templates \
  | grep -v 'sm:\|md:\|lg:\|xl:'

# Verificar zero clamp() no repo
grep -rn 'clamp(' apps/ packages/ docs/  # → 0 results

# Componentes com width hardcoded
grep -rn 'w-\[[0-9]\+px\]\|min-w-\[[0-9]\+px\]' packages/ds-education/src/components/

# Headings text-3xl+ sem responsive
grep -rn 'text-[3-6]xl' apps/web/src/app/components | grep -v 'md:text-\|lg:text-'
```
