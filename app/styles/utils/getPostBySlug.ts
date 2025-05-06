// utils/getPostBySlug.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.join(process.cwd(), 'posts');

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  const contentHtml = marked(content);

  return {
    slug,
    title: data.title || '',
    date: data.date ? data.date.toString() : '',
    description: data.description || '',
    tags: data.tags || [],
    contentHtml,
  };
}
