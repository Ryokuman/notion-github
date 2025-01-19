import { DebugOptions } from "./types";
import { readConfig } from "../../utils/config";

export async function action(options: DebugOptions) {
  try {
    const config = readConfig();
    console.log("Current Configuration:");
    console.log(JSON.stringify(config, null, 2));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Debug failed:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
}
