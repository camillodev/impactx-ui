# PageContainer — Wrapper de Página com Max-width e Padding Responsivo

**Carrega quando bot mencionar:** page container, wrapper de página, max-width, padding responsivo, layout de página, app shell, container de conteúdo, margem automática.

## Import

```ts
import { PageContainer } from "@impactx/ds-education"
```

## Props

```ts
interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Max-width do container.
   * - "sm" = 672px
   * - "md" = 896px
   * - "lg" = 1280px (default — listas, dashboards padrão)
   * - "xl" = 1440px (dashboards wide, tabelas grandes)
   * - "full" = sem limite (hero, landing full-bleed)
   * - "prose" = ~65ch (artigos, documentação, leitura)
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "prose"

  /**
   * Padding responsivo (mobile-first).
   * - "none" = 0px
   * - "sm" = px-4 py-4, md: px-6 py-6
   * - "md" = px-4 py-6, md: px-8 py-8 (default)
   * - "lg" = px-4 py-8, md: px-12 py-12
   */
  padding?: "none" | "sm" | "md" | "lg"

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

### Página de lista de alunos (default)
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

### Formulário de matrícula (estreito)
```tsx
<PageContainer as="main" maxWidth="md">
  <Stack gap="lg">
    <Heading level={1}>Matrícula</Heading>
    <MatriculaForm />
  </Stack>
</PageContainer>
```

### Dashboard com muitos cards (wide)
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

### Artigo ou documentação (readability)
```tsx
<PageContainer as="main" maxWidth="prose" padding="md">
  <article>
    <Heading level={1}>Como usar o PageContainer</Heading>
    <p>O PageContainer substitui composições manuais...</p>
  </article>
</PageContainer>
```

## Anti-patterns ❌

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

### ❌ Usar padding="none" com PageContainer
```tsx
// ERRADO: padding="none" é casos raros (hero, custom chrome)
<PageContainer padding="none">
  <CardCommon /> {/* margem inesperada */}
</PageContainer>

// CORRETO: usar padding padrão ou explicit
<PageContainer padding="md">
  <CardCommon />
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

**Classes Tailwind:** mapeadas em constantes para build-time detection:
- `max-w-2xl` (sm, 672px)
- `max-w-4xl` (md, 896px)
- `max-w-7xl` (lg, 1280px)
- `max-w-[1440px]` (xl, 1440px)
- `max-w-none` (full)
- `max-w-prose` (~65ch)

**Padding:** mobile-first responsivo
- Base: `px-4 py-6` em mobile
- Tablet+: `md:px-8 md:py-8` em tablet e acima
- Variações por size: sm (px-6), lg (px-12 py-12)

**Estrutura:** wrapper with `mx-auto w-full` garante centralização e expansão horizontal.
