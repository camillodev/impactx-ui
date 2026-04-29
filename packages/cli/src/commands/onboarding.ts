import { CliError } from "../types.js";

export interface OnboardingOptions {
  /** Optional registry URL override (env IMPACTX_REGISTRY_URL takes precedence). */
  registryUrl?: string;
  /** Skip prompts and use defaults (CI / scripted runs). */
  yes?: boolean;
}

/**
 * `npx @impactx/ui` (no args) — interactive onboarding.
 * Detects framework, prompts for DS / theme / path / scope, then delegates to `add`.
 */
export async function runOnboarding(_opts: OnboardingOptions = {}): Promise<void> {
  throw new CliError("INVALID_ARGS", "not implemented: onboarding");
}
