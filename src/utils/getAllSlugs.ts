// utils/getAllSlugs.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getAllSlugs() {
  const snapshot = await getDocs(collection(db, 'posts'));
  return snapshot.docs.map(doc => doc.id);
}
