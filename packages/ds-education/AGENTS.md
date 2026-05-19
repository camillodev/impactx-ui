# AGENTS.md — @impactxlab/design-system

Spec: https://agentsmd.org

Este package eh um design system React/Tailwind v4 da Impact X. Se voce eh um agent (Lovable, v0, Cursor, Codex, Copilot, Aider, Claude), leia o contrato declarativo em **`.impactx/`** antes de gerar codigo que usa este DS.

## Quick start pra agents

1. **Carregar contrato:** ler `.impactx/system.md` (regras gerais) + `.impactx/INDEX.md` (mapa)
2. **Por componente:** quando for usar `Button`, ler `.impactx/rules/components/button.md`. Idem pros outros (input, card, badge, modal, +)
3. **Por pattern:** quando montar uma tela, ler `.impactx/rules/patterns/<pattern>.md` (list-with-filters, dashboard-overview, form-multistep, detail-with-sidebar)
4. **Tokens:** nunca hardcodar hex. Sempre `var(--color-*)`. Ver `.impactx/rules/styling/tokens.md`
5. **Themes:** aplicar classe `theme-education` | `theme-kumon` | `theme-impactx` no `<html>`. Mode via `data-mode="dark"` (light eh default sem atributo)

## Hard rules (NUNCA quebrar)

- ❌ `color: #11C76F` → ✅ `color: var(--color-primary)`
- ❌ importar componente de path interno (`@impactxlab/design-system/dist/components/button`) → ✅ `import { Button } from "@impactxlab/design-system"`
- ❌ recriar componente que ja existe no DS → ✅ procurar primeiro em `.impactx/INDEX.md`
- ❌ esquecer de carregar `tokens/base.css` + theme + `styles.css` no entrypoint

## Setup minimo (Next, Vite, qualquer React 19)

```css
/* app/globals.css */
@import "@impactxlab/design-system/tokens/base.css";
@import "@impactxlab/design-system/tokens/themes/education.css";
@import "@impactxlab/design-system/styles.css";
```

```tsx
// app/layout.tsx
<html className="theme-education" data-mode="dark">
```

```tsx
import { Button, Card, Input } from "@impactxlab/design-system";
```

## Mapa de componentes

Ver `.impactx/INDEX.md` pro indice completo. 50+ componentes divididos em:

- **components/** — atoms + molecules genericos (Button, Input, Card, Modal, DataTable, Chart, +)
- **components-education/** — organisms de dominio educacional (AssessmentCard, BigCard, DonutScore, HeroBanner, +)
- **templates/** — page-level templates (ListPageTemplate, DetailPageTemplate, FormPageTemplate, DashboardTemplate)

## Owner

Rafael Camillo / Impact X. Issues: https://github.com/camillodev/impactx-ui/issues
