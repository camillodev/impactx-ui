import { CliError, type ThemeName } from "../types.js";

export interface InitOptions {
  /** Skip prompts and use detected defaults. */
  yes?: boolean;
  /** Default theme for the project. */
  theme?: ThemeName;
  /** Components path override. */
  path?: string;
}

/**
 * `npx @impactx/ui init`
 *
 * Writes `.impactx-ui/manifest.json`, creates `src/styles/tokens.css`,
 * patches `tailwind.config.*` content paths, and ensures `lib/utils.ts`.
 * Called automatically by `add` if the project is not yet initialized.
 */
export async function runInit(_opts: InitOptions = {}): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: init");
}
