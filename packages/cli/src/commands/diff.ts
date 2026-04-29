import { CliError } from "../types.js";

export interface DiffOptions {
  /** Show full unified diff (default: stats only). */
  full?: boolean;
  registryUrl?: string;
}

/**
 * `npx @impactx/ui diff <ds> <component>`
 *
 * Prints the delta between the locally-installed file(s) and the remote
 * registry version. Read-only; does not write anything.
 */
export async function runDiff(
  _ds: string,
  _component: string,
  _opts: DiffOptions = {},
): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: diff");
}
