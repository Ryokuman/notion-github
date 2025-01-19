# PR-CLI

GitHub Pull Request를 생성하는 커맨드라인 도구입니다. 기본 레포지토리와 리뷰어 설정을 지원합니다.

## 설치

```bash
npm install -g pr-cli
```

## 설정

먼저, [GitHub 토큰을 생성](./GITHUB_TOKEN_KO.md)해주세요.

설정 파일 초기화:

```bash
pr-cli init --token YOUR_GITHUB_TOKEN --language ko --default-repo owner/repo
```

다음과 같이 `ng-config.json` 파일이 생성됩니다:

```json
{
  "githubToken": "YOUR_GITHUB_TOKEN",
  "language": "ko",
  "defaultRepository": "owner/repo",
  "defaultReviewers": ["reviewer1", "reviewer2"],
  "discordWebhook": "YOUR_DISCORD_WEBHOOK_URL",
  "discordTemplate": {
    "ko": "🎉 새로운 PR!\n${title}\n${url}\n${reviewers} 입니다.",
    "en": "🎉 New PR!\n${title}\n${url}\n${reviewers} desu"
  },
  "discordReviewerMapping": {
    "githubId": "discordId"
  }
}
```

## 사용법

PR 생성:

```bash
pr-cli create --title "PR 제목" --head feature/branch
```

옵션:

- `--title`: PR 제목 (필수)
- `--head`: Head 브랜치 이름 (필수)
- `--repo`: 레포지토리 (선택, 미지정시 설정의 defaultRepository 사용)
- `--description`: PR 설명 (선택)
- `--base`: Base 브랜치 (선택, 기본값 'main')
