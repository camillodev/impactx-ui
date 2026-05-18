# Pattern: Detalhe com sidebar

> **Trigger:** "página de detalhe", "ver aluno/fatura/projeto", "tela do [entidade]", "detalhe com infos do lado", "main + sidebar".

## Decisão em 30 segundos

| Cenário | Componente | Por quê |
|---|---|---|
| Detalhe com metadados estruturados ao lado | DetailPageTemplate (sidebar prop) | Layout 2-col responsivo, composto |
| Detalhe sem sidebar (full-width) | DetailPageTemplate sem prop sidebar | Foco total em conteúdo principal |
| Detalhe com abas (overview, histórico, docs) | DetailPageTemplate + Tabs em children | Múltiplas seções, sidebar constante |

## Receita (9 linhas)

```tsx
import { DetailPageTemplate, Card, Stack, Button } from "@camillodev/ui"

export default function AlunoPage({ aluno }) {
  return (
    <DetailPageTemplate
      title={aluno.nome}
      subtitle={`Matrícula ${aluno.matricula}`}
      breadcrumbs={[{ label: "Alunos", href: "/alunos" }, { label: aluno.nome }]}
      backHref="/alunos"
      primaryAction={<Button>Editar</Button>}
      sidebar={<Card><Stack gap="sm">{/* 3-5 metadados */}</Stack></Card>}
    >
      <Stack gap="lg">{/* main content */}</Stack>
    </DetailPageTemplate>
  )
}
```

## Variações

- **Sem sidebar (full-width)**: omita prop `sidebar` — template renderiza 1-col
- **Sem breadcrumb**: omita `breadcrumbs` — header vai só com title
- **Sem back link**: omita `backHref` — ChevronLeft não renderiza
- **Múltiplas ações**: use `secondaryActions={<>...buttons...</>}` (à esquerda de primaryAction)
- **Mobile**: sidebar automático empilha embaixo (Tailwind `lg:col-span-1`)

## Anti-patterns ❌

- ❌ **NUNCA** monte `grid grid-cols-2` na mão — use prop `sidebar`
- ❌ **NUNCA** force sidebar em mobile — DetailPageTemplate já é responsivo
- ❌ **NUNCA** coloque `<button>` inline nos children — use `primaryAction`/`secondaryActions`
- ❌ **NUNCA** duplique `<h1>` — template renderiza automático do title prop
- ❌ **NUNCA** sidebar com 5+ botões — mova pro header (secondaryActions) ou crie Card + Stack

## Desktop / Mobile

| Viewport | Layout | Sidebar |
|---|---|---|
| `lg:` (≥1024px) | grid `lg:col-span-2` + `lg:col-span-1` | visível |
| `<lg` (mobile) | stack vertical `col-span-1` + `col-span-1` | embaixo |

Template com `PageContainer` (padding `"md"`, max-width `"lg"`).

## Links

- Template tech: `.impactx/rules/templates/detail-page.md`
- Form em vez de detalhe: `.impactx/rules/patterns/form-simple.md`
- Sem sidebar (full): `.impactx/rules/patterns/detail-simple.md`
