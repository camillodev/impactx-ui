# Templates Quality Audit (qualitativo, sem baseline)

Generated: 2026-04-30T08:40:00Z
Server: http://localhost:3002
Branch auditada: `main` (commit corrente, contexto Kumon parcialmente aplicado)

## Methodology

3 viewports (desktop 1280x800, tablet 768x800, mobile 375x800). Captura: full-page screenshots, console errors, sinais de layout (`hOverflow`, contagem de elementos com `scrollWidth > clientWidth`, broken images, a11y básica via `imgsNoAlt`/`buttonsNoLabel`, heuristic de texto colunar via `thinTextElements`). NÃO é pixel-perfect contra baseline (Rafa não definiu reference pra comparar).

Por template foram coletados:
- Screenshot full page → `.playwright-mcp/template-<slug>-<viewport>.png`
- `browser_console_messages level=error`
- `browser_evaluate` com objeto de métricas

Severity:
- HIGH: console error, 404 imagem, layout overflow horizontal visível, conteúdo cortado/ilegível, página quebrada
- MED: ausência de alt em images, dead anchor, aria-label ausente, spacing inconsistente, layout que funciona mas degrada (4 cols apertadas em tablet)
- LOW: cosmético

## Per template

### /templates/education/avaliacoes

**Desktop (1280x800):** `.playwright-mcp/template-avaliacoes-1280.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, brokenImgs=0, imgsNoAlt=0, buttonsNoLabel=0, emptyDivs=0, thinTextElements=0
- Issues: nenhum visível. Hero "Avaliações", 2 cards laterais e 3 stats (TOTAL/CONCLUÍDAS/PENDENTES) bem distribuídos.

**Tablet (768x800):** `.playwright-mcp/template-avaliacoes-768.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=0
- Issues:
  - MED: Sidebar `w-64` ocupa ~250px do viewport 768, deixando area útil ~518px. Sidebar é estática (não colapsa em tablet), só some abaixo de ~640. Top-bar com busca quebra "Buscar componentes, telas..." em duas linhas.
  - LOW: Cards "Avaliações em andamento" / "Resultados consolidados" ficam estreitos, ícones flutuam visualmente longe.

**Mobile (375x800):** `.playwright-mcp/template-avaliacoes-375.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=28
- Issues:
  - HIGH: Hero título "Avaliações & Diagnósticas" (versão Kumon nova) quebra com "&" sozinho numa linha — péssimo no breakpoint 375. Falta `text-balance` ou `whitespace`.
  - MED: Top-bar — placeholder "Buscar componentes, telas..." extrapola o input visualmente; theme toggle some/cortado.
  - 28 inner overflows tracked mas hOverflow=false (overflow contido em wrappers `overflow-x-auto` ou cropped). Vale auditar quais.

### /templates/education/catalogo

**Desktop (1280x800):** `.playwright-mcp/template-catalogo-1280.png`
- Status: 200 · Console: 0 errors
- Métricas: tudo zero
- Issues: nenhum. Hero "Relatórios disponíveis" + grid 4-col de cards icônicos OK.

**Tablet (768x800):** `.playwright-mcp/template-catalogo-768.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=3
- Conteúdo nesta variante é "DataTable example" (não "Relatórios disponíveis" como em desktop). Confirma que catalogo tem variants/conteúdo diferente conforme breakpoint OU rewrite parcialmente aplicado.
- Issues:
  - HIGH: DataTable ultrapassa container — coluna "ATUALIZAÇÃO" cortada (visível "ATUALI..." e "28/0..."). Não está scrollável visualmente no card.
  - MED: Card pesquisa + "8 itens" badge ficam apertados no header.

**Mobile (375x800):** `.playwright-mcp/template-catalogo-375.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=4
- Issues:
  - HIGH: DataTable corta colunas STATUS/ATUALIZAÇÃO — só ID, NOME, CATEGORIA visíveis, status só metade do badge. Inviável uso real.
  - MED: Hero título "DataTable example" quebra "DataTable" / "example" em duas linhas — consequência de fonte 4xl+ sem ajuste mobile.

### /templates/education/lista-diagnostica

**Desktop (1280x800):** `.playwright-mcp/template-lista-diagnostica-1280.png`
- Status: 200 · Console: 0 errors
- Métricas: tudo zero
- Issues: nenhum. Lista bem distribuída, badges status, ações alinhadas.

**Tablet (768x800):** `.playwright-mcp/template-lista-diagnostica-768.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=23
- Conteúdo já com vocab Kumon — "Mariana Silva · Matemática · Level atual 4A · suspeita 3A".
- Issues:
  - HIGH: cada item da lista quebra texto verticalmente (cada token em linha própria com `·` solto) por separator dot CSS sendo flex com `flex-wrap` em coluna apertada. Layout ilegível no tablet.
  - HIGH: Badge "Pendente" sobrepõe os botões "Ver detalhes" / "Resultado final" (parece overlap absoluto/flex-wrap stack collide).

**Mobile (375x800):** `.playwright-mcp/template-lista-diagnostica-375.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=34
- Issues:
  - HIGH: Tab "Inglês" cortado pela borda direita. Tabs não scrollam horizontalmente.
  - HIGH: Botão "Nova diagnóstica" cortado ("Nova diagnós..."). Header do card está num row que não wrappa.
  - HIGH: Cada item lista vira 8 linhas verticais (Nome \n Sobrenome \n · \n Disciplina \n · \n Level \n atual...). Catastrófico — não foi desenhado pra mobile.

### /templates/education/diagnostica-ano

**Desktop (1280x800):** `.playwright-mcp/template-diagnostica-ano-1280.png`
- Status: 200 · Console: 0 errors
- Métricas: tudo zero
- Issues: nenhum. 4 stats grid + Desempenho por componente em 2 cols funciona bem.

**Tablet (768x800):** `.playwright-mcp/template-diagnostica-ano-768.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=36
- Issues:
  - HIGH: Stats row mantém 4-col em 768; cards apertados, label quebra em 2 linhas ("ALUNOS\nAVALIADOS"), e ícones aparecem **fora** do card — visíveis flutuando entre cards, sugerindo `overflow-visible` + `absolute` icon positioning sem container respeitando space.
  - MED: Hero "Resumo do ano" tagline com KUMON eyebrow OK.

**Mobile (375x800):** `.playwright-mcp/template-diagnostica-ano-375.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=10
- Issues: stats colapsam para 1-col stacked — funciona melhor que tablet (irônico). Hero quebra "Resumo do" / "ano" — aceitável.

### /templates/education/relatorio-visao-geral

**Desktop (1280x800):** `.playwright-mcp/template-relatorio-visao-geral-1280.png`
- Status: 200 · Console: 0 errors
- Métricas: tudo zero
- Issues: nenhum. Hero "Visão geral" + "RELATÓRIO · KUMON CAMARGOS" eyebrow já reflete rewrite. 4 stats + DonutScore matemática/português/inglês alinhados.

**Tablet (768x800):** `.playwright-mcp/template-relatorio-visao-geral-768.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=22
- Issues:
  - HIGH: Mesmo bug dos stats 4-col com ícones escapando do card (idêntico a `diagnostica-ano`).
  - MED: 3 DonutScore mantém row em 768 — donuts apertados mas legíveis.

**Mobile (375x800):** `.playwright-mcp/template-relatorio-visao-geral-375.png`
- Status: 200 · Console: **1 error** (Hydration mismatch em Sidebar `<li>` server vs client)
- Métricas: hOverflow=false, innerOverflows=0
- Issues:
  - HIGH: Hydration error em `Sidebar` (`<li>` mismatch). Reproduz quando sidebar fecha/abre conforme breakpoint sem `useEffect`/SSR-safe guard. Stack indica problema cross-template (afeta toda /templates/* em mobile, mas só logado nesta nav).
  - MED: stats stacked 1-col, OK.

### /templates/education/relatorio-questoes

**Desktop (1280x800):** `.playwright-mcp/template-relatorio-questoes-1280.png`
- Status: 200 · Console: **3 errors** — `<tr>` cannot be a child of `<div>` (hydration mismatch) em `QuestionRow`.
- Métricas: hasMain=true, hOverflow=false, mas estrutura React tá inválida.
- Issues:
  - HIGH: `QuestionRow` renderiza `<tr>` dentro de `<div>` (não dentro de `<table>`). Console grita HTML inválido + hydration failure. Visualmente o table-like layout até funciona porque `<tr>` é tratado como inline anonymous, mas é broken markup. Precisa encapsular em `<table><tbody>` OU trocar por `<div role="row">`.
  - MED: Tabs "Visão geral · Questões · Alunos" sem ícone diferenciador.

**Tablet (768x800):** `.playwright-mcp/template-relatorio-questoes-768.png`
- Status: 200 · Console: 0 errors (cleaner — nova versão renderizou)
- Conteúdo MUDOU de "Análise por questão" → "Folhas & taxa de acerto" entre captures (rewrite Kumon avançou em paralelo durante o audit). Isso significa que template tá em flux — ver "stale audit" warning na intro.
- Métricas: hOverflow=false, innerOverflows=1
- Issues: nenhum visível. 3 stats funcionam bem em 768 (não 4-col).

**Mobile (375x800):** `.playwright-mcp/template-relatorio-questoes-375.png`
- Status: 200 · Console: 0 errors
- Métricas: hOverflow=false, innerOverflows=1
- Issues: nenhum. Hero quebra "Folhas &" / "taxa de" / "acerto" em 3 linhas — aceitável dado tamanho. Stats stacked 1-col bem.

## Cross-cutting issues

Identificados padrões recorrentes:

1. **Stats 4-col não responsivo em tablet 768** (afeta `diagnostica-ano`, `relatorio-visao-geral`). Cards ficam estreitos demais; ícones aparentemente posicionados absolute escapam do container. Deveria colapsar 4-col → 2x2 em `md:` ou `sm:`.
2. **Sidebar shell (`apps/web/src/app/shell/sidebar.tsx`) não colapsa em tablet** (768). Ocupa 250px de 768 = 33% da viewport, comendo área útil. Deveria virar drawer ou esconder em `md:` (atualmente esconde só em `sm:` ou menos).
3. **Listas/Tables sem responsive plumbing**:
   - `lista-diagnostica` em mobile — cada item vira 8 linhas verticais (separator dot ` · ` flex-wrap colapsa).
   - `catalogo` DataTable em tablet/mobile — colunas cortadas, sem scroll-x card-level nem column hiding.
   - `relatorio-questoes` em desktop — markup `<tr>` em `<div>` (hydration error).
4. **Mobile 375 — hero titles + busca top-bar** — placeholder "Buscar componentes, telas..." sempre overflow do input (visível em todos os 6 templates). Tabs no `lista-diagnostica` cortadas. Botões em row apertam e cortam.
5. **Eyebrow KUMON aparece em alguns templates (`relatorio-visao-geral`, `diagnostica-ano`, `relatorio-questoes` parcial) e não em outros** (`avaliacoes` "HUB DO EDUCADOR" desktop / "HUB DA ORIENTADORA" mobile — inconsistente entre breakpoints!), confirmando estado em flux do rewrite paralelo.

## Severity summary

| Severity | Count |
|----------|-------|
| HIGH     | 11    |
| MED      | 8     |
| LOW      | 2     |

HIGH:
1. avaliacoes 375 — hero "&" isolado quebra
2. catalogo 768 — DataTable colunas cortadas
3. catalogo 375 — DataTable status cortado
4. lista-diagnostica 768 — items texto-vertical e badge sobrepondo botões
5. lista-diagnostica 375 — tabs Inglês cortado
6. lista-diagnostica 375 — botão "Nova diagnóstica" cortado
7. lista-diagnostica 375 — items 8-linhas verticais
8. diagnostica-ano 768 — stats 4-col, ícones escapando
9. relatorio-visao-geral 768 — stats 4-col, mesmo bug
10. relatorio-visao-geral 375 — Sidebar hydration error (`<li>`)
11. relatorio-questoes 1280 — `<tr>` em `<div>` (hydration error + 3 console errors)

## Recommendations (input pro próximo Caio fix)

1. **Fix hydration errors primeiro (HIGH bloqueante):**
   - `relatorio-questoes` `QuestionRow` — refatorar `<tr>` inline pra `<div role="row">` OU envolver lista em `<table><tbody>`. Maior risco a11y/SSR.
   - Sidebar `<li>` mismatch em mobile — adicionar `suppressHydrationWarning` ou guarda `useEffect` pro estado inicial collapsed.

2. **Layout responsivo de stats (HIGH afeta 2 templates idênticos):**
   - Trocar `grid-cols-4` por `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` no wrapper de stats em `diagnostica-ano` e `relatorio-visao-geral`.
   - Remover `overflow-visible` ou repositionar ícones com `relative top-X right-X` dentro do card, não absolute escapando.

3. **Tables/Listas adaptáveis (HIGH afeta 2 templates):**
   - `lista-diagnostica` `StudentRow` (provável) — substituir separator-dot inline (`·`) por gap-y no flex-col em mobile, OU truncar com `truncate` por linha. Botões action: agrupar em `flex-wrap gap-2` em mobile.
   - `catalogo` DataTable — adicionar `<div className="overflow-x-auto">` wrapper OU column-hiding via media query.

4. **Sidebar shell (MED, mas alto impacto):**
   - Esconder sidebar `lg:` em vez de `sm:` ou converter em drawer com hamburger em < 1024px.

Top 3 prioridade:
- (1) hydration errors (correctness + SSR perf)
- (2) stats 4-col → grid responsivo
- (3) lista-diagnostica mobile (totalmente quebrada — cliente Kumon vai ver isso no celular).
