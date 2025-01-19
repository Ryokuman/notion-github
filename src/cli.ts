import { Command } from "commander";
import { version } from "../package.json";

const program = new Command();

program
  .name("pr-cli")
  .description("A simple CLI tool")
  .version(version)
  .action(() => {
    console.log("Hello World");
  });

program.parse();
