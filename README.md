# Impact X UI

[![npm](https://img.shields.io/npm/v/@impactxlab/design-system.svg)](https://www.npmjs.com/package/@impactxlab/design-system)
[![npm tokens](https://img.shields.io/npm/v/@impactxlab/tokens.svg?label=%40impactxlab%2Ftokens)](https://www.npmjs.com/package/@impactxlab/tokens)

Design system multi-DS, multi-theme da Impact X — React 19 + Tailwind v4. Publicado **público** no npm pra uso em Lovable, v0, StackBlitz, Next, Vite, qualquer projeto React.

## Packages

| Package | Versão | Descrição |
|---|---|---|
| [`@impactxlab/design-system`](https://www.npmjs.com/package/@impactxlab/design-system) | 1.0.1 | 50+ componentes prontos (atoms, molecules, organisms, templates) + tokens embutidos. **Caminho recomendado.** |
| [`@impactxlab/tokens`](https://www.npmjs.com/package/@impactxlab/tokens) | 1.0.0 | Design tokens 3-tier (Style Dictionary). Já é dep do design-system, mas pode ser usado isolado. |
| `@impactx/ui` | (não publicado) | CLI shadcn-style pra copiar source dos componentes pro seu repo (alternativa pra quem quer customizar). |

---

## Instalação (npm público, sem auth)

```bash
npm install @impactxlab/design-system
# ou
pnpm add @impactxlab/design-system
# ou
yarn add @impactxlab/design-system
```

Peer deps (instale se ainda não tiver):

```bash
npm install react@^19 react-dom@^19
```

### Carregar tokens + estilos

No CSS global da app (`app/globals.css`, `src/index.css`, etc):

```css
/* tokens base (cores, espaçamentos, radius, tipografia) */
@import "@impactxlab/design-system/tokens/base.css";

/* escolha 1+ themes */
@import "@impactxlab/design-system/tokens/themes/education.css";
@import "@impactxlab/design-system/tokens/themes/kumon.css";
@import "@impactxlab/design-system/tokens/themes/impactx.css";

/* estilos compilados dos componentes */
@import "@impactxlab/design-system/styles.css";
```

### Ativar theme + mode no `<html>`

```tsx
// app/layout.tsx (Next App Router)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="theme-education" data-mode="dark">
      <body>{children}</body>
    </html>
  );
}
```

- **Theme** via classe: `theme-education` | `theme-kumon` | `theme-impactx`
- **Mode** via atributo: `data-mode="dark"` (light é default, sem atributo)

### Usar componentes

```tsx
import { Button, Card, Input, DataTable } from "@impactxlab/design-system";

export default function Page() {
  return (
    <Card>
      <Input placeholder="Buscar..." />
      <Button variant="primary">Salvar</Button>
    </Card>
  );
}
```

---

## Themes disponíveis

| Theme | Primary | Secundário |
|-------|---------|------------|
| `education` (alfabeto) | `#0467DB` | — |
| `kumon` | `#00A9E3` | — |
| `impactx` | `#11C76F` | `#F5C400` |

---

## Para agents (Lovable, v0, Cursor, Codex, Aider, Claude)

Quando você instala o package, ele inclui um diretório `.impactx/` com **contrato declarativo** do DS:

```
node_modules/@impactxlab/design-system/
├── .impactx/
│   ├── system.md                 # regras gerais (carregar primeiro)
│   ├── INDEX.md                  # mapa de tudo
│   └── rules/
│       ├── components/           # 1 regra por componente
│       ├── styling/tokens.md     # cores, anti-patterns
│       ├── primitives/           # grid, stack, page-container
│       ├── patterns/             # list-with-filters, dashboard, form-multistep…
│       └── templates/            # list-page, detail-page, form-page, dashboard
└── AGENTS.md                     # spec agentsmd.org
```

Agents descobrem automaticamente. Pode apontar no system prompt: _"Leia `.impactx/system.md` em `node_modules/@impactxlab/design-system/` antes de gerar código."_

---

## Desenvolvimento (contributors)

```bash
git clone git@github.com:camillodev/impactx-ui.git
cd impactx-ui
pnpm install
pnpm dev                       # turbo, todos apps
pnpm --filter web dev          # somente showcase (ui.impactx.com.br)
pnpm build
pnpm registry:build            # gera apps/web/public/r/*.json
pnpm lint && pnpm typecheck && pnpm test
```

### Publicar nova versão

Requer estar logado no npm como `impactxlab` (ou ter token granular com bypass 2FA pro scope `@impactxlab`).

```bash
# 1. Bump version
cd packages/ds-education
npm version patch   # ou minor / major

# 2. Build + publish
pnpm --filter @impactxlab/design-system build
npm publish --access public

# 3. Idem pra tokens se necessário
cd ../tokens
npm version patch
pnpm --filter @impactxlab/tokens build
npm publish --access public
```

---

## Estrutura monorepo

```
impactx-ui/
  apps/
    web/                       # Next 16 showcase + docs (ui.impactx.com.br)
  packages/
    cli/                       # @impactx/ui (CLI shadcn-style)
    ds-education/              # @impactxlab/design-system (package npm)
    tokens/                    # @impactxlab/tokens (package npm)
    eslint-plugin-ui/          # @impactx/eslint-plugin-ui
  scripts/                     # build-registry, check-cohesion
  pnpm-workspace.yaml
  turbo.json
```

---

## Gitflow

| Branch | Função |
|--------|--------|
| `develop` | integração contínua (default) |
| `main` | produção / releases |

1. `git fetch origin`
2. `git checkout -b feature/<nome> origin/develop` (ou `fix/`, `chore/`, `report/`)
3. Commits + push
4. PR pra `develop` — nunca merge local direto
5. Merge `develop` → `main` somente em releases

---

## Documentação pra agentes / LLMs (repo local)

- `CLAUDE.md` — instruções para Claude Code
- `AGENTS.md` — spec agentsmd.org pra Cursor/Codex/Copilot/Aider
- `.claude/skills/` — skills detalhadas (ix-design-system, ix-frontend, ix-engineering, etc)
- `.impactx/` — contrato declarativo do DS pra LLMs (também enviado no tarball publicado)

---

## Licença

MIT — Rafael Camillo / Impact X.
