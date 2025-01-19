import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_FILE = "ng-config.json";

export function readConfig(): { githubToken: string } {
  // 디버그 정보 출력
  console.log("=== Debug Information ===");
  console.log("Current working directory:", process.cwd());
  console.log("Home directory:", os.homedir());

  try {
    const currentDirPath = path.join(process.cwd(), CONFIG_FILE);
    const homeDirPath = path.join(os.homedir(), CONFIG_FILE);

    console.log("\nSearching for config file at:");
    console.log("1.", currentDirPath);
    console.log("   Exists:", fs.existsSync(currentDirPath));
    console.log("2.", homeDirPath);
    console.log("   Exists:", fs.existsSync(homeDirPath));

    let configPath = "";
    if (fs.existsSync(currentDirPath)) {
      configPath = currentDirPath;
      console.log("\nUsing config from current directory");
    } else if (fs.existsSync(homeDirPath)) {
      configPath = homeDirPath;
      console.log("\nUsing config from home directory");
    } else {
      throw new Error(
        `Config file not found. Please create ${CONFIG_FILE} in your project directory or home directory.`
      );
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

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
