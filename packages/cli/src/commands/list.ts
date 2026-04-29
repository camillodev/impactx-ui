import { CliError } from "../types.js";

export interface ListOptions {
  /** Filter to a single DS. */
  ds?: string;
  /** JSON output for scripting. */
  json?: boolean;
  registryUrl?: string;
}

/**
 * `npx @impactx/ui list`
 *
 * Fetches `<registry>/r/index.json`, then for each DS fetches its
 * `<ds>/index.json`, and prints a tree of available components.
 */
export async function runList(_opts: ListOptions = {}): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: list");
}
