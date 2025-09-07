import { NextRequest, NextResponse } from 'next/server'

type ExerciseUpdate = {
  name: string
  reps: string
  weight: number
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password, updates } = body as { password: string; updates: ExerciseUpdate[] }
    console.log('updates', updates)

    if (password !== process.env.ADMIN_PASSWORD)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const path = process.env.MD_PATH
    const commitMsg = `Updated ${process.env.COMMIT_MSG || 'progress.md'}`

    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!getRes.ok) {
      const text = await getRes.text()
      return NextResponse.json({ error: `Failed to fetch file: ${text}` }, { status: 500 })
    }

    const fileData = await getRes.json()
    const sha = fileData.sha
    const content: string = Buffer.from(fileData.content, 'base64').toString('utf-8')

    let updatedContent = content

    updates.forEach(update => {
      const exName = update.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      const regex = new RegExp(
        `(### ${exName}\\n)- 3x\\d+ @ \\d+(?:\\.\\d+)?kg`,
        'g'
      )
      updatedContent = updatedContent.replace(regex, `$1- 3x${update.reps} @ ${update.weight}kg`)
    })

    const updateRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: commitMsg,
        content: Buffer.from(updatedContent).toString('base64'),
        sha
      })
    })

    if (!updateRes.ok) {
      const text = await updateRes.text()
      return NextResponse.json({ error: `Failed to update file: ${text}` }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
