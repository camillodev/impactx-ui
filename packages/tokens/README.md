# @impactxlab/tokens

Design tokens 3-tier (primitive → semantic → component) via Style Dictionary v4.

## Estrutura

```
src/
├── primitive/   tier 1 — paleta crua (color.blue.500, radius.md), sem semântica
├── semantic/    tier 2 — roles por tema (color.primary.fill → {color.blue.500})
└── component/   tier 3 — overrides por componente (button.primary.bg → {color.primary.fill})
```

## Build

```bash
pnpm --filter @impactxlab/tokens build
```

Gera em `dist/`:
- `tokens.css` — neutrals + dark mode + 3 temas em um arquivo (via seletores)
- `themes/{education,kumon,impactx}.css` — split por tema (se preferir lazy-load)
- `tokens.js` + `.d.ts` — exports TS pra uso programático
- `tailwind.js` — preset opcional pra `tailwind.config.ts`

## Contrato

CSS variables (`var(--color-primary)`, etc) permanecem o contrato externo — consumidores **não mudam**. Esta package só vira a *origem* das vars.

## DTCG

Tokens seguem o W3C Design Tokens Community Group format (`$value` / `$type`). Compatível com Tokens Studio futuro.
