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
  // ... 나머지 메시지들도 추가
};

export function getMessage(key: string, lang: "en" | "ko" = "en", ...args: any[]): string {
  const message = messages[key]?.[lang] || messages[key]?.en || key;
  return args.length ? message.replace(/%s/g, () => args.shift()) : message;
}
