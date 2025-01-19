import { Command } from "commander";
import { action } from "./action";

export function debugCommand(program: Command) {
  program
    .command("debug")
    .description("Show debug information")
    .option("--config", "Show configuration")
    .action(action);
}
