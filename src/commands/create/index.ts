import { Command } from "commander";
import { action } from "./action";

export function createCommand(program: Command) {
  program
    .command("create")
    .description("Create a new PR")
    .requiredOption("--title <title>", "PR title")
    .requiredOption("--head <head>", "Head branch")
    .option("--repo <repo>", "Repository (owner/repo)")
    .option("--description <description>", "PR description")
    .option("--base <base>", "Base branch", "main")
    .action(action);
}
