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

      console.log(`\n✅ PR이 성공적으로 생성되었습니다: ${response.data.html_url}`);
    } catch (e: any) {
      if (e.message.includes("Not Found")) {
        console.error(getMessage("repoNotFound", lang));
        console.error(`- ${owner}/${repo} 레포지토리가 존재하는지 확인해주세요`);
        console.error("- GitHub 토큰이 해당 레포지토리에 접근 권한이 있는지 확인해주세요");
      } else if (e.message.includes("Validation Failed")) {
        console.error(getMessage("branchValidationFailed", lang));
        console.error(`- head 브랜치(${options.head})가 원격 저장소에 있는지 확인해주세요`);
        console.error(`- base 브랜치(${options.base || "main"})가 원격 저장소에 있는지 확인해주세요`);
        console.error("- 이미 동일한 브랜치로 생성된 PR이 있는지 확인해주세요");
      } else if (e.message.includes("Bad credentials")) {
        console.error(getMessage("authError", lang));
        console.error("- GitHub 토큰이 유효한지 확인해주세요");
        console.error("- 토큰이 만료되지 않았는지 확인해주세요");
      } else {
        console.error(getMessage("unknownError", lang));
        console.error(e.message);
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
      } else {
        console.error(getMessage("unexpectedError", lang));
        console.error(error.message);
      }
    } else {
      console.error(getMessage("unknownError", lang));
    }
    process.exit(1);
  }
}
