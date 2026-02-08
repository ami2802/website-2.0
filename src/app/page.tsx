import { getBlogPosts } from "@/lib/blog";
import { fetchRSSFeed } from "@/lib/rss";
import HomeClient from "@/components/layout/HomeClient";
import { Analytics } from "@vercel/analytics/react";
import { MergedPost } from "@/components/sections/blog-row";

export const revalidate = 3600;

export default async function Home() {
  // Get local MDX posts
  const localPosts = getBlogPosts().map((post) => ({
    id: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    source: "local" as const,
    url: `/blog/${post.slug}`,
  }));

  // Fetch RSS posts from Substack
  const rssFeed = await fetchRSSFeed("https://brightcosmo.substack.com/feed");
  const rssPosts = rssFeed.map((post) => ({
    id: post.id,
    title: post.title,
    date: post.pubDate,
    description: post.description,
    source: "substack" as const,
    url: `/blog/${post.id}`,
  }));

  // Merge+sort
  const allPosts: MergedPost[] = [...localPosts, ...rssPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <HomeClient blogPosts={allPosts} />
      <Analytics />
    </>
  );
}
