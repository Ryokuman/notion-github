import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_FILE = "ng-config.json";

export interface Config {
  githubToken: string;
  language?: "ko" | "en";
  defaultRepository?: string;
  defaultReviewers?: string[]; // 배열 형식, 순서가 우선순위
  discordWebhook?: string;
  discordTemplate?: {
    ko?: string;
    en?: string;
  };
  discordReviewerMapping?: {
    [githubId: string]: string; // GitHub ID -> Discord ID 매핑
  };
}

export function readConfig(): Config {
  try {
    const currentDirPath = path.join(process.cwd(), CONFIG_FILE);

    if (fs.existsSync(currentDirPath)) {
      const config = JSON.parse(fs.readFileSync(currentDirPath, "utf8"));

      if (!config.githubToken) {
        throw new Error("GitHub token not found in config file.");
      }

      return {
        ...config,
        language: config.language || "en", // 기본값 설정
      };
    }

    throw new Error(`Config file not found at ${currentDirPath}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read config: ${error.message}`);
    }
    throw error;
  }
}
