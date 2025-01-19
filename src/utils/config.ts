import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_FILE = "notion_github_config.json";
const CONFIG_PATH = path.join(os.homedir(), CONFIG_FILE);

export function readConfig(): { githubToken: string } {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      throw new Error(`Config file not found. Please create ${CONFIG_FILE} in your home directory.`);
    }

    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

    if (!config.githubToken) {
      throw new Error("GitHub token not found in config file.");
    }

    return config;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read config: ${error.message}`);
    }
    throw error;
  }
}
