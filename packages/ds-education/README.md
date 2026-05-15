# @impactx/ds-education

Design system educacional da Impact X — componentes, tokens e estilos para o Kumon App e demais produtos do segmento educação.

## Consumo local (desenvolvimento)

Este pacote exporta TypeScript diretamente (`main: "./src/index.ts"`), sem processo de build. Para consumir em uma aplicação Next.js via link local:

### 1. Referenciar o pacote no `package.json`

```json
{
  "dependencies": {
    "@impactx/ds-education": "file:../impactx-ui/packages/ds-education"
  }
}
```

Ajuste o caminho relativo conforme a estrutura de diretórios do seu projeto.

### 2. Adicionar `transpilePackages` no `next.config.ts`

Como o pacote expõe `.ts` diretamente, o Next.js precisa transpilá-lo:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@impactx/ds-education"],
};
```

### 3. Instalar dependências

```bash
npm install
# ou
pnpm install
```

O `file:` link resolve localmente sem necessidade de publicar no npm.

## Importações disponíveis

```ts
// Componentes e utilitários
import { Button, cn } from "@impactx/ds-education";

// CSS tokens (importar no layout raiz)
import "@impactx/ds-education/tokens/base.css";
import "@impactx/ds-education/tokens/themes/education.css";
import "@impactx/ds-education/tokens/themes/kumon.css";
import "@impactx/ds-education/tokens/themes/impactx.css";
import "@impactx/ds-education/styles.css";
```

## Publicação no npm (longo prazo)

Quando for publicar o pacote no npm, adicionar `tsup` como build tool:

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts"
  }
}
```

E atualizar os `exports` no `package.json` para apontar para `dist/` em vez de `src/`.
