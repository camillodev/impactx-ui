#!/usr/bin/env node
/**
 * build-registry.mjs
 *
 * Generates shadcn-style registry JSONs consumed by the @impactx/ui CLI.
 *
 * Source:
 *   packages/ds-education/src/components/*.tsx
 *   packages/ds-education/src/components-education/*.tsx
 *   packages/ds-education/src/utils.ts
 *
 * Output:
 *   apps/web/public/r/index.json
 *   apps/web/public/r/education/index.json
 *   apps/web/public/r/education/<name>.json
 *   apps/web/public/r/education/utils.json
 *
 * Schema: shadcn registry-item.json + meta.impactx (see packages/cli/src/types.ts).
 */

import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join, basename, dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const DS_PKG = join(ROOT, "packages/ds-education")
const SRC_COMPONENTS = join(DS_PKG, "src/components")
const SRC_ORGANISMS = join(DS_PKG, "src/components-education")
const UTILS_FILE = join(DS_PKG, "src/utils.ts")
const PKG_JSON = join(DS_PKG, "package.json")

const OUT_ROOT = join(ROOT, "apps/web/public/r")
const OUT_DS = join(OUT_ROOT, "education")

const SCHEMA_URL = "https://ui.shadcn.com/schema/registry-item.json"
const DS_SLUG = "education"
const THEMES = ["alfabeto", "kumon", "impactx"]
const DEFAULT_THEME = "alfabeto"

const ATOM_SLUGS = new Set([
  "button", "icon-button", "badge", "avatar", "breadcrumb",
  "input", "pagination", "tabs", "tooltip", "separator",
  "progress-bar", "card", "chip",
  "label", "skeleton", "switch", "checkbox", "textarea",
])
const MOLECULE_SLUGS = new Set([
  "stat", "banner-cta", "modal", "toast",
  "command-palette", "help-fab", "code-block", "assessment-card",
  "dropdown-menu",
  "select", "alert-dialog", "sheet",
])
const CHART_SLUGS = new Set(["chart", "donut-score"])
const ORGANISM_SLUGS = new Set([
  "data-table",
  "assessment-header", "assessment-list-item", "big-card",
  "campo-card", "category-card", "cta-banner", "hero-banner",
  "question-row", "subject-stat-card",
])

const TITLE_MAP = {
  "icon-button": "IconButton",
  "banner-cta": "BannerCTA",
  "dropdown-menu": "DropdownMenu",
  "command-palette": "CommandPalette",
  "help-fab": "HelpFab",
  "code-block": "CodeBlock",
  "assessment-card": "AssessmentCard",
  "data-table": "DataTable",
  "progress-bar": "ProgressBar",
  "donut-score": "DonutScore",
  "assessment-header": "AssessmentHeader",
  "assessment-list-item": "AssessmentListItem",
  "big-card": "BigCard",
  "campo-card": "CampoCard",
  "category-card": "CategoryCard",
  "cta-banner": "CtaBanner",
  "hero-banner": "HeroBanner",
  "question-row": "QuestionRow",
  "subject-stat-card": "SubjectStatCard",
  "alert-dialog": "AlertDialog",
}

function toTitle(slug) {
  return TITLE_MAP[slug] ?? slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())
}

function categoryFor(slug) {
  if (ATOM_SLUGS.has(slug)) return "atom"
  if (MOLECULE_SLUGS.has(slug)) return "molecule"
  if (CHART_SLUGS.has(slug)) return "chart"
  if (ORGANISM_SLUGS.has(slug)) return "organism"
  return "atom"
}

function slugFromFile(filename) {
  return basename(filename, ".tsx")
}

function analyzeSource(content) {
  const npm = new Set()
  const registry = new Set()
  const importRe = /(?:from|import)\s*\(?\s*["']([^"']+)["']\s*\)?/g
  let m
  while ((m = importRe.exec(content)) !== null) {
    const spec = m[1]
    if (spec.startsWith(".")) {
      if (spec === "../utils" || spec === "../utils.js" || spec === "../utils.ts") {
        registry.add("utils")
      } else if (spec.startsWith("./")) {
        const sib = spec.replace(/^\.\//, "").replace(/\.(t|j)sx?$/, "")
        if (!sib.includes("/") && !sib.endsWith(".css")) {
          registry.add(sib)
        }
      }
    } else if (spec.startsWith("@/")) {
      // consumer alias — already targets the user's project
    } else {
      let pkg = spec
      if (pkg.startsWith("@")) {
        const parts = pkg.split("/")
        pkg = parts.slice(0, 2).join("/")
      } else {
        pkg = pkg.split("/")[0]
      }
      npm.add(pkg)
    }
  }

  const rewritten = content
    .replace(/(["'])\.\.\/utils(?:\.[tj]sx?)?\1/g, "$1@/lib/utils$1")
    .replace(/(["'])\.\/([a-z0-9-]+)(?:\.[tj]sx?)?\1/g, (full, q, name) => {
      if (name.endsWith(".css")) return full
      return `${q}@/components/ui/${name}${q}`
    })

  return { npm, registry, rewritten }
}

async function readDsVersion() {
  const pkg = JSON.parse(await readFile(PKG_JSON, "utf8"))
  return pkg.version ?? "0.0.0"
}

async function buildItem({ filePath, slug, type }) {
  const raw = await readFile(filePath, "utf8")
  const { npm, registry, rewritten } = analyzeSource(raw)
  const cat = categoryFor(slug)
  const itemType = type ?? "registry:ui"

  return {
    $schema: SCHEMA_URL,
    name: slug,
    type: itemType,
    title: toTitle(slug),
    description: `${toTitle(slug)} — Impact X DS Education`,
    dependencies: [...npm].sort(),
    registryDependencies: [...registry].sort(),
    files: [
      {
        path: `components/${slug}.tsx`,
        type: itemType,
        target: `components/ui/${slug}.tsx`,
        content: rewritten,
      },
    ],
    meta: {
      impactx: {
        ds: DS_SLUG,
        version: undefined,
        themes: THEMES,
        category: cat,
      },
    },
  }
}

async function buildUtilsItem() {
  const raw = await readFile(UTILS_FILE, "utf8")
  const { npm } = analyzeSource(raw)
  return {
    $schema: SCHEMA_URL,
    name: "utils",
    type: "registry:lib",
    title: "cn helper",
    description: "Tailwind class merger (clsx + tailwind-merge)",
    dependencies: [...npm].sort(),
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts",
        content: raw,
      },
    ],
    meta: {
      impactx: {
        ds: DS_SLUG,
        version: undefined,
        themes: THEMES,
        category: undefined,
      },
    },
  }
}

async function listTsxFiles(dir) {
  if (!existsSync(dir)) return []
  const entries = await readdir(dir)
  return entries.filter((f) => f.endsWith(".tsx")).map((f) => join(dir, f))
}

async function main() {
  const version = await readDsVersion()
  const items = []

  const utilsItem = await buildUtilsItem()
  utilsItem.meta.impactx.version = version
  items.push(utilsItem)

  for (const dir of [SRC_COMPONENTS, SRC_ORGANISMS]) {
    const files = await listTsxFiles(dir)
    for (const file of files.sort()) {
      const slug = slugFromFile(file)
      const item = await buildItem({ filePath: file, slug })
      item.meta.impactx.version = version
      items.push(item)
    }
  }

  if (existsSync(OUT_DS)) await rm(OUT_DS, { recursive: true })
  await mkdir(OUT_DS, { recursive: true })

  for (const item of items) {
    const clean = JSON.parse(JSON.stringify(item))
    await writeFile(
      join(OUT_DS, `${item.name}.json`),
      JSON.stringify(clean, null, 2) + "\n",
      "utf8",
    )
  }

  const index = {
    ds: DS_SLUG,
    version,
    themes: THEMES,
    defaultTheme: DEFAULT_THEME,
    items: items
      .filter((it) => it.name !== "utils")
      .map((it) => ({
        name: it.name,
        type: it.type,
        title: it.title,
        description: it.description,
        category: it.meta?.impactx?.category,
      })),
  }
  await writeFile(
    join(OUT_DS, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
    "utf8",
  )

  await mkdir(OUT_ROOT, { recursive: true })
  const root = {
    systems: [
      {
        ds: DS_SLUG,
        version,
        description: "Impact X Education DS — atoms, molecules, charts, organisms",
        componentCount: index.items.length,
      },
    ],
  }
  await writeFile(
    join(OUT_ROOT, "index.json"),
    JSON.stringify(root, null, 2) + "\n",
    "utf8",
  )

  console.log(
    `[registry] wrote ${items.length} items + 2 manifests to ${OUT_DS.replace(ROOT + "/", "")}`,
  )
}

main().catch((err) => {
  console.error("[registry] build failed:", err)
  process.exit(1)
})
