# BigCard

Card destacado com hierarquia visual forte; destaque de conteúdo principal, feature card, hero card de secção.

## Import

```tsx
import { BigCard } from "@ds-education/big-card"
```

## Props

```tsx
interface BigCardProps {
  title: string                    // Título principal (h3, bold, color-primary)
  description: string             // Descrição/subtítulo (text-sm, color-text-muted)
  icon: LucideIcon               // Ícone Lucide (48px, color-primary)
  onClick?: () => void            // Callback ao clicar
}
```

## Decision Tree

- **Card com ícone grande, título bold, descrição + ação destacada** → **BigCard** ✅
- Card padrão de conteúdo / lista de cards densa → `Card`
- Hero / seção full-width com imagem de fundo → `HeroBanner`
- Card de estatística simples (número + label) → `Stat`

## Exemplos Corretos ✅

```tsx
// Destaque de feature em página
<BigCard
  title="Histórico de Matrícula"
  description="Consulte todas as matrículas ativas e encerradas"
  icon={HistoryIcon}
  onClick={() => navigate("/enrollments")}
/>

// Hero de seção em dashboard
<BigCard
  title="Novo Pagamento"
  description="Registre um novo boleto ou transferência"
  icon={PlusCircleIcon}
  onClick={openPaymentForm}
/>
```

## Anti-patterns ❌

- **Múltiplos BigCard na mesma tela** competindo por atenção → usar `Card` ou layout estruturado
- BigCard em grid denso (6+ itens) → overkill; usar `Card` + `Grid`
- BigCard sem onClick ou propósito → conteúdo estático; usar `Card`

## Acessibilidade

- `<button type="button">` nativo — suporta Enter, Space, screen readers
- `text-left` — label visível e legível
- Icon com `strokeWidth={1.5}` → contraste visual adequado
- Hover: `shadow-lg` → feedback visual, sem cor apenas

## Quando NÃO usar

- Conteúdo em lista ou grid denso
- Apenas informação estática (sem ação)
- Componentes muito pequenos (use `Card` ou `Stat`)

## Implementação Técnica

- **Button nativo** com `text-left` e `flex justify-between`
- **Min-height 260px** — proporção visual consistente
- **Ícone 48px em container 96px** (`w-24 h-24`) com corner radius `rounded-2xl`
- **Padding 32px** (`p-8`) para conteúdo
- **CSS variables**: `--color-bg`, `--color-primary`, `--color-primary-soft`, `--color-text-muted`, `--radius-xl`, `--shadow-md`
- **Transição suave** `transition-shadow` no hover
