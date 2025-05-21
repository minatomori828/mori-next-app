'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function EditPostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert('ログインが必要です');
        router.push('/login');
        return;
      }

      const snapshot = await getDocs(collection(db, 'posts'));
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(post => post.uid === user.uid); // 自分の投稿だけ表示

      setPosts(data);
    });

    return () => unsubscribe();
  }, [router]);

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
