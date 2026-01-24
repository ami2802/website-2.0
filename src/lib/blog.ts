import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function parseFrontmatter(content: string): {
  metadata: Record<string, string>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontmatter = match[1];
  const body = match[2];

  const metadata: Record<string, string> = {};
  frontmatter.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts
        .join(":")
        .trim()
        .replace(/^['"]|['"]$/g, "");
    }
  });

  return { metadata, content: body };
}

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { metadata } = parseFrontmatter(fileContent);

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date || "",
      description: metadata.description || "",
    };
  });

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(fileContent);

  return {
    slug,
    title: metadata.title || slug,
    date: metadata.date || "",
    description: metadata.description || "",
    content,
  };
}
