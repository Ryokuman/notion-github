# PR-CLI

A command-line tool for creating GitHub Pull Requests with default repository and reviewer settings.

## Installation

```bash
npm install -g pr-cli
```

## Configuration

First, [generate a GitHub token](./GITHUB_TOKEN_EN.md).

Initialize the configuration file:

```bash
pr-cli init --token YOUR_GITHUB_TOKEN --language en --default-repo owner/repo
```

This will create `ng-config.json`:

```json
{
  "githubToken": "YOUR_GITHUB_TOKEN",
  "language": "en",
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

## Usage

Create a PR:

```bash
pr-cli create --title "Your PR Title" --head feature/branch
```

Options:

- `--title`: PR title (required)
- `--head`: Head branch name (required)
- `--repo`: Repository (optional, uses defaultRepository from config if not specified)
- `--description`: PR description (optional)
- `--base`: Base branch (optional, defaults to 'main')
