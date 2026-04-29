import { Command } from "commander";
import pc from "picocolors";
import { runAdd } from "./commands/add.js";
import { runDiff } from "./commands/diff.js";
import { runInit } from "./commands/init.js";
import { runList } from "./commands/list.js";
import { runOnboarding } from "./commands/onboarding.js";
import { runUpdate } from "./commands/update.js";
import { CliError, type ThemeName } from "./types.js";

const VERSION = "0.0.1";

function pickTheme(opts: Record<string, boolean>): ThemeName | undefined {
  if (opts.alfabeto) return "alfabeto";
  if (opts.kumon) return "kumon";
  if (opts.impactx) return "impactx";
  return undefined;
}

async function main(argv: string[]): Promise<void> {
  const program = new Command();

  program
    .name("@impactx/ui")
    .description("Impact X UI — multi-DS, multi-theme component CLI")
    .version(VERSION)
    .option("--registry-url <url>", "override IMPACTX_REGISTRY_URL")
    .action(async (opts: { registryUrl?: string }) => {
      await runOnboarding({ registryUrl: opts.registryUrl });
    });

  program
    .command("init")
    .description("Configure paths, tailwind, and tokens.css")
    .option("-y, --yes", "skip prompts")
    .option("--path <path>", "components path override")
    .option("--theme <theme>", "default theme (alfabeto|kumon|impactx)")
    .action(async (opts) => {
      await runInit(opts);
    });

  program
    .command("add <ds> [component]")
    .description("Install a DS (or single component) into the project")
    .option("-y, --yes", "skip prompts")
    .option("--force", "overwrite without asking on conflicts")
    .option("--path <path>", "components path override")
    .option("--alfabeto", "use alfabeto theme")
    .option("--kumon", "use kumon theme")
    .option("--impactx", "use impactx theme")
    .option("--registry-url <url>", "override registry URL")
    .action(async (ds: string, component: string | undefined, opts) => {
      await runAdd(ds, component, {
        theme: pickTheme(opts),
        yes: opts.yes,
        force: opts.force,
        registryUrl: opts.registryUrl,
        path: opts.path,
      });
    });

  program
    .command("update <ds> [component]")
    .description("Pull updates from the registry and apply with diff review")
    .option("-y, --yes", "skip prompts")
    .option("--on-conflict <strategy>", "merge | abort | force")
    .option("--registry-url <url>", "override registry URL")
    .action(async (ds: string, component: string | undefined, opts) => {
      await runUpdate(ds, component, {
        yes: opts.yes,
        onConflict: opts.onConflict,
        registryUrl: opts.registryUrl,
      });
    });

  program
    .command("list")
    .description("List available DSs and components")
    .option("--ds <ds>", "filter to a DS")
    .option("--json", "machine-readable output")
    .option("--registry-url <url>", "override registry URL")
    .action(async (opts) => {
      await runList(opts);
    });

  program
    .command("diff <ds> <component>")
    .description("Show delta between local and remote registry version")
    .option("--full", "full unified diff (default: stats)")
    .option("--registry-url <url>", "override registry URL")
    .action(async (ds: string, component: string, opts) => {
      await runDiff(ds, component, opts);
    });

  await program.parseAsync(argv);
}

main(process.argv).catch((err: unknown) => {
  if (err instanceof CliError) {
    console.error(pc.red(`[${err.code}]`), err.message);
    if (err.hint) console.error(pc.dim(`hint: ${err.hint}`));
    process.exit(err.code === "USER_ABORTED" ? 130 : 1);
  }
  console.error(pc.red("unexpected error:"), err);
  process.exit(1);
});
