# Pattern: Estados (loading, empty, error)

> **Trigger:** "loading state", "empty state", "sem dados", "estado vazio", "erro 500", "tela de erro", "skeleton", "placeholder enquanto carrega".

## A regra de ouro

Toda tela com fetch tem **3 estados visuais**: loading, empty, error. Nunca renderize "nada" sem motivo.

## Decisão em 30 segundos

| Estado | Quando | Componente |
|---|---|---|
| **Loading** | Fetch em andamento | `<Skeleton>` (placeholders com shape do conteúdo) |
| **Empty** | Fetch ok, zero resultados | `<Card>` com mensagem + CTA |
| **Error** | Fetch falhou | `<Card>` com mensagem + botão Tentar novamente |

## Receita: Loading com Skeleton (10 linhas)

```tsx
import { Skeleton, Stack } from "@impactxlabs/ui"

function AlunosListSkeleton() {
  return (
    <Stack gap="sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded" />
      ))}
    </Stack>
  )
}
```

## Receita: Empty state (composição manual)

```tsx
import { Card, Stack, Button } from "@impactxlabs/ui"

function EmptyAlunos({ onAdd }) {
  return (
    <Card>
      <Stack gap="md" align="center" className="py-12">
        <h3 className="text-lg font-bold">Nenhum aluno ainda</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Comece adicionando seu primeiro aluno.
        </p>
        <Button variant="primary" onClick={onAdd}>+ Novo aluno</Button>
      </Stack>
    </Card>
  )
}
```

## Receita: Error state (composição manual)

```tsx
function ErrorState({ message, onRetry }) {
  return (
    <Card>
      <Stack gap="md" align="center" className="py-12">
        <h3 className="text-lg font-bold">Algo deu errado</h3>
        <p className="text-sm text-[var(--color-text-muted)]">{message}</p>
        <Button variant="outline" onClick={onRetry}>Tentar novamente</Button>
      </Stack>
    </Card>
  )
}
```

## Composição no template (uso real)

```tsx
<ListPageTemplate title="Alunos">
  {isLoading ? <AlunosListSkeleton />
    : error ? <ErrorState message={error.message} onRetry={refetch} />
    : data.length === 0 ? <EmptyAlunos onAdd={openCreate} />
    : <DataTableWithPagination columns={cols} data={data} />}
</ListPageTemplate>
```

## Anti-patterns ❌

- ❌ **NUNCA** mostre `<div>Loading...</div>` cru — use Skeleton com shape do conteúdo
- ❌ **NUNCA** deixe tela vazia silenciosa — sempre empty state com CTA
- ❌ **NUNCA** dispare alert/toast em erro de fetch principal — use ErrorState inline
- ❌ **NUNCA** invente layout próprio — Card + Stack basta
- ❌ Toast é pra **mutation feedback** (criou, salvou, deletou), não pra erro de carregamento

## Status do pattern

🚧 EmptyState e ErrorState como organisms oficiais virão em PR futura. Hoje composição manual + Skeleton já cobre.

## Links

- Skeleton: `.impactx/rules/components/skeleton.md`
- Card: `.impactx/rules/components/card.md`
