# Links Audit — homepage + sidebar + components routes

Generated: 2026-04-30
Base: http://localhost:3002
Branch base: `main` (pre-Caios A/B state)

## Homepage links (10 total)

Coletados via `document.querySelectorAll('a[href]')` na rota `/`.

| href | text | status | location |
|------|------|--------|----------|
| `/` | Dds-impactx · Design system (logo) | 200 | aside |
| `/` | Início | 200 | aside |
| `/components` | Components | 200 | aside |
| `/playground` | Playground | 404 | aside |
| `/templates/education/avaliacoes` | Hub Avaliações | 404 | main |
| `/templates/education/catalogo` | Catálogo Relatórios | 404 | main |
| `/templates/education/lista-diagnostica` | Lista Diagnóstica | 404 | main |
| `/templates/education/diagnostica-ano` | Diagnóstica · ano | 404 | main |
| `/templates/education/relatorio-visao-geral` | Relatório · Visão Geral | 404 | main |
| `/templates/education/relatorio-questoes` | Relatório · Questões | 404 | main |

## Sidebar links (4 total)

Filtrados pela location `aside`.

| href | text | status |
|------|------|--------|
| `/` | Dds-impactx · Design system (logo) | 200 |
| `/` | Início | 200 |
| `/components` | Components | 200 |
| `/playground` | Playground | 404 |

## Component routes (22 total)

Audit explícito das 20 rotas requisitadas + duas adicionais identificadas no setup do task.

| slug | status |
|------|--------|
| button | 200 |
| icon-button | 200 |
| badge | 200 |
| avatar | 200 |
| breadcrumb | 200 |
| input | 200 |
| chip | 200 |
| pagination | 200 |
| tooltip | 200 |
| card | 200 |
| modal | 200 |
| toast | 200 |
| tabs | 200 |
| charts | 200 |
| data-table | 200 |
| donut | 200 |
| stat | 200 |
| banner-cta | 200 |
| progress-bar | 404 |
| separator | 404 |
| command-palette | 404 |
| assessment-card | 200 |

## Broken / 404 / 500

10 links retornam **404**, 0 retornam 500.

### Sidebar (1)
1. `/playground` — link presente em sidebar (todas as páginas), rota inexistente.

### Homepage cards (6 templates education)
2. `/templates/education/avaliacoes`
3. `/templates/education/catalogo`
4. `/templates/education/lista-diagnostica`
5. `/templates/education/diagnostica-ano`
6. `/templates/education/relatorio-visao-geral`
7. `/templates/education/relatorio-questoes`

### Component routes (3)
8. `/components/progress-bar`
9. `/components/separator`
10. `/components/command-palette`

## Recommendations

- **Critico (sidebar):** `/playground` está em todas as páginas como link de nav e quebra. Ou criar a rota em `apps/web/src/app/playground/page.tsx`, ou remover do sidebar até estar pronta.
- **Alto (homepage):** todos os 6 cards de templates `/templates/education/*` retornam 404. A homepage atualmente apresenta showcase quebrado — criar as rotas ou apontar pros wireframes existentes.
- **Médio (components):** 3 dos 22 slugs documentados não tem página: `progress-bar`, `separator`, `command-palette`. Como `command-palette` é um dos arquivos sendo tocado pelos Caios A/B, a rota pode ser criada na sequência. `progress-bar` e `separator` precisam de page route ou devem ser removidos do índice.
- Considerar adicionar teste E2E (Playwright) que valida que todo link `<a href="/...">` no DOM retorna 200, evitando regressão.
