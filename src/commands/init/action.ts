import fs from "fs";
import path from "path";
import { InitOptions } from "./types";

export async function action(options: InitOptions) {
  try {
    const configPath = path.join(process.cwd(), "ng-config.json");

    // 이미 존재하는지 확인
    if (fs.existsSync(configPath)) {
      console.error("ng-config.json already exists");
      process.exit(1);
    }

    const defaultConfig = {
      githubToken: options.token || "YOUR_GITHUB_TOKEN_HERE",
      language: options.language || "en",
      // 추가적인 기본 설정이 필요하다면 여기에 추가
    };

    // 파일 작성
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2) + "\n");
    console.log("Created ng-config.json successfully");

    if (!options.token) {
      console.log("\nPlease replace YOUR_GITHUB_TOKEN_HERE with your actual GitHub token in ng-config.json");
    }
  } catch (error) {
    console.error("Failed to create config file:", error);
    process.exit(1);
  }
}
