import { Octokit } from "@octokit/rest";
import { CreateOptions } from "./types";
import { readConfig } from "../../utils/config";
import { execSync } from "child_process";
import { getMessage } from "../../utils/messages";
import { sendDiscordNotification } from "../../utils/discord";

export async function action(options: CreateOptions) {
  let lang: "en" | "ko" = "en";

  try {
    const config = readConfig();
    lang = config.language || "en";

    // repo가 없으면 config에서 가져오기
    if (!options.repo) {
      if (!config.defaultRepository) {
        console.error(getMessage("noRepoSpecified", lang));
        process.exit(1);
      }
      options.repo = config.defaultRepository;
    }

    const [owner, repo] = (options.repo || config.defaultRepository || "").split("/");
    const octokit = new Octokit({ auth: config.githubToken });

    // 2. 레포지토리 형식 검증
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
      console.log("Config:", config); // 설정 확인
      console.log("Creating PR with options:", options); // PR 옵션 확인

      const response = await octokit.pulls.create({
        owner,
        repo,
        title: options.title,
        head: options.head,
        base: options.base || "main",
        body: options.description,
      });

      // 기본 리뷰어가 설정되어 있는 경우에만 리뷰어 추가
      if (config.defaultReviewers && config.defaultReviewers.length > 0) {
        try {
          await octokit.pulls.requestReviewers({
            owner,
            repo,
            pull_number: response.data.number,
            reviewers: config.defaultReviewers,
          });
          console.log(getMessage("reviewersAdded", lang, config.defaultReviewers.join(", ")));
        } catch (reviewError: any) {
          console.error(getMessage("reviewerAddFailed", lang));
          if (reviewError.message.includes("Review cannot be requested from pull request author")) {
            console.error(getMessage("selfReviewError", lang));
          } else {
            console.error(getMessage("reviewerError", lang, reviewError.message));
          }
        }
      }

      if (config.discordWebhook) {
        try {
          await sendDiscordNotification(
            config.discordWebhook,
            options.title,
            response.data.html_url,
            config.defaultReviewers,
            lang,
            config.discordTemplate,
            config.discordReviewerMapping
          );
          console.log(getMessage("discordNotificationSent", lang));
        } catch (error: any) {
          console.error(getMessage("discordNotificationFailed", lang, error.message));
        }
      }

      console.log(getMessage("prCreateSuccess", lang, response.data.html_url));
    } catch (e: any) {
      if (e.message.includes("Bad credentials")) {
        console.error(getMessage("invalidToken", lang));
      } else if (e.message.includes("Not Found")) {
        console.error(getMessage("accessError", lang));
        console.error(getMessage("checkToken", lang));
        console.error(getMessage("checkRepo", lang));
      } else {
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
