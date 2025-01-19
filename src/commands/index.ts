import { Command } from "commander";
import { createCommand } from "./create";

export function registerCommands(program: Command) {
  createCommand(program);
}
