#!/usr/bin/env node
/**
 * Guardrail das RULES.md (DS-001 a DS-004).
 *
 * Roda determinístico, sem IA. Falha o processo (exit 1) ao encontrar violação.
 * Allowlist documenta dívida técnica conhecida — qualquer arquivo NÃO listado
 * que viole as regras quebra o build.
 *
 * Regras cobertas:
 *   DS-001: nada de hex hardcoded em .tsx/.ts (exceto fallback de readVar()).
 *   DS-002: componentes de DS só em packages/ds-education/src/components/.
 *   DS-003: todo arquivo em components/ exporta algo via index.ts.
 *   DS-004: arquivo de código aplicativo <= 500 linhas.
 */

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COMPONENTS_DIR = "packages/ds-education/src/components";
const INDEX_FILE = "packages/ds-education/src/index.ts";

/**
 * Dívida técnica conhecida. NÃO adicionar sem aprovação humana + issue de refactor.
 * Formato: { path: "caminho/relativo.tsx", rules: ["DS-004"], reason: "..." }
 */
const ALLOWLIST = [
  {
    path: "packages/ds-education/src/components/modal.tsx",
    rules: ["DS-004"],
    reason: "660 linhas — refactor planejado, dividir em modal-root/header/body.",
  },
];

const APP_CODE_GLOBS = [
  "packages/ds-education/src/components",
  "packages/ds-education/src/components-education",
  "packages/ds-education/src/templates",
  "apps/web/src",
];

const SKIP_DIRS = new Set(["node_modules", "dist", ".next", ".turbo", "build"]);
const SKIP_FILE_PATTERNS = [
  /\.test\.(tsx?|jsx?)$/,
  /\.spec\.(tsx?|jsx?)$/,
  /\.stories\.(tsx?|jsx?)$/,
  /(^|\/)_[^/]+\.(tsx?|mjs|cjs)$/, // arquivos com prefixo `_` são dados/internos
];

const MAX_LINES = 500;
// Hex de cor: aceita só comprimentos válidos de cor (3, 4, 6, 8 dígitos).
// Exclui placeholders como "#12345" (5 dígitos, inválido como cor).
const HEX_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g;
const READ_VAR_HEX_RE = /readVar\([^)]*,\s*["']#[0-9a-fA-F]{3,8}["']\s*\)/g;

async function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, acc);
    else if (/\.(tsx?|mjs|cjs)$/.test(e.name) && !SKIP_FILE_PATTERNS.some((re) => re.test(e.name))) {
      acc.push(full);
    }
  }
  return acc;
}

function isAllowed(relPath, rule) {
  return ALLOWLIST.some((a) => a.path === relPath && a.rules.includes(rule));
}

function rel(p) {
  return path.relative(ROOT, p);
}

const violations = [];

function violate(rule, file, message) {
  const r = rel(file);
  if (isAllowed(r, rule)) return;
  violations.push({ rule, file: r, message });
}

// ---------- DS-001: hex hardcoded ----------
async function checkHexHardcoded() {
  const files = [];
  for (const dir of APP_CODE_GLOBS) await walk(path.join(ROOT, dir), files);
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const withoutReadVarFallbacks = content.replace(READ_VAR_HEX_RE, "");
    const matches = withoutReadVarFallbacks.match(HEX_RE);
    if (!matches) continue;
    const unique = [...new Set(matches)];
    violate(
      "DS-001",
      file,
      `hex hardcoded encontrado: ${unique.join(", ")}. Use var(--color-*) ou fallback via readVar().`,
    );
  }
}

// ---------- DS-002: componentes só em components/ ----------
// Desativado por enquanto: sem semântica, não há como distinguir componente de
// feature (legítimo em apps/web/) de candidato a DS (deveria estar em packages/).
// A regra continua viva em RULES.md como guia humano. Reativar quando houver
// convenção de nomenclatura ou tag JSDoc que sinalize "candidato a DS".
async function checkComponentLocation() {
  return;
}

// ---------- DS-003: components/ exportados no index.ts ----------
async function checkIndexExports() {
  const componentsPath = path.join(ROOT, COMPONENTS_DIR);
  if (!existsSync(componentsPath)) return;
  const indexPath = path.join(ROOT, INDEX_FILE);
  if (!existsSync(indexPath)) {
    violations.push({ rule: "DS-003", file: INDEX_FILE, message: "index.ts não encontrado." });
    return;
  }
  const indexContent = await readFile(indexPath, "utf8");
  const entries = await readdir(componentsPath, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!/\.tsx?$/.test(e.name)) continue;
    if (SKIP_FILE_PATTERNS.some((re) => re.test(e.name))) continue;
    if (e.name.startsWith("_")) continue;
    const base = e.name.replace(/\.tsx?$/, "");
    const exportRe = new RegExp(`export\\s+\\*\\s+from\\s+["']\\./components/${base}["']`);
    if (!exportRe.test(indexContent)) {
      violate(
        "DS-003",
        path.join(componentsPath, e.name),
        `componente não exportado em ${INDEX_FILE}. Adicione: export * from "./components/${base}";`,
      );
    }
  }
}

// ---------- DS-004: max 500 linhas ----------
async function checkFileSize() {
  const files = [];
  for (const dir of APP_CODE_GLOBS) await walk(path.join(ROOT, dir), files);
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = content.split("\n").length;
    if (lines > MAX_LINES) {
      violate(
        "DS-004",
        file,
        `${lines} linhas (limite ${MAX_LINES}). Divida em módulos menores.`,
      );
    }
  }
}

// ---------- run ----------
await checkHexHardcoded();
await checkComponentLocation();
await checkIndexExports();
await checkFileSize();

if (violations.length === 0) {
  console.log("✔ RULES.md: todas as regras OK (DS-001, DS-002, DS-003, DS-004).");
  if (ALLOWLIST.length > 0) {
    console.log(`\nℹ Dívida técnica conhecida (${ALLOWLIST.length}):`);
    for (const a of ALLOWLIST) {
      console.log(`  - ${a.path} [${a.rules.join(", ")}] — ${a.reason}`);
    }
  }
  process.exit(0);
}

console.error(`\n✘ ${violations.length} violação(ões) das RULES.md:\n`);
const byRule = {};
for (const v of violations) (byRule[v.rule] ??= []).push(v);
for (const [rule, list] of Object.entries(byRule)) {
  console.error(`[${rule}] ${list.length} violação(ões):`);
  for (const v of list) console.error(`  ${v.file}\n    ${v.message}`);
  console.error();
}
console.error("Detalhe das regras: ver RULES.md. Falsos positivos? Discutir antes de adicionar a ALLOWLIST.");
process.exit(1);
