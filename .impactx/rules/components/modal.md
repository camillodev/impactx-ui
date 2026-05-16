# `<Modal>` — Diálogo modal (simples, welcome, carrossel, split-layout)

**Carrega quando bot mencionar:** modal, dialog, diálogo, popup, confirmação, cancelar, welcome, onboarding, carrossel modal.

## Import
```tsx
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalCancel,
  ModalAction,
  ModalDescription,
  ModalBanner,
  ModalCarousel,
  ModalCarouselSlide,
  ModalCarouselDots,
  ModalCarouselNav,
  ModalSplit,
  ModalSplitBody,
  ModalSplitMain,
  ModalSplitAside,
  ModalSplitTitle,
  ModalSplitFooter,
  ModalInfoList,
  ModalInfoItem,
} from "@impactx/ds-education"
```

## Namespace (23 subcomponentes)

| Subcomponente | Função | Props relevantes |
|---|---|---|
| `Modal` | Root (alias Dialog.Root) | — |
| `Modal.Trigger` | Botão que abre | children, onClick, etc. |
| `Modal.Content` | Container com overlay + animações | `size?: "default" \| "welcome" \| "carousel"` |
| `Modal.Header` | Topo com espaçamento (flex row) | — |
| `Modal.Title` | Título semântico (Dialog.Title → a11y) | — |
| `Modal.Close` | Botão X para fechar (topo direita) | — |
| `Modal.Body` | Conteúdo central (scroll se grande) | — |
| `Modal.Footer` | Botões de ação (border-top) | — |
| `Modal.Cancel` | Botão "Cancelar" padrão (Dialog.Close wrapper) | `children?: string` (default "Cancelar"), btn attrs |
| `Modal.Action` | CTA principal/destrutivo | `variant?: "primary" \| "danger"`, btn attrs |
| `Modal.Description` | Descrição acessível (Radix) | — |
| `Modal.Banner` | Hero image/gradient (welcome) | `image?: string`, `bg?: string`, `height?: number` (default 200) |
| `Modal.Carousel` | Context provider para onboarding | `defaultIndex?: 0`, `onIndexChange?: (i) => void` |
| `Modal.CarouselSlide` | Slide individual | — |
| `Modal.CarouselDots` | Indicadores (clicáveis) | — |
| `Modal.CarouselNav` | Controles Voltar/Próximo/Começar | `finishLabel?: string`, `backLabel?: string`, `nextLabel?: string`, `onFinish?: () => void` |
| `Modal.Split` | Root do layout split (flex col) | — |
| `Modal.SplitBody` | Flex gap-10 (main + aside) | — |
| `Modal.SplitMain` | Conteúdo principal | — |
| `Modal.SplitAside` | Painel lateral (320px desktop) | — |
| `Modal.SplitTitle` | Título split (com hero icon opcional) | `hero?: React.ReactNode` |
| `Modal.SplitFooter` | Footer split (flex justify-between) | — |
| `Modal.InfoList` | Lista key-value (ul) | — |
| `Modal.InfoItem` | Item (li com icon, label, value) | `icon?: ReactNode`, `label`, `value`, `emphasis?: "default" \| "warning" \| "danger" \| "success"` |

## Decisão — qual padrão usar?

### ✅ Modal simples: confirmar / cancelar
→ `Modal.Content` (size="default", 480px) + Header + Title + Body + Footer (Cancel + Action)

### ✅ Modal destructivo (delete)
→ Modal.Content + Header + Title + Body + Footer (Cancel + Action variant="danger")

### ✅ Modal welcome com hero image
→ Modal.Content size="welcome" (70vw) + Banner + Header + Title + Body + Footer (Cancel + Action)

### ✅ Onboarding multi-slide com navegação
→ Modal.Content size="carousel" (70vw) + Carousel (dá context) + CarouselSlide[] + CarouselDots + CarouselNav

### ✅ Modal com sidebar de info (detalhe + CTA)
→ Modal.Content + Split + SplitBody (SplitMain + SplitAside) + SplitTitle (com hero icon) + SplitFooter (Cancel + Action)
→ Dentro de SplitAside: InfoList + InfoItem[] (emphasis pra destacar urgência)

### ❌ Confirmação irreversível (delete permanent)
→ **Usar `AlertDialog` (componente separado)**, não Modal

### ❌ Side panel/drawer persistent
→ **Usar `Sheet`**, não Modal

### ❌ Pequeno tooltip / popover
→ **Usar `Tooltip` ou `Popover`**, não Modal

### ❌ Menu dropdown
→ **Usar `DropdownMenu`**, não Modal

### ❌ Toast / notificação transient
→ **Usar `Toast`**, não Modal

## Exemplos corretos ✅

### 1. Confirmação simples (confirmar upload)
```tsx
<Modal>
  <Modal.Trigger>Upload</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirmar upload?</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>
      Esta ação não pode ser desfeita.
    </Modal.Body>
    <Modal.Description>Você tem certeza?</Modal.Description>
    <Modal.Footer>
      <Modal.Cancel>Cancelar</Modal.Cancel>
      <Modal.Action>Fazer upload</Modal.Action>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### 2. Deletar com warning (destructivo)
```tsx
<Modal>
  <Modal.Trigger>Remover usuário</Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Remover usuário?</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>
      Todos os dados associados serão perdidos. Esta ação é irreversível.
    </Modal.Body>
    <Modal.Description>Confirmação necessária</Modal.Description>
    <Modal.Footer>
      <Modal.Cancel>Manter</Modal.Cancel>
      <Modal.Action variant="danger">Remover</Modal.Action>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### 3. Welcome modal com banner
```tsx
<Modal>
  <Modal.Trigger>Ver tutorial</Modal.Trigger>
  <Modal.Content size="welcome">
    <Modal.Banner
      height={280}
      image="https://example.com/welcome.jpg"
    >
      <h3 className="text-2xl font-bold">Bem-vindo!</h3>
    </Modal.Banner>
    <Modal.Header>
      <Modal.Title>Comece em 3 passos</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>
      Configurar sua conta é rápido e seguro...
    </Modal.Body>
    <Modal.Footer>
      <Modal.Cancel>Pular</Modal.Cancel>
      <Modal.Action>Começar</Modal.Action>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### 4. Onboarding carousel
```tsx
<Modal>
  <Modal.Trigger>Tutorial</Modal.Trigger>
  <Modal.Content size="carousel">
    <Modal.Carousel defaultIndex={0} onIndexChange={(i) => console.log(i)}>
      <Modal.CarouselSlide>
        <Modal.Header>
          <Modal.Title>Passo 1: Perfil</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>Configure seu perfil...</Modal.Body>
      </Modal.CarouselSlide>
      <Modal.CarouselSlide>
        <Modal.Header>
          <Modal.Title>Passo 2: Segurança</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body>Ative autenticação...</Modal.Body>
      </Modal.CarouselSlide>
      <Modal.CarouselNav
        backLabel="Voltar"
        nextLabel="Próximo"
        finishLabel="Começar"
        onFinish={() => console.log("done")}
      />
    </Modal.Carousel>
  </Modal.Content>
</Modal>
```

### 5. Modal split com sidebar (info + detalhe)
```tsx
<Modal>
  <Modal.Trigger>Ver détalhes</Modal.Trigger>
  <Modal.Content size="default">
    <Modal.Split>
      <Modal.SplitBody>
        <Modal.SplitMain>
          <Modal.SplitTitle hero={<AlertCircle />}>
            Restam 2h 30min
          </Modal.SplitTitle>
          <p className="text-sm text-muted">
            Seu acesso expira em breve. Renove agora para continuar.
          </p>
        </Modal.SplitMain>
        <Modal.SplitAside>
          <Modal.InfoList>
            <Modal.InfoItem
              icon={<Clock />}
              label="Tempo restante"
              value="2h 30min"
              emphasis="warning"
            />
            <Modal.InfoItem
              icon={<AlertTriangle />}
              label="Status"
              value="Expiração próxima"
              emphasis="danger"
            />
            <Modal.InfoItem
              icon={<CheckCircle />}
              label="Plano"
              value="Premium"
              emphasis="success"
            />
          </Modal.InfoList>
        </Modal.SplitAside>
      </Modal.SplitBody>
      <Modal.SplitFooter>
        <Modal.Cancel>Depois</Modal.Cancel>
        <Modal.Action>Renovar agora</Modal.Action>
      </Modal.SplitFooter>
    </Modal.Split>
  </Modal.Content>
</Modal>
```

## Anti-patterns ❌

1. **Modal do zero com `<div fixed>`** → Usar componente
2. **Esquecer `Modal.Description`** → Radix exige para a11y, gera warning no console
3. **Usar `Button` comum em Footer** → Usar `Modal.Cancel` ou `Modal.Action`
4. **Nestar Modals** → Modal dentro de Modal é válido (Radix cuida de z-index), mas confunde UX; preferir abrir nova tab/página
5. **Modal sem `Modal.Title`** → Quebra a11y; sempre adicione
6. **Carousel fora de `Modal.Carousel`** → CarouselSlide/Dots precisam do context
7. **Misturar size="welcome" com Split** → Split já é layout grande; use um ou outro

## Acessibilidade (Radix Dialog)

Radix Dialog automático:
- **Focus trap** — ESC fecha
- **Scroll lock** — não scrolleia o body
- **aria-labelledby** → aponta pro `Modal.Title` (obrigatório)
- **aria-describedby** → aponta pro `Modal.Description` (recomendado)
- **Overlay** com `data-state="open|closed"` → animações sincronizadas

Não remover nem sobrescrever essas propriedades; quebra a11y.

## Tokens CSS (Design System)

```css
--color-bg              /* fundo modal */
--color-text            /* texto principal */
--color-text-muted      /* label, hint */
--color-text-muted-strong /* body text */
--color-secondary-fg    /* modal title */
--color-border          /* divisor footer */
--color-border-muted    /* aside border */
--color-border-strong   /* carousel dots inativo */
--color-surface         /* aside bg */
--color-primary         /* ação principal */
--color-primary-hover
--color-primary-active
--color-danger-primary  /* ação destrutiva */
--color-danger-primary-hover
--color-danger-primary-active
--color-secondary-hover /* cancel bg hover */
--color-secondary-active
--color-secondary-bd    /* cancel border */
--color-hero-from       /* banner gradient start (welcome default) */
--color-hero-to         /* banner gradient end (welcome default) */
--color-toast-warning   /* InfoItem emphasis="warning" */
--color-toast-success   /* InfoItem emphasis="success" */
```

## Implementação

**Source:** `/packages/ds-education/src/components/modal.tsx`

- Root = Dialog.Root (Radix)
- Overlay = Radix Dialog.Overlay + animações
- Content = Dialog.Content com Portal
- Carousel context + CarouselContext.Provider
- InfoItem color logic (emphasis → conditional CSS var)
- Banner gradient default: `linear-gradient(135deg, var(--color-hero-from), var(--color-hero-to))`
