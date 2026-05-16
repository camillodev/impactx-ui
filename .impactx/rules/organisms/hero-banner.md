# HeroBanner — Cabeçalho Destacado de Página

**Trigger**: seção hero de página, destaque educacional, header de página de aluno/curso, banner principal de página, capa de seção com título e descrição.

## Import

```typescript
import { HeroBanner } from "@impactxlab/ds-education"
```

## Props

```typescript
interface HeroBannerProps {
  eyebrow?: string       // Label pequeno acima do título (padrão: "AVALIAÇÕES")
  title?: string         // Título principal da seção (padrão: "Avaliações SAS")
  description?: string   // Descrição/subtítulo (padrão: texto sobre visualização de relatórios)
}
```

## Quando Usar

- **✅ Página de aluno/curso**: header destacado com eyebrow + título + descrição educacional
- **✅ Relatórios, turmas, avaliações**: seção hero que marca novo contexto ou tema
- **✅ Capa de seção**: único hero por página, no topo acima de conteúdo principal
- **❌ Banner secundário com CTA**: use componente separado (`BannerCTA`)
- **❌ Título simples sem destaque**: use `ListPageTemplate` com `primaryAction`
- **❌ Múltiplos heroes**: nunca mais de 1 hero principal por página

## Exemplos

### Básico — Avaliações

```jsx
<HeroBanner
  eyebrow="AVALIAÇÕES"
  title="Relatórios de Desempenho"
  description="Visualize os resultados das suas turmas e baixe cadernos de prova ou gabaritos."
/>
```

### Custom — Gerenciamento de Turmas

```jsx
<HeroBanner
  eyebrow="TURMAS"
  title="Gerenciar Alunos"
  description="Adicione, edite ou remova alunos das suas turmas. Acompanhe o progresso individual."
/>
```

### Minimal — Sem Descrição

```jsx
<HeroBanner
  eyebrow="DASHBOARD"
  title="Bem-vindo ao Portal"
/>
```

## Anti-Padrões

❌ **Div + gradient cru**
```jsx
// NÃO faça:
<div style={{ background: "linear-gradient(...)", minHeight: "280px" }}>
  <h1>Título</h1>
</div>

// FAÇA:
<HeroBanner title="Título" />
```

❌ **Hero sem alt em imagem**
— Não aplicável neste componente (usa SVG decorativo com `aria-hidden`), mas se estender com imagem de fundo, adicione `role="img"` com descrição.

❌ **Múltiplos heroes na mesma página**
```jsx
// NÃO faça:
<HeroBanner title="Seção 1" />
<HeroBanner title="Seção 2" />
```

❌ **Hero com botão/CTA inline**
— Botões não cabem no componente atual; passe via `description` em texto ou coloque logo abaixo do hero em componente separado.

## Acessibilidade

- SVG decorativo marcado como `aria-hidden="true"` — não lê em screen readers
- Título em `<h1>` semântico (único por página)
- Eyebrow em `<span>` com `text-xs`, `uppercase`, cor de warning
- Descrição em `<p>` semântica
- Cores controladas via design tokens CSS (`--color-hero-from`, `--color-hero-to`, `--color-warning`, `--color-text-on-primary`, `--color-overlay-text`)

## Quando NÃO Usar

| Caso | Alternativa |
|------|------------|
| Banner com botão primário | `BannerCTA` (componente com CTA integrada) |
| Apenas título sem descrição | `ListPageTemplate` + `primaryAction` |
| Hero em seção secundária | `SectionHeader` ou `CardHeader` |
| Múltiplos destaques na página | Use `HeroBanner` só 1x no topo; outros em `Card` ou `Section` |
| Imagem de fundo customizada | Extenda HeroBanner, mas mantenha acessibilidade (role, aria-label) |

## Implementação

**Localização**: `@impactxlab/ds-education` / `src/components-education/hero-banner.tsx`

**Tokens CSS consumidos**:
- `--color-hero-from` — cor inicial do gradiente (canto esquerdo)
- `--color-hero-to` — cor final do gradiente (canto direito)
- `--color-warning` — cor do eyebrow
- `--color-text-on-primary` — cor do título
- `--color-overlay-text` — cor da descrição
- `--color-overlay-xs` — opacidade das elipses grandes
- `--color-overlay-xxs` — opacidade das elipses pequenas

**Estrutura interna**:
1. Container com `overflow: hidden` e gradiente linear (dir: right)
2. SVG decorativo com 3 elipses semi-transparentes (background)
3. Conteúdo em flex column: eyebrow (`text-xs`) → h1 (`text-5xl bold`) → p (`text-base`)
4. Padding: `pt-16 pb-20`, `px-6` responsivo
5. Z-index: conteúdo em `z-10` acima do SVG

**Responsividade**: Component usa max-w-5xl e padding relativo; ajusta em mobile/tablet via Tailwind (verifique em 375px, 768px, 1440px).

---

**Atualizado**: maio 2026  
**Versão**: 1.0 (ds-education v1.x)
