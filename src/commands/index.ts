import { Command } from "commander";
import { createCommand } from "./create";
import { debugCommand } from "./debug";

export function registerCommands(program: Command) {
  createCommand(program);
  debugCommand(program);
}
