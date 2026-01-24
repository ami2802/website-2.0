import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { getRSSPostById, fetchRSSFeed } from "@/lib/rss";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { SubstackContent } from "@/components/blog/substack-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const localPosts = getBlogPosts();
  const rssPosts = await fetchRSSFeed();

  const localParams = localPosts.map((post) => ({ slug: post.slug }));
  const rssParams = rssPosts.map((post) => ({ slug: post.id }));

  return [...localParams, ...rssParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const localPost = getBlogPost(slug);
  if (localPost) {
    return {
      title: `${localPost.title} | amirul.dev`,
      description: localPost.description,
    };
  }

  const rssPost = await getRSSPostById(slug);
  if (rssPost) {
    return {
      title: `${rssPost.title} | amirul.dev`,
      description: rssPost.description,
    };
  }

  return { title: "Not Found" };
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const localPost = getBlogPost(slug);
  if (localPost) {
    const components = useMDXComponents({});
    return (
      <main className="min-h-screen bg-background border-b border-border/40">
        <style>{`
                    .image-link-expand, .view-image, .restack-image, button.pencraft { display: none !important; }
                `}</style>
        <div className="p-6 md:p-12 max-w-[52rem] mx-auto">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {localPost.title}
            </h1>
            <p className="text-muted-foreground">
              {formatDate(localPost.date)}
            </p>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXRemote source={localPost.content} components={components} />
          </div>
        </div>
      </main>
    );
  }

  const rssPost = await getRSSPostById(slug);
  if (rssPost) {
    return (
      <main className="min-h-screen bg-background border-b border-border/40">
        <style>{`
                    .image-link-expand, .view-image, .restack-image, button.pencraft { display: none !important; }
                `}</style>
        <div className="p-6 md:p-12 max-w-[52rem] mx-auto">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              {rssPost.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>{formatDate(rssPost.pubDate)}</span>
              <span className="text-border">•</span>
              <a
                href={rssPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline underline-offset-4 cursor-pointer"
              >
                View on Substack ↗
              </a>
            </div>
          </header>

          <SubstackContent content={rssPost.content} />
        </div>
      </main>
    );
  }

  notFound();
}
