# PageContainer — Wrapper de Página com Max-width e Padding Responsivo

**Carrega quando bot mencionar:** page container, wrapper de página, max-width, padding responsivo, layout de página, app shell, container de conteúdo, margem automática.

## Import

```ts
import { PageContainer } from "@camillodev/ui"
```

## Props

```ts
interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Max-width do container.
   * Aceita valor único OU objeto responsivo { base, sm, md, lg, xl }
   * - "sm" = 672px
   * - "md" = 896px
   * - "lg" = 1280px (default — listas, dashboards padrão)
   * - "xl" = 1440px (dashboards wide, tabelas grandes)
   * - "full" = sem limite (hero, landing full-bleed)
   * - "prose" = ~65ch (artigos, documentação, leitura)
   * Default: "lg"
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "prose" | 
            { base?: ..., sm?: ..., md?: ..., lg?: ..., xl?: ... }

  /**
   * Padding responsivo (mobile-first).
   * Aceita valor único OU objeto responsivo { base, sm, md, lg, xl }
   * - "none" = 0px
   * - "sm" = px-4 py-4, md: px-6 py-6
   * - "md" = px-4 py-6, md: px-8 py-8
   * - "lg" = px-4 py-8, md: px-12 py-12
   * Default: { base: "sm", md: "md" } (mobile-first explícito)
   */
  padding?: "none" | "sm" | "md" | "lg" |
           { base?: ..., sm?: ..., md?: ..., lg?: ..., xl?: ... }

  /**
   * Renderiza como outro elemento. Default: "div".
   * Use `as="main"` em páginas (landmark semântico).
   */
  as?: React.ElementType
}
```

## Árvore de Decisão

| Caso | maxWidth | Motivo |
|------|----------|--------|
| Página de lista/dashboard padrão | **lg** (default) | Largura 1280px é balanceada para a maioria |
| Página de form, settings, editor | **md** | 896px mantém foco no conteúdo |
| Hero, landing, full-bleed | **full** | Sem restrição, ocupa todo o viewport |
| Conteúdo de leitura (artigo, doc) | **prose** | ~65 caracteres por linha — ideal readability |
| Dashboard wide com muitos cards | **xl** | 1440px aproveita telas grandes |
| Cards na sidebar de um app | **sm** | 672px é estreito demais; considere remover PageContainer |

## Exemplos ✅

### Página responsiva com quebra de padding
```tsx
<PageContainer 
  as="main" 
  maxWidth={{ base: "full", md: "lg" }}
  padding={{ base: "sm", md: "md" }}
>
  <Stack gap="lg">
    <Heading level={1}>Alunos</Heading>
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
      {students.map(s => <StudentCard key={s.id} {...s} />)}
    </Grid>
  </Stack>
</PageContainer>
```

### Página de lista (usando defaults mobile-first)
```tsx
<PageContainer as="main">
  <Stack gap="lg">
    <Heading level={1}>Alunos</Heading>
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
      {students.map(s => <StudentCard key={s.id} {...s} />)}
    </Grid>
  </Stack>
</PageContainer>
```

### Formulário responsivo (estreito em mobile, normal em desktop)
```tsx
<PageContainer 
  as="main" 
  maxWidth={{ base: "sm", md: "md" }}
>
  <Stack gap="lg">
    <Heading level={1}>Matrícula</Heading>
    <MatriculaForm />
  </Stack>
</PageContainer>
```

### Dashboard com muitos cards
```tsx
<PageContainer as="main" maxWidth="xl">
  <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
    <StatCard label="Receita" value="R$ 42.5k" />
    <StatCard label="Alunos" value="1,203" />
    <StatCard label="Conversão" value="3.2%" />
    <StatCard label="Bounce" value="24.5%" />
  </Grid>
</PageContainer>
```

### Landing/hero sem padding
```tsx
<PageContainer maxWidth="full" padding="none">
  <HeroSection />
</PageContainer>
```

### Artigo ou documentação
```tsx
<PageContainer as="main" maxWidth="prose" padding="md">
  <article>
    <Heading level={1}>Como usar o PageContainer</Heading>
    <p>O PageContainer substitui composições manuais...</p>
  </article>
</PageContainer>
```

## Anti-patterns ❌

### ❌ Padding fixo em mobile/desktop sem objeto responsivo
```tsx
// ERRADO: padding fixo não adapta entre breakpoints
<PageContainer padding="md">
  {/* sm em mobile, md em desktop — sem transição intermediária */}
</PageContainer>

// CORRETO: usar objeto responsivo pra mobile-first explícito
<PageContainer padding={{ base: "sm", md: "md" }}>
  {/* px-4 py-4 em mobile, px-8 py-8 em md+ */}
</PageContainer>
```

### ❌ Esquecerse do default padding mobile-first
```tsx
// ERRADO: padding grande demais no mobile
<PageContainer padding="md">
  {/* px-4 py-6 em mobile — pode apertar em telas pequenas */}
</PageContainer>

// CORRETO: começar com sm, subir pra md em md+
<PageContainer padding={{ base: "sm", md: "md" }}>
  {/* px-4 py-4 em mobile, px-8 py-8 em md+ */}
</PageContainer>
```

### ❌ max-w-7xl mx-auto px-4 py-6 cru em className
```tsx
// ERRADO: reinventar a roda
<div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8">
  {/* content */}
</div>

// CORRETO:
<PageContainer as="main">
  {/* content */}
</PageContainer>
```

### ❌ PageContainer aninhado
```tsx
// ERRADO: duplicar container — segunda é ignorada
<PageContainer>
  <PageContainer>
    {/* content */}
  </PageContainer>
</PageContainer>
```

### ❌ PageContainer dentro de Modal/Sheet
```tsx
// ERRADO: Modal já tem chrome e padding interno
<Modal>
  <PageContainer>
    {/* content */}
  </PageContainer>
</Modal>

// CORRETO:
<Modal>
  <ModalContent>
    {/* content sem PageContainer */}
  </ModalContent>
</Modal>
```

### ❌ Esquecer `as="main"` em páginas
```tsx
// ERRADO: perde landmark semântico
<PageContainer>
  <Heading level={1}>Página Principal</Heading>
</PageContainer>

// CORRETO:
<PageContainer as="main">
  <Heading level={1}>Página Principal</Heading>
</PageContainer>
```

## Quando NÃO usar PageContainer

| Caso | Alternativa | Motivo |
|------|-------------|--------|
| Dentro de Modal/Sheet/Sidebar | Sem container (modal já tem chrome) | Duplica espaçamento |
| Componente de header global | Render direto sem PageContainer | Header é fixed/sticky, controla próprio layout |
| Footer global | Render direto sem PageContainer | Footer é full-width por design |
| Email template / PDF | Sem — não há viewport web | Context não se aplica |
| Componente reutilizável (ex.: Card) | Sem — deixa parent decidir | O wrapper já vem do contexto de uso |

## Implementação Técnica

**Localização:** `packages/ds-education/src/components/page-container.tsx`

**Props aceita:**
- Valor único (string): `maxWidth="lg"` → resolve em classe base
- Objeto responsivo: `maxWidth={{ base: "full", md: "lg" }}` → classes por breakpoint

**Classes Tailwind:** mapeadas em constantes para build-time detection:
- `max-w-2xl` (sm, 672px)
- `max-w-4xl` (md, 896px)
- `max-w-7xl` (lg, 1280px)
- `max-w-[1440px]` (xl, 1440px)
- `max-w-none` (full)
- `max-w-prose` (~65ch)

**Padding:** mobile-first responsivo
- Base: `px-4 py-4` em mobile
- Tablet+: `md:px-6 md:py-6` / `md:px-8 md:py-8` em tablet e acima
- Variações por size: lg (px-12 py-12), xl (px-20 py-20)

**Estrutura:** wrapper with `mx-auto w-full` garante centralização e expansão horizontal.
