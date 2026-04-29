/**
 * Shared types for @impactx/ui CLI.
 * Schema is shadcn-compatible (https://ui.shadcn.com/schema/registry-item.json)
 * with `meta.impactx` extension.
 */

export type RegistryItemType =
  | "registry:ui"
  | "registry:component"
  | "registry:block"
  | "registry:lib"
  | "registry:hook"
  | "registry:theme"
  | "registry:style";

export type ThemeName = "alfabeto" | "kumon" | "impactx";

export type Framework = "next" | "vite" | "remix" | "astro" | "unknown";

export interface RegistryFile {
  /** Source path inside the canonical repo (informational). */
  path: string;
  /** Type for this file (mirrors shadcn). */
  type: RegistryItemType;
  /** Where the file lands in the consumer project (relative to project root). */
  target: string;
  /** Raw file contents — present after the registry server resolves the item. */
  content?: string;
}

export interface RegistryCssVars {
  /** CSS vars applied at `:root` regardless of theme. */
  theme?: Record<string, string>;
  /** CSS vars applied in light mode. */
  light?: Record<string, string>;
  /** CSS vars applied in dark mode. */
  dark?: Record<string, string>;
}

export interface ImpactXMeta {
  /** Slug of the design system (e.g. "education"). */
  ds: string;
  /** Semver of the DS at time of registry build. */
  version: string;
  /** Themes supported by this item. */
  themes: ThemeName[];
  /** Human-facing notes about design decisions baked into this item. */
  decisions?: string[];
}

export interface RegistryItem {
  $schema?: string;
  /** Slug of the item (e.g. "button"). */
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  /** External npm packages required at runtime. */
  dependencies?: string[];
  /** Other registry items required (slugs within the same DS, or `<ds>/<item>` cross-DS). */
  registryDependencies?: string[];
  /** Files that get copied into the consumer project. */
  files: RegistryFile[];
  /** CSS variables to inject into the consumer's tokens.css. */
  cssVars?: RegistryCssVars;
  /** Tailwind config additions. */
  tailwind?: {
    config?: Record<string, unknown>;
  };
  /** Free-form metadata; we attach `impactx` here. */
  meta?: {
    impactx?: ImpactXMeta;
    [k: string]: unknown;
  };
}

/** Index manifest for a single DS: lists every component available. */
export interface RegistryIndex {
  /** DS slug. */
  ds: string;
  /** DS semver. */
  version: string;
  /** Themes shipped with the DS. */
  themes: ThemeName[];
  /** Default theme slug. */
  defaultTheme: ThemeName;
  /** Components in the DS, ordered for `list` UX. */
  items: Array<{
    name: string;
    type: RegistryItemType;
    title: string;
    description: string;
    category?: "atom" | "molecule" | "organism" | "chart" | "theme";
  }>;
}

/** Top-level manifest at `<registry>/r/index.json` listing every DS. */
export interface RegistryRoot {
  systems: Array<{
    ds: string;
    version: string;
    description: string;
    componentCount: number;
  }>;
}

/** Persisted at `.impactx-ui/manifest.json` in the consumer project. */
export interface ProjectConfig {
  /** Schema version of this manifest. */
  $schemaVersion: 1;
  /** Project framework detected at init. */
  framework: Framework;
  /** TS/JS variant. */
  tsx: boolean;
  /** Where components are written (relative to project root). */
  componentsPath: string;
  /** Where lib files are written (relative to project root). */
  libPath: string;
  /** Where the tokens.css lives (relative to project root). */
  tokensPath: string;
  /** Default theme applied to <html className>. */
  defaultTheme: ThemeName;
  /** DSs and per-component install state. */
  installed: Record<
    string, // ds slug
    {
      version: string;
      themes: ThemeName[];
      components: Record<
        string, // component name
        {
          version: string;
          /** ohash of the file contents at install/update time. */
          hash: string;
          /** Files touched, with target paths and per-file hashes. */
          files: Array<{ target: string; hash: string }>;
          installedAt: string; // ISO date
        }
      >;
    }
  >;
}

/** A registry item resolved with all its transitive `registryDependencies`. */
export interface ResolvedComponent {
  /** The user-requested item. */
  root: RegistryItem;
  /** Topologically ordered list of items to install (dependencies first, root last). */
  order: RegistryItem[];
  /** Aggregated external npm dependencies. */
  npmDeps: Set<string>;
  /** Aggregated CSS vars. */
  cssVars: RegistryCssVars;
}

/** Outcome of a per-file write (used by `add`/`update`/`diff`). */
export interface FileWriteOutcome {
  target: string;
  status: "created" | "updated" | "skipped" | "conflict" | "backed-up";
  reason?: string;
  backupPath?: string;
}

/** Detection result for the consumer project. */
export interface DetectedProject {
  framework: Framework;
  tsx: boolean;
  componentsPath: string;
  libPath: string;
  tokensPath: string;
  hasTailwind: boolean;
  packageManager: "pnpm" | "npm" | "yarn" | "bun";
}

export type ConflictResolution = "merge" | "abort" | "force";

/** Standard error taxonomy. */
export type CliErrorCode =
  | "NETWORK_ERROR"
  | "REGISTRY_INVALID"
  | "REGISTRY_NOT_FOUND"
  | "FILE_CONFLICT"
  | "FRAMEWORK_UNKNOWN"
  | "NOT_INITIALIZED"
  | "INVALID_ARGS"
  | "WRITE_FAILED"
  | "USER_ABORTED";

export class CliError extends Error {
  constructor(
    public code: CliErrorCode,
    message: string,
    public hint?: string,
  ) {
    super(message);
    this.name = "CliError";
  }
}
