import { Octokit } from "@octokit/rest";
import { CreateOptions } from "./types";
import { readConfig } from "../../utils/config";
import { execSync } from "child_process";
import { getMessage } from "../../utils/messages";

export async function action(options: CreateOptions) {
  let lang: "en" | "ko" = "en"; // 기본값 설정

  try {
    const config = readConfig();
    lang = config.language || "en"; // 여기서 설정
    const octokit = new Octokit({ auth: config.githubToken });

    // 2. 레포지토리 형식 검증
    const [owner, repo] = options.repo.split("/");
    if (!owner || !repo) {
      console.error(getMessage("repoFormatError", lang));
      console.error(getMessage("repoFormatExample", lang));
      console.error(getMessage("repoFormatSample", lang));
      process.exit(1);
    }

    // 3. 브랜치 push
    console.log(getMessage("checkingBranches", lang));
    try {
      // main 브랜치 push
      console.log(getMessage("pushingMainBranch", lang));
      execSync("git push -u origin main", { stdio: "inherit" });

      // 현재 브랜치 push
      console.log(getMessage("pushingBranch", lang, options.head));
      execSync(`git push -u origin ${options.head}`, { stdio: "inherit" });
    } catch (error) {
      console.error(getMessage("branchPushError", lang));
      console.error(getMessage("checkGitConfig", lang));
      console.error(getMessage("checkRepoPermission", lang));
      console.error(getMessage("checkBranchName", lang));
      if (error instanceof Error) console.error(`\n${error.message}`);
      process.exit(1);
    }

    // 4. PR 생성
    console.log(getMessage("creatingPR", lang));
    try {
      const response = await octokit.pulls.create({
        owner,
        repo,
        title: options.title,
        head: options.head,
        base: options.base || "main",
        body: options.description,
      });

      console.log(getMessage("prCreateSuccess", lang, response.data.html_url));
    } catch (e: any) {
      if (e.status === 401) {
        console.error(getMessage("accessError", lang));
        console.error(getMessage("checkToken", lang));
        console.error(getMessage("checkRepoExists", lang, `${owner}/${repo}`));
      } else if (e.message.includes("Validation Failed")) {
        console.error(getMessage("validationError", lang));
        console.error(getMessage("checkHeadBranch", lang, options.head));
        console.error(getMessage("checkBaseBranch", lang, options.base || "main"));
        console.error(getMessage("checkExistingPR", lang));
      } else {
        console.error(getMessage("unknownError", lang));
        console.error(getMessage("commandError", lang, e.message));
      }
      process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("git push")) {
        console.error(getMessage("branchPushError", lang));
        console.error(getMessage("checkGitConfig", lang));
        console.error(getMessage("checkRepoPermission", lang));
        console.error(getMessage("checkBranchName", lang));
        console.error(getMessage("commandError", lang, error.message));
      } else {
        console.error(getMessage("unexpectedError", lang));
        console.error(getMessage("commandError", lang, error.message));
      }
    } else {
      console.error(getMessage("unknownError", lang));
    }
    process.exit(1);
  }
}
