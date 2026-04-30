## Summary

<!-- O que mudou e por quê. 2-3 linhas. Foco no "porquê" mais que no "o quê". -->

## Changes

<!-- Lista do que foi alterado. Use bullets curtos. -->
- 

## Test plan

<!-- Como o reviewer valida. Comandos exatos + checklist. -->
- [ ] `pnpm install` (se mexeu em deps)
- [ ] `pnpm dev` sobe sem erro
- [ ] `pnpm --filter @impactx/web test:e2e` passa (se aplicável)
- [ ] Visual: rotas afetadas em http://localhost:3002

## Screenshots / videos

<!-- Pra mudanças visuais. Antes/depois. -->

## Breaking changes

<!-- Sim/Não. Se sim, descreve o impacto. -->
Não.

## Checklist

- [ ] Branch nomeada com prefixo (`feature/`, `fix/`, `chore/`, `report/`)
- [ ] Sem `Co-Authored-By` no commit
- [ ] Sem secrets ou hex hardcoded
- [ ] Sem mudanças destrutivas em `main` ou em outros packages do monorepo
- [ ] CLAUDE.md / AGENTS.md atualizados se mudou regra do projeto
- [ ] Skills relevantes seguidas (`ix-code-guidelines`, `ix-frontend`, etc.)

## Related

<!-- Links pra issues, PRs anteriores, decisões em SPEC.md -->
