# Design Principles — Impact X UI

Documento canônico das decisões conceituais do Design System. Formaliza convenções já em uso no código. Toda PR que introduzir novo componente, variant ou theme deve ser coerente com este documento.

---

## Filosofia

Três princípios não-negociáveis:

1. **Tokens-first.** Componentes consomem apenas CSS custom properties (`var(--color-*)`, `var(--radius-*)`, etc.). Nunca hex literal, nunca classe Tailwind com valor hardcoded (`bg-blue-500` é proibido em código de componente).
2. **Theme-switchable em runtime.** Trocar `class="theme-education"` por `class="theme-impactx"` no `<html>` reestiliza toda a árvore sem rebuild. Isso só funciona se nenhum componente "souber" qual theme está ativo.
3. **Zero hex em componente.** Hex existe em exatamente um lugar: arquivos de tokens (`packages/ds-*/src/tokens/themes/*.css`). Qualquer outro lugar é bug.

Consequência prática: se você está prestes a escrever `#0467DB` ou `border-blue-500` em um `.tsx`, pare. A resposta é uma CSS var nova ou uma var existente que ainda não conhece.

---

## Os 3 eixos

Toda decisão visual de um componente é coordenada por três eixos ortogonais:

```
theme   ×   intent   ×   variant
  │           │             │
  │           │             └── ênfase visual (fill / outline / ghost)
  │           └────────────── significado semântico (neutral / danger / success / warning / info)
  └──────────────────────────── identidade de marca (alfabeto / kumon / impactx)
```

### Matriz de exemplos

| theme    | intent  | variant   | resultado                                |
|----------|---------|-----------|------------------------------------------|
| alfabeto | primary | primary   | botão azul `#0467DB` preenchido          |
| alfabeto | primary | secondary | botão com borda azul `#0467DB`, fundo transparente |
| alfabeto | primary | tertiary  | botão sem borda, texto azul, hover sutil |
| alfabeto | danger  | primary   | botão vermelho preenchido                |
| alfabeto | danger  | secondary | botão com borda vermelha (`border-2`)    |
| alfabeto | danger  | tertiary  | texto vermelho, sem borda, hover sutil   |
| impactx  | primary | primary   | botão verde `#11C76F` preenchido         |
| impactx  | primary | tertiary  | botão ghost (texto verde), NÃO amarelo   |
| kumon    | primary | secondary | botão com borda azul claro `#00A9E3`     |

A regra: **trocar um eixo nunca deve confundir-se com trocar outro**. `tertiary` é sempre ghost. `danger` é sempre vermelho. `impactx` é sempre verde como primary.

---

## Variants: hierarquia, não cores

`variant` é o eixo de **ênfase visual**. Mesma cor base (vinda do `intent`), três pesos de presença.

```
primary       secondary     tertiary
┌─────────┐   ┌ ─ ─ ─ ─ ┐   ┌         ┐
│ ACTION  │   │ ACTION  │     ACTION
└─────────┘   └ ─ ─ ─ ─ ┘   └         ┘
  fill         outline       ghost
  máxima       média         mínima
  ênfase       ênfase        ênfase
```

- **primary** — fill sólido. Para a CTA principal de uma tela. Uma por contexto.
- **secondary** — borda 2px da cor da intent, fundo transparente. Ações secundárias relevantes mas que não competem com a primary.
- **tertiary** — sem borda, sem fill. Texto colorido + hover sutil. Para ações terciárias, links inline, ou densidade alta.

### O que NÃO é variant

- Variant **não** muda a hierarquia semântica (intent faz isso).
- Variant **não** introduz uma cor nova — ela apenas modula a apresentação da cor já definida pela intent.
- "Vamos criar uma variant `accent` que usa amarelo no impactx" → errado. Amarelo é brand-secondary do theme, não uma variant.

### Por que esse modelo

É o padrão moderno. shadcn/ui, Material 3, Radix Themes — todos usam alguma forma de "fill / outline / ghost" ortogonal a "neutral / accent / destructive". O ganho: o consumidor do DS aprende uma vez e prevê o resto. `Button intent="danger" variant="secondary"` é óbvio sem ler doc.

---

## Intents: comunicação semântica

`intent` é o eixo de **significado**. Não decora — informa.

| intent    | comunica                          | quando usar                                            |
|-----------|-----------------------------------|--------------------------------------------------------|
| primary   | ação default / ação de marca      | CTAs principais, confirmação de fluxos felizes         |
| danger    | ação destrutiva ou erro           | excluir, cancelar fatura, sair sem salvar              |
| success   | confirmação de operação concluída | toast pós-save, badge de status "pago"                 |
| warning   | ação reversível mas atenção       | sair de modo edição, invalidar cache, ações de admin   |
| info      | informativo neutro                | tooltips, hints, callouts factuais                     |

Intents são **ortogonais a variants**. Toda intent suporta os 3 níveis de ênfase:

```
                primary       secondary       tertiary
              ┌─────────┐   ┌─────────┐   ┌─────────┐
   primary    │  fill   │   │ outline │   │  ghost  │
              └─────────┘   └─────────┘   └─────────┘
              ┌─────────┐   ┌─────────┐   ┌─────────┐
   danger     │  fill   │   │ outline │   │  ghost  │
              └─────────┘   └─────────┘   └─────────┘
              ┌─────────┐   ┌─────────┐   ┌─────────┐
   success    │  fill   │   │ outline │   │  ghost  │
              └─────────┘   └─────────┘   └─────────┘
                ...
```

Isso dá `5 intents × 3 variants = 15` apresentações por componente, sem duplicação de código — porque cada uma é uma combinação de duas CSS vars com regras claras.

### Por que separar intent de variant

Casos como "outline vermelho de cancelar" exigem os dois eixos:

- `intent="danger"` → "isso é destrutivo, use a paleta vermelha"
- `variant="secondary"` → "mas não com fill — borda só"

Resultado: `danger-secondary` = botão de borda vermelha. Sem o split, você acabaria criando `dangerOutline`, `dangerGhost`, `successOutline`, `successGhost`... combinatorial explosion. O modelo ortogonal mata isso.

---

## Brand expression vs hierarchy

A confusão mais comum: "se o impactx tem amarelo `#F5C400`, ele não é o tertiary do impactx?"

Não. Aqui está o porquê.

### Brand expression (cor de marca top-level)

O theme `impactx` tem **duas** cores de marca, por decisão de identidade visual:

- `--color-brand-primary: #11C76F` (verde)
- `--color-brand-secondary: #F5C400` (amarelo)

Isso é uma propriedade do **theme**, não do componente. Existe porque a marca Impact X usa as duas cores juntas em peças de comunicação. É expressão de identidade.

### Hierarchy (variant)

Quando um componente precisa de uma ação terciária, ele pede a versão de menor ênfase **da intent ativa**. Se intent é `primary` no theme `impactx`, isso é "verde com pouca ênfase" → ghost verde. Não amarelo.

### Por que misturar quebra tudo

Se `tertiary` significasse "amarelo" no impactx, então:

- O contrato do nome muda por theme (no alfabeto tertiary é ghost azul, no impactx é fill amarelo). Quem lê o código não consegue prever o resultado.
- A hierarquia visual se inverte: `tertiary` (que deveria ser sutil) ficaria *mais* chamativo que `secondary`.
- Ficaria impossível ter "ghost no impactx" sem inventar um quarto nível.

### Solução futura: variant `brand-secondary`

Quando precisarmos de "botão amarelo IX" como peça intencional de marca, criamos `variant="brand-secondary"` (ou nome equivalente). Esse variant:

- só existe em themes que declararem `--color-brand-secondary`
- é um eixo separado de `primary | secondary | tertiary`
- comunica "use a cor de marca alternativa" — não "use ênfase X da intent"

Por enquanto, o amarelo é usado apenas em superfícies decorativas (logo, ilustrações), não em componentes interativos.

---

## Themes

Cada theme define seu mapa completo de tokens em `packages/ds-*/src/tokens/themes/<theme>.css`.

| theme    | brand-primary | brand-secondary | uso                                       |
|----------|---------------|-----------------|-------------------------------------------|
| alfabeto | `#0467DB` (azul)        | —              | Education X / SAS — produtos educacionais |
| kumon    | `#00A9E3` (azul claro)  | —              | Kumon Camargos / kumon-app                |
| impactx  | `#11C76F` (verde)       | `#F5C400` (amarelo) | Produtos institucionais Impact X      |

Modos `light` (default) e `dark` (`<html data-mode="dark">`) são ortogonais ao theme — cada theme define os dois.

### Regra de ouro do theme

Theme só pode mudar o **valor** de tokens existentes, nunca a **estrutura** semântica. Se o alfabeto define `--color-primary-fg`, o impactx tem que definir também — caso contrário componentes quebram em runtime no switch.

---

## Decisões fixas

Decisões arquiteturais que NÃO são revisitáveis sem RFC:

- **Outline buttons usam `border-2` da intent color**, não cinza. Ou seja, `secondary` herda a cor da intent ativa.
- **Helper text de Input usa primary color**, não muted. Reforça contexto de input ativo.
- **Toast bg é tinted da intent** (mistura sutil da cor com o background base), nunca branco/preto puro.
- **Tertiary é ghost em todos os themes**, incluindo impactx. O amarelo IX é brand-secondary do theme — variant separado, futuro.
- **Variant `outline` não existe.** Use `secondary`. Manter um nome só evita que metade do código diga `outline` e a outra metade `secondary`.
- **Theme switching é por classe** no `<html>` (`theme-education`, `theme-kumon`, `theme-impactx`). Mode é por atributo (`data-mode="dark"`).
- **Schema do registry estende** `https://ui.shadcn.com/schema/registry-item.json` com extensão `meta.impactx`. Sem fork.
- **Componentes consomem apenas tokens.** O DS é agnóstico ao theme — quem decide é a aplicação consumidora.

---

## Responsive primitives

Utilities CSS pra evitar layouts que quebram em viewports menores. Use estas
ao invés de Tailwind `grid-cols-N` hardcoded em showcases/templates.

### Grids
- `.responsive-grid-2` → 1 col mobile, 2 cols ≥640px
- `.responsive-grid-3` → 1 → 2 → 3 (≥1024px)
- `.responsive-grid-4` → 1 → 2 → 4

### Layout helpers
- `.stack-on-mobile` → flex column mobile, flex row ≥768px
- `[data-min-w-0]` ou `.min-w-0-default` → permite flex item truncar

### Tipografia fluida
- `[data-text-fluid="h1|h2|h3|lead"]` → clamp() automático

### Convenção
Showcases e templates devem preferir estas utilities ou Tailwind responsive
prefixes (`md:`, `lg:`). NUNCA usar `grid-cols-N` sem prefixo.

---

## Anti-patterns (não faça)

Padrões já vistos em PR e rejeitados. Se você se pegar fazendo qualquer coisa abaixo, pare e revise contra este doc.

- **"Criar uma cor secundária complementar pra ficar mais bonito."** Quebra a hierarquia de variants. Se você precisa de mais uma cor, ou é `intent` novo (com justificativa semântica) ou é `brand-secondary` (cor de marca explícita do theme).
- **"Tertiary tem cor diferente em cada theme."** Quebra o contrato do nome. `tertiary` é ghost da intent ativa, sempre. Sem exceção por theme.
- **Cor hardcoded no componente** (`bg-[#0467DB]`, `style={{ color: '#11C76F' }}`, `border-blue-500`). Sempre `var(--color-*)`. Sempre.
- **Duplicar variant com nome diferente.** `outline` vs `secondary`, `link` vs `tertiary`, `destructive` vs `danger-primary`. Um só nome canônico, sempre.
- **Componente que sabe o theme ativo** (`if (theme === 'impactx') return yellow`). Componente lê tokens. Theme define tokens. Componente não conhece theme.
- **CSS var inventada inline** (`style={{ '--color-foo': '#xxx' }}`). Token novo entra no arquivo de tokens, com cobertura nos 3 themes.
- **Variant que muda a semântica.** `variant="error"` é uma intent disfarçada. Use `intent="danger"`.
- **Mode dark via classe no componente** (`dark:bg-gray-800`). Mode é resolvido nos tokens. Componente é cego ao mode.
- **Helper text cinza em Input.** Decisão fixa: helper usa primary color. Reabrir só com RFC.
- **Toast com fundo neutro.** Decisão fixa: toast bg é tinted da intent. Reabrir só com RFC.

---

## Resumo executivo (1 parágrafo)

Toda apresentação visual é a interseção de três eixos ortogonais: `theme` (identidade de marca), `intent` (significado semântico) e `variant` (ênfase visual). Variants são hierarquia (fill/outline/ghost), não cores diferentes. Intents são semântica (danger/success/warning/info), eixo separado de variants. Brand expression (como o amarelo IX) é propriedade do theme, não uma variant. Componentes consomem apenas CSS vars; theme switching acontece em runtime trocando classe no `<html>`. Zero hex hardcoded, zero exceção.
