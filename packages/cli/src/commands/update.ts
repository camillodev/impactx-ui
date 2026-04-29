import { CliError, type ConflictResolution } from "../types.js";

export interface UpdateOptions {
  /** Default conflict resolution when local files diverge. */
  onConflict?: ConflictResolution;
  /** Skip prompts. */
  yes?: boolean;
  registryUrl?: string;
}

/**
 * `npx @impactx/ui update <ds> [<component>]`
 *
 * Compares local file hashes (from `.impactx-ui/manifest.json`) with the
 * remote registry. For each file: identical → skip; remote newer → update;
 * local diverged → prompt (merge | abort | force-with-backup).
 */
export async function runUpdate(
  _ds: string,
  _component: string | undefined,
  _opts: UpdateOptions = {},
): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: update");
}
