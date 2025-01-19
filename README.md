# notion-github CLI

GitHub PR 생성을 자동화하는 CLI 도구입니다.

## 설치

```bash
npm install -g notion-github
```

## 사전 준비사항

1. GitHub Personal Access Token 발급

   - [GitHub Token 발급 가이드](./docs/GITHUB_TOKEN.md)를 참고하여 토큰을 발급받으세요.
   - 발급받은 토큰을 환경변수로 설정:
     ```bash
     export GITHUB_TOKEN=your_token_here
     ```

2. Repository 접근 권한 확인
   - PR을 생성하려는 repository에 대한 write 권한이 있어야 합니다.

## 사용법

### PR 생성

```bash
pr-cli create --title "PR 제목" --description "PR 설명" --head feature/branch --repo owner/repo
```

### 필수 옵션

- `--title`: PR 제목
- `--head`: PR을 생성할 소스 브랜치
- `--repo`: 대상 레포지토리 (예: owner/repo)

### 선택 옵션

- `--description`: PR 설명
- `--base`: PR을 병합할 대상 브랜치 (기본값: main)

### 도움말

```bash
pr-cli --help        # 전체 도움말
pr-cli create --help # create 명령어 도움말
```

## 라이선스

MIT

## 설정

1. 홈 디렉토리에 `notion_github_config.json` 파일을 생성합니다:

```json
{
  "githubToken": "your_github_token_here"
}
```
