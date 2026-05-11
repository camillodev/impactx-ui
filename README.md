# Impact X UI

[![npm](https://img.shields.io/npm/v/@impactx/ui.svg)](https://www.npmjs.com/package/@impactx/ui)

Multi-DS, multi-theme React component library da Impact X — distribuida via CLI shadcn-style. Voce nao instala um pacote, voce copia o codigo pro seu repo.

## Quickstart

```bash
# onboarding interativo
npx @impactx/ui

# instalar o DS education completo
npx @impactx/ui add education

# instalar componente especifico com theme
npx @impactx/ui add education button --education
```

Aplique o theme no root da sua app:

```html
<html class="theme-education" data-mode="dark">
```

## Design Systems disponiveis

| DS | Componentes | Dominio |
|----|-------------|---------|
| `education` | 22 atoms/molecules + 10 organisms | Gestao educacional |

## Themes

| Theme | Primary | Secundario |
|-------|---------|------------|
| `alfabeto` | `#0467DB` | — |
| `kumon` | `#00A9E3` | — |
| `impactx` | `#11C76F` | `#F5C400` |

## Estrutura monorepo

```
impactx-ui/
  apps/
    web/                       # Next 16 showcase + docs
  packages/
    cli/                       # @impactx/ui (npm)
    ds-education/              # source canonico do DS
  scripts/                     # build-registry, check-cohesion
  pnpm-workspace.yaml
  turbo.json
```

## Desenvolvimento

```bash
pnpm install
pnpm dev                       # turbo, todos apps
pnpm --filter web dev          # somente showcase
pnpm build
pnpm registry:build            # gera apps/web/public/r/*.json
pnpm lint && pnpm typecheck && pnpm test
```

## Como contribuir

Gitflow: `develop` é a branch base de todo desenvolvimento. `main` recebe apenas merges de release.

1. Branch a partir de `develop`: `git checkout develop && git checkout -b feature/<nome>` (ou `fix/`, `chore/`, `report/`)
2. Commits na branch
3. Push: `git push origin feature/<nome>`
4. Abrir PR para `develop` — nunca merge local direto
5. Releases: PR de `develop` → `main` com tag `v<semver>`

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes completos.

Stack: pnpm workspaces + turbo. ESM only. TypeScript strict.

## Documentacao para agentes / LLMs

- `CLAUDE.md` — instrucoes para Claude Code (skills, decisoes, comandos)
- `AGENTS.md` — spec agentsmd.org para Cursor/Codex/Copilot/Aider
- `llms.txt` — formato llmstxt.org pra contexto rapido
- `.claude/skills/` — skills detalhadas (ix-frontend, ix-engineering, ix-code-guidelines, etc)

## Licenca

Propriedade de Rafael Camillo / Impact X.
