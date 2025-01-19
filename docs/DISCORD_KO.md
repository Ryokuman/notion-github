# Discord 웹훅 설정 가이드

## 1. Discord 웹훅 URL 얻기

1. Discord 서버의 채널 설정 열기
2. 연동 > 웹후크 선택
3. 새 웹후크 생성
4. 웹후크 URL 복사

## 2. ng-config.json 설정

### 기본 설정

```json
{
  "discordWebhook": "YOUR_DISCORD_WEBHOOK_URL"
}
```

### 메시지 템플릿 설정

```json
{
  "discordTemplate": {
    "ko": "🎉 새로운 PR!\n${title}\n${url}\n${reviewers}",
    "en": "🎉 New PR!\n${title}\n${url}\n${reviewers}"
  }
}
```

템플릿에서 사용 가능한 변수:

- `${title}`: PR 제목
- `${url}`: PR URL
- `${reviewers}`: 리뷰어 목록

### 리뷰어 멘션 설정

GitHub ID와 Discord ID를 매핑하여 디스코드 멘션 기능을 사용할 수 있습니다.

```json
{
  "discordReviewerMapping": {
    "githubId": "discordId"
  }
}
```

예시:

```json
{
  "discordReviewerMapping": {
    "Ryokuman": "12345678901234567"
  }
}
```

## 3. Discord ID 얻기

1. Discord 설정 > 앱 설정 > 고급 > 개발자 모드 활성화
2. 유저를 우클릭 > ID 복사
   자세한 내용은 [여기](https://support.discord.com/hc/ko/articles/206346498)를 참고해주세요.

## 4. 전체 설정 예시

```json
{
  "githubToken": "YOUR_GITHUB_TOKEN",
  "language": "ko",
  "defaultRepository": "owner/repo",
  "defaultReviewers": ["reviewer1", "reviewer2"],
  "discordWebhook": "YOUR_DISCORD_WEBHOOK_URL",
  "discordTemplate": {
    "ko": "🎉 새로운 PR!\n${title}\n${url}\n${reviewers}",
    "en": "🎉 New PR!\n${title}\n${url}\n${reviewers}"
  },
  "discordReviewerMapping": {
    "githubId": "discordId"
  }
}
```

## 5. 주의사항

- Discord ID는 숫자로만 이루어진 고유 식별자입니다
- 웹훅 URL은 절대 공개되지 않도록 주의하세요
- 템플릿에서 줄바꿈은 \n으로 표시합니다
