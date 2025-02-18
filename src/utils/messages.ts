type Messages = {
  [key: string]: {
    en: string;
    ko: string;
  };
};

export const messages: Messages = {
  repoFormatError: {
    en: "\nRepository format error:",
    ko: "\n레포지토리 형식 오류:",
  },
  repoFormatExample: {
    en: "- Correct format: owner/repo",
    ko: "- 올바른 형식: owner/repo",
  },
  repoFormatSample: {
    en: "- Example: Ryokuman/testing",
    ko: "- 예시: Ryokuman/testing",
  },
  checkingBranches: {
    en: "\nChecking and pushing branches...",
    ko: "\n브랜치 확인 및 push 중...",
  },
  pushingMainBranch: {
    en: "- Pushing main branch...",
    ko: "- main 브랜치 push 중...",
  },
  pushingBranch: {
    en: "- Pushing %s branch...",
    ko: "- %s 브랜치 push 중...",
  },
  branchPushError: {
    en: "\nBranch push failed:",
    ko: "\n브랜치 push 실패:",
  },
  checkGitConfig: {
    en: "- Please check your git configuration",
    ko: "- git 설정이 올바른지 확인해주세요",
  },
  checkRepoPermission: {
    en: "- Check if you have push permission to the repository",
    ko: "- 원격 저장소에 대한 push 권한이 있는지 확인해주세요",
  },
  checkBranchName: {
    en: "- Check if branch name contains special characters or spaces",
    ko: "- 브랜치 이름에 특수문자나 공백이 없는지 확인해주세요",
  },
  creatingPR: {
    en: "\nCreating PR...",
    ko: "\nPR 생성 중...",
  },
  repoNotFound: {
    en: "\nRepository not found:",
    ko: "\n레포지토리를 찾을 수 없습니다:",
  },
  authError: {
    en: "\nAuthentication failed:",
    ko: "\n인증 실패:",
  },
  checkToken: {
    en: "- Please check if your GitHub token is valid",
    ko: "- GitHub 토큰이 유효한지 확인해주세요",
  },
  checkTokenExpiry: {
    en: "- Please check if your token has not expired",
    ko: "- 토큰이 만료되지 않았는지 확인해주세요",
  },
  commandError: {
    en: "\nError details: %s",
    ko: "\n상세 오류: %s",
  },
  upToDate: {
    en: "Everything up-to-date",
    ko: "모든 것이 최신 상태입니다",
  },
  accessError: {
    en: "\nAccess Error:",
    ko: "\n접근 오류:",
  },
  checkRepoExists: {
    en: "- Please check if repository %s exists",
    ko: "- %s 레포지토리가 존재하는지 확인해주세요",
  },
  noRepoSpecified: {
    en: "\nNo repository specified. Please provide --repo option or set defaultRepository in ng-config.json",
    ko: "\n레포지토리가 지정되지 않았습니다. --repo 옵션을 사용하거나 ng-config.json에 defaultRepository를 설정해주세요",
  },
  validationError: {
    en: "\nValidation failed:",
    ko: "\n유효성 검사 실패:",
  },
  checkHeadBranch: {
    en: "- Please check if head branch '%s' exists in the repository",
    ko: "- head 브랜치 '%s'가 레포지토리에 존재하는지 확인해주세요",
  },
  checkBaseBranch: {
    en: "- Please check if base branch '%s' exists in the repository",
    ko: "- base 브랜치 '%s'가 레포지토리에 존재하는지 확인해주세요",
  },
  checkExistingPR: {
    en: "- Please check if a PR already exists for these branches",
    ko: "- 이미 동일한 브랜치로 생성된 PR이 있는지 확인해주세요",
  },
  reviewersAdded: {
    en: "\nDefault reviewers have been added: %s",
    ko: "\n기본 리뷰어가 추가되었습니다: %s",
  },
  reviewerAddFailed: {
    en: "\nFailed to add reviewers:",
    ko: "\n리뷰어 추가 실패:",
  },
  reviewerError: {
    en: "Error details: %s",
    ko: "오류 내용: %s",
  },
  selfReviewError: {
    en: "Cannot add yourself as a reviewer",
    ko: "자기 자신을 리뷰어로 추가할 수 없습니다",
  },
  prCreateSuccess: {
    en: "\n✅ PR created successfully!\nURL: %s",
    ko: "\n✅ PR 생성 성공!\nURL: %s",
  },
  discordNotificationSent: {
    en: "\nDiscord notification sent successfully",
    ko: "\n디스코드 알림이 전송되었습니다",
  },
  discordNotificationFailed: {
    en: "\nFailed to send Discord notification: %s",
    ko: "\n디스코드 알림 전송 실패: %s",
  },
};

export function getMessage(key: string, lang: "en" | "ko" = "en", ...args: any[]): string {
  const message = messages[key]?.[lang] || messages[key]?.en || key;
  return args.length ? message.replace(/%s/g, () => args.shift()) : message;
}
