# DetailPageTemplate — Página de Detalhe de 1 Entidade

**Carrega quando bot mencionar:** detalhe, página de detalhe, perfil, ficha, view de aluno, detail page, sidebar de info, visualizar, abrir detalhe.

## Import

```ts
import { DetailPageTemplate, type DetailPageTemplateProps } from "@camillodev/ui"
```

## Props

```ts
interface DetailPageTemplateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Título principal (h1). */
  title: React.ReactNode
  /** Subtítulo abaixo do título. Ex: "Matrícula #12345". Opcional. */
  subtitle?: React.ReactNode
  /** Trilha de breadcrumb. Opcional. */
  breadcrumbs?: BreadcrumbItem[]
  /** Link de volta. Se passado, renderiza botão "Voltar" com ícone ChevronLeft. Opcional. */
  backHref?: string
  /** Ação principal (botão direita do header). Geralmente <Button variant="primary">. */
  primaryAction?: React.ReactNode
  /** Ações secundárias (à esquerda do primaryAction no header). */
  secondaryActions?: React.ReactNode
  /** Coluna lateral (info, ações relacionadas). Se passado, layout 2-col desktop (main lg:col-span-2 + sidebar lg:col-span-1), stack mobile. Opcional. */
  sidebar?: React.ReactNode
  /** Conteúdo principal — geralmente Form, Card stack, ou Tabs. */
  children: React.ReactNode
  /** Max-width do container. Default: "lg". */
  maxWidth?: PageContainerProps["maxWidth"]
  /** Padding do container. Default: "md". */
  padding?: PageContainerProps["padding"]
}

interface BreadcrumbItem {
  label: string
  href?: string
}
```

## Árvore de Decisão

| Caso | Componente | Motivo |
|------|-----------|--------|
| Detalhe com main + sidebar (info, ações) | **DetailPageTemplate com sidebar** | Layout 2-col responsivo automático |
| Detalhe sem coluna lateral | **DetailPageTemplate sem sidebar** | Full-width, children direto |
| Navegação breadcrumb multi-nível | Passar breadcrumbs array | Trilha semântica acima do header |
| Link "voltar" para lista | backHref="/entidades" | ChevronLeft automático |
| Botão primário no canto (Editar, Enviar) | primaryAction=<Button> | Sempre direita, antes de secondaryActions |
| Ações adicionais (Duplicar, Arquivar) | secondaryActions=<>actions</> | Cluster esquerda, antes do primary |
| Lista de entidades | ListPageTemplate | Não usar DetailPageTemplate |
| Form multi-step criação | FormPageTemplate | Não usar DetailPageTemplate |
| Modal detalhe rápido (lightbox) | Modal.Content size="welcome" | Não usar DetailPageTemplate |
| Dashboard home | DashboardTemplate | Não usar DetailPageTemplate |

## Exemplos ✅

### Perfil de aluno completo com sidebar

```tsx
<DetailPageTemplate
  title="João Silva"
  subtitle="Matrícula #2024-001"
  breadcrumbs={[
    { label: "Alunos", href: "/alunos" },
    { label: "João Silva" }
  ]}
  backHref="/alunos"
  primaryAction={<Button variant="primary">Editar</Button>}
  secondaryActions={<Button variant="secondary">Desativar</Button>}
  sidebar={
    <Card>
      <Stack gap="md">
        <div>
          <p className="text-xs text-muted">Responsável</p>
          <p className="font-semibold">Maria Silva</p>
        </div>
        <div>
          <p className="text-xs text-muted">Telefone</p>
          <p className="font-semibold">(11) 98765-4321</p>
        </div>
        <div>
          <p className="text-xs text-muted">Plano</p>
          <Badge>Plano Mensal</Badge>
        </div>
      </Stack>
    </Card>
  }
>
  <Tabs defaultValue="aulas">
    <TabsList>
      <TabsTrigger value="aulas">Aulas</TabsTrigger>
      <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
      <TabsTrigger value="historico">Histórico</TabsTrigger>
    </TabsList>
    <TabsContent value="aulas">
      {/* conteúdo de aulas */}
    </TabsContent>
  </Tabs>
</DetailPageTemplate>
```

### Detalhe simples sem sidebar

```tsx
<DetailPageTemplate
  title="Fatura #INV-2024-012"
  subtitle="R$ 1.500,00 — Vencimento em 15 de junho"
  backHref="/faturas"
  primaryAction={<Button variant="primary">Baixar PDF</Button>}
>
  <Stack gap="lg">
    <Card>
      <InvoiceDetails invoice={invoice} />
    </Card>
  </Stack>
</DetailPageTemplate>
```

### Com breadcrumb multi-nível

```tsx
<DetailPageTemplate
  title="Aula 12"
  breadcrumbs={[
    { label: "Unidades", href: "/unidades" },
    { label: "Unidade Central", href: "/unidades/1" },
    { label: "Turmas", href: "/unidades/1/turmas" },
    { label: "3º Ano A", href: "/unidades/1/turmas/3a" },
    { label: "Aula 12" }
  ]}
  backHref="/unidades/1/turmas/3a"
>
  {/* conteúdo */}
</DetailPageTemplate>
```

## Anti-patterns ❌

- **Layout 2-col manual cru**: Não fazer `<div className="grid grid-cols-3">` — use sidebar prop, template resolve responsividade.
- **h1 inline no children**: Template renderiza `<h1>` — passar apenas `title`.
- **Conteúdo sem padding**: Template aplica padding via `PageContainer` — não duplicar padding nos children.
- **Confundir sidebar com secondaryActions**: Sidebar = coluna info/metadata (desktop lg:col-span-1). SecondaryActions = botões header.
- **Sidebar com muitos botões**: Se sidebar ≥ 3 botões, considerar Card + Stack, ou mover ações pro header (secondaryActions).

## Quando NÃO usar

- **Lista de entidades** → `ListPageTemplate`
- **Form criação/edição multi-step** → `FormPageTemplate`
- **Dashboard/overview home** → `DashboardTemplate`
- **Modal detalhe rápido (inline, sem página cheia)** → `Modal.Content size="welcome"`
- **Tabela agrupada com paginação** → `DataTableWithPagination` dentro de um detail page

## Implementação Técnica

**Localização:** `/packages/ds-education/src/templates/detail-page-template.tsx`

**Layout responsivo:**
- Desktop: `grid grid-cols-1 gap-6 lg:grid-cols-3`
  - `main → lg:col-span-2`
  - `sidebar → lg:col-span-1`
- Mobile: Stack vertical (col-span-1 para ambas)

**Semântica:**
- `<main>` wrapper via `PageContainer as="main"`
- `<h1>` automático do title prop
- `<nav>` para breadcrumb
- `<aside>` para sidebar

**Padding:** Container default `"md"` (16px padding). Customizável via `padding` prop.

**Visibilidade:** Sidebar oculta em mobile, respeitando Tailwind responsive (`lg:col-span-1`).
