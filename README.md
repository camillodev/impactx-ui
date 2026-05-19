# Impact X UI

Design system multi-DS, multi-theme da Impact X — React + Tailwind v4. Distribuido como:

- **`@impactxlab/design-system`** — package npm com 50+ componentes prontos (atoms, molecules, organisms, templates) + tokens. Instalavel via GitHub Packages. **Caminho recomendado.**
- **`@impactx/ui`** — CLI shadcn-style pra copiar o codigo dos componentes pro seu repo (quando voce quer customizar).

> **Repo privado** — distribuido via GitHub Packages (`npm.pkg.github.com`), nao no npm publico.

---

## Instalacao do package (`@impactxlab/design-system`)

### 1. Autenticar no GitHub Packages

Crie um Personal Access Token classico em https://github.com/settings/tokens com escopo `read:packages`. Depois, configure o npm registry no seu projeto:

**`.npmrc` (no root do projeto que vai consumir o DS):**

```ini
@camillodev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Exporte o token no shell (ou `.env` do projeto):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

> Em CI (GitHub Actions), use `${{ secrets.GITHUB_TOKEN }}` — ja vem com `read:packages`.

### 2. Instalar

```bash
pnpm add @impactxlab/design-system
# ou
npm install @impactxlab/design-system
# ou
yarn add @impactxlab/design-system
```

Peer deps necessarias (instale se ainda nao tiver):

```bash
pnpm add react@^19 react-dom@^19
```

### 3. Carregar tokens + estilos

No entrypoint global da sua app (`app/globals.css`, `src/index.css`, etc):

```css
/* tokens base (cores neutras, espacamentos, radius, tipografia) */
@import "@impactxlab/design-system/tokens/base.css";

/* escolha 1 ou mais themes */
@import "@impactxlab/design-system/tokens/themes/education.css";
@import "@impactxlab/design-system/tokens/themes/kumon.css";
@import "@impactxlab/design-system/tokens/themes/impactx.css";

/* estilos compilados dos componentes */
@import "@impactxlab/design-system/styles.css";
```

### 4. Ativar theme + mode no `<html>`

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
- **Mode** via atributo: `data-mode="dark"` (light eh default, sem atributo)

### 5. Usar componentes

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

## Themes disponiveis

| Theme | Primary | Secundario |
|-------|---------|------------|
| `education` (alfabeto) | `#0467DB` | — |
| `kumon` | `#00A9E3` | — |
| `impactx` | `#11C76F` | `#F5C400` |

---

## CLI alternativa (`@impactx/ui`)

Pra copiar o source dos componentes pro seu repo (shadcn-style), em vez de consumir o package:

```bash
npx @impactx/ui                       # onboarding interativo
npx @impactx/ui add education         # DS completo
npx @impactx/ui add education button  # componente especifico
```

---

## Desenvolvimento (contributors)

```bash
git clone git@github.com:camillodev/impactx-ui.git
cd impactx-ui
pnpm install
pnpm dev                       # turbo, todos apps
pnpm --filter web dev          # somente showcase
pnpm build
pnpm registry:build            # gera apps/web/public/r/*.json
pnpm lint && pnpm typecheck && pnpm test
```

### Publicar nova versao

```bash
pnpm --filter @impactxlab/design-system build
cd packages/ds-education
npm version patch   # ou minor / major
npm publish         # usa publishConfig.registry => GitHub Packages
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
    tokens/                    # @impactxlab/tokens
    eslint-plugin-ui/          # @impactx/eslint-plugin-ui
  scripts/                     # build-registry, check-cohesion
  pnpm-workspace.yaml
  turbo.json
```

---

## Gitflow

| Branch | Funcao |
|--------|--------|
| `develop` | integracao continua (default) |
| `main` | producao / releases |

1. `git fetch origin`
2. `git checkout -b feature/<nome> origin/develop` (ou `fix/`, `chore/`, `report/`)
3. Commits + push
4. PR pra `develop` — nunca merge local direto
5. Merge `develop` → `main` somente em releases

---

## Documentacao pra agentes / LLMs

- `CLAUDE.md` — instrucoes para Claude Code
- `AGENTS.md` — spec agentsmd.org pra Cursor/Codex/Copilot/Aider
- `.claude/skills/` — skills detalhadas (ix-design-system, ix-frontend, ix-engineering, etc)
- `.impactx/` — contrato declarativo do DS pra LLMs

---

## Licenca

Propriedade de Rafael Camillo / Impact X. Distribuicao restrita.
