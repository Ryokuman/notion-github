import { Command } from "commander";
import { version } from "../package.json";
import { registerCommands } from "./commands";

const program = new Command();

program.name("pr-cli").description("A simple CLI tool").version(version);

registerCommands(program);

program.parse();
