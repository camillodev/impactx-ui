#!/usr/bin/env node
/**
 * Build pipeline @impactxlab/tokens.
 *
 * Style Dictionary v4 + DTCG ($value/$type).
 *
 * Estratégia: cada "selector CSS" é uma instance separada do SD com source
 * filtrado (primitive + base/dark/<theme>). Isso evita collisions entre temas
 * que reusam o mesmo path (color.primary em education vs kumon).
 *
 * Outputs:
 *   dist/tokens.css            → bundle (root, dark, 3 themes concatenados)
 *   dist/themes/<tema>.css     → fatia individual por tema
 *   dist/tokens.js + .d.ts     → exports JS programáticos (só primitives + base)
 *   dist/tailwind.js           → preset Tailwind com cores primitive
 *
 * Contrato externo: CSS vars `--color-*`, `--radius-*`, `--shadow-*` etc.
 */

import StyleDictionary from "style-dictionary";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const THEMES = ["education", "kumon", "impactx"];

/* ============================================================
 * Custom format — CSS vars com nomes `--<path joined by ->`.
 * Pula tokens cujo $value seja referência não resolvida (não deveria
 * acontecer se filter estiver certo).
 * ============================================================ */
StyleDictionary.registerFormat({
  name: "css/ix-vars",
  format: async ({ dictionary, options }) => {
    const { selector = ":root", header = "" } = options;
    const seen = new Set();
    const lines = [];
    for (const t of dictionary.allTokens) {
      const name = "--" + t.path.join("-");
      if (seen.has(name)) continue;
      seen.add(name);
      const v = t.$value ?? t.value;
      if (v === undefined || v === null) continue;
      lines.push(`  ${name}: ${v};`);
    }
    return `${header}${selector} {\n${lines.join("\n")}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: "javascript/ix-module",
  format: async ({ dictionary }) => {
    const obj = {};
    for (const t of dictionary.allTokens) {
      let node = obj;
      for (let i = 0; i < t.path.length - 1; i++) {
        const k = t.path[i];
        node[k] = node[k] ?? {};
        node = node[k];
      }
      node[t.path.at(-1)] = t.$value ?? t.value;
    }
    return `export const tokens = ${JSON.stringify(obj, null, 2)} as const;\nexport type Tokens = typeof tokens;\n`;
  },
});

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

/**
 * Roda um build SD com sources específicos e retorna o conteúdo CSS gerado.
 * Usa um buildPath temporário, lê o arquivo, retorna a string.
 */
async function renderBlock({ sources, selector, header = "", filterTokens = null }) {
  const tmpDir = path.join(DIST, ".tmp");
  await ensureDir(tmpDir);
  const tmpFile = `block-${selector.replace(/[^\w]/g, "_")}.css`;

  const sd = new StyleDictionary({
    source: sources,
    log: { verbosity: "silent", warnings: "disabled" },
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `${tmpDir}/`,
        files: [
          {
            destination: tmpFile,
            format: "css/ix-vars",
            filter: filterTokens ?? undefined,
            options: { selector, header },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  const content = await readFile(path.join(tmpDir, tmpFile), "utf8");
  return content;
}

async function buildBundle() {
  const primitives = `${SRC}/primitive/*.json`;
  const components = `${SRC}/component/*.json`;
  const semBase = `${SRC}/semantic/base.json`;
  const semDark = `${SRC}/semantic/dark.json`;

  /* Block 1 — :root base: semantic.base + primitives radius/shadow/font
   * Tokens neutrals + dimensões/fontes não-tematizadas. */
  const rootBlock = await renderBlock({
    sources: [primitives, semBase],
    selector: ":root",
    header:
      "/**\n * @impactxlab/tokens — gerado por Style Dictionary.\n * NÃO editar à mão. Fonte em packages/tokens/src/.\n */\n",
    filterTokens: (t) => {
      if (t.filePath.includes("/semantic/base.")) return true;
      // Inclui radius/shadow/font do primitive como CSS vars (não-tematizados).
      if (t.filePath.includes("/primitive/")) {
        const top = t.path[0];
        return top === "radius" || top === "shadow" || top === "font";
      }
      return false;
    },
  });

  /* Block 2 — [data-mode="dark"]: só overrides de dark.json */
  const darkBlock = await renderBlock({
    sources: [primitives, semDark],
    selector: '[data-mode="dark"]',
    filterTokens: (t) => t.filePath.includes("/semantic/dark."),
  });

  /* Blocks 3-5 — 1 por theme. Inclui component tokens que ref color.primary/secondary/etc.
   * Cada theme block redefine --button-primary-bg etc com a cor temática correta.
   * Education também alimenta o :root como tema default. */
  const themeBlocks = [];
  for (const theme of THEMES) {
    const themeFile = `${SRC}/semantic/${theme}.json`;
    const selector = theme === "education" ? `:root, .theme-${theme}` : `.theme-${theme}`;
    const block = await renderBlock({
      sources: [primitives, semBase, themeFile, components],
      selector,
      filterTokens: (t) =>
        t.filePath.endsWith(`/semantic/${theme}.json`) ||
        t.filePath.includes("/component/"),
    });
    themeBlocks.push(block);
  }

  /* Bundle final */
  const bundle = [rootBlock, ...themeBlocks, darkBlock].join("\n");
  await writeFile(path.join(DIST, "tokens.css"), bundle, "utf8");
}

async function buildThemeSplits() {
  await ensureDir(path.join(DIST, "themes"));
  const primitives = `${SRC}/primitive/*.json`;
  for (const theme of THEMES) {
    const themeFile = `${SRC}/semantic/${theme}.json`;
    const selector = theme === "education" ? `:root, .theme-${theme}` : `.theme-${theme}`;
    const block = await renderBlock({
      sources: [primitives, themeFile],
      selector,
      header: `/* @impactxlab/tokens — theme ${theme}. Não editar. */\n`,
      filterTokens: (t) => t.filePath.endsWith(`/semantic/${theme}.json`),
    });
    await writeFile(path.join(DIST, "themes", `${theme}.css`), block, "utf8");
  }
}

async function buildJsModule() {
  // JS module usa education como tema default — values resolvidos refletem essa escolha.
  // Consumers que precisem de outro tema devem ler CSS vars em runtime.
  const sd = new StyleDictionary({
    source: [
      `${SRC}/primitive/*.json`,
      `${SRC}/semantic/base.json`,
      `${SRC}/semantic/education.json`,
      `${SRC}/component/*.json`,
    ],
    log: { verbosity: "silent", warnings: "disabled" },
    platforms: {
      js: {
        transformGroup: "js",
        buildPath: `${DIST}/`,
        files: [
          { destination: "tokens.js", format: "javascript/ix-module" },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
  await writeFile(
    path.join(DIST, "tokens.d.ts"),
    `export { tokens, type Tokens } from "./tokens.js";\n`,
    "utf8",
  );
}

async function buildTailwindPreset() {
  const primitiveColorFile = path.join(SRC, "primitive", "color.json");
  if (!existsSync(primitiveColorFile)) return;
  const raw = JSON.parse(await readFile(primitiveColorFile, "utf8"));
  const flat = {};
  function walk(obj, prefix = "") {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === "object" && "$value" in v) {
        flat[prefix ? `${prefix}-${k}` : k] = v.$value;
      } else if (v && typeof v === "object") {
        walk(v, prefix ? `${prefix}-${k}` : k);
      }
    }
  }
  walk(raw.color ?? raw);
  await writeFile(
    path.join(DIST, "tailwind.js"),
    `export default { theme: { extend: { colors: ${JSON.stringify(flat, null, 2)} } } };\n`,
    "utf8",
  );
  await writeFile(
    path.join(DIST, "tailwind.d.ts"),
    `declare const preset: { theme: { extend: { colors: Record<string, string> } } };\nexport default preset;\n`,
    "utf8",
  );
}

async function cleanupTmp() {
  const tmpDir = path.join(DIST, ".tmp");
  if (existsSync(tmpDir)) {
    const fs = await import("node:fs/promises");
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

async function buildAll() {
  await ensureDir(DIST);
  await buildBundle();
  await buildThemeSplits();
  await buildJsModule();
  await buildTailwindPreset();
  await cleanupTmp();
  console.log("✔ @impactxlab/tokens build complete");
  console.log(`  dist/tokens.css`);
  console.log(`  dist/themes/{education,kumon,impactx}.css`);
  console.log(`  dist/tokens.js + tokens.d.ts`);
  console.log(`  dist/tailwind.js + tailwind.d.ts`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
