import { cache } from "react";
import Parser from "rss-parser";

export interface RSSPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
}

const parser = new Parser<{ [key: string]: unknown }, RSSPost>({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

const RSS_FEED_URL = "https://brightcosmo.substack.com/feed";

export const fetchRSSFeed = cache(
  async (feedUrl: string = RSS_FEED_URL): Promise<RSSPost[]> => {
    try {
      const feed = await parser.parseURL(feedUrl);

      return feed.items.map((item: any, index: number) => ({
        id: generatePostId(item.link || "", index),
        title: item.title || "Untitled",
        link: item.link || "",
        pubDate: item.pubDate || "",
        description: item.contentSnippet || item.description || "",
        content:
          item.contentEncoded || item["content:encoded"] || item.content || "",
      }));
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      return [];
    }
  },
);

export async function getRSSPostById(id: string): Promise<RSSPost | null> {
  const posts = await fetchRSSFeed();
  return posts.find((post) => post.id === id) || null;
}

const SLUG_OVERRIDES: Record<string, string> = {
  "can-an-ensemble-of-mini-models-catch": "ensemble-monitor-experiments",
};

function generatePostId(link: string, fallbackIndex: number): string {
  if (!link) return `post-${fallbackIndex}`;

  let slug = `post-${fallbackIndex}`;

  const match = link.match(/\/p\/([^/?]+)/);
  if (match) {
    slug = match[1];
  } else {
    const parts = link.split("/").filter(Boolean);
    slug = parts[parts.length - 1] || `post-${fallbackIndex}`;
  }

  return SLUG_OVERRIDES[slug] || slug;
}
