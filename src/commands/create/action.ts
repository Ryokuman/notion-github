import { Octokit } from "@octokit/rest";
import { CreateOptions } from "./types";
import { readConfig } from "../../utils/config";
import { execSync } from "child_process";

export async function action(options: CreateOptions) {
  try {
    const config = readConfig();
    const octokit = new Octokit({ auth: config.githubToken });

    // owner/repo 형식에서 분리
    const [owner, repo] = options.repo.split("/");
    if (!owner || !repo) {
      throw new Error("Invalid repository format. Use 'owner/repo' format.");
    }

    // 브랜치 push 로직 추가
    console.log("Checking and pushing branches...");
    try {
      // main 브랜치 push
      console.log("Pushing main branch...");
      execSync("git push -u origin main", { stdio: "inherit" });

      // 현재 브랜치 push
      console.log(`Pushing ${options.head} branch...`);
      execSync(`git push -u origin ${options.head}`, { stdio: "inherit" });
    } catch (error) {
      console.error("Failed to push branches:", error);
      throw new Error("Failed to push branches. Please ensure you have the correct permissions.");
    }

    console.log("Creating PR...");

    try {
      const response = await octokit.pulls.create({
        owner,
        repo,
        title: options.title,
        head: options.head,
        base: options.base || "main",
        body: options.description,
      });

      console.log(`PR created successfully: ${response.data.html_url}`);
    } catch (e: any) {
      if (e.message.includes("Validation Failed")) {
        console.error("Failed to create PR: Please check if:");
        console.error("1. The source branch (--head) exists in the repository");
        console.error("2. The target branch (--base) exists in the repository");
        console.error("3. You have permission to create PRs in this repository");
      } else {
        throw e;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
}
