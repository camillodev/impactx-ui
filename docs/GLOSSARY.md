# GLOSSARY — Impact X UI

> Tamanho alvo: ≤60 linhas. Referência rápida de termos. Ordem alfabética.

| Termo | Definição |
|---|---|
| **Atom** | Componente indivisível (Button, Input, Badge). Sem estado de negócio. |
| **Decision tree** | Tabela "se X, então Y" usada em rules pra escolher variant/pattern sem prosa longa. |
| **DS** | Design System. No repo, refere-se ao DS canônico em `packages/ds-education`. |
| **Intent** | Significado semântico de cor: `primary`, `secondary`, `tertiary`, `danger`, `success`, `warning`, `info`. |
| **Mode** | Estado de luminosidade: `light` (default, sem atributo) ou `dark` (via `data-mode="dark"` no `<html>`). |
| **Molecule** | Composição pequena de atoms (FormField = Label + Input + ErrorMessage). |
| **Organism** | Composição grande, frequentemente domain-specific (HeroBanner, AssessmentCard). |
| **Pattern** | Receita declarativa pra montar uma tela inteira (list-with-filters, dashboard-overview). Mora em `.impactx/rules/patterns/`. |
| **Primitive** | Layout primitive responsivo (Grid, Stack, Cluster, PageContainer). |
| **Registry** | JSON gerado em `apps/web/public/r/*.json` que a CLI `@impactx/ui` consome pra distribuir componentes. |
| **Rule** | Arquivo Markdown declarativo em `.impactx/rules/` consumido por agents pra escrever código consistente. |
| **Showcase** | App Next em `apps/web/` que renderiza demos + docs em `ui.impactx.com.br`. |
| **Template** | Estrutura de página inteira (list-page, detail-page, form-page, dashboard). Mora em `.impactx/rules/templates/`. |
| **Theme** | Identidade visual de uma marca: `theme-alfabeto`, `theme-kumon`, `theme-education`, `theme-impactx`. Aplicado via classe no `<html>`. |
| **Token** | Variável de design (cor, espaço, tipo, raio) exposta como `var(--color-*)`. Nunca hardcode hex. |
| **Token component** | Token específico de componente (`--btn-primary-bg`). |
| **Token primitive** | Token cru (`--color-blue-500`). |
| **Token semantic** | Token de intenção (`--color-primary`, `--color-fg-default`). |
| **Variant** | Variação visual de um componente (Button: `primary` | `secondary` | `outline` | `ghost` | `tertiary` | `danger`). |
