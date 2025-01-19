import { Octokit } from "@octokit/rest";
import { CreateOptions } from "./types";
import { readConfig } from "../../utils/config";

export async function action(options: CreateOptions) {
  try {
    const config = readConfig();
    const octokit = new Octokit({ auth: config.githubToken });

    // owner/repo 형식에서 분리
    const [owner, repo] = options.repo.split("/");
    if (!owner || !repo) {
      throw new Error("Invalid repository format. Use 'owner/repo' format.");
    }

    console.log("Creating PR...");

    const response = await octokit.pulls.create({
      owner,
      repo,
      title: options.title,
      head: options.head,
      base: options.base || "main",
      body: options.description,
    });

    console.log(`PR created successfully: ${response.data.html_url}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to create PR:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
}
