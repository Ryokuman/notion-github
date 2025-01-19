import { Command } from "commander";
import { action } from "./action";

export function initCommand(program: Command) {
  program
    .command("init")
    .description("Initialize configuration file")
    .option("--token <token>", "GitHub token")
    .option("--language <lang>", "Language setting (en|ko)", /^(en|ko)$/, "en")
    .option("--repository <repo>", "Default repository (owner/repo format)")
    .action(action);
}
