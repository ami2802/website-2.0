import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-password");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const path = process.env.MD_PATH;

  if (!token || !owner || !repo || !path) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 },
    );
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { error: `Failed to fetch file: ${text}` },
      { status: response.status },
    );
  }

  const content = await response.json();
  const decoded = Buffer.from(content.content, "base64").toString("utf-8");
  return NextResponse.json({ content: decoded });
}
