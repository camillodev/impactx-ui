# Overnight Notes — Semana 1 do DS

> Branch: `feature/impactx-folder` · Data: 2026-05-16 · Quem: Caio (orquestrador) + 5 sub-agents Haiku

## O que foi feito

Semana 1 inteira do plano em `docs/ds-implementation-plan.md`.

### Arquivos criados

```
impactx-ui/
├── .impactx/
│   ├── system.md                                (sempre carregado, ~200 linhas)
│   └── rules/
│       ├── components/
│       │   ├── button.md                        (213 linhas)
│       │   ├── input.md                         (221 linhas)
│       │   ├── card.md                          (281 linhas)
│       │   ├── badge.md                         (278 linhas)
│       │   └── modal.md                         (namespace completo)
│       └── styling/
│           └── tokens.md                        (48 tokens, 3 temas + dark)
└── docs/
    ├── ds-implementation-plan.md                (atualizado v0.2 com Semana 1 ✅)
    └── overnight-notes.md                       (este arquivo)
```

### Arquivos alterados

- `impactx-ui/CLAUDE.md` — adicionada seção "Contrato declarativo `.impactx/`" + skill referência
- `kumon-app/CLAUDE.md` — adicionada seção "Design System (frontend) — `ix-design-system` skill"
- `~/.claude/skills/ix-design-system/SKILL.md` — skill criada com triggers e hierarchical loading

## 4 testes pra rodar (≤ 10 min)

### Teste 1 — F5: As 5 rules existem

```bash
ls /Users/rafae/projetos/impactx-ui/.impactx/rules/components/
# Esperado: button.md badge.md card.md input.md modal.md (5 arquivos)

ls /Users/rafae/projetos/impactx-ui/.impactx/rules/styling/
# Esperado: tokens.md
```

**Pass se:** todos os 6 arquivos listados.

---

### Teste 2 — F7: Skill responde corretamente

Abre uma sessão nova do Claude Code em `~/projetos/kumon-app/` e pergunta:

> "Como uso o Button do DS pra ação de salvar matrícula com loading state?"

**Pass se:**
- Skill `ix-design-system` ativa (vê o nome aparecendo nos system-reminders)
- Resposta vem com `<Button>` importado de `@impactx/ds-education`
- Resposta menciona `variant="primary"` (default)
- Resposta cita `disabled={isSubmitting}` com texto "Salvando…" (padrão da rule)
- Resposta NÃO usa Tailwind cru tipo `bg-blue-500`

Se o bot inventar UI, abrir issue: skill não tá triggerando bem.

---

### Teste 3 — Skill aponta pro arquivo certo

Pergunta:

> "Onde tá documentado quando usar Modal vs AlertDialog?"

**Pass se:** resposta cita `/Users/rafae/projetos/impactx-ui/.impactx/rules/components/modal.md` seção "Quando NÃO usar Modal".

---

### Teste 4 — Anti-pattern detectado

Pergunta:

> "Posso usar `<button className='bg-blue-500 px-4 py-2 rounded text-white'>Salvar</button>` no kumon-app?"

**Pass se:** resposta diz NÃO, aponta pro `button.md` anti-patterns, e oferece refactor pra `<Button variant="primary">Salvar</Button>`.

---

## O que NÃO foi feito (intencionalmente)

- ❌ Primitives (`<Grid>`, `<Stack>`, `<PageContainer>`) — são Semana 2, exigem código + teste real
- ❌ ESLint custom rule — Semana 4, precisa rodar lint pra validar
- ❌ Templates de página — Semana 3, depende de primitives
- ❌ Style Dictionary tokens 3-tier — Semana 3, refator grande
- ❌ Demo de matrícula real — escopo cortado pra focar no plano (instrução do Rafa: "foco é no plano")

## Gaps identificados (backlog pra discutir)

1. **Falta documentar 27 dos 32 componentes.** Próximos por ordem de uso no kumon: DataTable, Pagination, Tabs, Select, Sheet, Toast, Tooltip, Sidebar, Chip, IconButton.
2. **`tokens.md` está acoplada à arquitetura atual** (CSS vars direto). Quando Semana 3 trouxer Style Dictionary 3-tier, rule precisa de update.
3. **Não há rule para organisms domain** (hero-banner, assessment-card, big-card, donut-score). Plano coloca isso na Semana 5.
4. **Skill ainda não tem MCP server** — Semana 5. Por enquanto, bot lê arquivo via Read tool.

## Como continuar amanhã

### Caminho A — Validação primeiro (sugerido)

1. Roda os 4 testes acima
2. Se algo falha, abre issue específica
3. Se passa tudo: começa Semana 2 (primitives) — escopo já definido no plano

### Caminho B — Bater na frente

1. Semana 2 direto: criar `<Grid>`, `<Stack>`, `<PageContainer>`, `<Cluster>` em `packages/ds-education/src/components/`
2. Adicionar showcase no `apps/web` pra cada um
3. Criar rules correspondentes em `.impactx/rules/primitives/`
4. Migrar 1 página do kumon usando primitives (smoke test)

### Caminho C — Demo prático

Se quiser ver bot construindo tela do zero com `.impactx/`, abre sessão Caio em kumon-app e pede:

> "Cria mock de form de matrícula multi-step. Tem que ter: 1) dados do aluno (nome, CPF, data nascimento), 2) responsável (nome, CPF, telefone), 3) plano escolhido (radio), 4) confirmação. Usa só componentes do `@impactx/ds-education`."

Vai validar F1 do finish criteria (página completa em ≤ 15 linhas se template existisse — sem template ainda, será mais linhas, mas componentes consistentes).

## Decisões importantes registradas no plano (v0.2)

- Button tem 9 variants reais, não 4 — rule reflete realidade
- Temas: `theme-education / theme-kumon / theme-impactx` (não `theme-alfabeto`)
- Modal é namespace gigante (25+ subcomponentes) — rule ficou em 280 linhas
- Card é simples: só 4 componentes (Card/Header/Title/Content)
- Paralelização Haiku funcionou: 5 minutos vs ~30+ sequencial

## Riscos identificados durante execução

- **Rules podem ficar desatualizadas vs código** se DS mudar e ninguém atualizar markdown. Mitigação proposta no plano (CI rule) ainda não implementada.
- **Bot pode ignorar skill se trigger não casar.** Resolver testando com prompts ambíguos amanhã.
- **`apps/web` showcase ainda não tem rotas pra todos os 5 componentes** com 3 viewports × 3 temas — Semana 4 (visual regression) vai precisar criar primeiro.

## Próximo passo concreto recomendado

Rodar Teste 2 primeiro (skill responde corretamente). Se passar, o ciclo principal funciona — daí ou parte pra Semana 2 (primitives) ou pra demo de matrícula pra ver Caio compondo.

Bom dia.
