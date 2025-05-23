// utils/getPosts.ts
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getPostList() {
  const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      slug: doc.id,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
    };
  });
}
