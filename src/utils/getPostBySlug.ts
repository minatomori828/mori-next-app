// utils/getPostBySlug.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { marked } from 'marked';

export async function getPostBySlug(slug: string) {
  const docRef = doc(db, 'posts', slug);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    contentHtml: marked(data.content || ''),
  };
}
