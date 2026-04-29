# `@impactx/ui` — CLI Technical Specification

> Multi-DS, multi-theme component CLI for Impact X. Distributes proprietary design
> systems via shadcn-style copy-paste model: code lands in the consumer repo,
> nothing is imported from a runtime package. Updates pulled on demand.

- **Status:** v0.0.1 scaffold (no command logic implemented)
- **Plan source:** `/Users/rafae/projetos/ds-impactx/PLAN-NEXT-SESSION-SHADCN-PIVOT.md` (Fases 1-2)
- **Registry contract:** shadcn-compat (`https://ui.shadcn.com/schema/registry-item.json`)
- **Registry endpoint:** `https://ui.impactx.com.br/r/<ds>/<component>.json`
  (override via env `IMPACTX_REGISTRY_URL` or `--registry-url`)
- **Node:** `>=20`
- **Module:** ESM only

---

## Table of contents

1. [Commands](#1-commands)
2. [Shared types](#2-shared-types)
3. [Framework detection](#3-framework-detection)
4. [Path resolution](#4-path-resolution)
5. [Dependency resolution](#5-dependency-resolution)
6. [Hashing & manifest](#6-hashing--manifest)
7. [Edge cases & conflict policy](#7-edge-cases--conflict-policy)
8. [Error taxonomy](#8-error-taxonomy)
9. [Test plan](#9-test-plan)
10. [Open questions](#10-open-questions)

---

## 1. Commands

All commands share these globals:

| Flag                    | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `--registry-url <url>`  | Overrides `IMPACTX_REGISTRY_URL`. Default `https://ui.impactx.com.br`. |
| `-y, --yes`             | Skip prompts. Use defaults / detected values.            |
| `--version`             | Print CLI version.                                       |
| `--help`                | Print help.                                              |

Exit codes (uniform across commands):

- `0` — success
- `1` — generic failure (`CliError` other than user abort)
- `2` — invalid arguments / parsing
- `130` — user aborted (Ctrl+C or selected "abort")

### 1.1 `npx @impactx/ui` (onboarding)

Signature:

```ts
runOnboarding(opts: { registryUrl?: string; yes?: boolean }): Promise<void>
```

Flow:

1. Print banner (`@impactx/ui · onboarding`) via `@clack/prompts`.
2. Run framework detection (§3). If `framework === "unknown"` → fail
   `FRAMEWORK_UNKNOWN` with hint to use `--path`.
3. Fetch `<registry>/r/index.json` (`RegistryRoot`). Cache for the session.
4. Prompt: which DS? (`select` of `RegistryRoot.systems`).
5. Fetch `<registry>/r/<ds>/index.json` (`RegistryIndex`).
6. Prompt: default theme? (`select` of `index.themes`, default = `index.defaultTheme`).
7. Prompt: components path? Default = §4 detection.
8. Prompt: scope? `all` | `atoms only` | `manual select` (multiselect).
9. Prompt: confirm? If no → exit `130`.
10. Delegate to `runAdd(ds, undefined, { theme, path, yes: true, ... })`
    plus a manual-selection list when chosen.
11. Print "next steps" panel: `import "@/styles/tokens.css"` in root layout.

Side effects: writes files (delegated to `add`).

### 1.2 `npx @impactx/ui init`

Signature:

```ts
runInit(opts: { yes?: boolean; theme?: ThemeName; path?: string }): Promise<void>
```

Flow:

1. If `.impactx-ui/manifest.json` already exists and `--yes` not passed →
   prompt to overwrite (default: no).
2. Detect framework (§3) and paths (§4); show summary.
3. Prompt confirmation (skipped under `-y`).
4. Write:
   - `.impactx-ui/manifest.json` (`ProjectConfig`, empty `installed`).
   - `<tokensPath>` if missing (empty `:root {}` placeholder).
   - `<libPath>/utils.ts` with `cn` helper if missing.
   - Patch `tailwind.config.{ts,js,mjs}`: add `componentsPath` and `libPath`
     to `content` array (idempotent).
5. Print success summary.

Side effects: creates `.impactx-ui/`, possibly `tokens.css`, `lib/utils.ts`,
patches tailwind config.

Called automatically by `add` if `.impactx-ui/manifest.json` is missing.

### 1.3 `npx @impactx/ui add <ds> [component]`

Signature:

```ts
runAdd(
  ds: string,
  component: string | undefined,
  opts: {
    theme?: ThemeName;
    yes?: boolean;
    force?: boolean;
    path?: string;
    registryUrl?: string;
  },
): Promise<void>
```

Flags: `--alfabeto | --kumon | --impactx` map to `opts.theme`. Mutually
exclusive — using more than one fails `INVALID_ARGS`.

Flow:

1. Ensure project initialized; if not, call `runInit({ yes: opts.yes, theme: opts.theme, path: opts.path })`.
2. Load `ProjectConfig` from `.impactx-ui/manifest.json`.
3. Fetch `<registry>/r/<ds>/index.json`. If 404 → `REGISTRY_NOT_FOUND`.
4. Determine target items:
   - `component` provided → fetch only that item.
   - omitted → fetch every item in `index.items`.
5. For each requested item, fetch `<registry>/r/<ds>/<name>.json`,
   validate against shadcn schema (§5), then resolve dependencies (§5).
6. Compute write plan: list of `(target, content, hash)` tuples,
   topo-ordered (deps first). Dedupe by `target`.
7. For each target, compare against on-disk hash (§7). On conflict,
   prompt unless `--force`/`--yes` policy decides.
8. Write files atomically (`tmp + rename`). Update `tokens.css` (merge
   CSS vars from `cssVars.theme/light/dark`). Patch `package.json`
   `dependencies` (run install via detected pkg manager only if `--yes`,
   else prompt).
9. Update `ProjectConfig.installed[ds].components[name]` with version,
   files, hashes, ISO timestamp.
10. Persist manifest. Print summary table.

Side effects: writes components, tokens.css edits, tailwind edits,
package.json edits, manifest write, optional `pnpm/npm/yarn install`.

### 1.4 `npx @impactx/ui update <ds> [component]`

Signature:

```ts
runUpdate(
  ds: string,
  component: string | undefined,
  opts: { yes?: boolean; onConflict?: "merge" | "abort" | "force"; registryUrl?: string },
): Promise<void>
```

Flow:

1. Require initialized project. If `installed[ds]` missing → `NOT_INITIALIZED`
   with hint to run `add` first.
2. Determine items to update: provided component, or all in `installed[ds]`.
3. For each: fetch remote registry item. Compute remote per-file hash.
4. For each file:
   - same hash as manifest → skip.
   - manifest hash matches local on-disk → safe update; show diff stats; apply.
   - manifest hash differs from local on-disk → **local divergence**;
     §7 conflict flow.
5. After applying, update `ProjectConfig.installed[ds].components[name]`
   with new version + new file hashes.

Side effects: file overwrites, optional `.impactx-ui-backup/` writes,
manifest update.

### 1.5 `npx @impactx/ui list`

Signature:

```ts
runList(opts: { ds?: string; json?: boolean; registryUrl?: string }): Promise<void>
```

Flow:

1. Fetch `RegistryRoot`. If `--ds`, filter.
2. For each DS, fetch `RegistryIndex`.
3. If `--json` → write `JSON.stringify({ systems: [...] })` to stdout, exit.
4. Otherwise render a tree:
   ```
   education @ 0.2.0 (3 themes)
     atoms     · button, input, badge, ...
     molecules · card, alert, ...
     organisms · data-table, command-palette, ...
   ```

Side effects: none (read-only).

### 1.6 `npx @impactx/ui diff <ds> <component>`

Signature:

```ts
runDiff(ds: string, component: string, opts: { full?: boolean; registryUrl?: string }): Promise<void>
```

Flow:

1. Require initialized + component installed.
2. Fetch remote item.
3. For each file, compute three-way state (local-on-disk, manifest-recorded,
   remote-just-fetched).
4. Print summary stats per file (`+N -M lines` via simple line-count delta).
5. If `--full`, print unified diff (use a tiny LCS impl; no external diff lib).

Side effects: none (read-only).

---

## 2. Shared types

Authoritative source: `src/types.ts`. The schemas below mirror shadcn's
`registry-item.json` plus the `meta.impactx` extension (already validates
against the upstream schema because `meta` is unconstrained).

```ts
type RegistryItemType =
  | "registry:ui" | "registry:component" | "registry:block"
  | "registry:lib" | "registry:hook" | "registry:theme" | "registry:style";

type ThemeName = "alfabeto" | "kumon" | "impactx";
type Framework = "next" | "vite" | "remix" | "astro" | "unknown";

interface RegistryFile {
  path: string;        // canonical source path (informational)
  type: RegistryItemType;
  target: string;      // where it lands in the consumer project
  content?: string;    // populated by registry-fetch
}

interface RegistryCssVars {
  theme?: Record<string, string>;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

interface ImpactXMeta {
  ds: string;
  version: string;
  themes: ThemeName[];
  decisions?: string[];
}

interface RegistryItem {
  $schema?: string;
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  dependencies?: string[];          // npm externals
  registryDependencies?: string[];  // sibling items (or `<ds>/<name>`)
  files: RegistryFile[];
  cssVars?: RegistryCssVars;
  tailwind?: { config?: Record<string, unknown> };
  meta?: { impactx?: ImpactXMeta; [k: string]: unknown };
}

interface RegistryIndex {
  ds: string;
  version: string;
  themes: ThemeName[];
  defaultTheme: ThemeName;
  items: Array<{
    name: string;
    type: RegistryItemType;
    title: string;
    description: string;
    category?: "atom" | "molecule" | "organism" | "chart" | "theme";
  }>;
}

interface RegistryRoot {
  systems: Array<{ ds: string; version: string; description: string; componentCount: number }>;
}

interface ProjectConfig {
  $schemaVersion: 1;
  framework: Framework;
  tsx: boolean;
  componentsPath: string;
  libPath: string;
  tokensPath: string;
  defaultTheme: ThemeName;
  installed: Record<string, {
    version: string;
    themes: ThemeName[];
    components: Record<string, {
      version: string;
      hash: string; // ohash of full item
      files: Array<{ target: string; hash: string }>;
      installedAt: string; // ISO
    }>;
  }>;
}

interface ResolvedComponent {
  root: RegistryItem;
  order: RegistryItem[];        // topo: deps before root
  npmDeps: Set<string>;
  cssVars: RegistryCssVars;     // merged from order
}
```

---

## 3. Framework detection

Probes (in order — first match wins). All paths relative to `process.cwd()`.

| Framework | Probe                                                                    |
| --------- | ------------------------------------------------------------------------ |
| `next`    | `next.config.{js,ts,mjs,cjs}` exists OR `package.json` has `next` dep.  |
| `remix`   | `remix.config.{js,ts}` exists OR `vite.config.*` imports `@remix-run/dev`. |
| `astro`   | `astro.config.{ts,mjs,js}` exists.                                       |
| `vite`    | `vite.config.{ts,mjs,js}` exists (and none of the above).                |
| `unknown` | None matched.                                                            |

For each detected framework we set defaults:

| Framework | Default `componentsPath`        | Default `libPath`     | Default `tokensPath`           |
| --------- | ------------------------------- | --------------------- | ------------------------------ |
| `next`    | `src/components/ui` (App Router with `src/`) or `components/ui` | `src/lib` / `lib`     | `src/styles/tokens.css`        |
| `vite`    | `src/components/ui`             | `src/lib`             | `src/styles/tokens.css`        |
| `remix`   | `app/components/ui`             | `app/lib`             | `app/styles/tokens.css`        |
| `astro`   | `src/components/ui`             | `src/lib`             | `src/styles/tokens.css`        |
| `unknown` | requires `--path` flag          | `lib`                 | `styles/tokens.css`            |

**Next.js `src/` detection:** if `src/app/` or `src/pages/` exists → use `src/`,
else use repo root.

**TS/JS:** `tsconfig.json` present → `tsx: true`; else `tsx: false` and
files are written as `.jsx`/`.js` after a transform pass (post-MVP — see §10).

---

## 4. Path resolution

Default mapping table is in §3. Override precedence:

1. `--path` CLI flag (only overrides `componentsPath`).
2. `ProjectConfig.componentsPath` from `.impactx-ui/manifest.json`.
3. Framework default.

**`tsconfig.json paths` honoring:** if `compilerOptions.paths` declares
`@/*` → `./src/*`, we keep that alias intact. If consumer uses a different
alias (e.g. `~/*`), prompt at `init` to confirm — registry items use `@/`
imports, so a rewrite pass replaces `@/` with the consumer's prefix at
write time.

**`components/ui` vs `src/components/ui`:** decided at `init`. Stored in
`ProjectConfig.componentsPath`. Never re-detected after init unless user
runs `init` again.

---

## 5. Dependency resolution

`registryDependencies` may be `"button"` (same DS) or `"<ds>/button"`
(cross-DS). Algorithm:

1. Build a fetch queue starting with the requested item(s).
2. For each item dequeued:
   - Validate JSON against shadcn `registry-item.json` (basic shape: required
     `name`, `type`, `files[]`).
   - Push every `registryDependencies` entry not yet seen onto the queue.
3. After all fetched, build dependency graph.
4. Topological sort (Kahn). Detect cycles → `REGISTRY_INVALID` with the
   cycle path in the message.
5. Dedupe identical `target` paths across items (later wins; warn).
6. Aggregate `dependencies[]` into `npmDeps: Set<string>`.
7. Merge all `cssVars.{theme,light,dark}` (later wins on key collision).

Output: `ResolvedComponent`.

---

## 6. Hashing & manifest

**Hash function:** `ohash` (deterministic, fast, cross-platform). We hash
the **literal file contents** (post-rewrite for `@/` aliases), not the
registry JSON.

**Per-file:** `hash = ohash(content)` stored at
`ProjectConfig.installed[ds].components[name].files[i].hash`.

**Per-component:** `hash = ohash(item)` (the whole `RegistryItem` JSON
post-resolve) for fast "did anything in this component change" checks.

**Update flow uses the manifest hash as the "expected local" baseline.**
That's how we tell apart "local file unchanged since install" (manifest
hash == on-disk hash) from "local divergence" (manifest != on-disk).

Manifest path: `.impactx-ui/manifest.json` at project root. Pretty-printed
JSON (2-space) with trailing newline. Schema-versioned (`$schemaVersion: 1`).
Future migrations live in `src/lib/manifest-migrate.ts`.

---

## 7. Edge cases & conflict policy

**Local divergence on `update`:** detected when on-disk file hash differs
from the hash recorded in `ProjectConfig`. Three resolutions:

1. **`merge`** — three-way text merge (registry-base → registry-new vs
   on-disk). MVP: only attempts merge when local change is purely additive
   (no overlapping line ranges). Otherwise falls through to prompt.
2. **`abort`** — leaves the file untouched; logs a warning; manifest is
   *not* updated for this file. Subsequent `update` will re-prompt.
3. **`force`** — backup on-disk file to
   `.impactx-ui-backup/<ds>/<component>/<timestamp>/<target>`, then
   overwrite. Manifest is updated to the new remote hash.

Default policy: prompt per file. With `--yes` and no `--on-conflict`, we
default to `abort` (safe).

**Backup retention:** the CLI never deletes `.impactx-ui-backup/`. README
recommends gitignoring it.

**Other edge cases:**

- Component already installed at same version → `add` no-ops with green
  "already up to date" message. Use `--force` to reinstall.
- Tailwind config file not found → emit `FILE_CONFLICT` with hint to add
  `content` paths manually. Continue with file writes.
- `package.json` missing → `NOT_INITIALIZED` (we refuse to write into a
  non-project).
- Network offline → `NETWORK_ERROR` with hint to set `IMPACTX_REGISTRY_URL`
  to a local registry (e.g. file path or local server).

---

## 8. Error taxonomy

All thrown via `CliError` (see `src/types.ts`). Output via `picocolors`:
`pc.red([CODE])` + message + `pc.dim(hint)`.

| Code                | When                                                       | UX message (example)                                                |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `NETWORK_ERROR`     | `fetch` rejected or non-2xx                                | `Could not reach registry. Check your connection.`                  |
| `REGISTRY_INVALID`  | JSON fails shadcn schema or topo cycle                     | `Registry item "button" is malformed (missing files[]).`            |
| `REGISTRY_NOT_FOUND`| 404 from registry                                          | `DS "education" or component "buton" not found in the registry.`    |
| `FILE_CONFLICT`     | Cannot patch tailwind/package.json safely                  | `tailwind.config.ts has unusual shape; patch manually.`             |
| `FRAMEWORK_UNKNOWN` | No probe matched in §3                                     | `Could not detect framework. Re-run with --path src/components/ui.` |
| `NOT_INITIALIZED`   | Manifest missing where required                            | `Run "@impactx/ui init" first.`                                     |
| `INVALID_ARGS`      | Mutually exclusive flags, unknown subcommand               | `Pass at most one theme flag.`                                      |
| `WRITE_FAILED`      | EACCES, ENOSPC, etc                                        | `Could not write to <path>: permission denied.`                     |
| `USER_ABORTED`      | Ctrl+C or "no" on confirmation                             | `Aborted by user.`                                                  |

Exit `1` for all except `USER_ABORTED` (`130`) and `INVALID_ARGS` (`2`).

---

## 9. Test plan

**Unit tests (vitest):** colocated as `src/**/*.test.ts`.

| Module               | Cases                                                              |
| -------------------- | ------------------------------------------------------------------ |
| `lib/resolve-deps`   | linear chain · diamond dep · cycle detection · cross-DS · dedupe   |
| `lib/detect-framework` | next w/ src · next w/o src · vite · remix · astro · unknown      |
| `lib/paths`          | tsconfig `@/*` · custom alias · no tsconfig                        |
| `lib/registry-fetch` | 200 ok · 404 → `REGISTRY_NOT_FOUND` · invalid JSON · timeout       |
| `lib/install-files`  | atomic write · backup on overwrite · manifest update               |
| `commands/add`       | first install · re-install no-op · `--force` reinstall · theme flag|
| `commands/update`    | clean update · diverged → abort · diverged → force-with-backup     |
| `commands/diff`      | identical · purely additive · conflicting hunks                    |
| `commands/list`      | full list · `--ds` filter · `--json`                               |

**E2E smoke (executed in `/tmp` via `execa`):**

```ts
test("e2e: add education into a fresh Next app", async () => {
  const dir = await mktmp();
  await execa("pnpm", ["create", "next-app", ".", "--ts", "--tailwind", "--app", "--use-pnpm"], { cwd: dir });
  await execa("node", [cliBin, "add", "education", "--alfabeto", "-y"], { cwd: dir });
  expect(await ls(`${dir}/src/components/ui`)).toHaveLength(19);
  expect(await read(`${dir}/.impactx-ui/manifest.json`)).toMatchSnapshot();
  await execa("pnpm", ["build"], { cwd: dir }); // must compile
});
```

Repeat for Vite (`pnpm create vite`) and Astro (`pnpm create astro`).
Network calls in E2E are stubbed against a local registry served from
`packages/cli/test/fixtures/registry/` to keep tests deterministic.

**CI:** `.github/workflows/ci.yml` runs `pnpm --filter @impactx/ui lint`,
`build`, `test`, then a single E2E smoke (Next only) per PR.

---

## 10. Open questions

These need a Rafa decision in the next session before TDD starts:

1. **JS-only consumer support.** Spec assumes `tsx: true`. If `tsconfig`
   absent, do we (a) refuse, (b) emit `.jsx` via a quick TS strip, or
   (c) ship pre-built `.jsx` mirrors in the registry?
2. **Cross-DS `registryDependencies`** semantics: do we allow them at all
   in MVP, or restrict to same-DS until v0.3?
3. **Tailwind v4 vs v3.** Detection branch + `cssVars` injection differs.
   Plan currently assumes v4 (`@theme` block in CSS); verify with Next 15
   templates.
4. **Auto-install npm deps** under `--yes`? Plan is yes; risk is touching
   the consumer's lockfile silently. Alt: print the install command and
   require explicit `--install` flag.
5. **Three-way merge implementation.** MVP says "additive only". Do we
   reach for `diff3`/`node-diff3` or hand-roll the additive-only branch?
6. **Registry signing.** Future hardening: sign `RegistryItem` JSON with
   an Impact X key, verify in CLI to prevent supply-chain swap.
