// utils/getPostList.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

type PostSummary = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export function getPostList(): PostSummary[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '無題',
        date:
          typeof data.date === 'string'
            ? data.date
            : data.date instanceof Date
            ? data.date.toISOString()
            : '',
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    });
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
