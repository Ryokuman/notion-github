import { Command } from "commander";
import { action } from "./action";

export function createCommand(program: Command) {
  program
    .command("create")
    .description("Create a new PR")
    .requiredOption("--title <title>", "PR title")
    .option("--description <description>", "PR description")
    .option("--branch <branch>", "Target branch", "main")
    .action(action);
}
