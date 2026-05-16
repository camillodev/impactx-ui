# AssessmentCard — Domínio Educação

**Trigger**: Usar quando representar 1 avaliação/prova com nota, status e ações contextuais (ex.: provas Kumon, testes formativos, avaliações).

```typescript
import { AssessmentCard } from "@impactx/ds-education"
```

## Props

```typescript
interface AssessmentCardProps {
  title: string                        // Ex.: "Diagnóstico de Matemática"
  subject: string                      // Disciplina: "Matemática", "Português"
  grade: string                        // Série: "5º ano", "A1", "Nível 3A"
  description?: string                 // Contexto adicional (clamp-2 linhas)
  status: "completed" | "in-progress" | "scheduled" | "draft" | "not-started"
  actionLabel?: string                 // Default: "View Results"
  onAction?: () => void               // Clique no botão primário
  onMenuClick?: () => void            // Menu (⋮)
  onChartClick?: () => void           // Gráfico/estatísticas (📊)
  className?: string                  // Overrides Tailwind
}
```

## Árvore de decisão

| Cenário | Componente | Razão |
|---------|-----------|-------|
| Card visual: 1 prova com score, status, ações | **AssessmentCard** ✅ | Contexto educacional completo |
| Lista de avaliações (sem card visual) | `AssessmentListItem` | Item simples em tabela/lista |
| Header/breadcrumb de página de prova | `AssessmentHeader` | Contexto de página, não container |
| Card genérico (não-educacional) | `Card` | Sem domínio específico |
| Nota numérica isolada | `Badge` | Apenas status/rótulo |

## Exemplos ✅

```tsx
// Prova concluída com nota
<AssessmentCard
  title="Diagnóstico Inicial"
  subject="Matemática"
  grade="5º ano"
  description="Teste de nivelamento — 25 questões"
  status="completed"
  actionLabel="Ver Resultado"
  onAction={() => navigate(`/assessments/${id}/results`)}
  onChartClick={() => setShowStats(true)}
/>

// Prova agendada
<AssessmentCard
  title="Avaliação Bimestral"
  subject="Português"
  grade="6º ano"
  status="scheduled"
  actionLabel="Preparar"
/>

// Em progresso (sem clique de ação)
<AssessmentCard
  title="Teste Contínuo"
  subject="Ciências"
  grade="7º ano"
  status="in-progress"
  onAction={() => {}}
/>
```

## Anti-patterns ❌

- **Reinventar com Card + composição**: não use `Card` + `Badge` + custom buttons — use `AssessmentCard` direto.
- **Status genérico sem domínio**: não misture "approved/rejected" (negócio) com estados educacionais.
- **AssessmentCard fora de contexto educacional**: ex., não use para invoices, pedidos ou objetos de negócio.
- **Sem ação/handlers**: se não há interação (sem `onAction`, menu, gráfico), considere `Badge` ou `ListItem`.
- **Score sem unidade**: Kumon exibe scores sempre com contexto (nota/percentual/nível); nunca número isolado.

## Acessibilidade

- ✅ Menu (⋮): `aria-label="Open menu"` (incluído).
- ✅ Gráfico (📊): `aria-label="View chart"` (incluído).
- ✅ Botão primário: label visível (`actionLabel`), sem só ícone.
- ✅ Status: representado visualmente em `Badge` + semanticamente (texto).
- ⚠️ Se `title` for muito longo: truncar com `truncate` ou `line-clamp`, não cortar com CSS raw.

## Quando NÃO usar

- **Card genérico** (`Card`): sem status educacional ou ações pedagógicas específicas.
- **ListItem / Table**: avaliações em lista paginada sem card visual.
- **Badge só**: se for apenas rótulo (status), não contexto completo de prova.
- **Divs customizados**: nunca reinventar — se precisar de layout diferente, propor novo componente ao DS.

## Implementação técnica

- **Estrutura**: Card base (hover shadow) → header (título + menu) → meta (subject · grade) → descrição (opcional) → footer (status + ações).
- **Status color**: Badge variante mapeada (`statusMap`); sempre visível.
- **Ações**: 2 pontos: botão primário (ação principal) + icon button (chart). Menu separado (⋮).
- **Responsividade**: card ajusta padding/gap em breakpoints; título mantém semântica; descrição clamp-2 em mobile.
- **Tokens**: usa CSS vars (`--color-text`, `--color-text-muted`) para tema automático.
