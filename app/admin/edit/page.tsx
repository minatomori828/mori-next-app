// app/admin/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Firestoreの投稿データの型
type Post = {
  id: string;
  title: string;
  uid: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

export default function EditPostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert('ログインが必要です');
        router.push('/login');
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, 'posts'));

        const data = snapshot.docs
          .map((doc) => {
            const docData = doc.data() as Omit<Post, 'id'>; // ← 型アサーション追加
            return {
              id: doc.id,
              ...docData,
            };
          })
          .filter((post) => post.uid === user.uid);

        setPosts(data);
      } catch (error) {
        console.error('投稿の取得に失敗しました', error);
      }
    });

    return () => unsubscribe();
  }, [router]);


  if (loading) return <p className="p-6 text-white">読み込み中...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">投稿編集</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-gray-800 p-4 rounded">
            <div className="flex justify-between items-center">
              <span>{post.title}</span>
              <button
                onClick={() => router.push(`/admin/edit/${post.id}`)}
                className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700"
              >
                編集
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
