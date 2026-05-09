<!--
PR template Impact X. Reviewer (Rafa ou outros) usa este doc pra validar
rapidamente. Quanto mais links diretos copy-pasteable, melhor.
-->

## 📝 Summary

<!-- 1-2 frases. Por que este PR existe? -->

## 🔄 Changes

| Categoria | Arquivos | Resumo |
|---|---|---|
|   |   |   |

## 🤖 Workflow QA aplicado (developer-workflow skill)

- [ ] **Advisor** consultado em decisão chave
- [ ] **Caios (sonnet)** criaram em paralelo, 1 arquivo por agent
- [ ] **Diegos (haiku)** auditaram em paralelo, 1 componente por agent
- [ ] Reprovados foram fixados e **re-validados** pelo Diego

### Achados Diego que viraram fixes

| Componente | Issue | Fix |
|---|---|---|
|   |   |   |

## ✅ Checks locais

- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm registry:build` (se aplicável)

---

## 🚀 Preview Vercel

> Cole o link gerado pelo Vercel bot quando o build SUCCESS aparecer abaixo. Esse link fica acessível em qualquer momento — substitua `BASE_URL` nos exemplos abaixo.

**🔗 Preview URL:** `https://BASE_URL.vercel.app`

> ⚠️ Se o preview ainda estiver com Vercel Authentication ligada:
> - Abrir logado no time `impact-x` no Vercel
> - Ou usar `vercel curl --deployment <url> /<path>` (autenticação CLI automática)

---

## 🧪 How to Test (passo a passo)

### 1️⃣ Clone + setup

```bash
git fetch
git checkout BRANCH_NAME
pnpm install
```

### 2️⃣ Validar checks (CLI)

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

### 3️⃣ Subir local

```bash
pnpm dev      # http://localhost:3002
```

### 4️⃣ Testar no preview Vercel

> Substitua `BASE_URL` pela URL real do preview acima. Cada link já abre direto a página correta.

#### 🎨 Showcase de componentes

| Componente | Link direto | O que validar |
|---|---|---|
| _exemplo_ | [`/components/button`](https://BASE_URL.vercel.app/components/button) | Variants primary/secondary/tertiary, hover states, disabled |

<!-- Adicione 1 linha por componente novo/alterado. Sempre com link clicável. -->

#### 📄 Templates / páginas

| Rota | Link direto | O que validar |
|---|---|---|
|   |   |   |

#### 🔌 Endpoints registry (se aplicável)

```bash
# RegistryRoot
vercel curl --deployment https://BASE_URL.vercel.app /r/index.json

# RegistryIndex education (lista de items)
vercel curl --deployment https://BASE_URL.vercel.app /r/education/index.json

# Item específico
vercel curl --deployment https://BASE_URL.vercel.app /r/education/COMPONENT.json
```

### 5️⃣ Checklist visual

**Tokens / theme:**
- [ ] Sem hex hardcoded vazando (DevTools → CSS → busca `#[0-9a-f]{6}` fora de `:root` = 0)
- [ ] Plus Jakarta Sans aplicada (computed style do `body`)
- [ ] `<html class="theme-education">` no DOM (default)
- [ ] Theme switcher no header alterna education/kumon/impactx — primary muda
- [ ] Mode toggle alterna `data-mode="dark"` — bg escurece, contraste WCAG AA OK

**Composição:**
- [ ] Componente renderiza sem console error
- [ ] States: default, hover, focus, active, disabled — todos visíveis e distintos
- [ ] A11y: focus ring visível, `aria-*` corretos, keyboard navigation
- [ ] Sem regressão em rotas existentes (button, modal, data-table — abrir e checar)

---

## 🔗 PRs relacionados (stack)

- Base: `<base-branch>` <!-- (PR #N) -->
- Próximo: <!-- PR #M — `<descrição>` -->

## ⚠️ Riscos e mitigações

<!-- Coisas que podem dar errado e como mitigar. Honesto > otimista. -->

- 

---

<!-- ❌ NUNCA adicione Co-Authored-By Claude/Anthropic. Todo código é do Rafa. -->
