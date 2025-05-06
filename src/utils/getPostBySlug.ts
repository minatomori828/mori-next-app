import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.join(process.cwd(), 'posts');

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  console.log('Trying to read:', fullPath);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf-8');
    const { data, content } = matter(fileContents);
    const contentHtml = marked.parse(content);

    return {
      slug,
      title: data.title || '',
      date:
        typeof data.date === 'string'
          ? data.date
          : data.date instanceof Date
          ? data.date.toISOString()
          : '',
      description: data.description || '',
      tags: data.tags || [],
      contentHtml,
    };  
  } catch {
    // ファイルが存在しない場合など
    return null;
  }
}
