import type { MetadataRoute } from "next";

const siteUrl = "https://alanmlcrt.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}