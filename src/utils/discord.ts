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
  lang: "en" | "ko" = "en"
) {
  const message = [
    `🎉 ${lang === "ko" ? "새로운 PR이 생성되었습니다!" : "New PR Created!"}`,
    ``,
    `📌 ${prTitle}`,
    `🔗 ${prUrl}`,
  ];

  if (reviewers && reviewers.length > 0) {
    message.push(``, `👥 ${lang === "ko" ? "리뷰어" : "Reviewers"}: ${reviewers.map((r) => `@${r}`).join(", ")}`);
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message.join("\n") }),
    });
  } catch (error: any) {
    throw new Error(lang === "ko" ? "디스코드 알림 전송 실패" : "Failed to send Discord notification");
  }
}
