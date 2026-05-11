# Contribuindo com o impactx-ui

## Gitflow

Este repositório usa **gitflow simplificado**:

```
main        ← releases estáveis (tags v1.x.x)
  └── develop   ← integração contínua (default branch)
        └── feature/<nome>
        └── fix/<nome>
        └── chore/<nome>
        └── report/<nome>
```

### Fluxo de desenvolvimento

1. **Sempre comece em `develop`** — nunca ramifique de `main` direto

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<nome-da-feature>
```

2. **Faça seus commits** na branch — commits atômicos, mensagem em imperativo

3. **Push e PR para `develop`**

```bash
git push origin feature/<nome-da-feature>
# Abrir PR: feature/<nome> → develop
```

4. **Code review** — pelo menos 1 aprovação antes de mergear

5. **Delete a branch** após merge

### Releases

Quando `develop` está estável e pronto para release:

```bash
# PR: develop → main
# Tag: v<major>.<minor>.<patch>
git tag v1.2.0
git push origin v1.2.0
```

## Branch Protection

- `develop`: requer PR review + status checks (lint, typecheck, test)
- `main`: requer PR review + status checks + tag de versão

## Configuração local

```bash
pnpm install
pnpm dev
pnpm lint && pnpm typecheck && pnpm test
```

## Nomenclatura de branches

| Prefixo | Uso |
|---------|-----|
| `feature/` | Nova funcionalidade |
| `fix/` | Correção de bug |
| `chore/` | Manutenção, docs, config |
| `report/` | Relatórios, análises |

## Commits

Formato: `<tipo>(<escopo opcional>): <mensagem imperativa>`

Exemplos:
- `feat(button): add loading state`
- `fix(modal): correct z-index on mobile`
- `chore: update pnpm lockfile`
