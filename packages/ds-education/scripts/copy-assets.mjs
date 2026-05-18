#!/usr/bin/env node
// Copy non-TS assets (CSS) from src/ to dist/ preserving paths.
import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const src = join(pkgRoot, "src");
const dist = join(pkgRoot, "dist");

const assets = [
  "styles.css",
  "tokens/base.css",
  "tokens/themes/education.css",
  "tokens/themes/kumon.css",
  "tokens/themes/impactx.css",
];

if (!existsSync(dist)) {
  await mkdir(dist, { recursive: true });
}

for (const rel of assets) {
  const from = join(src, rel);
  const to = join(dist, rel);
  await mkdir(dirname(to), { recursive: true });
  await cp(from, to);
  process.stdout.write(`copied ${rel}\n`);
}
