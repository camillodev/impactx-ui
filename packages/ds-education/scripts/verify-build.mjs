#!/usr/bin/env node
// Hermetic build assertion. Prevents incomplete tarballs from being published.
//
// Why this exists: a previous publish (@camillodev/ui@0.3.0) shipped
// dist/components/ empty because tsc reused a stale tsconfig.tsbuildinfo and
// emitted only index.js. We now (a) clean the buildinfo before build, and
// (b) fail loud here if the dist looks suspiciously small.
import { readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", "dist");

const MIN_JS_FILES = 50;
const MIN_DTS_FILES = 50;
const MIN_CSS_FILES = 5;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const all = walk(dist);
const js = all.filter((f) => f.endsWith(".js")).length;
const dts = all.filter((f) => f.endsWith(".d.ts")).length;
const css = all.filter((f) => f.endsWith(".css")).length;

console.log(`verify-build: ${js} .js, ${dts} .d.ts, ${css} .css`);

const failures = [];
if (js < MIN_JS_FILES) failures.push(`expected >= ${MIN_JS_FILES} .js, got ${js}`);
if (dts < MIN_DTS_FILES) failures.push(`expected >= ${MIN_DTS_FILES} .d.ts, got ${dts}`);
if (css < MIN_CSS_FILES) failures.push(`expected >= ${MIN_CSS_FILES} .css, got ${css}`);

if (failures.length) {
  console.error("verify-build FAILED:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
