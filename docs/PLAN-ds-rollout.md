# Plan — DS Rollout (Híbrido)

**Status**: ativo
**Decisão**: caminho híbrido — workspace link agora, CLI como track paralelo
**Owner**: Rafa
**Última atualização**: 2026-05-08

---

## TL;DR

3 frentes paralelas com dependências explícitas. Não exige CLI funcional pra começar a migração do kumon-app — destrava esta semana via `file:` protocol e troca pra `npx @impactx/ui add` quando CLI estiver pronto.

```
Frente A (DS gaps)        ─┐
                           ├─→ Frente C (kumon-app migration)
Frente B (CLI + registry) ─┘
```

- **A bloqueia C** parcialmente (6 atoms são pré-requisito de telas com forms).
- **B não bloqueia C** — workspace link cobre o consumo.
- **B substitui o link de C** quando concluído (refactor pequeno: trocar `file:` por `npx add`).

---

## Frente A — Atoms faltantes no DS

**Objetivo**: cobrir os 6 átomos que o kumon-app precisa e o `@impactx/ds-education` ainda não entrega.

### Escopo
| Atom | Base Radix | Decisões abertas |
|---|---|---|
| Sidebar | `@radix-ui/react-collapsible` + custom | collapsible? width fixo vs fluido? slot pra footer? |
| DropdownMenu | `@radix-ui/react-dropdown-menu` | submenu? checkbox/radio items? |
| Sheet | `@radix-ui/react-dialog` (modal=false) | sides (top/right/bottom/left)? overlay opacity? |
| Select | `@radix-ui/react-select` | search/filter? agrupamento? |
| Checkbox | `@radix-ui/react-checkbox` | indeterminate? error state? |
| Switch | `@radix-ui/react-switch` | sizes? loading state? |

### Critério de done
- 6 components em `packages/ds-education/src/components/`.
- TypeScript strict, ESM, `forwardRef + displayName`, tokens via `var(--color-*)`.
- Zero hex/rgba hardcoded.
- 6 showcase pages em `apps/web/src/app/components/<atom>/page.tsx`.
- Stories de cada variant + dark mode + 3 themes.
- Vitest test mínimo (render + interaction básica) — TDD.
- PR único `feat/ds-atoms-six` ou um PR por atom (decidir).

### Esforço
3-5 dias-pessoa. **Não fazer em uma sessão única** — merece foco com TDD.

### Track
Sessão dedicada. Spec → TDD → implementação → showcase → review.

---

## Frente B — CLI + Registry oficial

**Objetivo**: implementar os 6 commands stub do `@impactx/ui` segundo `packages/cli/SPEC.md` e gerar o registry consumível.

### Estado atual
- `packages/cli/src/commands/{add,init,update,list,diff,onboarding}.ts` — todos stubs (`throw "not implemented"`).
- `packages/cli/SPEC.md` — completo, contrato shadcn-compat.
- `packages/cli/src/types.ts` — tipos completos.
- `scripts/build-registry.mjs` — **não existe**.
- `apps/web/public/r/` — vazio (só `.gitkeep`).

### Escopo (ordem de implementação)
1. `scripts/build-registry.mjs` — lê source de `packages/ds-education/src/components/*` + `components-education/*`, gera 1 JSON por component em `apps/web/public/r/<ds>/<name>.json` + `index.json` + `r/index.json` raiz. Shape conforme `RegistryItem` em `types.ts`.
2. `runInit` — framework detection + path resolution + `.impactx-ui/manifest.json` + `tokens.css` placeholder + `lib/utils.ts` + patch `tailwind.config`.
3. `runAdd` — fetch + resolve deps + topo sort + hash + atomic write + manifest update.
4. `runList` — fetch + render tree.
5. `runDiff` — compute three-way state + summary.
6. `runUpdate` — diff + conflict policy + apply.
7. `runOnboarding` — flow `@clack/prompts` que orquestra os anteriores.

### Critério de done
- `npx @impactx/ui add education button` em projeto Next 16 limpo escreve `components/ui/button.tsx` + tokens + atualiza manifest.
- Registry servido em `https://ui.impactx.com.br/r/<ds>/<component>.json` (Vercel deploy do `apps/web`).
- Vitest cobre cada command (mock fetch).
- E2E manual: instalar em projeto novo + 3 components com `registryDependencies`.

### Esforço
2-3 semanas-pessoa.

### Track
Sessões dedicadas, uma por comando, TDD obrigatório. Não bloqueia frente C.

---

## Frente C — Migração kumon-app

**Objetivo**: trocar a UI do kumon-app pelo `@impactx/ds-education`, manter Clerk/Cora/NFSe/Prisma intactos, eliminar duplicação `packages/ui/` + `src/components/ui/`.

### Setup (Fase 0, 1-2h)
- `pnpm-workspace.yaml` ou `"@impactx/ds-education": "file:../impactx-ui/packages/ds-education"` no `package.json` do kumon-app.
- Criar `build` script em `packages/ds-education/package.json` se faltar (tsup ou apenas exports diretos do source — confirmar).
- Importar tokens: `import "@impactx/ds-education/styles.css"` no root layout.
- Theme aplicado: `<html className="theme-kumon">` + `data-mode` toggle.

### Ordem de migração (ranqueada por risco)
1. **Sign-in / Sign-up** — Button + Input + Card. Valida fluxo Clerk.
2. **Landing / ui-preview** — só showcase.
3. **Dashboard** — Card + Stat + Chart. Valida tema visual.
4. **PAUSA** — aguardar Frente A entregar 6 atoms.
5. **Configurações** — Switch + Checkbox.
6. **Alunos / Responsáveis (list + detail)** — DataTable + Pagination + Modal.
7. **Pagamentos / Cobrança** — billing crítico (Cora). Smoke test manual obrigatório.
8. **Relatórios** — recharts → Chart do DS.
9. **Limpeza** — remover `packages/ui/` e `src/components/ui/`.

### Critério de done
- 0 imports de `packages/ui/` ou `src/components/ui/` em `src/`.
- Lighthouse não regrediu (homepage + dashboard).
- Playwright suite passa.
- `next build` limpo.
- Smoke manual no piloto Camargos antes de merge final.

### Esforço
1-2 semanas-pessoa pós-Frente A.

### Track
Detalhado em `~/agent-workspace/PLAN-kumon-migration.md` (gerado em paralelo a este doc).

---

## Cronograma proposto

```
Semana 1
  └─ Frente A: spec + TDD dos 6 atoms (3-5 dias)
  └─ Frente B: scripts/build-registry.mjs + runInit (paralelo)
  └─ Frente C: Fase 0 + sign-in/sign-up/landing (paralelo)

Semana 2
  └─ Frente A: PR review + merge
  └─ Frente B: runAdd + runList
  └─ Frente C: dashboard + configurações (depende A merged)

Semana 3
  └─ Frente B: runUpdate + runDiff + onboarding + deploy registry
  └─ Frente C: alunos/responsáveis (DataTable wiring)

Semana 4
  └─ Frente B: smoke E2E + publish CLI
  └─ Frente C: billing/cobrança + smoke Camargos

Semana 5 (cleanup)
  └─ Frente C: trocar file: por npx add + remover packages/ui/ legado
```

Otimista 4 semanas, realista 6 semanas, pessimista 8 semanas.

---

## Decisões abertas

1. **Theme naming canônico** — `theme-alfabeto` (cypress/CLAUDE.md) vs `theme-education` (código atual). Cypress espera `theme-alfabeto`. Recomendação: renomear código pra `theme-alfabeto`.
2. **Fonte default no `base.css`** — Roboto vs Plus Jakarta Sans. Recomendação: manter Roboto no base, Plus Jakarta só em `theme-impactx`.
3. **Registry deploy** — Vercel sob `ui.impactx.com.br` (já planejado no SPEC).
4. **Atoms PR strategy** — 1 PR único vs 1 PR por atom. Recomendação: 1 PR por atom (review focado, rollback granular).
5. **Build do `@impactx/ds-education`** — tsup com types vs source-only com `exports` map. Bloqueante de Fase 0.

---

## Riscos cross-frente

- **Drift entre file: link e CLI eventual**: kumon-app vai consumir o source direto via `file:`, mas o CLI vai copiar arquivos (shadcn-style). Garantir que o source compilado é idêntico ao que o registry serve.
- **Tailwind v4 + theme switch via classe**: purge agressivo pode descartar utilities de themes não-default. Validar `content` config no kumon-app.
- **Sonner vs DS toast**: provider duplicado durante migração causa toasts fantasma. Remover `Sonner` no mesmo PR que adiciona `<Toaster />` do DS.
- **Tests Playwright do kumon-app**: seletores CSS podem quebrar. Sugestão: adicionar `data-testid` durante migração.

---

## Próximas ações imediatas

- [ ] Rafa decide as 5 decisões abertas acima.
- [ ] Mergear PR #38 (`fix/ds-blockers`) — pré-requisito limpo.
- [ ] Mergear este plano (`chore/ds-rollout-plan`) na main.
- [ ] Abrir issue/spec dos 6 atoms (Frente A).
- [ ] Abrir issue/spec do registry build (Frente B).
- [ ] Iniciar Fase 0 da migração kumon-app (Frente C).
