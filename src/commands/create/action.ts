import { Octokit } from "@octokit/rest";
import { CreateOptions } from "./types";
import { readConfig } from "../../utils/config";
import { execSync } from "child_process";

export async function action(options: CreateOptions) {
  try {
    const config = readConfig();
    const octokit = new Octokit({ auth: config.githubToken });

    // 2. 레포지토리 형식 검증
    const [owner, repo] = options.repo.split("/");
    if (!owner || !repo) {
      console.error("레포지토리 형식 오류:");
      console.error("- 올바른 형식: owner/repo");
      console.error("- 예시: Ryokuman/testing");
      process.exit(1);
    }

    // 3. 브랜치 push
    console.log("\n브랜치 확인 및 push 중...");
    try {
      // main 브랜치 push
      console.log("- main 브랜치 push 중...");
      execSync("git push -u origin main", { stdio: "inherit" });

      // 현재 브랜치 push
      console.log(`- ${options.head} 브랜치 push 중...`);
      execSync(`git push -u origin ${options.head}`, { stdio: "inherit" });
    } catch (error) {
      console.error("\n브랜치 push 실패:");
      console.error("- git 설정이 올바른지 확인해주세요");
      console.error("- 원격 저장소에 대한 push 권한이 있는지 확인해주세요");
      console.error("- 브랜치 이름에 특수문자나 공백이 없는지 확인해주세요");
      if (error instanceof Error) console.error(`\n상세 오류: ${error.message}`);
      process.exit(1);
    }

    // 4. PR 생성
    console.log("\nPR 생성 중...");
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
      console.error("\nPR 생성 실패:");

      if (e.message.includes("Validation Failed")) {
        console.error("브랜치 검증 실패:");
        console.error(`- head 브랜치(${options.head})가 원격 저장소에 있는지 확인해주세요`);
        console.error(`- base 브랜치(${options.base || "main"})가 원격 저장소에 있는지 확인해주세요`);
        console.error("- 이미 동일한 브랜치로 생성된 PR이 있는지 확인해주세요");
      } else if (e.message.includes("Not Found")) {
        console.error("레포지토리를 찾을 수 없습니다:");
        console.error(`- ${owner}/${repo} 레포지토리가 존재하는지 확인해주세요`);
        console.error("- GitHub 토큰이 해당 레포지토리에 접근 권한이 있는지 확인해주세요");
      } else if (e.message.includes("Bad credentials")) {
        console.error("인증 실패:");
        console.error("- GitHub 토큰이 유효한지 확인해주세요");
        console.error("- 토큰이 만료되지 않았는지 확인해주세요");
      } else {
        console.error("알 수 없는 오류가 발생했습니다:");
        console.error(e.message);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error("\n예상치 못한 오류가 발생했습니다:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("알 수 없는 오류");
    }
    process.exit(1);
  }
}
