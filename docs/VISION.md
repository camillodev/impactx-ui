# VISION — Impact X UI

> Tamanho alvo: ≤80 linhas. Norte estável do projeto.

## Por que existe

Frontends da Impact X (Alfabeto, Kumon, ImpactX) precisam crescer rápido sem cada agent/dev reinventar componente, cor, espaçamento ou padrão. `impactx-ui` é a fonte única de verdade — um design system multi-DS / multi-theme — que faz **agents produzirem código consistente sem trabalho extra**.

## O norte

> "Um frontend que não dá mais trabalho pros agents — eles criam fluxos e componentes usando o nosso design system, sem ter que decidir do zero."

Operacionalmente isso significa:

- Agent recebe pedido ("monte uma tela de listagem com filtros") → consulta `.impactx/` → escreve a tela usando componentes/patterns já decididos.
- Zero hex hardcoded. Zero divergência entre os 3 DS (alfabeto / kumon / impactx).
- Showcase em `ui.impactx.com.br` serve como prova viva + documentação executável.

## Finish criteria (F1-F8)

| # | Critério | Status |
|---|---|---|
| F1 | Monorepo pnpm + turbo + Next 16 + Tailwind v4 estáveis | ✅ |
| F2 | Tokens 3-tier (primitive → semantic → component) via Style Dictionary | 🚧 PR6 mergeado, falta wire em consumidores |
| F3 | 22 atoms/molecules + 10 organisms publicados em `@impactxlab/design-system` | ✅ |
| F4 | ESLint plugin custom (no-tailwind-cru, no-dup-component) em modo `error` | 🚧 Flipado warn→error, falta zero violations no monorepo |
| F5 | Rules declarativas em `.impactx/rules/` cobrindo ≥10 componentes + 8 patterns | ✅ 28 rules ativas |
| F6 | A11y gate (axe + visual regression) no CI bloqueando regressões | 🚧 54 snapshots existem, falta apertar gates |
| F7 | CLI `npx @impactx/ui add` distribui componentes versionados | ✅ |
| F8 | Migração das 3 marcas (alfabeto / kumon / impactx) consumindo o DS canônico | ⏳ alfabeto in-flight, kumon e impactx pendentes |

**Snapshot 2026-05-17**: 5 de 8 atingidos integralmente. Foco atual: F2 (wire), F4 (zerar violations), F6 (gates), F8 (migrações).

## O que NÃO é

- Não é coleção de componentes shadcn rebrandeada — é DS canônico com tokens próprios.
- Não é framework — é biblioteca + contrato.
- Não é responsabilidade de um agent só — humanos aprovam (CTO), agents executam.
