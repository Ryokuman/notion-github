import { Command } from "commander";
import { version } from "../package.json";
import { registerCommands } from "./commands";
import { initCommand } from "./commands/init";

const program = new Command();

program.name("pr-cli").description("A simple CLI tool").version(version);

initCommand(program);
registerCommands(program);

program.parse();
