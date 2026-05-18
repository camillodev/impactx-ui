# CtaBanner — Organism Rule

**Trigger:** banner com chamada à ação (upgrade, próximo passo, ação promocional, botão destaque em banner)

## Import

```tsx
import { CtaBanner } from "@education/components-education/cta-banner"
```

## Props

```tsx
interface CtaBannerProps {
  heading?: string
  description?: string
  buttonLabel?: string
  onButtonClick?: () => void
}
```

- **heading** — Título principal (ex: "Melhore o desempenho de seus alunos")
- **description** — Subtítulo ou copy explicativa
- **buttonLabel** — Texto do botão
- **onButtonClick** — Callback executado ao clicar no botão

## Decisão: Quando Usar CtaBanner

| Cenário | Componente | Razão |
|---------|-----------|-------|
| Banner duplo (texto + ícone) chamando ação de upgrade/próximo passo | **CtaBanner** | Layout grid 2-col, estilo secondary, botão destacado |
| Hero grande de página ou acesso à seção | HeroBanner | Altura maior, posicionamento de topo |
| Banner inline simples (sem ilustração) | BannerCTA (atom) | Sem split grid, mais compacto |
| Aviso ou info apenas | Alert (Radix) | Não é CTA, sem botão de ação |

## Exemplos Corretos ✅

### Estúdio de Análise de Desempenho
```tsx
<CtaBanner
  heading="Desbloqueie Análises Detalhadas"
  description="Veja o progresso aluno por aluno e identifique pontos de melhoria."
  buttonLabel="Acessar Análises"
  onButtonClick={() => navigate("/analytics")}
/>
```

### Matriculação ou Upgrade
```tsx
<CtaBanner
  heading="Comece Agora"
  description="Acesso a questões exclusivas e plano de estudos personalizado."
  buttonLabel="Fazer Matrícula"
  onButtonClick={handleEnroll}
/>
```

## Anti-patterns ❌

- **Empilhamento:** Múltiplos CtaBanner numa mesma página → **fadiga visual**; use no máximo **um** por seção.
- **CTA sem botão:** Descrição sem ação clara violenta a proposta; **sempre forneça `buttonLabel` e `onButtonClick`**.
- **Em formulários de criação:** Se a ação principal já é o "submit", não use CtaBanner redundante; o form já é a CTA.
- **Cor genérica:** Depende de CSS vars (`--color-secondary`, etc.); não força bootstrap/cores custom inline.

## Acessibilidade

- Botão é `<button type="button">` nativo (not div), recebe `onClick`
- Texto alto contraste via `--color-secondary-fg` contra `--color-secondary`
- Ícone (CheckSquare) visual apenas; rótulo de botão é claro e descritivo
- Banner inteiro é seção semântica; consider wrapping em `<section>` se necessário

## Quando NÃO Usar

- Alertas apenas informativos (use `Alert` ou `Toast`)
- Seções de conteúdo com múltiplas chamadas (organize em cards/grid, não CtaBanner repetido)
- Dentro de forms de criação (submit do form já é a ação principal)
- Se não há ícone de contexto (banner fica vazio à direita)

## Implementação Técnica

- Layout: `grid grid-cols-2` — coluna esquerda (heading + description + botão), coluna direita (ilustração/ícone)
- Altura mínima: `min-h-[200px]` (direita)
- Espaçamento: padding 32px (px-8), gap 20px (gap-5)
- Botão: `inline-flex`, background branco, border subtle, ícone + rótulo
- Responsividade: considerar stack em mobile (1-col em `max-w-md`)
- Ilustração: placeholder circular com ícone Lucide; substitua por imagem real ou SVG customizado conforme necessário

---

**v1.0** | Última atualização: 2026-05-16
