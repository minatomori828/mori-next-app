// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

export async function POST(req: Request) {
  const data = await req.json();
  const { title, date, description, tags, content } = data;

  const safeTitle = typeof title === 'string' && title.trim() !== '' ? title : 'untitled';
  const slug = slugify(safeTitle, { lower: true, strict: true }) || `post-${Date.now()}`;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: '同じタイトルの記事がすでに存在します' }, { status: 409 });
  }

  const mdContent = `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: [${tags.map((t: string) => `"${t}"`).join(', ')}]
---

${content}
`;

  try {
    fs.writeFileSync(filePath, mdContent, 'utf-8');
    return NextResponse.json({ message: '記事を保存しました', slug }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 });
  }
}
