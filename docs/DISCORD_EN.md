# Discord Webhook Setup Guide

## 1. Get Discord Webhook URL

1. Open channel settings in Discord server
2. Select Integrations > Webhooks
3. Create New Webhook
4. Copy Webhook URL

## 2. ng-config.json Configuration

### Basic Setup

```json
{
  "discordWebhook": "YOUR_DISCORD_WEBHOOK_URL"
}
```

### Message Template Setup

```json
{
  "discordTemplate": {
    "ko": "🎉 새로운 PR!\n${title}\n${url}\n${reviewers}",
    "en": "🎉 New PR!\n${title}\n${url}\n${reviewers}"
  }
}
```

Available variables in template:

- `${title}`: PR title
- `${url}`: PR URL
- `${reviewers}`: Reviewer list

### Reviewer Mention Setup

Map GitHub IDs to Discord IDs to use Discord mention functionality.

```json
{
  "discordReviewerMapping": {
    "githubId": "discordId"
  }
}
```

Example:

```json
{
  "discordReviewerMapping": {
    "Ryokuman": "12345678901234567"
  }
}
```

## 3. Get Discord ID

1. Discord Settings > App Settings > Advanced > Enable Developer Mode
2. Right-click user > Copy ID
   for more information, click [here](https://support.discord.com/hc/ko/articles/206346498).

## 4. Full Configuration Example

```json
{
  "githubToken": "YOUR_GITHUB_TOKEN",
  "language": "en",
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

## 5. Notes

- Discord ID is a unique numeric identifier
- Keep your webhook URL private
- Use \n for line breaks in templates

```

```
