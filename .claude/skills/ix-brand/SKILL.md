---
name: ix-brand
description: >
  Brand design system da Impact X — verde #11C76F, Plus Jakarta Sans, fontes grandes.
  Use SEMPRE que gerar HTML/CSS, reports, landing pages, frontends ou qualquer artefato visual da Impact X.
---

# Impact X — Brand Design System

> Fonte de verdade visual da Impact X. Aplicar em todo HTML, report, landing page, frontend e documento.
> Estetica: fontes grandes, clareza, sofisticacao simples (referencia: Nubank docs/blog).

**Contexto de marca**: Esta skill cobre o design system visual. Para identidade da empresa, valores, cultura e tom de voz: skill `ix-core` + `references/brand-voice.md`.

---

## v2.3 — Capa ebookinho + callouts recolorizados (2026-04-16)

Atualizacao do sistema de PDFs IX. Referencia visual: capa ebookinho Descomplica ("HORA DO TREINO DE *BEM-ESTAR*") — fullscreen verde + texto GIGANTE centralizado + palavra-chave em italico amarelo.

### Capa full-bleed (obrigatoria)

Markup canonico:
```html
<div class="ix-cover">
<div class="ix-cover-logo">IMPACT <span class="x">X</span></div>
<h1 class="ix-cover-title">Titulo Principal <span class="accent">Palavra-Chave</span></h1>
<p class="ix-cover-subtitle">Subtitulo explicativo em uma linha.</p>
<p class="ix-cover-meta">DATA · AUTOR · CONFIDENCIAL</p>
</div>
```

Regras:
- `<h1>` = 78pt black, branco, centralizado vertical
- `<span class="accent">` = italico amarelo `#FBBF24` (ultima palavra ou palavra-chave)
- Nao usar `.ix-cover-xmark` (descontinuado — era ornamento X gigante)
- Logo top-left automatico via CSS (absolute)
- Meta em uppercase, rodape esquerdo

### Amarelo `#FBBF24` — uso restrito

Amarelo NAO e mais cor de callout. Uso permitido somente em:
1. `.accent` dentro de `.ix-cover h1` (palavra em destaque)
2. `.priority.p1` (P1 nas prioridades)

### Callouts recolorizados

| Classe | Background | Borda | Ícone Phosphor |
|---|---|---|---|
| `.box-dica` | `#ECFDF5` (verde-tint) | `#11C76F` | `ph-lightbulb` |
| `.box-atencao` | `#FFE4D9` (laranja-tint) | `#FF6B00` | `ph-warning` |
| `.box-resumo` | verde-tint | verde-dark `#059669` | `ph-check-circle` |
| `.box-exemplo` | cinza `#F4F6F9` | `#6B7280` | `ph-caret-double-right` |
| `.box-insight` | roxo-palido `#EEF2FF` | `#4F46E5` | `ph-sparkle` |

### Componentes novos

- `<nav id="TOC">` manual (pos-capa) — pandoc nao gera, adicionar no markdown
- `<div class="org-chart">` com root + branches (organograma)
- `<div class="flow-steps">` horizontal (passos sequenciais D+3/D+7/D+14)
- `<div class="flow-vertical">` timeline numerada (processo passo-a-passo)
- `<div class="section-heading">` com `<span class="num">01.</span>` (chapter anchor)
- `{#slug-kebab}` obrigatorio em H2 referenciados pelo TOC manual

### Pandoc flags obrigatorios

```bash
pandoc input.md -o output.pdf \
  --pdf-engine=weasyprint \
  --css=~/agent-workspace/pandoc.css \
  --standalone \
  -f markdown+raw_html
```

O `-f markdown+raw_html` e critico — sem isso blocos HTML viram code block.

---

## 1. Identidade — O Verde Impact X

O verde `#11C76F` e a cor principal. Representa tecnologia, crescimento e Brasil.

**Logo:** Texto puro — `IMPACT X`
- Weight 800, letter-spacing 0.12em, uppercase
- "IMPACT" na cor do texto (ink no light, branco no dark)
- "X" sempre em verde `#11C76F`
- Excecao unica: em fundo verde solido, o "X" pode ser amarelo `#FBBF24`

```html
<!-- Light background -->
IMPACT <span style="color:#11C76F">X</span>

<!-- Dark background -->
<span style="color:#fff">IMPACT </span><span style="color:#11C76F">X</span>

<!-- Sobre fundo verde (unica excecao) -->
<span style="color:#fff">IMPACT </span><span style="color:#FBBF24">X</span>
```

**Watermark decorativo:** "X" gigante em opacidade 7%, canto inferior direito.

---

## 2. Paleta de Cores

### Light Mode (padrao)

| Token | Hex | Uso |
|-------|-----|-----|
| `--ix-green` | `#11C76F` | Primaria: CTAs, links, badges, "X", tabs ativas |
| `--ix-green-hover` | `#0EB863` | Hover em elementos verdes |
| `--ix-green-dark` | `#059669` | Titulos H2, textos em destaque verde |
| `--ix-green-light` | `#D1FAE5` | Backgrounds de badges, linhas alternadas |
| `--ix-green-tint` | `#ECFDF5` | Fundo de callouts, headers de secao, hover de tabela |
| `--ix-ink` | `#1A1D21` | Texto principal |
| `--ix-ink-secondary` | `#374151` | Texto secundario mais escuro |
| `--ix-muted` | `#6B7280` | Texto auxiliar, labels, metadata |
| `--ix-surface` | `#FFFFFF` | Cards, paineis, modais |
| `--ix-surface-2` | `#F4F6F9` | Fundo de tabs, areas secundarias |
| `--ix-bg` | `#F4F6F9` | Fundo geral da pagina |
| `--ix-border` | `#E8ECF1` | Bordas de cards, tabelas, divisores |
| `--ix-yellow` | `#FBBF24` | Warning, accent pontual (uso escasso) |
| `--ix-success` | `#11C76F` | Estados de sucesso |
| `--ix-warning` | `#D4820A` | Alertas |
| `--ix-danger` | `#C0392B` | Erros, badges P0 |

### Dark Mode

| Token | Hex |
|-------|-----|
| `--ix-green` | `#04D361` |
| `--ix-ink` | `#E1E1E6` |
| `--ix-muted` | `#7C7C8A` |
| `--ix-bg` | `#121214` |
| `--ix-surface` | `#1C1C1F` |
| `--ix-surface-2` | `#29292E` |
| `--ix-border` | `#323238` |

### Amarelo — Uso Restrito

O amarelo `#FBBF24` e accent de excecao. Usar APENAS para:
- "X" do logo sobre fundo verde solido
- Badges de warning
- Destaques pontuais onde verde nao tem contraste

Nunca usar amarelo como cor primaria ou em grandes areas.

---

## 3. Tipografia

**Font stack:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
**Font mono:** `'Roboto Mono', ui-monospace, monospace`

Google Fonts import (quando online):
```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500&display=swap");
```

### Escala Tipografica — Base 18px

| Nivel | Tamanho | Peso | Line-height | Uso |
|-------|---------|------|-------------|-----|
| Display | 48-56px | 900 | 1.1 | Hero de report, titulos de campanha |
| H1 | 36-40px | 800 | 1.15 | Titulo de pagina, secao principal |
| H2 | 24-28px | 700 | 1.3 | Subsecoes, titulos de card |
| H3 | 20-22px | 600 | 1.4 | Sub-subsecoes, labels importantes |
| Body | 18px | 400 | 1.65 | Texto corrido, paragrafos |
| Body strong | 18px | 600 | 1.65 | Destaques em texto corrido |
| Small | 15-16px | 500 | 1.5 | Labels, metadata, captions |
| Mono | 15px | 400 | 1.5 | Valores numericos, codigo, metricas |
| XSmall | 12-13px | 700 | 1.3 | Badges, caps labels, eyebrows |

### Regras Tipograficas

- **Minimo absoluto: 18px** para body text. Nunca menor.
- Usar **peso** (600, 700, 800) para hierarquia — nao depender so de tamanho.
- Italico para subtitulos descritivos (`<em>` dentro de H1).
- Mono (Roboto Mono) para: valores numericos, metricas, codigo, precos.
- H2 com `color: var(--ix-green-dark)` e `border-bottom` verde para separar secoes.
- Titulos de destaque: a palavra-chave em `color: var(--ix-green)`.

---

## 4. Espacamento e Layout

### Radii

| Token | Valor | Uso |
|-------|-------|-----|
| `--ix-radius-xs` | `6px` | Badges pequenos |
| `--ix-radius-sm` | `10px` | Inputs, botoes |
| `--ix-radius-md` | `16px` | Cards, paineis |
| `--ix-radius-lg` | `22px` | Containers grandes, modais |
| `--ix-radius-pill` | `100px` | Tabs, chips, botoes pill |

### Sombras

```css
--ix-shadow-sm:   0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
--ix-shadow-card: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
--ix-shadow-md:   0 4px 12px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.06);
--ix-shadow-lg:   0 12px 40px rgba(15,23,42,.12);
```

### Espacamento

- Padding de conteudo: `48px` lateral em desktop, `20px` em mobile
- Gap entre cards: `1rem` (16px)
- Margin entre secoes: `2rem` (32px)
- Max-width de conteudo: `900px` (reports) ou `1100px` (dashboards)

---

## 5. Componentes

### 5.1 Report Header (capa de secao)

```css
.report-header {
  background: var(--ix-green-tint);
  color: var(--ix-ink);
  padding: 56px 64px 48px;
  border-bottom: 1px solid var(--ix-border);
  position: relative;
  overflow: hidden;
}
.report-header[data-ix-watermark]::after {
  content: attr(data-ix-watermark);
  position: absolute;
  right: 60px; bottom: -20px;
  font-size: 180px; font-weight: 900;
  opacity: 0.07; color: var(--ix-green);
}
```

### 5.2 Metric Card

```css
.metric-card {
  background: var(--ix-surface);
  border: 1px solid var(--ix-border);
  border-radius: var(--ix-radius-md);
  padding: 1.5rem;
  text-align: center;
}
.metric-value {
  font-family: var(--ix-font-mono);
  font-size: 2rem; font-weight: 700;
  color: var(--ix-green);
}
.metric-label {
  font-size: 15px;
  color: var(--ix-muted);
  margin-top: 4px;
}
```

### 5.3 Callout

```css
.callout {
  border-radius: var(--ix-radius-sm);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid;
}
.callout.info    { background: #EFF6FF; border-color: #3B82F6; }
.callout.success { background: var(--ix-green-tint); border-color: var(--ix-green); }
.callout.warning { background: #FFFBEB; border-color: var(--ix-yellow); }
.callout.danger  { background: #FEF2F2; border-color: var(--ix-danger); }
```

### 5.4 Tabelas

```css
table { width: 100%; border-collapse: collapse; }
thead th {
  background: var(--ix-green-tint);
  color: var(--ix-ink);
  padding: 0.75rem 1rem;
  font-weight: 600; font-size: 15px;
  text-align: left;
}
tbody td {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid var(--ix-border);
  font-size: 18px;
}
tbody tr:hover { background: var(--ix-green-tint); }
```

### 5.5 Priority Badges

```css
.priority-badge {
  font-family: var(--ix-font-mono);
  font-size: 13px; font-weight: 600;
  padding: 2px 8px; border-radius: 6px;
}
.p0 { background: #FEE2E2; color: #991B1B; }
.p1 { background: #FEF3C7; color: #92400E; }
.p2 { background: #D1FAE5; color: #065F46; }
.p3 { background: #F3F4F6; color: #4B5563; }
```

### 5.6 Botoes

```css
.btn-primary {
  background: var(--ix-green);
  color: #fff;
  font-family: var(--ix-font);
  font-size: 18px; font-weight: 600;
  padding: 14px 32px;
  border-radius: var(--ix-radius-pill);
  border: none; cursor: pointer;
  transition: all .2s ease;
}
.btn-primary:hover {
  background: var(--ix-green-hover);
  box-shadow: 0 4px 16px rgba(17,199,111,.35);
}
.btn-secondary {
  background: transparent;
  color: var(--ix-green);
  border: 1.5px solid var(--ix-green);
  padding: 13px 31px;
  border-radius: var(--ix-radius-pill);
  font-size: 18px; font-weight: 600;
}
```

---

## 6. Voz & Tom

- **Direto:** Resultado primeiro, feature depois.
- **Tecnico-humano:** Respeitar a inteligencia do leitor.
- **Orgulho brasileiro:** Contexto local, nao globalese.
- **Sem hype:** Nada de "incrivel", "revolucionario", "disruptivo".
- **Zero emojis** em produto e reports. Emojis so em chat informal.
- **Fontes grandes e claras:** O leitor bate o olho e sabe onde esta.

---

## 7. CSS Tokens — Bloco Completo

Colar no `<style>` de todo HTML Impact X:

```css
:root {
  --ix-ink: #1A1D21;
  --ix-ink-secondary: #374151;
  --ix-muted: #6B7280;
  --ix-green: #11C76F;
  --ix-green-hover: #0EB863;
  --ix-green-dark: #059669;
  --ix-green-light: #D1FAE5;
  --ix-green-tint: #ECFDF5;
  --ix-bg: #F4F6F9;
  --ix-surface: #FFFFFF;
  --ix-surface-2: #F4F6F9;
  --ix-border: #E8ECF1;
  --ix-yellow: #FBBF24;
  --ix-success: #11C76F;
  --ix-warning: #D4820A;
  --ix-danger: #C0392B;
  --ix-radius-xs: 6px;
  --ix-radius-sm: 10px;
  --ix-radius-md: 16px;
  --ix-radius-lg: 22px;
  --ix-radius-pill: 100px;
  --ix-shadow-sm: 0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
  --ix-shadow-card: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --ix-shadow-md: 0 4px 12px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.06);
  --ix-shadow-lg: 0 12px 40px rgba(15,23,42,.12);
  --ix-font: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --ix-font-mono: 'Roboto Mono', ui-monospace, monospace;
}
```

---

## 8. Anti-Padroes

| Errado | Correto |
|--------|---------|
| Font size < 18px para body | Minimo 18px sempre |
| `color: green` generico | `var(--ix-green)` = `#11C76F` |
| Amarelo como cor primaria | Amarelo so em excecoes |
| `font-family: sans-serif` | `var(--ix-font)` |
| `border-radius: 4px` em cards | `var(--ix-radius-md)` = 16px |
| Sombras pretas pesadas | Sombras suaves do sistema |
| Emojis em texto de produto | Zero emojis em contexto formal |
| Roxo `#820AD1` como primaria | Obsoleto — usar verde `#11C76F` |

---

## 9. Referencia Rapida

| Item | Valor |
|------|-------|
| Cor primaria | `#11C76F` (verde) |
| Cor dark | `#059669` |
| Tint | `#ECFDF5` |
| Ink | `#1A1D21` |
| Surface | `#FFFFFF` |
| Background | `#F4F6F9` |
| Amarelo (excecao) | `#FBBF24` |
| Danger | `#C0392B` |
| Font body | Plus Jakarta Sans |
| Font mono | Roboto Mono |
| Body size | 18px min |
| H1 | 36-40px / 800 |
| H2 | 24-28px / 700 |
| Display | 48-56px / 900 |
| Radius card | 16px |
| Radius pill | 100px |
| Logo | `IMPACT` ink + `X` verde |
