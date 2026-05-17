#!/usr/bin/env node
/**
 * Guardrail: paridade entre @impactxlab/tokens (gerado) e ds-education legado.
 *
 * Compara NOME e VALOR (normalizado: lowercase + whitespace colapsado).
 * Falha em:
 *   - var no legado, ausente no gerado
 *   - valor divergente entre legado e gerado
 *
 * Variações documentadas conhecidas podem ser listadas em EXPECTED_DRIFTS.
 */

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const LEGACY_FILES = {
  base: "packages/ds-education/src/tokens/base.css",
  education: "packages/ds-education/src/tokens/themes/education.css",
  kumon: "packages/ds-education/src/tokens/themes/kumon.css",
  impactx: "packages/ds-education/src/tokens/themes/impactx.css",
};

const GENERATED_FILES = {
  base: "packages/tokens/dist/tokens.css",
  education: "packages/tokens/dist/themes/education.css",
  kumon: "packages/tokens/dist/themes/kumon.css",
  impactx: "packages/tokens/dist/themes/impactx.css",
};

/**
 * Drifts esperados (token: motivo). Listar aqui só com aprovação humana — qualquer
 * outro mismatch falha o script.
 */
const EXPECTED_DRIFTS = {
  // Nenhum por enquanto.
};

const VAR_RE = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gim;

/**
 * Parse blocos CSS por seletor. Retorna Map<seletor, Map<var, value>>.
 */
function parseBlocks(content) {
  const blocks = new Map();
  // Match `selector { ... }` simples (sem nested rules).
  const blockRe = /([^{}\/]+?)\s*\{([^{}]*?)\}/gms;
  for (const m of content.matchAll(blockRe)) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    const body = m[2];
    const vars = new Map();
    for (const vm of body.matchAll(VAR_RE)) {
      vars.set(vm[1], normalize(vm[2]));
    }
    if (vars.size > 0) {
      // Pode ter múltiplos blocks com o mesmo seletor — merge.
      const existing = blocks.get(selector) ?? new Map();
      for (const [k, v] of vars) existing.set(k, v);
      blocks.set(selector, existing);
    }
  }
  return blocks;
}

function normalize(value) {
  let v = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/,\s*/g, ", ")
    .replace(/\s*\/\s*/g, " / ");
  // `transparent` é equivalente a `rgba(0, 0, 0, 0)` em CSS — Style Dictionary normaliza.
  if (v === "transparent") v = "rgba(0, 0, 0, 0)";
  // Trailing zero em decimais (0.40 → 0.4).
  v = v.replace(/(\d+\.\d*?)0+(?=\D|$)/g, "$1").replace(/(\d+)\.(?=\D|$)/g, "$1");
  return v;
}

async function extractVars(file, slice) {
  if (!existsSync(file)) {
    throw new Error(`Missing: ${file}. Run \`pnpm tokens:build\`.`);
  }
  const content = await readFile(file, "utf8");
  const blocks = parseBlocks(content);

  // Para cada slice, define quais blocos são relevantes (ordem de cascata simulada).
  const wantedSelectors = {
    base: [":root"], // apenas root, sem dark nem themes
    education: [":root", ":root, .theme-education", ".theme-education"],
    kumon: [".theme-kumon"],
    impactx: [".theme-impactx"],
  };
  const allowed = wantedSelectors[slice];
  const merged = new Map();
  for (const sel of allowed) {
    const found = blocks.get(sel);
    if (!found) continue;
    for (const [k, v] of found) merged.set(k, v);
  }
  return merged;
}

let failures = 0;

for (const slice of ["base", "education", "kumon", "impactx"]) {
  const legacy = await extractVars(path.join(ROOT, LEGACY_FILES[slice]), slice);
  const generated = await extractVars(path.join(ROOT, GENERATED_FILES[slice]), slice);

  const missing = [];
  const mismatched = [];

  for (const [name, legacyValue] of legacy) {
    if (!generated.has(name)) {
      if (EXPECTED_DRIFTS[name]) continue;
      missing.push(name);
      continue;
    }
    const genValue = generated.get(name);
    if (genValue !== legacyValue) {
      if (EXPECTED_DRIFTS[name]) continue;
      mismatched.push({ name, legacy: legacyValue, generated: genValue });
    }
  }

  if (missing.length === 0 && mismatched.length === 0) {
    console.log(`✔ [${slice}] paridade OK (${legacy.size} vars, valores idênticos)`);
    continue;
  }

  failures += missing.length + mismatched.length;
  if (missing.length) {
    console.error(`\n✘ [${slice}] vars ausentes no @impactxlab/tokens (${missing.length}):`);
    for (const n of missing) console.error(`  ${n}`);
  }
  if (mismatched.length) {
    console.error(`\n✘ [${slice}] vars com valor divergente (${mismatched.length}):`);
    for (const m of mismatched) {
      console.error(`  ${m.name}`);
      console.error(`    legacy:    ${m.legacy}`);
      console.error(`    generated: ${m.generated}`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} divergência(s). @impactxlab/tokens precisa bater 1:1 com ds-education legado em nome + valor.`);
  process.exit(1);
}
console.log(`\n✔ Paridade total entre @impactxlab/tokens e ds-education (nome + valor).`);
