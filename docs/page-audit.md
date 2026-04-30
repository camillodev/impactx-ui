# Page Audit — apps/web

- **Generated:** 2026-04-30T08:05:00Z
- **Base URL:** http://localhost:3002
- **Method:** Playwright MCP crawl + HTTP status sweep + DOM signals (read-only)
- **Auditor:** Caio (Claude Code, sessão chore/full-page-audit)

## Summary

- **Total URLs auditadas:** 31 (3 navigation + 6 templates + 22 components)
- **Pages OK (200):** 21
  - `/`, `/components`, e 19 component showcases
- **Pages com 404:** 10
  - `/playground`, 6 templates `/templates/education/*`, 3 components: `progress-bar`, `separator`, `command-palette`
- **Components listados em `/components` mas sem rota:** 10 (todos 404 — `assessment-header`, `assessment-list-item`, `big-card`, `campo-card`, `category-card`, `cta-banner`, `donut-score`, `hero-banner`, `question-row`, `subject-stat-card`)
- **Severidade — distribuição:**
  - 🔴 HIGH: 20 (16 dead route links + 1 charts não renderizam + 3 sidebar/home broken navigation)
  - 🟡 MED: 7 (showcase fraco, layout overflow, helper text styling)
  - 🟢 LOW: 2

## Discrepância de contagem

- Footer da sidebar diz **"18 components"** — mas `/components` lista **29** e somente **19 rotas existem**. Três fontes de verdade desalinhadas.

---

## Pages

### / (home) — Status 200 ✓
- Console errors: 0
- h1: "ds-impactx", subtítulo "Education DS · 6 templates SAS clonados…"
- Sidebar: 3 itens (Início, Components, Playground)
- Issues:
  - 🔴 **HIGH**: 6 dead links — todos os 6 cards de templates apontam para `/templates/education/*` (avaliacoes, catalogo, lista-diagnostica, diagnostica-ano, relatorio-visao-geral, relatorio-questoes) — todos retornam **404**.
  - 🔴 **HIGH**: link "Playground" na sidebar resolve para 404.
  - 🟢 LOW: footer "18 components" inconsistente com /components ("29 componentes organizados…").
- Screenshot: `audit-home.png`

### /components — Status 200 ✓
- Console errors: 0
- Headline: "29 componentes organizados por papel — atoms são primitivas, molecules combinam atoms, organisms compõem features inteiras."
- Issues:
  - 🔴 **HIGH**: 10 cards de componentes apontam para rotas 404 (assessment-header, assessment-list-item, big-card, campo-card, category-card, cta-banner, donut-score, hero-banner, question-row, subject-stat-card). Estão listados na taxonomia mas a rota dedicada não existe.
  - 🟡 MED: ausência de busca/filtro funcional inline; busca global existe mas só no header.
- Screenshot: `audit-components.png`

### /playground — Status 404 🔴
- Console: 1 error (404)
- Sidebar marca o item como ativo, body renderiza "404: This page could not be found."
- Issues:
  - 🔴 **HIGH**: nav item ativo, mas rota não existe. Confunde usuário e quebra confiança no menu.
- Screenshot: `audit-404-playground.png`

### /templates/education/{6 rotas} — todas 404 🔴
- Status: 404 em todas
- Issues:
  - 🔴 **HIGH**: home-page promete e linka 6 templates SAS clonados como base do DS — nenhum existe.
- Screenshot: `audit-404-template.png` (avaliacoes representa o cluster)

---

## Components — pages que existem (200)

Sinais coletados via DOM: nenhum tem heading explícita "Examples"/"Exemplos" — em vez disso usam variantes (Primary/Secondary/Sizes etc.). Funcionalmente equivalentes; pendente decisão se precisa seção dedicada de "uso composto com outros componentes".

### /components/button — 200 ✓
- h1 "Button"; 8 seções (Primary, Secondary, Tertiary, Tertiary Dark, Danger Primary/Secondary/Tertiary, Aliases legados)
- Showcase robusto: matriz size × icon × disabled.
- Issues: nenhum.
- Screenshot: `audit-button.png`

### /components/icon-button — 200 ✓
- h1 "IconButton"; 5 seções (Ghost, Filled, Outline, Danger, Em contexto — header actions)
- Issues: nenhum.
- Screenshot: `audit-icon-button.png`

### /components/badge — 200 ✓
- h1 "Badge"; 5 variants × 3 sizes × text-only/icon-left/icon-only
- Issues: nenhum.
- Screenshot: `audit-badge.png`

### /components/avatar — 200 ✓
- h1 "Avatar"; 4 seções (sizes circle, sizes rounded, with image, fallback)
- Issues: nenhum.
- Screenshot: `audit-avatar.png`

### /components/breadcrumb — 200 ✓
- h1 "Breadcrumb"; 3 seções (chevron, com home, slash)
- Issues:
  - 🟢 LOW: 6 dead anchors (href ausente). Esperado em demos — não é bug, mas vale aria-disabled ou href="#" explicit.
- Screenshot: `audit-breadcrumb.png`

### /components/input — 200 ✓
- h1 "Input"; 3 seções (Estados, Com ícones, Sem label)
- Issues:
  - 🟡 **MED**: helper text "Usaremos pra notificar atualizações" está renderizado em **azul** com aparência de link (underline ou cor de link). Helper deveria ser cinza/secundário. Verificar token de cor.
- Screenshot: `audit-input.png`

### /components/chip — 200 ✓
- h1 "Chip & SegmentedControl"; 5 seções
- Issues: nenhum.
- Screenshot: `audit-chip.png`

### /components/pagination — 200 ✓
- h1 "Pagination"; 3 seções (5 / 12 / 100 páginas)
- Issues: nenhum.
- Screenshot: `audit-pagination.png`

### /components/tooltip — 200 ✓
- h1 "Tooltip"; 2 seções (8 posições + delay, max-width longo)
- Issues:
  - 🟢 LOW: tooltips só ativam em hover — preview estático impossível, então usuário precisa interagir pra entender. Aceitável.
- Screenshot: `audit-tooltip.png`

### /components/card — 200 ✓
- h1 "Card"; 7 seções (estrutura, com badge, com ação, sem header, composição com Separator, configurações)
- Issues:
  - 🟢 LOW: seção menciona Separator mas Separator está 404 — referência a componente fantasma.
- Screenshot: `audit-card.png`

### /components/modal — 200 ✓
- h1 "Modal", subtítulo presente. **0 headings de seção.**
- Body conta 9 botões trigger (Simple, Confirm, Form, Welcome, Carousel, Split, Alert).
- Issues:
  - 🟡 **MED**: showcase **vazio em estado de repouso** — só os triggers aparecem. Sem preview/snippet/anatomia visível, sem código de uso. Compare com Button (matriz visual). Depende totalmente de interação do usuário.
  - 🟡 MED: triggers "Welcome" e "Carousel" parecem sem styling de variant (texto puro entre buttons styled), inconsistência visual.
- Screenshot: `audit-modal.png`

### /components/toast — 200 ✓
- h1 "Toast"; 2 seções (Tipos, Com descrição)
- Issues:
  - 🟡 **MED**: mesmo padrão do Modal — só mostra botões trigger; o toast em si só aparece após clique e auto-dismiss em 4s. Sem preview estático.
- Screenshot: `audit-toast.png`

### /components/tabs — 200 ✓
- h1 "Tabs", subtítulo "Tab navigation horizontal com active underline." **0 seções de variantes.**
- Issues:
  - 🟡 **MED**: showcase **raso** — apenas 1 instância (Overview/Details/Settings). Sem variantes (vertical, com badge, com ícone, disabled, scrollable). Outros components do DS expõem 4-8 variantes.
- Screenshot: `audit-tabs.png`

### /components/charts — 200 ✓
- h1 "Charts"; 6 seções (DonutChart single/multi, BarChart single/horizontal, LineChart, AreaChart)
- DOM contém 10 ECharts containers (`[_echarts_instance_]`) mas **0 canvas** mesmo após scroll completo da página.
- Issues:
  - 🔴 **HIGH**: charts **não renderizam visualmente**. Containers existem com instância ECharts criada, mas o canvas está vazio ou de tamanho zero. Página inteira aparenta seções vazias com só o título acima de espaço cinza. Provável bug de inicialização (lazy + intersection observer falhando, ou container height=0). Console limpo.
- Screenshot: `audit-charts.png`

### /components/data-table — 200 ✓
- h1 "DataTable"; 4 seções (default + sort + pagination, compact, empty, loading)
- **Showcase forte**: usa Badge + Chip + ProgressBar + Pagination + IconButton — exemplo composto natural.
- Issues: nenhum.
- Screenshot: `audit-data-table.png`

### /components/donut — 200 ✓
- h1 "Donut"; 3 seções (sizes, valores, warning)
- SVG nativo (não ECharts) — renderiza corretamente.
- Issues: nenhum.
- Screenshot: `audit-donut.png`

### /components/stat — 200 ✓
- h1 "Stat"; 4 seções (básicos, com delta, sem card, com ícone)
- Issues: nenhum.
- Screenshot: `audit-stat.png`

### /components/banner-cta — 200 ✓
- h1 "BannerCTA"; 5 variants (Soft, Gradient, Filled, Sem illustration, Illustration à esquerda)
- Issues:
  - 🟡 **MED**: a "illustration" é renderizada como retângulo azul plano (placeholder simples) em todas as variantes que a usam. Falta SVG/ilustração real ou indicação visual de que é placeholder.
- Screenshot: `audit-banner-cta.png`

### /components/assessment-card — 200 ✓
- h1 "AssessmentCard"; 16 entradas de heading (estados + grid de catálogo com 6 cards)
- Issues:
  - 🟡 **MED**: na primeira fila "Estados (5 status)" os 5 cards ficam apertados em viewport 1470px — badge de status colide visualmente com o ícone "View Results" em pelo menos um card ("History Pre-test"). Suspeita de overflow ou flex shrink mal configurado em telas <1280px.
- Screenshot: `audit-assessment-card.png`

### /components/{progress-bar, separator, command-palette} — 404 🔴
- Issues:
  - 🔴 **HIGH**: rotas mencionadas no briefing (lista canônica de 22) não existem. ProgressBar é usado in-vivo dentro de DataTable, então o organism existe mas falta showcase. Separator é referenciado dentro de Card. Command-palette aparenta ser triggered pela busca global do header (Cmd+K visível) mas sem página dedicada.

---

## Issues clusters (priorizar fix)

### 🔴 Cluster 1 — Templates Education ausentes (impacto alto)
- 6 rotas linkadas pela home não existem
- Promessa "6 templates SAS clonados como base do design system multi-vertical" da home **não cumprida**
- Decisão Rafa: criar as páginas (caminho C — clone Figma → DS) **ou** ocultar cards até que existam

### 🔴 Cluster 2 — Components fantasma (impacto alto)
- 10 cards em /components apontam pra 404
- Sugere catálogo gerado a partir de fonte (manifest? scan de pasta?) que inclui components ainda sem página
- Fix em lote: ou criar páginas, ou filtrar lista pra mostrar só componentes com showcase
- Sub-cluster: também os 3 components na lista canônica do briefing que dão 404 (`progress-bar`, `separator`, `command-palette`)

### 🔴 Cluster 3 — Charts quebrado (impacto alto, surface visível)
- ECharts containers presentes mas canvas vazio
- Página /components/charts inteira parece "em construção" embora seja status 200
- Investigar: dembrandt-style lazy + intersection observer + containerHeight; verificar logs de mount/resize do hook

### 🟡 Cluster 4 — Showcases interativos sem preview estático (impacto médio)
- Modal, Toast: apenas triggers, nenhuma representação estática
- Recomendação: adicionar bloco "anatomia" (modal aberto pintado inline) + snippet de código + preview de variantes lado a lado

### 🟡 Cluster 5 — Showcase Tabs raso (impacto médio)
- 1 instância única vs 4-8 variantes nos outros components
- Adicionar: vertical, com badge/contador, com ícone, disabled state, scrollable

### 🟡 Cluster 6 — Token/styling drift (impacto médio)
- Input helper text aparece como link (azul + sublinhado provável)
- BannerCTA illustration é placeholder retangular sem indicação
- AssessmentCard layout aperta em <1280px viewport

### 🟢 Cluster 7 — Inconsistências de contagem (impacto baixo)
- Footer sidebar: "18 components"
- /components hero: "29 componentes"
- Rotas reais OK: 19
- Padronizar fonte de verdade

---

## Recommendations (input pro Rafa decidir prioridades)

1. **P0 — Reconciliar nav vs rotas reais**: ou criar 16 páginas faltantes (10 components + 6 templates) ou esconder cards/sidebar items que apontam para rotas inexistentes. Cada 404 é fricção.
2. **P0 — Investigar /components/charts**: provavelmente bug em ECharts mount (height=0 ou intersection observer). Página vazia transmite "DS quebrado".
3. **P1 — Padronizar showcase pattern**: definir mínimo (h1, subtítulo, ≥3 variantes/exemplos, snippet de código, preview estático para componentes interativos como Modal/Toast). Tabs/Modal/Toast estão abaixo do padrão visível em Button/Badge/DataTable.
4. **P1 — Fixar source of truth de catálogo**: se há manifest gerado dos components, ele deve filtrar por "tem página". Sidebar count "18 components" deve vir do mesmo manifest.
5. **P2 — Token review do helper text do Input** e illustration default do BannerCTA.
6. **P2 — Responsive review**: AssessmentCard em viewport <1280px com 5 cards lado a lado precisa ajuste.

---

## Out of scope deste audit

- Acessibilidade exaustiva (axe-core, contrast, keyboard nav)
- Cross-browser
- Performance (LCP, CLS, JS bundle)
- Testes funcionais de interação (clicks, form submission, modais abrindo de fato)
- Dark mode (toggle existe no header mas não foi exercitado)
- Tema "Education" vs outros (dropdown no header sugere multi-tenant)
