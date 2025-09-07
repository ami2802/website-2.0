import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const path = process.env.MD_PATH

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.object',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json({ error: `Failed to fetch file: ${text}` }, { status: response.status })
  }

  const content = await response.json()
  // content.content is base64 encoded, decode it
  const decoded = Buffer.from(content.content, 'base64').toString('utf-8')
  return NextResponse.json({ content: decoded })
}
