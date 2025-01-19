import fetch from "node-fetch";

interface DiscordEmbed {
  title: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

interface DiscordMessage {
  embeds: DiscordEmbed[];
}

export async function sendDiscordNotification(
  webhookUrl: string,
  prTitle: string,
  prUrl: string,
  reviewers?: string[],
  lang: "en" | "ko" = "en",
  template?: { ko?: string; en?: string },
  discordReviewerMapping?: { [key: string]: string }
) {
  // 기본 템플릿
  const defaultTemplate = {
    ko: ["# 🎉 새로운 PR이 생성되었습니다!", "## 제목", "> ${title}", "## 링크", "> ${url}", "${reviewers}"].join("\n"),
    en: ["# 🎉 New PR Created!", "## Title", "> ${title}", "## Link", "> ${url}", "${reviewers}"].join("\n"),
  };

  const selectedTemplate = (template && template[lang]) || defaultTemplate[lang];

  // 리뷰어 Discord ID 매핑
  const mappedReviewers = reviewers?.map((reviewer) => {
    const discordId = discordReviewerMapping?.[reviewer];
    return discordId ? `<@${discordId}>` : `@${reviewer}`;
  });

  let message = selectedTemplate
    .replace("${title}", prTitle)
    .replace("${url}", prUrl)
    .replace(
      "${reviewers}",
      mappedReviewers && mappedReviewers.length > 0
        ? `## ${lang === "ko" ? "리뷰어" : "Reviewers"}\n> ${mappedReviewers.join(", ")}`
        : ""
    );

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      throw new Error(`Discord API returned ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(lang === "ko" ? "디스코드 알림 전송 실패" : "Failed to send Discord notification");
  }
}
