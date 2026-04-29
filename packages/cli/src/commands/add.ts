import { CliError, type ThemeName } from "../types.js";

export interface AddOptions {
  /** Theme override (--alfabeto / --kumon / --impactx). */
  theme?: ThemeName;
  /** Skip prompts. */
  yes?: boolean;
  /** Force overwrite without prompting on conflicts. */
  force?: boolean;
  /** Override registry URL. */
  registryUrl?: string;
  /** Path override for components dir. */
  path?: string;
}

/**
 * `npx @impactx/ui add <ds> [<component>] [--<theme>]`
 *
 * Behavior:
 *  - if not initialized, runs `init` first
 *  - if component omitted, installs every item in the DS
 *  - resolves registryDependencies recursively, dedupes, topo-orders
 *  - copies files, updates tokens.css, tailwind.config, package.json deps
 *  - persists hashes in `.impactx-ui/manifest.json`
 */
export async function runAdd(
  _ds: string,
  _component: string | undefined,
  _opts: AddOptions = {},
): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: add");
}
