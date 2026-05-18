# Testing — impactx-ui

Checklist visual + iterativo pra validar a migração `ds-impactx → impactx-ui` antes de mergear.

---

## Setup local (uma vez)

```bash
cd ~/projetos/impactx-ui
pnpm install                          # instala monorepo
pnpm --filter @impactx/web dev        # sobe showcase em http://localhost:3002
```

Se `pnpm install` falhar, o erro mais provável é versão de Node — precisa ≥ 20. `node -v` pra checar.

---

## 1. Smoke automático (Cypress)

```bash
# Headless (CI-style)
pnpm --filter @impactx/web test:e2e

# Interativo (debug visual)
pnpm --filter @impactx/web cypress
```

Specs em `apps/web/cypress/e2e/`:
- `routes.cy.ts` — 20 rotas `/components/<slug>` retornam 200 sem error overlay
- `themes.cy.ts` — alfabeto/kumon/impactx geram cores distintas
- `dark-mode.cy.ts` — `data-mode="dark"` muda background
- `charts.cy.ts` — echarts renderiza canvas/svg
- `interactions.cy.ts` — modal/tabs/tooltip/toast respondem

**Critério de pass:** todos verdes. Se algum falhar, ler output Cypress, corrigir, rodar de novo.

---

## 2. Checklist visual manual (golden path)

Abrir cada rota e validar **a olho**. Marca aqui no PR conforme passa.

### 2.1 Atoms (10 rotas)

| Rota | Validar |
|------|---------|
| `/components/button` | 7 variants × 3 sizes renderizam, hover muda cor, focus ring visível, disabled cinza |
| `/components/icon-button` | Square e circle, ghost e filled, todos os tamanhos |
| `/components/badge` | 5 variants pastel — cores distintas, texto legível |
| `/components/avatar` | Image carrega; quando falha → fallback iniciais aparece |
| `/components/breadcrumb` | Separadores corretos, último item sem link |
| `/components/input` | Label flutuante, error state vermelho, **helper text em primary color** (não muted), leading icon alinhado |
| `/components/chip` | Removable (X click funciona), variants distintos |
| `/components/separator` | Linhas vertical e horizontal renderizam |
| `/components/progress-bar` | Anima 0→100, label percentual |
| `/components/tooltip` | Hover delay 200ms, fecha ao sair, posição correta |

### 2.2 Molecules (5 rotas)

| Rota | Validar |
|------|---------|
| `/components/card` | Padding consistente, shadow nível 1, hover state |
| `/components/modal` | Abre com fade, ESC fecha, click fora fecha, focus trap funciona |
| `/components/toast` | **Background tinted** da intent (success verde claro, etc.), auto-dismiss em 4s |
| `/components/tabs` | Click muda content, indicator anima, keyboard arrow keys |
| `/components/pagination` | Prev/next, ellipsis quando >7 páginas, current page destacado |

### 2.3 Charts + Data (3 rotas)

| Rota | Validar |
|------|---------|
| `/components/charts` | 4 tipos (donut/bar/line/area) renderizam, **cores resolvem do theme** (não hardcoded) |
| `/components/donut` | Score central legível, segmentos coloridos por theme |
| `/components/data-table` | Sort funciona, density toggle, loading skeleton, empty state |

### 2.4 Organisms domain-specific (`components-education/`)

Não há rotas dedicadas — testar via `/proof` ou criar página de teste se quiser. Componentes:
- `assessment-header`, `assessment-list-item`, `big-card`, `campo-card`, `category-card`, `cta-banner`, `donut-score`, `hero-banner`, `question-row`, `subject-stat-card`

**Decisão pendente:** rotas dedicadas pra esses 10 → próxima sessão.

---

## 3. Theme switch (manual)

Em qualquer rota:

```js
// DevTools console
document.documentElement.className = "theme-education"  // #0467DB
document.documentElement.className = "theme-kumon"     // #00A9E3
document.documentElement.className = "theme-impactx"   // #11C76F + #F5C400 (tertiary)
```

**Validar:**
- [ ] Primary button muda de cor entre os 3
- [ ] **No theme impactx**, tertiary buttons ficam **amarelos** (#F5C400) — não cinza
- [ ] Outline buttons usam **border-2 da intent color**, não cinza padrão
- [ ] Charts re-renderizam com novas cores
- [ ] Sem hex hardcoded vazando (busca CSS por `#[0-9a-f]{6}` em DevTools deve ser zero fora de tokens)

---

## 4. Dark mode (manual)

```js
document.documentElement.dataset.mode = "dark"
// reverter:
delete document.documentElement.dataset.mode
```

**Validar em `/components/card` e `/components/modal`:**
- [ ] Background escuro (não preto puro — `--color-bg` apropriado)
- [ ] Texto contraste suficiente (WCAG AA mínimo)
- [ ] Borders visíveis (não somem)
- [ ] Toasts mantêm tinted bg legível

---

## 5. Iterativo — quando achar bug

```bash
# Hot-reload dev rodando, edita o componente em packages/ds-education/src/components/<X>.tsx
# Salva, vê mudar ao vivo em apps/web (Next HMR)
# Quando ok, lint:
pnpm --filter @impactxlabs/ui lint   # quando setar
pnpm --filter @impactx/web lint
```

Mudanças em `packages/ds-education/src/components/*.tsx` afetam `apps/web` via workspace symlink — sem rebuild manual.

---

## 6. Edge cases pra olhar de perto

Migração de repo pode quebrar coisas sutis:

- [ ] **Fonts carregam:** `Metropolis`, `Roboto`, `IBM Plex Mono` aparecem nos lugares certos (não fallback de sistema)
- [ ] **Tailwind v4 tokens:** `var(--color-primary)` resolve em CSS computed style; se vier `var(--color-primary)` literal sem resolver, falta `@theme inline` no `globals.css`
- [ ] **CMD palette (`/components/command-palette` se existir, ou via atalho `⌘K`):** abre, busca fuzzy funciona
- [ ] **Sem warnings no console:** abre DevTools em cada rota, ver console — zero warning de hydration, zero key duplicada
- [ ] **Imports do `@impactxlabs/ui`:** não pode haver erro de "module not found" — pnpm symlink funciona

---

## 7. Quando passar tudo

Comenta no PR `LGTM, mergear` que eu (próximo Claude) faço:
- Cria branch `main` no GitHub web
- Merge do `feature/initial-scaffold` → `main`
- Tag `v0.0.1`
- Próxima sessão: implementar CLI via TDD (já tem SPEC.md)

---

## 8. O que NÃO testar nessa fase

- CLI `@impactx/ui` — só stubs, não funciona ainda
- Build da `ds-education` (`pnpm --filter @impactxlabs/ui build`) — sem tsup config ainda; próxima sessão
- Registry JSON em `apps/web/public/r/` — script `scripts/build-registry.mjs` não existe ainda
- Fumadocs — próxima sessão (Fase 3 do plano)

---

## Bug report template

Se achar bug, comenta no PR assim:

```
**Rota:** /components/X
**Theme:** alfabeto | kumon | impactx
**Mode:** light | dark
**Esperado:** ...
**Atual:** ...
**Console:** (paste)
**Screenshot:** (anexa)
```
