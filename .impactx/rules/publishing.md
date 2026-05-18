# Publishing — onde vive o package `@camillodev/ui`

> **REGRA DURA:** o DS NÃO é publicado no npm público. Vive em **GitHub Packages**.

## Onde está

- **Package:** `@camillodev/ui`
- **Versão atual em desenvolvimento:** `1.0.0`
- **Registry:** `https://npm.pkg.github.com`
- **Acesso:** `restricted` (org members + token com `read:packages`)
- **Repo upstream:** `camillodev/impactx-ui` (folder `packages/ds-education/`)

Antes do rename, o package se chamava `@impactxlab/ds-education` e estava no npm público.
Esse nome foi **deprecated** e o publish público foi descontinuado. Não publicar lá de novo.

## Como publicar (manual, owner do repo)

```bash
# 1. Autenticar — GITHUB_TOKEN classic com scope write:packages
echo "//npm.pkg.github.com/:_authToken=$GITHUB_PERSONAL_ACCESS_TOKEN" >> ~/.npmrc

# 2. Build + publish
cd packages/ds-education
npm publish
```

Notas:
- `package.json` já tem `publishConfig.registry = https://npm.pkg.github.com` + `access: restricted`.
- `prepublishOnly` roda build automático. Não precisa `npm run build` antes.
- Não use `--access public`. Se aparecer 403, é problema de token (precisa `write:packages`),
  não de config.

## Como consumir (kumon-app e outros projetos da org)

Cada projeto consumer precisa de `.npmrc` apontando o scope `@impactxlabs` pro GH Packages:

```bash
# .npmrc no root do projeto consumer
@impactxlabs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PERSONAL_ACCESS_TOKEN}
```

`GITHUB_TOKEN` precisa ter scope **`read:packages`** (basta isso pra consumir).

Em CI (GitHub Actions), use o `GITHUB_TOKEN` automático:
```yaml
- run: npm install
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Não fazer

- ❌ `npm publish --access public` ou `--registry https://registry.npmjs.org`
- ❌ Re-publicar `@impactxlab/ds-education` (deprecated, será removido)
- ❌ Hardcoded `_authToken` em arquivos commitados — sempre `${VAR}`

## Versionamento

- `1.x.x` ramp: minor pra novas features (Popover, Chart variants), patch pra bugfixes
- Breaking changes → bump major + changeset descrevendo migração
- Tags semver normais; `latest` é a default tag

## Renovate (kumon-app)

Kumon-app já tem `renovate.json` configurado pra:
- PR imediata em release nova de `@camillodev/ui` (label `ds-update`)
- Auto-merge patch/minor com CI verde
- Major: bloqueio manual

Config: `~/agent-workspace/RENOVATE-kumon-app/renovate.json`
(será commitado em kumon-app na Fase 2 da migração).
